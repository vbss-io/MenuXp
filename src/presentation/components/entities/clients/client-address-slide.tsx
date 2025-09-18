import { useState } from 'react'
import styled from 'styled-components'
import { XIcon, MapPin, ArrowRight } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useClient } from '@/presentation/hooks/use-client'
import { useRestaurant } from '@/presentation/hooks/use-restaurant'

const SlideOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
`

const SlideContainer = styled(motion.div)`
  background: white;
  width: 100%;
  max-width: 400px;
  height: 100vh;
  overflow-y: auto;
  position: relative;
`

const SlideHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.mx.gray[200]};
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
`

const HeaderTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: background-color 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.mx.gray[100]};
  }
`

const SlideContent = styled.div`
  padding: 1.5rem;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
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

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
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

interface ClientAddressSlideProps {
  isOpen: boolean
  onClose: () => void
}

export const ClientAddressSlide = ({ isOpen, onClose }: ClientAddressSlideProps) => {
  const { client, updateClientData, isLoading } = useClient()
  const { restaurant } = useRestaurant()

  const [formData, setFormData] = useState({
    street: client?.address?.street || '',
    number: client?.address?.number || '',
    complement: client?.address?.complement || '',
    neighborhood: client?.address?.neighborhood || '',
    city: client?.address?.city || '',
    state: client?.address?.state || '',
    zipCode: client?.address?.zipCode || ''
  })

  const primaryColor = restaurant?.style?.primaryColor || '#3B82F6'

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const address = {
      street: formData.street,
      number: formData.number,
      complement: formData.complement,
      neighborhood: formData.neighborhood,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode
    }

    const success = await updateClientData({ address })
    if (success) {
      onClose()
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
        <SlideOverlay onClick={handleBackdropClick}>
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <SlideContainer>
              <SlideHeader>
                <HeaderTitle>
                  <MapPin size={24} style={{ color: primaryColor }} />
                  Endereço
                </HeaderTitle>
                <CloseButton onClick={onClose}>
                  <XIcon size={24} />
                </CloseButton>
              </SlideHeader>
              <SlideContent>
                <Form onSubmit={handleSubmit}>
                  <InputGroup>
                    <Label>Rua</Label>
                    <Input
                      type="text"
                      placeholder="Digite a rua"
                      value={formData.street}
                      onChange={(e) => handleInputChange('street', e.target.value)}
                      required
                    />
                  </InputGroup>
                  <Row>
                    <InputGroup>
                      <Label>Número</Label>
                      <Input
                        type="text"
                        placeholder="Nº"
                        value={formData.number}
                        onChange={(e) => handleInputChange('number', e.target.value)}
                        required
                      />
                    </InputGroup>
                    <InputGroup>
                      <Label>Complemento</Label>
                      <Input
                        type="text"
                        placeholder="Apto, bloco, etc."
                        value={formData.complement}
                        onChange={(e) => handleInputChange('complement', e.target.value)}
                      />
                    </InputGroup>
                  </Row>
                  <InputGroup>
                    <Label>Bairro</Label>
                    <Input
                      type="text"
                      placeholder="Digite o bairro"
                      value={formData.neighborhood}
                      onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                      required
                    />
                  </InputGroup>
                  <Row>
                    <InputGroup>
                      <Label>Cidade</Label>
                      <Input
                        type="text"
                        placeholder="Digite a cidade"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        required
                      />
                    </InputGroup>
                    <InputGroup>
                      <Label>Estado</Label>
                      <Input
                        type="text"
                        placeholder="UF"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        required
                      />
                    </InputGroup>
                  </Row>
                  <InputGroup>
                    <Label>CEP</Label>
                    <Input
                      type="text"
                      placeholder="00000-000"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      required
                    />
                  </InputGroup>
                  <Button type="submit" disabled={isLoading} primaryColor={primaryColor}>
                    {isLoading ? 'Salvando...' : 'Salvar endereço'}
                    <ArrowRight size={20} />
                  </Button>
                </Form>
              </SlideContent>
            </SlideContainer>
          </motion.div>
        </SlideOverlay>
      )}
    </AnimatePresence>
  )
}
