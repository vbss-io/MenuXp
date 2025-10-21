import { ArrowRightIcon } from '@phosphor-icons/react'
import { useState } from 'react'

import { useClient } from '@/hooks/use-client'
import { useRestaurant } from '@/hooks/use-restaurant'
import { Button, FormInput } from '@menuxp/ui'

import * as S from './styles'

interface ClientRegisterFormProps {
  onModeChange: (mode: 'login' | 'register') => void
  mode: 'login' | 'register'
  onSuccess?: () => void
}

export const ClientRegisterForm = ({ onModeChange, onSuccess }: ClientRegisterFormProps) => {
  const { registerClient, registerClientMutation } = useClient()
  const { restaurant } = useRestaurant()
  const { primaryColor, secondaryColor, layout } = useRestaurant()
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
    <S.FormContainer
      $layout={layout}
      $primaryColor={primaryColor}
      $secondaryColor={secondaryColor}
      className="client-register-form"
      style={
        {
          '--primary': primaryColor,
          '--secondary': secondaryColor
        } as React.CSSProperties
      }
    >
      <S.Title className="form-title">Criar Conta</S.Title>
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
        <FormInput
          id="name"
          label="Nome (opcional)"
          type="text"
          placeholder="Seu nome (opcional)"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        />
        <Button
          type="submit"
          variant="primary"
          disabled={registerClientMutation.isPending || !phone.trim()}
          rightIcon={<ArrowRightIcon size={20} />}
        >
          {registerClientMutation.isPending ? 'Criando conta...' : 'Criar conta'}
        </Button>
      </S.Form>
      <S.SwitchModeButton onClick={() => onModeChange('login')} className="switch-mode-button">
        Já tem conta? Faça login
      </S.SwitchModeButton>
    </S.FormContainer>
  )
}
