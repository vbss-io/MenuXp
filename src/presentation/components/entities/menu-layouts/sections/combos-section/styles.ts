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
  flex-wrap: wrap;
`

export const MenuItemsSelectionGrid = styled.div`
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

export const MenuItemCard = styled.div<{
  $selected?: boolean
  $layout?: string
  $primaryColor?: string
  $secondaryColor?: string
}>`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.mx.white};
  border: 2px solid ${({ $selected, theme }) => ($selected ? theme.colors.mx.blue : theme.colors.mx.gray[300])};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  flex-shrink: 0;
  min-width: 280px;
  max-width: 320px;

  &:hover {
    border-color: ${({ theme }) => theme.colors.mx.blue};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.brutalistCard};
  }

  ${({ $layout }) =>
    $layout === 'default' &&
    `
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    min-width: 280px;
    max-width: 320px;

    @media (max-width: 768px) {
      min-width: 260px;
      max-width: 280px;
    }
  `}
  ${({ $layout }) =>
    $layout === 'dark' &&
    `
    background: #1A1A1F;
    border: none;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    min-width: 280px;
    max-width: 320px;

    @media (max-width: 768px) {
      min-width: 260px;
      max-width: 280px;
    }
  `}
  ${({ $layout, theme, $primaryColor }) =>
    $layout === 'clean' &&
    `
    background: ${theme.colors.mx.white};
    border: 1px solid ${$primaryColor || theme.colors.mx.gray[200]};
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    min-width: 260px;
    max-width: 300px;

    @media (max-width: 768px) {
      min-width: 240px;
      max-width: 260px;
    }
  `}
  ${({ $layout }) =>
    $layout === 'square' &&
    `
    border-radius: 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    min-width: 280px;
    max-width: 320px;

    @media (max-width: 768px) {
      min-width: 260px;
      max-width: 280px;
    }
  `}
`

export const DiscountChip = styled.div<{
  $layout?: string
  $primaryColor?: string
  $secondaryColor?: string
}>`
  position: absolute;
  top: 8px;
  left: 8px;
  background: ${({ $primaryColor }) => $primaryColor || '#FF6B00'};
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 4px;

  ${({ $layout }) =>
    $layout === 'default' &&
    `
    background: #9933FF;
    border-radius: 12px;
  `}
  ${({ $layout, $primaryColor }) =>
    $layout === 'dark' &&
    `
    background: ${$primaryColor || '#FF6B00'};
    border-radius: 12px;
  `}
  ${({ $layout, $primaryColor }) =>
    $layout === 'clean' &&
    `
    background: ${$primaryColor || '#FF6B00'};
    border-radius: 8px;
  `}
  ${({ $layout, $primaryColor }) =>
    $layout === 'square' &&
    `
    background: ${$primaryColor || '#FF6B00'};
    border-radius: 0;
  `}
`

export const MenuItemImage = styled.div<{ $layout?: string }>`
  width: 100%;
  height: 200px;
  object-fit: cover;
  background: ${({ theme }) => theme.colors.mx.gray[100]};

  ${({ $layout }) =>
    $layout === 'default' &&
    `
    border-radius: 12px 12px 0 0;
  `}
  ${({ $layout }) =>
    $layout === 'dark' &&
    `
    border-radius: 12px 12px 0 0;
  `}
  ${({ $layout }) =>
    $layout === 'clean' &&
    `
    border-radius: 8px 8px 0 0;
  `}
  ${({ $layout }) =>
    $layout === 'square' &&
    `
    border-radius: 0;
  `}
`

export const MenuItemInfo = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  flex: 1;
  display: flex;
  flex-direction: column;
`

export const MenuItemContent = styled.div<{ $layout?: string }>`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};

  ${({ $layout }) =>
    $layout === 'default' &&
    `
    padding: 16px;
  `}
  ${({ $layout }) =>
    $layout === 'dark' &&
    `
    padding: 16px;
    background: #1A1A1F;
  `}
  ${({ $layout }) =>
    $layout === 'clean' &&
    `
    padding: 12px;
  `}
  ${({ $layout }) =>
    $layout === 'square' &&
    `
    padding: 16px;
  `}
`

export const MenuItemName = styled.div<{
  $layout?: string
  $primaryColor?: string
  $secondaryColor?: string
}>`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  word-break: break-word;

  ${({ $layout, $primaryColor }) =>
    $layout === 'default' &&
    `
    color: ${$primaryColor || '#FF8C00'};
    font-size: 18px;
    font-weight: bold;
  `}
  ${({ $layout }) =>
    $layout === 'dark' &&
    `
    color: white;
    font-size: 18px;
    font-weight: bold;
  `}
  ${({ $layout, $primaryColor }) =>
    $layout === 'clean' &&
    `
    color: ${$primaryColor || '#333'};
    font-size: 16px;
    font-weight: 600;
  `}
  ${({ $layout, $primaryColor }) =>
    $layout === 'square' &&
    `
    color: ${$primaryColor || '#333'};
    font-size: 18px;
    font-weight: bold;
  `}
`

export const MenuItemDescription = styled.div<{ $layout?: string }>`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;

  ${({ $layout }) =>
    $layout === 'default' &&
    `
    color: #666;
    font-size: 14px;
  `}
  ${({ $layout }) =>
    $layout === 'dark' &&
    `
    color: #CCC;
    font-size: 14px;
  `}
  ${({ $layout }) =>
    $layout === 'clean' &&
    `
    color: #666;
    font-size: 14px;
  `}
  ${({ $layout }) =>
    $layout === 'square' &&
    `
    color: #666;
    font-size: 14px;
  `}
`

export const MenuItemCategory = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  background: ${({ theme }) => theme.colors.mx.gray[100]};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  width: fit-content;

  svg {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`

export const MenuItemFooter = styled.div<{ $layout?: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const MenuItemPrice = styled.div<{
  $layout?: string
  $primaryColor?: string
  $secondaryColor?: string
}>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;

  ${({ $layout }) =>
    $layout === 'default' &&
    `
    gap: 8px;
  `}
  ${({ $layout }) =>
    $layout === 'dark' &&
    `
    gap: 8px;
  `}
  ${({ $layout }) =>
    $layout === 'clean' &&
    `
    gap: 8px;
  `}
  ${({ $layout }) =>
    $layout === 'square' &&
    `
    gap: 8px;
  `}
`

export const CurrentPrice = styled.span<{
  $layout?: string
  $primaryColor?: string
  $secondaryColor?: string
}>`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 18px;
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ $primaryColor }) => $primaryColor || '#FF8C00'};

  ${({ $layout, $primaryColor }) =>
    $layout === 'default' &&
    `
    color: ${$primaryColor || '#FF8C00'};
    font-size: 20px;
    font-weight: bold;
  `}
  ${({ $layout, $primaryColor }) =>
    $layout === 'dark' &&
    `
    color: ${$primaryColor || '#FF8C00'};
    font-size: 20px;
    font-weight: bold;
  `}
  ${({ $layout, $primaryColor }) =>
    $layout === 'clean' &&
    `
    color: ${$primaryColor || '#FF8C00'};
    font-size: 18px;
    font-weight: 600;
  `}
  ${({ $layout, $primaryColor }) =>
    $layout === 'square' &&
    `
    color: ${$primaryColor || '#FF8C00'};
    font-size: 20px;
    font-weight: bold;
  `}
`

export const DiscountPrice = styled.span<{
  $layout?: string
  $primaryColor?: string
  $secondaryColor?: string
}>`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 18px;
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ $primaryColor }) => $primaryColor || '#FF8C00'};

  ${({ $layout, $primaryColor }) =>
    $layout === 'default' &&
    `
    color: ${$primaryColor || '#FF8C00'};
    font-size: 20px;
    font-weight: bold;
  `}
  ${({ $layout, $primaryColor }) =>
    $layout === 'dark' &&
    `
    color: ${$primaryColor || '#FF8C00'};
    font-size: 20px;
    font-weight: bold;
  `}
  ${({ $layout, $primaryColor }) =>
    $layout === 'clean' &&
    `
    color: ${$primaryColor || '#FF8C00'};
    font-size: 18px;
    font-weight: 600;
  `}
  ${({ $layout, $primaryColor }) =>
    $layout === 'square' &&
    `
    color: ${$primaryColor || '#FF8C00'};
    font-size: 20px;
    font-weight: bold;
  `}
`

export const OriginalPrice = styled.span<{ $layout?: string }>`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: line-through;

  ${({ $layout }) =>
    $layout === 'default' &&
    `
    color: #999;
    font-size: 14px;
  `}
  ${({ $layout }) =>
    $layout === 'dark' &&
    `
    color: #FF0000;
    font-size: 14px;
  `}
  ${({ $layout }) =>
    $layout === 'clean' &&
    `
    color: #999;
    font-size: 14px;
  `}
  ${({ $layout }) =>
    $layout === 'square' &&
    `
    color: #999;
    font-size: 14px;
  `}
`

export const AddToCartButton = styled.button<{
  $layout?: string
  $primaryColor?: string
  $secondaryColor?: string
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 8px;
  background: ${({ $primaryColor }) => $primaryColor || '#FF8C00'};
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background: ${({ $secondaryColor }) => $secondaryColor || '#FF6B00'};
    transform: scale(1.05);
  }

  ${({ $layout, $primaryColor }) =>
    $layout === 'default' &&
    `
    background: ${$primaryColor || '#FF8C00'};
    border-radius: 8px;
  `}
  ${({ $layout, $primaryColor }) =>
    $layout === 'dark' &&
    `
    background: ${$primaryColor || '#FF8C00'};
    border-radius: 8px;
  `}
  ${({ $layout, $primaryColor }) =>
    $layout === 'clean' &&
    `
    background: white;
    border: 1px solid ${$primaryColor || '#FF8C00'};
    color: ${$primaryColor || '#FF8C00'};
    border-radius: 8px;
  `}
  ${({ $layout, $primaryColor }) =>
    $layout === 'square' &&
    `
    background: ${$primaryColor || '#FF8C00'};
    border-radius: 0;
  `}
`

export const CategoryName = styled.div`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  background: ${({ theme }) => theme.colors.mx.gray[100]};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  width: fit-content;
`

export const SelectedIndicator = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  right: ${({ theme }) => theme.spacing.sm};
  width: 24px;
  height: 24px;
  background: ${({ theme }) => theme.colors.mx.blue};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadows.brutalistCard};

  svg {
    color: ${({ theme }) => theme.colors.mx.white};
  }
`

export const SelectedMenuItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
`

export const SelectedMenuItemItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.mx.gray[50]};
  border: 2px solid ${({ theme }) => theme.colors.mx.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};

  ${MenuItemName} {
    flex: 1;
    font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  }

  ${MenuItemPrice} {
    font-size: ${({ theme }) => theme.typography.fontSizes.xs};
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
  background: ${({ theme }) => theme.colors.mx.white};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

export const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: ${({ theme }) => theme.typography.fonts.title};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  svg {
    color: ${({ theme }) => theme.colors.mx.blue};
  }
`

export const MenuItemsGrid = styled.div<{ $layout?: string; isDragging?: boolean }>`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  padding: ${({ theme }) => theme.spacing.sm} 0;
  scrollbar-width: none;
  cursor: ${({ isDragging }) => (isDragging ? 'grabbing' : 'grab')};
  user-select: none;
  gap: ${({ theme }) => theme.spacing.md};

  &::-webkit-scrollbar {
    display: none;
  }

  ${({ $layout }) => {
    switch ($layout) {
      case 'default':
        return `
          gap: 16px;
          @media (max-width: 768px) {
            gap: 12px;
          }
        `
      case 'dark':
        return `
          gap: 16px;
          @media (max-width: 768px) {
            gap: 12px;
          }
        `
      case 'clean':
        return `
          gap: 20px;
          @media (max-width: 768px) {
            gap: 16px;
          }
        `
      case 'square':
        return `
          gap: 16px;
          @media (max-width: 768px) {
            gap: 12px;
          }
        `
      default:
        return `
          gap: 16px;
          @media (max-width: 768px) {
            gap: 12px;
          }
        `
    }
  }}
`

export const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`

export const EmptyStateDescription = styled.p`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  line-height: 1.5;
`

export const SlideOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
  align-items: stretch;
`

export const SlideContainer = styled.div`
  width: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`

export const SlideHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
  background: white;
  position: sticky;
  top: 0;
  z-index: 10;

  div {
    display: flex;
    align-items: center;
    gap: 12px;
    font-family: ${({ theme }) => theme.typography.fonts.title};
    font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
    font-size: 20px;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s ease;
  color: ${({ theme }) => theme.colors.text.secondary};

  &:hover {
    background: ${({ theme }) => theme.colors.mx.gray[100]};
  }
`

export const SlideContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`

export const SlideGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
`

export const MenuItemsPreviewList = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  overflow-x: auto;
  padding: ${({ theme }) => theme.spacing.sm} 0;
`

export const MenuItemPreviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  min-width: 80px;
  flex-shrink: 0;
`

export const MenuItemPreviewImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.mx.gray[100]};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[200]};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  div {
    font-family: ${({ theme }) => theme.typography.fonts.body};
    font-size: ${({ theme }) => theme.typography.fontSizes.xs};
    color: ${({ theme }) => theme.colors.text.secondary};
    text-align: center;
    padding: ${({ theme }) => theme.spacing.xs};
  }
`

export const MenuItemPreviewName = styled.div`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const MoreItemsIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ theme }) => theme.colors.mx.gray[200]};
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[300]};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.secondary};
`

export const ConfigurationPreview = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.mx.gray[50]};
  border: 2px solid ${({ theme }) => theme.colors.mx.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
`

export const ConfigurationItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const ConfigurationLabel = styled.span`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
`

export const ConfigurationValue = styled.span`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`
