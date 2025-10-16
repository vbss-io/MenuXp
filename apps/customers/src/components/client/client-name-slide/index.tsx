import { ArrowRightIcon, UserIcon } from '@phosphor-icons/react'
import { useState } from 'react'

import { useClient } from '@/hooks/use-client'
import { useRestaurant } from '@/hooks/use-restaurant'
import { Button, FormInput, Slider } from '@menuxp/ui'

import * as S from './styles'

interface ClientNameSlideProps {
  isOpen: boolean
  onClose: () => void
}

export const ClientNameSlide = ({ isOpen, onClose }: ClientNameSlideProps) => {
  const { client, updateClientData, updateClientMutation } = useClient()
  const { primaryColor } = useRestaurant()

  const [name, setName] = useState(client?.name ?? '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (client?.id) {
      const success = await updateClientData(client.id, {
        id: client.id,
        name: name.trim() ?? undefined,
        phone: client.phone
      })
      if (success) onClose()
    }
  }

  return (
    <Slider
      isOpen={isOpen}
      onClose={onClose}
      title="Nome"
      icon={<UserIcon size={24} style={{ color: primaryColor }} />}
    >
      <S.Form onSubmit={handleSubmit}>
        <FormInput
          id="name"
          label="Nome completo"
          type="text"
          placeholder="Digite seu nome completo"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="primary"
          disabled={updateClientMutation.isPending}
          rightIcon={<ArrowRightIcon size={20} />}
        >
          {updateClientMutation.isPending ? 'Salvando...' : 'Salvar nome'}
        </Button>
      </S.Form>
    </Slider>
  )
}
