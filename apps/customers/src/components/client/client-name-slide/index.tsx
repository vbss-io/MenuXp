import { useClient } from '@/hooks/use-client'
import { Button, FormInput, Slider, useLayout } from '@menuxp/ui'
import { ArrowRightIcon, UserIcon } from '@phosphor-icons/react'
import { useState } from 'react'
import { useTranslator } from 'vbss-translator'

import * as S from './styles'

interface ClientNameSlideProps {
  isOpen: boolean
  onClose: () => void
}

export const ClientNameSlide = ({ isOpen, onClose }: ClientNameSlideProps) => {
  const { t } = useTranslator()
  const { layout } = useLayout()
  const { client, updateClientData, updateClientMutation } = useClient()

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
    <div className={`client-name-slide layout-${layout}`}>
      <Slider isOpen={isOpen} onClose={onClose} title={t('Nome')} icon={<UserIcon size={24} />}>
        <S.Form className="name-form" onSubmit={handleSubmit}>
          <FormInput
            id="name"
            label={t('Nome completo')}
            type="text"
            placeholder={t('Digite seu nome completo')}
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
            {updateClientMutation.isPending ? t('Salvando...') : t('Salvar nome')}
          </Button>
        </S.Form>
      </Slider>
    </div>
  )
}
