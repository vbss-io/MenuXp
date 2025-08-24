import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

export const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.mx.white};
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
`

export const PreviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.mx.gray[300]};
  background: ${({ theme }) => theme.colors.mx.gray[100]};
`

export const PreviewTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`

export const ViewContainer = styled.div`
  background: ${({ theme }) => theme.colors.mx.white};
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

export const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`

export const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.mx.white};
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`

export const EditHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.mx.gray[300]};
`

export const EditTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text.primary};

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`

export const EditContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

export const FormFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

export const CategoriesSelectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.sm};
  max-height: 300px;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.mx.white};
`

export const ConfigSection = styled.div`
  background: ${({ theme }) => theme.colors.mx.gray[50]};
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[200]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
`

export const ConfigTitle = styled.h4`
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`

export const ConfigOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

export const ConfigOption = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid ${({ active, theme }) => (active ? theme.colors.primary : theme.colors.mx.gray[300])};
  background: ${({ active, theme }) => (active ? theme.colors.primary : theme.colors.mx.white)};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ active, theme }) => (active ? theme.colors.primary : `${theme.colors.primary}05`)};
  }

  span {
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    color: ${({ active, theme }) => (active ? theme.colors.mx.white : theme.colors.text.primary)};
  }

  svg {
    color: ${({ active, theme }) => (active ? theme.colors.mx.white : theme.colors.primary)};
  }
`

export const SelectionSection = styled.div`
  background: ${({ theme }) => theme.colors.mx.white};
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
`

export const SelectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  gap: ${({ theme }) => theme.spacing.sm};

  h4 {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`

export const SelectedCategoriesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-top: ${({ theme }) => theme.spacing.md};
`

export const SelectedCategoryItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.mx.gray[50]};
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[200]};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};

  span:first-child {
    font-size: ${({ theme }) => theme.typography.fontSizes.md};
  }

  span:nth-child(2) {
    flex: 1;
    font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  }
`

export const CategoriesGrid = styled.div<{ layout?: string; isDragging?: boolean }>`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  padding: ${({ theme }) => theme.spacing.sm} 0;
  scrollbar-width: none; /* Remove scrollbar */
  cursor: ${({ isDragging }) => (isDragging ? 'grabbing' : 'grab')};
  user-select: none;

  /* Remove scrollbar para webkit browsers */
  &::-webkit-scrollbar {
    display: none;
  }

  ${({ layout }) => {
    switch (layout) {
      case 'default':
        return `
          flex-wrap: nowrap;
          gap: 0px;
          padding: 15px 0;
        `
      case 'dark':
        return `
          flex-wrap: nowrap;
          gap: 8px;
          padding: 12px 0;
        `
      case 'clean':
        return `
          flex-wrap: nowrap;
          gap: 6px;
          padding: 8px 0;
        `
      case 'square':
        return `
          flex-wrap: nowrap;
          gap: 8px;
          padding: 12px 0;
        `
      default:
        return `
          flex-wrap: nowrap;
          gap: 12px;
          padding: 16px 0;
        `
    }
  }}
`

export const CategoryCard = styled.div<{ selected?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.mx.white};
  border: 2px solid ${({ selected, theme }) => (selected ? theme.colors.primary : theme.colors.mx.gray[300])};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`

// Layout 1: Círculos com ícones e texto abaixo (default)
export const CategoryCardDefault = styled.div<{ selected?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  min-width: 80px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`

export const CircleIcon = styled.div<{ selected?: boolean; primaryColor?: string }>`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.mx.white};
  border: 1px solid #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px ${({ primaryColor }) => primaryColor || '#FF6B35'}40;

  svg {
    width: 28px;
    height: 28px;
    color: #000000;
    transition: color 0.2s ease;
  }

  &:hover {
    border-color: ${({ primaryColor }) => primaryColor || '#FF6B35'};
    transform: scale(1.1);

    svg {
      color: ${({ primaryColor }) => primaryColor || '#FF6B35'};
    }
  }
`

export const CircleLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
  line-height: 1.2;
`

// Layout 2: Cards escuros com ícones/labels laranja (dark)
export const CategoryCardDarkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`

export const CategoryCardDark = styled.div<{ selected?: boolean; primaryColor?: string; secondaryColor?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: ${({ primaryColor }) => `${primaryColor || '#FF6B35'}20`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid ${({ primaryColor }) => primaryColor || '#FF6B35'};

  &:hover {
    background: ${({ secondaryColor }) => `${secondaryColor || '#FF8C00'}20`};
    border-color: ${({ secondaryColor }) => secondaryColor || '#FF8C00'};
  }
`

export const DarkIcon = styled.div<{ primaryColor?: string; secondaryColor?: string }>`
  color: ${({ primaryColor }) => primaryColor || '#FF6B35'};
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;

  svg {
    width: 32px;
    height: 32px;
  }

  ${({ secondaryColor }) => `
    &:hover {
      color: ${secondaryColor || '#FF8C00'};
    }
  `}
`

export const DarkLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.mx.white};
  text-align: center;
  line-height: 1.2;
  margin-top: ${({ theme }) => theme.spacing.xs};
`

// Layout 3: Cards com borda laranja e fundo branco (clean)
export const CategoryCardClean = styled.div<{ selected?: boolean; primaryColor?: string; secondaryColor?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  min-width: 100px;
  min-height: 80px;
  background: ${({ theme }) => theme.colors.mx.white};
  border: 2px solid ${({ primaryColor }) => primaryColor || '#FF8C00'};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ secondaryColor }) => secondaryColor || '#FF8C00'};
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(255, 140, 0, 0.2);

    ${({ secondaryColor }) => `
      ${OrangeIcon} {
        color: ${secondaryColor || '#ff8c00'};
      }
      ${OrangeLabel} {
        color: ${secondaryColor || '#ff8c00'};
      }
    `}
  }
`

export const OrangeIcon = styled.div<{ primaryColor?: string; secondaryColor?: string }>`
  color: ${({ primaryColor }) => primaryColor || '#ff8c00'};
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
`

export const OrangeLabel = styled.span<{ primaryColor?: string; secondaryColor?: string }>`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ primaryColor }) => primaryColor || '#ff8c00'};
  text-align: center;
  line-height: 1.2;
  transition: color 0.2s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  width: 100%;
  min-width: 0;
`

// Layout 4: Cards quadrados com borda preta e ícones primários
export const CategoryCardSquareWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`

export const CategoryCardSquare = styled.div<{ selected?: boolean; primaryColor?: string; secondaryColor?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: ${({ theme }) => theme.colors.mx.white};
  border: 2px solid #000000;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    ${({ secondaryColor }) => `
      ${SquareIcon} {
        color: ${secondaryColor || '#FF8C00'};
      }
    `}
  }
`

export const SquareIcon = styled.div<{ primaryColor?: string; secondaryColor?: string }>`
  color: ${({ primaryColor }) => primaryColor || '#ff8c00'};
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
`

export const SquareLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
  line-height: 1.2;
  margin-top: ${({ theme }) => theme.spacing.xs};
`

export const CategoryIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  text-align: center;
`

export const CategoryInfo = styled.div`
  flex: 1;
  min-width: 0;
`

export const CategoryName = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  word-break: break-word;
`

export const CategoryDescription = styled.div`
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
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: white;
  }
`

export const ShowMoreButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.mx.white};
  border: 2px dashed ${({ theme }) => theme.colors.mx.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }

  svg {
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: scale(1.1);
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

export const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid ${({ theme }) => theme.colors.mx.gray[400]};
  border-top: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`

export const ValidationErrors = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

export const ValidationError = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.mx.error}10;
  border: 1px solid ${({ theme }) => theme.colors.mx.error}30;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  color: ${({ theme }) => theme.colors.mx.error};

  svg {
    color: ${({ theme }) => theme.colors.mx.error};
    flex-shrink: 0;
  }
`

export const FallbackContainer = styled.div`
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background: ${({ theme }) => theme.colors.mx.white};
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[300]};
  min-height: 200px;
`

export const FallbackContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  height: 100%;
  min-height: 200px;
  color: ${({ theme }) => theme.colors.mx.gray[500]};

  span {
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
    text-align: center;
  }
`

export const UploadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  z-index: 10;
  border-radius: ${({ theme }) => theme.borderRadius.md};

  span {
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`
