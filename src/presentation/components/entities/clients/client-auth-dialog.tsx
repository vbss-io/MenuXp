import { useState } from 'react'
import styled from 'styled-components'
import { Dialog } from '@/presentation/components/ui/dialog'
import { ClientLoginForm } from './client-login-form'
import { ClientRegisterForm } from './client-register-form'

const DialogContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 320px;
  max-width: 400px;
`

const DialogTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  text-align: center;
`

const DialogDescription = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  text-align: center;
  line-height: 1.5;
`

interface ClientAuthDialogProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export const ClientAuthDialog = ({ isOpen, onClose, onSuccess }: ClientAuthDialogProps) => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')

  const handleModeChange = (mode: 'login' | 'register') => {
    setAuthMode(mode)
  }

  const handleSuccess = () => {
    onSuccess?.()
    onClose()
  }

  const handleClose = () => {
    setAuthMode('login')
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogTitle>{authMode === 'login' ? 'Entrar' : 'Cadastrar'}</DialogTitle>
        <DialogDescription>
          {authMode === 'login'
            ? 'Faça login para adicionar itens ao carrinho'
            : 'Crie sua conta para adicionar itens ao carrinho'}
        </DialogDescription>
        {authMode === 'login' ? (
          <ClientLoginForm onModeChange={handleModeChange} mode={authMode} onSuccess={handleSuccess} />
        ) : (
          <ClientRegisterForm onModeChange={handleModeChange} mode={authMode} onSuccess={handleSuccess} />
        )}
      </DialogContent>
    </Dialog>
  )
}
