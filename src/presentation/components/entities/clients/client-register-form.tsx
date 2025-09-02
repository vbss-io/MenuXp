import { useState } from 'react'
import styled from 'styled-components'
import { PhoneIcon, UserIcon, ArrowRightIcon } from '@phosphor-icons/react'
import { useClient } from '@/presentation/hooks/use-client'
import { useRestaurant } from '@/presentation/hooks/use-restaurant'

const FormContainer = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.shadows.brutalistCard};
  max-width: 400px;
  width: 100%;
`

const Title = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
  margin-bottom: 1.5rem;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const InputGroup = styled.div`
  position: relative;
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  background: white;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.mx.black};
    box-shadow: ${({ theme }) => theme.shadows.brutalist};
    transform: translate(-2px, -2px);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.muted};
  }
`

const IconWrapper = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.text.muted};
`

const Button = styled.button<{ primaryColor: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background: ${({ primaryColor }) => primaryColor};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${({ theme }) => theme.shadows.brutalist};

  &:hover:not(:disabled) {
    transform: translate(-2px, -2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: ${({ theme }) => theme.shadows.brutalist};
  }
`

const SwitchModeButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  text-decoration: underline;
  cursor: pointer;
  margin-top: 1rem;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`

interface ClientRegisterFormProps {
  onModeChange: (mode: 'login' | 'register') => void
  mode: 'login' | 'register'
  onSuccess?: () => void
}

export const ClientRegisterForm = ({ onModeChange, onSuccess }: ClientRegisterFormProps) => {
  const { registerClient, isLoading } = useClient()
  const { restaurant } = useRestaurant()
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')

  const primaryColor = restaurant?.style?.primaryColor || '#3B82F6'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!restaurant?.id) {
      return
    }

    const result = await registerClient({
      phone,
      restaurantId: restaurant.id,
      name: name.trim() || undefined
    })

    if (result.success) {
      onSuccess?.()
    }
  }

  return (
    <FormContainer>
      <Title>Criar Conta</Title>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <IconWrapper>
            <PhoneIcon size={20} />
          </IconWrapper>
          <Input
            type="tel"
            placeholder="Digite seu telefone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </InputGroup>
        <InputGroup>
          <IconWrapper>
            <UserIcon size={20} />
          </IconWrapper>
          <Input type="text" placeholder="Seu nome (opcional)" value={name} onChange={(e) => setName(e.target.value)} />
        </InputGroup>
        <Button type="submit" disabled={isLoading || !phone.trim()} primaryColor={primaryColor}>
          {isLoading ? 'Criando conta...' : 'Criar conta'}
          <ArrowRightIcon size={20} />
        </Button>
      </Form>
      <SwitchModeButton onClick={() => onModeChange('login')}>Já tem conta? Faça login</SwitchModeButton>
    </FormContainer>
  )
}
