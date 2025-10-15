import { useState } from 'react'

import { ClientLoginForm } from '@/components/client/client-form/client-login-form'
import { ClientRegisterForm } from '@/components/client/client-form/client-register-form'

interface ClientFormProps {
  initialMode?: 'login' | 'register'
  onSuccess?: () => void
}

export const ClientForm = ({ initialMode = 'login', onSuccess }: ClientFormProps) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode)

  const handleModeChange = (newMode: 'login' | 'register') => {
    setMode(newMode)
  }

  return (
    <>
      {mode === 'login' ? (
        <ClientLoginForm mode={mode} onModeChange={handleModeChange} onSuccess={onSuccess} />
      ) : (
        <ClientRegisterForm mode={mode} onModeChange={handleModeChange} onSuccess={onSuccess} />
      )}
    </>
  )
}
