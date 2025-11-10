import { ClientAddressForm } from '@/components/client/client-address-form'
import { useClient } from '@/hooks/use-client'
import type { Address } from '@/types/address'
import { Button, Slider } from '@menuxp/ui'
import { ArrowRightIcon, MapPinIcon } from '@phosphor-icons/react'
import { useCallback, useMemo, useState } from 'react'
import { useTranslator } from 'vbss-translator'

interface ClientAddressSlideProps {
  isOpen: boolean
  onClose: () => void
}

export const ClientAddressSlide = ({ isOpen, onClose }: ClientAddressSlideProps) => {
  const { t } = useTranslator()
  const { client, updateClientData, updateClientMutation } = useClient()

  const initialAddress = useMemo(
    () => ({
      street: client?.address?.street ?? '',
      number: client?.address?.number ?? '',
      complement: client?.address?.complement ?? '',
      neighborhood: client?.address?.neighborhood ?? '',
      city: client?.address?.city ?? '',
      state: client?.address?.state ?? '',
      zipCode: client?.address?.zipCode ?? ''
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [client?.id]
  )

  const [formData, setFormData] = useState<Address>(initialAddress)

  const handleAddressChange = useCallback((address: Address) => {
    setFormData(address)
  }, [])

  const handleSubmit = async () => {
    if (client?.id) {
      const success = await updateClientData(client.id, { id: client.id, address: formData, phone: client.phone })
      if (success) {
        onClose()
      }
    }
  }

  return (
    <Slider
      isOpen={isOpen}
      onClose={onClose}
      title={t('Endereço')}
      icon={<MapPinIcon size={24} style={{ color: 'var(--restaurant-primary-color)' }} />}
    >
      <ClientAddressForm initialData={initialAddress} onChange={handleAddressChange} onSubmit={handleSubmit} />
      <Button
        className="submit-button"
        type="button"
        onClick={handleSubmit}
        disabled={updateClientMutation.isPending}
        style={{ marginTop: '1rem' }}
        rightIcon={<ArrowRightIcon size={20} />}
      >
        {updateClientMutation.isPending ? t('Salvando...') : t('Salvar endereço')}
      </Button>
    </Slider>
  )
}
