import styled from 'styled-components'

export const DialogContent = styled.div`
  background: white;
  border-radius: 12px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

export const DialogHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
`

export const DialogTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
`

export const ComboBadge = styled.span`
  background: #feba0c;
  color: ${({ theme }) => theme.colors.text.primary};
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

export const DialogBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`

export const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const TabsList = styled.div`
  display: flex;
  gap: 8px;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0;
`

export const TabButton = styled.button<{ $isActive: boolean }>`
  padding: 12px 16px;
  border: none;
  background: ${({ $isActive }) => ($isActive ? '#3B82F6' : 'transparent')};
  color: ${({ $isActive }) => ($isActive ? 'white' : '#6B7280')};
  border-radius: 8px 8px 0 0;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background: ${({ $isActive }) => ($isActive ? '#2563EB' : '#F3F4F6')};
  }
`

export const TabContent = styled.div<{ $isActive: boolean }>`
  display: ${({ $isActive }) => ($isActive ? 'block' : 'none')};
`

export const ItemSection = styled.div`
  margin-bottom: 24px;
`

export const ItemInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #f9fafb;
  border-radius: 8px;
  margin-bottom: 16px;
`

export const ItemName = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`

export const ItemPrice = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #10b981;
`

export const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 16px 0;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[200]};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background};
  margin-bottom: 16px;
`

export const OptionalHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const OptionalTitle = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
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
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  padding: 20px;
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
`

export const OptionalPrice = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
`

export const OptionalControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const QuantityButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[300]};
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.mx.gray[100]};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const QuantityDisplay = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
  min-width: 20px;
  text-align: center;
`

export const MaxQuantityInfo = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: 4px;
  text-align: right;
`
