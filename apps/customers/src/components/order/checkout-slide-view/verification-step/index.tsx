import { ClockIcon } from '@phosphor-icons/react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslator } from 'vbss-translator'

import { useClient } from '@/hooks/use-client'
import { requestWhatsAppVerification } from '@/services/whatsapp-verification/request-verification'
import { resentWhatsAppVerification } from '@/services/whatsapp-verification/resent-verification'
import { validateWhatsAppVerification } from '@/services/whatsapp-verification/validate-verification'

import * as S from './styles'

interface VerificationStepProps {
  onVerificationComplete: (token: string) => void
  onVerificationError: () => void
}

export const VerificationStep = ({ onVerificationComplete, onVerificationError }: VerificationStepProps) => {
  const { t } = useTranslator()
  const { client } = useClient()

  const [code, setCode] = useState('')
  const [isValidating, setIsValidating] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(600)
  const [resendCooldown, setResendCooldown] = useState(0)
  const [verificationId, setVerificationId] = useState<string | null>(null)
  const [expiresAt, setExpiresAt] = useState<number | null>(null)
  const verificationIdRef = useRef<string | null>(null)
  const autoValidatedCodeRef = useRef<string | null>(null)
  const initialRequestTriggeredRef = useRef(false)
  const onVerificationErrorRef = useRef(onVerificationError)
  const requestInFlightRef = useRef(false)
  const storageKey = useMemo(() => (client?.id ? `whatsapp-verification-token-${client.id}` : null), [client?.id])
  const verifiedTokenRef = useRef<string | null>(null)
  const emittedTokenRef = useRef<string | null>(null)
  const hasRestoredTokenRef = useRef(false)

  useEffect(() => {
    verificationIdRef.current = verificationId
  }, [verificationId])

  useEffect(() => {
    onVerificationErrorRef.current = onVerificationError
  }, [onVerificationError])

  const normalizeExpiresAt = useCallback((value: number | string | null | undefined) => {
    if (value === null || value === undefined) {
      return null
    }
    const numericValue = Number(value)
    if (!Number.isFinite(numericValue) || numericValue <= 0) {
      return null
    }
    if (numericValue > 1e12) {
      return numericValue
    }
    if (numericValue > 1e9) {
      return numericValue * 1000
    }
    return Date.now() + numericValue * 1000
  }, [])

  const clearStoredToken = useCallback(() => {
    if (!storageKey || typeof window === 'undefined') return
    try {
      sessionStorage.removeItem(storageKey)
    } catch (err) {
      console.error('Error clearing verification token:', err)
    }
  }, [storageKey])

  const invalidateVerifiedState = useCallback(() => {
    clearStoredToken()
    verifiedTokenRef.current = null
    emittedTokenRef.current = null
    autoValidatedCodeRef.current = null
    initialRequestTriggeredRef.current = false
    hasRestoredTokenRef.current = false
    setSuccess(false)
    setError('')
    setCode('')
    setResendCooldown(0)
    setIsValidating(false)
    setTimeRemaining(600)
    setExpiresAt(null)
  }, [clearStoredToken])

  const persistVerificationToken = useCallback(
    (token: string) => {
      if (!storageKey || typeof window === 'undefined') return
      try {
        const payload = JSON.stringify({ token, storedAt: Date.now() })
        sessionStorage.setItem(storageKey, payload)
      } catch (err) {
        console.error('Error storing verification token:', err)
      }
    },
    [storageKey]
  )

  const restoreVerificationToken = useCallback(() => {
    if (!storageKey || typeof window === 'undefined') return null
    try {
      const raw = sessionStorage.getItem(storageKey)
      if (!raw) return null
      const parsed = JSON.parse(raw)
      if (parsed && typeof parsed.token === 'string' && parsed.token) {
        return parsed.token as string
      }
    } catch (err) {
      console.error('Error reading verification token:', err)
    }
    return null
  }, [storageKey])

  const applyVerifiedState = useCallback(
    (token: string, options: { persist?: boolean } = {}) => {
      if (!token) return
      verifiedTokenRef.current = token
      initialRequestTriggeredRef.current = true
      autoValidatedCodeRef.current = token
      setSuccess(true)
      setError('')
      setIsValidating(false)
      setCode('')
      setResendCooldown(0)
      setTimeRemaining(0)
      setExpiresAt(null)
      if (options.persist) {
        persistVerificationToken(token)
      }
      if (emittedTokenRef.current !== token) {
        emittedTokenRef.current = token
        onVerificationComplete(token)
      }
    },
    [onVerificationComplete, persistVerificationToken]
  )

  useEffect(() => {
    hasRestoredTokenRef.current = false
  }, [storageKey])

  useEffect(() => {
    if (!storageKey) {
      verifiedTokenRef.current = null
      emittedTokenRef.current = null
      hasRestoredTokenRef.current = false
      setSuccess(false)
      setError('')
      setCode('')
      setResendCooldown(0)
      setIsValidating(false)
      setTimeRemaining(600)
      setExpiresAt(null)
      autoValidatedCodeRef.current = null
      initialRequestTriggeredRef.current = false
      return
    }
    if (hasRestoredTokenRef.current) return
    const token = restoreVerificationToken()
    hasRestoredTokenRef.current = true
    if (token) {
      applyVerifiedState(token)
    } else {
      verifiedTokenRef.current = null
      emittedTokenRef.current = null
      setSuccess(false)
      setError('')
      setCode('')
      setResendCooldown(0)
      setIsValidating(false)
      setTimeRemaining(600)
      setExpiresAt(null)
      autoValidatedCodeRef.current = null
      initialRequestTriggeredRef.current = false
    }
  }, [applyVerifiedState, restoreVerificationToken, storageKey])

  const requestCode = useCallback(
    async (resend: boolean = false) => {
      if (verifiedTokenRef.current) {
        return
      }
      if (!client?.id) {
        toast.error(t('Cliente não encontrado'))
        invalidateVerifiedState()
        onVerificationErrorRef.current()
        return
      }
      setError('')
      const canResend = resend && !!verificationIdRef.current
      if (requestInFlightRef.current) return
      requestInFlightRef.current = true
      if (canResend) {
        setIsResending(true)
      }
      try {
        const usecase = canResend ? resentWhatsAppVerification : requestWhatsAppVerification
        const payload = canResend
          ? {
              clientId: client.id,
              verificationId: verificationIdRef.current!
            }
          : {
              clientId: client.id,
              preferredLanguage: client.preferredLanguage
            }
        const response = await usecase(payload)
        if (response.verificationId) {
          setVerificationId(response.verificationId)
        } else if (!verificationIdRef.current) {
          throw new Error('Missing verificationId')
        }
        const nextExpiresAt = normalizeExpiresAt(response.expiresInSeconds)
        if (nextExpiresAt) {
          setExpiresAt(nextExpiresAt)
          setTimeRemaining(Math.max(0, Math.floor((nextExpiresAt - Date.now()) / 1000)))
        } else {
          setExpiresAt(null)
          setTimeRemaining(0)
        }
        setResendCooldown(60)
        toast.success(t(canResend ? 'Código reenviado com sucesso!' : 'Código enviado com sucesso!'))
      } catch (err) {
        console.error('Error requesting verification:', err)
        setError(t('Erro ao enviar código. Tente novamente.'))
        toast.error(t('Erro ao enviar código. Tente novamente.'))
      } finally {
        requestInFlightRef.current = false
        if (canResend) {
          setIsResending(false)
        }
      }
    },
    [client?.id, client?.preferredLanguage, invalidateVerifiedState, normalizeExpiresAt, t]
  )

  useEffect(() => {
    if (!client?.id) return
    if (verifiedTokenRef.current) return
    if (initialRequestTriggeredRef.current) return
    initialRequestTriggeredRef.current = true
    requestCode()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client?.id])

  useEffect(() => {
    if (!expiresAt) return
    const updateRemaining = () => {
      const remaining = Math.max(0, Math.floor((expiresAt - Date.now()) / 1000))
      setTimeRemaining(remaining)
      if (remaining === 0) {
        setError(t('Código expirado. Solicite um novo código.'))
      }
    }
    updateRemaining()
    const interval = setInterval(updateRemaining, 1000)
    return () => clearInterval(interval)
  }, [expiresAt, t])

  useEffect(() => {
    if (resendCooldown === 0) return
    const interval = setInterval(() => {
      setResendCooldown((prev) => Math.max(0, prev - 1))
    }, 1000)
    return () => clearInterval(interval)
  }, [resendCooldown])

  const handleCodeChange = (value: string) => {
    const cleanValue = value.replace(/\D/g, '').slice(0, 6)
    if (cleanValue.length < 6) {
      autoValidatedCodeRef.current = null
    }
    setCode(cleanValue)
    setError('')
  }

  const handleValidateCode = useCallback(async () => {
    if (success || verifiedTokenRef.current) return
    autoValidatedCodeRef.current = code
    if (code.length !== 6) {
      setError(t('Por favor, digite o código de 6 dígitos'))
      return
    }
    if (!client?.id) {
      toast.error(t('Cliente não encontrado'))
      invalidateVerifiedState()
      onVerificationError()
      return
    }
    const currentVerificationId = verificationIdRef.current
    if (!currentVerificationId) {
      setError(t('Código expirado. Solicite um novo código.'))
      toast.error(t('Código expirado. Solicite um novo código.'))
      return
    }
    setIsValidating(true)
    setError('')
    try {
      const response = await validateWhatsAppVerification({
        verificationId: currentVerificationId,
        customerId: client.id,
        code
      })
      if (response.verificationToken) {
        toast.success(t('Código verificado com sucesso!'))
        applyVerifiedState(response.verificationToken, { persist: true })
      } else {
        setError(t('Código inválido. Tente novamente.'))
      }
    } catch (err) {
      console.error('Error validating code:', err)
      setError(t('Erro ao validar código. Tente novamente.'))
      toast.error(t('Erro ao validar código. Tente novamente.'))
    } finally {
      setIsValidating(false)
    }
  }, [applyVerifiedState, client?.id, code, invalidateVerifiedState, onVerificationError, success, t])

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && code.length === 6 && !isValidating) {
      autoValidatedCodeRef.current = null
      handleValidateCode()
    }
  }

  useEffect(() => {
    if (code.length === 6 && !isValidating && !success) {
      if (autoValidatedCodeRef.current === code) {
        return
      }
      autoValidatedCodeRef.current = code
      handleValidateCode()
    }
  }, [code, handleValidateCode, isValidating, success])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <S.Container className="verification-step">
      <S.Title className="verification-title">{t('Verificação WhatsApp')}</S.Title>
      <S.Description className="verification-description">
        {t('Para sua segurança, enviamos um código de verificação para o WhatsApp cadastrado.')}
      </S.Description>
      <S.CodeInputContainer className="code-input-container">
        <S.CodeInputLabel className="code-input-label" htmlFor="verification-code">
          {t('Digite o código de 6 dígitos')}
        </S.CodeInputLabel>
        <S.CodeInput
          id="verification-code"
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={code}
          onChange={(e) => handleCodeChange(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isValidating || success}
          placeholder="000000"
          className={`code-input ${error ? 'error' : ''} ${success ? 'success' : ''}`}
          aria-label={t('Digite o código de 6 dígitos')}
          aria-invalid={!!error}
          aria-describedby={error ? 'code-error' : undefined}
          autoComplete="one-time-code"
        />
      </S.CodeInputContainer>
      {timeRemaining > 0 && (
        <S.TimerContainer className="timer-container">
          <ClockIcon size={20} color="var(--restaurant-primary-color)" />
          <S.TimerText className="timer-text">
            {t('O código expira em')}: <S.TimerValue className="timer-value">{formatTime(timeRemaining)}</S.TimerValue>
          </S.TimerText>
        </S.TimerContainer>
      )}
      {error && (
        <S.ErrorMessage id="code-error" className="error-message" role="alert">
          {error}
        </S.ErrorMessage>
      )}
      {success && (
        <S.SuccessMessage className="success-message" role="status">
          {t('Código verificado com sucesso!')}
        </S.SuccessMessage>
      )}
      <S.ResendContainer className="resend-container">
        <S.ResendText className="resend-text">{t('Não recebeu o código?')}</S.ResendText>
        <S.ResendButton
          onClick={() => requestCode(true)}
          disabled={success || resendCooldown > 0 || isResending}
          className="resend-button"
          type="button"
          aria-label={t('Reenviar código')}
        >
          {resendCooldown > 0 && `${t('Aguarde')} ${resendCooldown}s`}
          {resendCooldown === 0 && isResending && `${t('Enviando')}...`}
          {resendCooldown === 0 && !isResending && t('Reenviar código')}
        </S.ResendButton>
      </S.ResendContainer>
    </S.Container>
  )
}
