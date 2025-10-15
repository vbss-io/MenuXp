import { ArrowRightIcon, MapPinIcon, XIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

import { ClientAddressForm } from '@/components/client/client-address-form'
import { useClient } from '@/hooks/use-client'
import { useRestaurant } from '@/hooks/use-restaurant'
import type { Address } from '@/types/address'

import * as S from './styles'

interface ClientAddressSlideProps {
  isOpen: boolean
  onClose: () => void
}

export const ClientAddressSlide = ({ isOpen, onClose }: ClientAddressSlideProps) => {
  const { client, updateClientData, updateClientMutation } = useClient()
  const { restaurant } = useRestaurant()

  const [formData, setFormData] = useState<Address>({
    street: client?.address?.street ?? '',
    number: client?.address?.number ?? '',
    complement: client?.address?.complement ?? '',
    neighborhood: client?.address?.neighborhood ?? '',
    city: client?.address?.city ?? '',
    state: client?.address?.state ?? '',
    zipCode: client?.address?.zipCode ?? ''
  })

  const primaryColor = restaurant?.style?.primaryColor ?? '#3B82F6'

  const handleAddressChange = (address: Address) => {
    setFormData(address)
  }

  const handleSubmit = async () => {
    if (client?.id) {
      const success = await updateClientData(client.id, { id: client.id, address: formData, phone: client.phone })
      if (success) {
        onClose()
      }
    }
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <S.SlideOverlay onClick={handleBackdropClick}>
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <S.SlideContainer>
              <S.SlideHeader>
                <S.HeaderTitle>
                  <MapPinIcon size={24} style={{ color: primaryColor }} />
                  Endereço
                </S.HeaderTitle>
                <S.CloseButton onClick={onClose}>
                  <XIcon size={24} />
                </S.CloseButton>
              </S.SlideHeader>
              <S.SlideContent>
                <ClientAddressForm initialData={formData} onChange={handleAddressChange} onSubmit={handleSubmit} />
                <S.Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={updateClientMutation.isPending}
                  primaryColor={primaryColor}
                  style={{ marginTop: '1rem' }}
                >
                  {updateClientMutation.isPending ? 'Salvando...' : 'Salvar endereço'}
                  <ArrowRightIcon size={20} />
                </S.Button>
              </S.SlideContent>
            </S.SlideContainer>
          </motion.div>
        </S.SlideOverlay>
      )}
    </AnimatePresence>
  )
}
