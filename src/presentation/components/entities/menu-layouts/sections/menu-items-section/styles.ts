import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

export const EditContainer = styled.div`
  background: ${({ theme }) => theme.colors.secondary};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 16px;
`

export const EditHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`

export const EditTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primary};

  svg {
    color: ${({ theme }) => theme.colors};
  }
`

export const EditContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const ConfigSection = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  padding: 16px;
`

export const ConfigTitle = styled.h4`
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`

export const ConfigOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const ConfigOption = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid ${({ active, theme }) => (active ? theme.colors.primary : theme.colors.mx.gray[300])};
  background: ${({ active, theme }) => (active ? theme.colors.primary : theme.colors.mx.white)};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primary};
  }

  span {
    font-size: 14px;
    color: ${({ active, theme }) => (active ? theme.colors.mx.white : theme.colors.text.primary)};
  }

  svg {
    color: ${({ active, theme }) => (active ? theme.colors.mx.white : theme.colors.primary)};
  }
`

export const SelectionSection = styled.div`
  background: ${({ theme }) => theme.colors.mx.white};
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[300]};
  border-radius: 8px;
  padding: 16px;
`

export const SelectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;

  h4 {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
  }
`

export const SelectionActions = styled.div`
  display: flex;
  gap: 8px;
`

export const PreviewSection = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  padding: 16px;
`

export const PreviewHeader = styled.div`
  margin-bottom: 16px;

  h4 {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
  }
`

export const MenuItemsGrid = styled.div<{ isDragging?: boolean }>`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  padding: ${({ theme }) => theme.spacing.sm} 0;
  scrollbar-width: none; /* Remove scrollbar */
  cursor: ${({ isDragging }) => (isDragging ? 'grabbing' : 'grab')};
  user-select: none;
  gap: 16px;

  /* Remove scrollbar para webkit browsers */
  &::-webkit-scrollbar {
    display: none;
  }
`

export const MenuItemCard = styled.div<{ selected?: boolean }>`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.mx.white};
  border: 2px solid ${({ selected, theme }) => (selected ? theme.colors.primary : theme.colors.mx.gray[300])};
  border-radius: 12px;
  overflow: hidden;
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    ${({ onClick, theme }) =>
      onClick &&
      `
      border-color: ${theme.colors.primary};
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    `}
  }
`

export const MenuItemImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  background: ${({ theme }) => theme.colors.mx.gray[100]};
`

export const MenuItemInfo = styled.div`
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
`

export const MenuItemName = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 8px;
  word-break: break-word;
`

export const MenuItemDescription = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 12px;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
`

export const MenuItemFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: auto;
`

export const MenuItemPrice = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`

export const OriginalPrice = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: line-through;
`

export const FinalPrice = styled.span<{ discount: boolean }>`
  font-size: ${({ discount }) => (discount ? '18px' : '16px')};
  font-weight: 600;
  color: ${({ discount, theme }) => (discount ? theme.colors.success : theme.colors.primary)};
`

export const DiscountBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: ${({ theme }) => theme.colors.error};
  color: white;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;

  svg {
    color: white;
  }
`

export const CategoryName = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
  background: ${({ theme }) => theme.colors.mx.gray[100]};
  padding: 4px 8px;
  border-radius: 4px;
  width: fit-content;
`

export const SelectedIndicator = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 24px;
  height: 24px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

  svg {
    color: white;
  }
`

export const ShowMoreButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 16px;
  margin-top: 16px;
  background: ${({ theme }) => theme.colors.mx.white};
  border: 2px dashed ${({ theme }) => theme.colors.mx.gray[300]};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primary}05;
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
  gap: 12px;
  padding: 32px;
  color: ${({ theme }) => theme.colors.text.secondary};
`

export const LoadingSpinner = styled.div`
  width: 24px;
  height: 24px;
  border: 3px solid ${({ theme }) => theme.colors.mx.gray[400]};
  border-top: 3px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`

export const ValidationErrors = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const ValidationError = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: ${({ theme }) => theme.colors.mx.error}10;
  border: 1px solid ${({ theme }) => theme.colors.mx.error}30;
  border-radius: 6px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.mx.error};

  svg {
    color: ${({ theme }) => theme.colors.mx.error};
    flex-shrink: 0;
  }
`

export const TitleInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  background: ${({ theme }) => theme.colors.mx.white};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}20;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`

export const SelectedMenuItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-top: ${({ theme }) => theme.spacing.md};
`

export const SelectedMenuItemItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.mx.gray[50]};
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[200]};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};

  ${S.MenuItemName} {
    flex: 1;
    font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  }

  ${S.MenuItemPrice} {
    font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  }
`

// Estilos para modo de visualização
export const ViewContainer = styled.div`
  background: ${({ theme }) => theme.colors.mx.white};
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[300]};
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 16px;
`

export const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 20px;

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`
