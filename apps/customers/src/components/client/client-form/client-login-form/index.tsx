import { ArrowRightIcon } from '@phosphor-icons/react'
import { useState } from 'react'

import Button from '@/components/ui/button'
import { FormInput } from '@/components/ui/forms/form-input'
import { useClient } from '@/hooks/use-client'
import { useRestaurant } from '@/hooks/use-restaurant'

import * as S from './styles'

interface ClientLoginFormProps {
  onModeChange: (mode: 'login' | 'register') => void
  mode: 'login' | 'register'
  onSuccess?: () => void
}

export const ClientLoginForm = ({ onModeChange, onSuccess }: ClientLoginFormProps) => {
  const { loginClient, loginClientMutation } = useClient()
  const { restaurant } = useRestaurant()
  const { primaryColor, secondaryColor, layout } = useRestaurant()
  const [phone, setPhone] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!restaurant?.id) return
    const result = await loginClient(phone, restaurant.id.toString())
    if (result.success) {
      onSuccess?.()
    }
  }

  return (
    <S.FormContainer
      $layout={layout}
      $primaryColor={primaryColor}
      $secondaryColor={secondaryColor}
      className="client-login-form"
      style={
        {
          '--primary-color': primaryColor,
          '--secondary-color': secondaryColor
        } as React.CSSProperties
      }
    >
      <S.Title className="form-title">Entrar com Telefone</S.Title>
      <S.Form onSubmit={handleSubmit}>
        <FormInput
          id="phone"
          label="Telefone"
          type="tel"
          placeholder="Digite seu telefone"
          value={phone}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="primary"
          disabled={loginClientMutation.isPending || !phone.trim()}
          rightIcon={<ArrowRightIcon size={20} />}
        >
          {loginClientMutation.isPending ? 'Entrando...' : 'Entrar'}
        </Button>
      </S.Form>
      <S.SwitchModeButton onClick={() => onModeChange('register')} className="switch-mode-button">
        Não tem conta? Faça seu cadastro
      </S.SwitchModeButton>
    </S.FormContainer>
  )
}
