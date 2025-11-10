import styled from 'styled-components'

export const DialogContent = styled.div`
  &.edit-cart-item-dialog {
    background: ${({ theme }) => theme.colors.mx.white};
    border: 3px solid ${({ theme }) => theme.colors.mx.black};
    border-radius: 0;
    box-shadow: 4px 4px 0 ${({ theme }) => theme.colors.mx.black};
    width: 100%;
    max-height: 90vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
`

export const DialogHeader = styled.div`
  &.dialog-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 3px solid ${({ theme }) => theme.colors.mx.black};
  }
`

export const DialogTitle = styled.h2`
  &.dialog-title {
    font-size: 18px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 0;
    display: flex;
    align-items: center;
    gap: 12px;
  }
`

export const ComboBadge = styled.span`
  &.combo-badge {
    background: #feba0c;
    color: ${({ theme }) => theme.colors.text.primary};
    padding: 4px 12px;
    border-radius: 0;
    font-size: 10px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`

export const DialogBody = styled.div`
  &.dialog-body {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
  }
`

export const TabsContainer = styled.div`
  &.tabs-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`

export const TabsList = styled.div`
  &.tabs-list {
    display: flex;
    gap: 8px;
    border-bottom: 3px solid ${({ theme }) => theme.colors.mx.black};
    padding-bottom: 0;
  }
`

export const TabButton = styled.button<{ $isActive: boolean }>`
  &.tab-button {
    padding: 12px 16px;
    border: 3px solid ${({ theme }) => theme.colors.mx.black};
    background: ${({ $isActive, theme }) => ($isActive ? theme.colors.mx.black : theme.colors.mx.white)};
    color: ${({ $isActive, theme }) => ($isActive ? theme.colors.mx.white : theme.colors.mx.black)};
    border-radius: 0;
    border-bottom: none;
    cursor: pointer;
    font-size: 14px;
    font-weight: 700;
    transition: all 0.2s;

    &:hover {
      background: ${({ $isActive, theme }) => ($isActive ? theme.colors.mx.black : theme.colors.mx.gray[100])};
    }

    &.active {
      background: ${({ theme }) => theme.colors.mx.black};
      color: ${({ theme }) => theme.colors.mx.white};
    }
  }
`

export const TabContent = styled.div<{ $isActive: boolean }>`
  &.tab-content {
    display: ${({ $isActive }) => ($isActive ? 'block' : 'none')};
  }
`

export const ItemSection = styled.div`
  &.item-section {
    margin-bottom: 24px;
  }
`

export const ItemInfo = styled.div`
  &.item-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background: ${({ theme }) => theme.colors.mx.gray[100]};
    border: 3px solid ${({ theme }) => theme.colors.mx.black};
    border-radius: 0;
    margin-bottom: 16px;
  }
`

export const ItemName = styled.h4`
  &.item-name {
    font-size: 16px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 0;
  }
`

export const ItemPrice = styled.span`
  &.item-price {
    font-size: 18px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.mx.black};
  }
`

export const SectionTitle = styled.h3`
  &.section-title {
    font-size: 18px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 0 0 16px 0;
  }
`

export const FieldGroup = styled.div`
  margin-bottom: 16px;
`

export const FieldLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 6px;
`

export const AddButton = styled.button`
  padding: 6px 12px;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #059669;
  }
`

export const OptionalCard = styled.div`
  &.optional-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    border: 3px solid ${({ theme }) => theme.colors.mx.black};
    border-radius: 0;
    background-color: ${({ theme }) => theme.colors.background};
    margin-bottom: 16px;
  }
`

export const OptionalHeader = styled.div`
  &.optional-header {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
`

export const OptionalTitle = styled.span`
  &.optional-title {
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`

export const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  background: #ef4444;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #dc2626;
  }
`

export const OptionalFields = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

export const EmptyOptionals = styled.div`
  text-align: center;
  padding: 32px;
  color: ${({ theme }) => theme.colors.text.secondary};
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  background: #f9fafb;

  p {
    margin: 0 0 16px 0;
    font-size: 14px;
  }
`

export const DialogFooter = styled.div`
  &.dialog-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;
    padding: 20px;
    border-top: 3px solid ${({ theme }) => theme.colors.mx.black};
    background: ${({ theme }) => theme.colors.mx.gray[100]};
  }
`

export const OptionalPrice = styled.span`
  &.optional-price {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`

export const OptionalControls = styled.div`
  &.optional-controls {
    display: flex;
    align-items: center;
    gap: 12px;
  }
`

export const QuantityButton = styled.button`
  &.quantity-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border: 3px solid ${({ theme }) => theme.colors.mx.black};
    border-radius: 0;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text.primary};
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background-color: ${({ theme }) => theme.colors.mx.black};
      color: ${({ theme }) => theme.colors.mx.white};
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`

export const QuantityDisplay = styled.span`
  &.quantity-display {
    font-size: 16px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text.primary};
    min-width: 20px;
    text-align: center;
  }
`

export const MaxQuantityInfo = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: 4px;
  text-align: right;
`
