import { Button, FormInput, useLayout } from '@menuxp/ui'
import { ArrowRightIcon } from '@phosphor-icons/react'
import { useState } from 'react'
import { useTranslator } from 'vbss-translator'

import { useClient } from '@/hooks/use-client'
import { useRestaurant } from '@/hooks/use-restaurant'

import * as S from './styles'

interface ClientRegisterFormProps {
  onModeChange: (mode: 'login' | 'register') => void
  mode: 'login' | 'register'
  onSuccess?: () => void
}

export const ClientRegisterForm = ({ onModeChange, onSuccess }: ClientRegisterFormProps) => {
  const { t } = useTranslator()
  const { registerClient, registerClientMutation } = useClient()
  const { restaurant } = useRestaurant()
  const { layout } = useLayout()
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!restaurant?.id) return
    const result = await registerClient({
      phone,
      restaurantId: restaurant.id.toString(),
      name: name.trim() ?? undefined
    })
    if (result.success) onSuccess?.()
  }

  return (
    <S.FormContainer className={`client-register-form layout-${layout}`}>
      <S.Title className="form-title">{t('Criar Conta')}</S.Title>
      <S.Form onSubmit={handleSubmit}>
        <FormInput
          id="phone"
          label={t('Telefone')}
          type="tel"
          placeholder={t('Digite seu telefone')}
          value={phone}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
          required
        />
        <FormInput
          id="name"
          label={t('Nome (opcional)')}
          type="text"
          placeholder={t('Seu nome (opcional)')}
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        />
        <Button
          type="submit"
          variant="primary"
          disabled={registerClientMutation.isPending || !phone.trim()}
          rightIcon={<ArrowRightIcon size={20} />}
        >
          {registerClientMutation.isPending ? t('Criando conta...') : t('Criar conta')}
        </Button>
      </S.Form>
      <S.SwitchModeButton onClick={() => onModeChange('login')} className="switch-mode-button">
        {t('Já tem conta? Faça login')}
      </S.SwitchModeButton>
    </S.FormContainer>
  )
}
