import { motion } from 'framer-motion'
import styled from 'styled-components'

export const EditContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

export const EditHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 2px solid ${({ theme }) => theme.colors.mx.black};
  background: ${({ theme }) => theme.colors.mx.yellow};
`

export const EditTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.typography.fonts.title};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.mx.black};

  svg {
    color: ${({ theme }) => theme.colors.mx.black};
  }
`

export const EditContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

export const Description = styled.p`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.5;
  margin: 0;
`

export const FormFields = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const FormLabel = styled.label`
  font-family: ${({ theme }) => theme.typography.fonts.title};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`

export const SelectionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const InfoBox = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.mx.gray[50]};
  border: 2px solid ${({ theme }) => theme.colors.mx.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  color: ${({ theme }) => theme.colors.text.secondary};

  p {
    margin: 0;
    font-family: ${({ theme }) => theme.typography.fonts.body};
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  }
`

export const CategoriesSelectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.sm};
  max-height: 300px;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 2px solid ${({ theme }) => theme.colors.mx.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  background: ${({ theme }) => theme.colors.mx.white};
`

export const CategoryInfo = styled.div`
  flex: 1;
  min-width: 0;
`

export const CategoryDescription = styled.div`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export const SelectedIndicator = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.xs};
  right: ${({ theme }) => theme.spacing.xs};
  width: 20px;
  height: 20px;
  background: ${({ theme }) => theme.colors.mx.blue};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: ${({ theme }) => theme.colors.mx.white};
  }
`

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
`

export const UploadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  z-index: 10;

  span {
    font-family: ${({ theme }) => theme.typography.fonts.body};
    font-size: ${({ theme }) => theme.typography.fontSizes.md};
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  }
`

export const ValidationErrors = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
`

export const ValidationError = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.mx.red}10;
  border: 2px solid ${({ theme }) => theme.colors.mx.red};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  color: ${({ theme }) => theme.colors.mx.red};

  svg {
    color: ${({ theme }) => theme.colors.mx.red};
    flex-shrink: 0;
  }

  span {
    font-family: ${({ theme }) => theme.typography.fonts.body};
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  }
`

export const ModalFooter = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 2px solid ${({ theme }) => theme.colors.mx.gray[300]};
`

export const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.mx.white};
  border: 2px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.brutalistCard};
`

export const PreviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-bottom: 2px solid ${({ theme }) => theme.colors.mx.black};
  background: ${({ theme }) => theme.colors.mx.yellow};
`

export const PreviewTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.typography.fonts.title};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.mx.black};

  svg {
    color: ${({ theme }) => theme.colors.mx.black};
  }
`

export const ActionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
`

export const PreviewContent = styled.div`
  padding: 0;
`

export const ViewContainer = styled.div`
  &.view-container {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`

export const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`

export const EmptyStateText = styled.h3`
  font-family: ${({ theme }) => theme.typography.fonts.title};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
`

export const EmptyStateDescription = styled.p`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  line-height: 1.5;
`

export const CategoriesGrid = styled.div<{ isDragging?: boolean }>`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  cursor: ${({ isDragging }) => (isDragging ? 'grabbing' : 'grab')};
  user-select: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const CategoryCard = styled.div<{
  selected?: boolean
}>`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.mx.white};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  flex-shrink: 0;
  width: 125px;

  &:hover {
    transform: translateY(-2px);
  }
`

export const CategoryIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  text-align: center;
  color: ${({ theme }) => theme.colors.mx.black};
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.mx.blue};
  }
`

export const CategoryName = styled.div`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
`
