import { useState } from 'react'
import styled from 'styled-components'
import { XIcon, User, ArrowRight } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useClientAuth } from '@/presentation/hooks/use-client-auth'
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

interface ClientNameSlideProps {
  isOpen: boolean
  onClose: () => void
}

export const ClientNameSlide = ({ isOpen, onClose }: ClientNameSlideProps) => {
  const { client } = useClient()
  const { updateClientData, isLoading } = useClientAuth()
  const { restaurant } = useRestaurant()

  const [name, setName] = useState(client?.name || '')

  const primaryColor = restaurant?.style?.primaryColor || '#3B82F6'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const success = await updateClientData({ name: name.trim() || undefined })
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
                  <User size={24} style={{ color: primaryColor }} />
                  Nome
                </HeaderTitle>
                <CloseButton onClick={onClose}>
                  <XIcon size={24} />
                </CloseButton>
              </SlideHeader>

              <SlideContent>
                <Form onSubmit={handleSubmit}>
                  <InputGroup>
                    <Label>Nome completo</Label>
                    <Input
                      type="text"
                      placeholder="Digite seu nome completo"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </InputGroup>

                  <Button type="submit" disabled={isLoading} primaryColor={primaryColor}>
                    {isLoading ? 'Salvando...' : 'Salvar nome'}
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
