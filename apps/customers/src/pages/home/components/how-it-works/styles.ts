import styled from 'styled-components'

export const HowItWorksSection = styled.section`
  background-color: ${({ theme }) => theme.colors.mx.white};
  padding: ${({ theme }) => theme.spacing.xxl} 0;
`

export const HowItWorksContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};

  @media ${({ theme }) => theme.breakpoints.sm} {
    padding: 0 ${({ theme }) => theme.spacing.lg};
  }

  @media ${({ theme }) => theme.breakpoints.lg} {
    padding: 0 ${({ theme }) => theme.spacing.xl};
  }
`

export const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`

export const SectionTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fonts.title};
  font-size: ${({ theme }) => theme.typography.fontSizes.xxxl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  color: ${({ theme }) => theme.colors.mx.black};
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;

  @media ${({ theme }) => theme.breakpoints.sm} {
    font-size: ${({ theme }) => theme.typography.fontSizes.xxxxl};
  }
`

export const SectionDescription = styled.p`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
`

export const StepsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};

  @media ${({ theme }) => theme.breakpoints.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${({ theme }) => theme.breakpoints.lg} {
    grid-template-columns: repeat(4, 1fr);
  }
`

export const StepItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${({ theme }) => theme.spacing.md};
`

export const StepIcon = styled.div`
  width: 4rem;
  height: 4rem;
  background-color: ${({ theme }) => theme.colors.mx.red};
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.mx.black};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.mx.white};
  flex-shrink: 0;
`

export const StepContent = styled.div`
  flex: 1;
`

export const StepTitle = styled.h4`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  color: ${({ theme }) => theme.colors.mx.black};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  line-height: ${({ theme }) => theme.typography.lineHeights.normal};
`

export const StepDescription = styled.p`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeights.normal};
`

export const KanbanSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xxl};
`

export const KanbanTitle = styled.h4`
  font-family: ${({ theme }) => theme.typography.fonts.title};
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  color: ${({ theme }) => theme.colors.mx.black};
  text-align: center;
  margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
`

export const KanbanContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  -webkit-overflow-scrolling: touch;
  padding: ${({ theme }) => theme.spacing.sm} 0;
`

export const KanbanBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  min-width: 1200px;
  width: 100%;

  @media ${({ theme }) => theme.breakpoints.sm} {
    min-width: 1000px;
  }
`

export const KanbanColumn = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.mx.gray[50]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[200]};
  min-height: 400px;
`

export const ColumnHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.mx.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.mx.gray[200]};
  border-radius: ${({ theme }) => theme.borderRadius.md} ${({ theme }) => theme.borderRadius.md} 0 0;
`

export const ColumnTitle = styled.h5<{ $color: string }>`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ $color }) => $color};
  margin: 0;
`

export const ColumnCount = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background-color: ${({ theme }) => theme.colors.mx.gray[200]};
  border-radius: 50%;
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.mx.black};
`

export const ColumnContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  flex: 1;
`

export const OrderCard = styled.div`
  background-color: ${({ theme }) => theme.colors.mx.white};
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: all ${({ theme }) => theme.animations.durations.normal} ${({ theme }) => theme.animations.easings.ease};
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
    border-color: ${({ theme }) => theme.colors.mx.gray[400]};
  }
`

export const OrderCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.mx.gray[50]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.mx.gray[200]};
`

export const OrderCardBody = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

export const OrderId = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.secondary};
`

export const OrderStatus = styled.span<{ $status: string }>`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.5px;

  ${({ $status, theme }) => {
    switch ($status) {
      case 'Pendente':
        return `
          background-color: #fef2f2;
          color: #dc2626;
        `
      case 'Recebido':
        return `
          background-color: #fef3c7;
          color: #d97706;
        `
      case 'Em Preparo':
        return `
          background-color: #fef3c7;
          color: #d97706;
        `
      case 'Pronto':
        return `
          background-color: #dcfce7;
          color: #16a34a;
        `
      case 'Saiu p/ Entrega':
        return `
          background-color: #dbeafe;
          color: #2563eb;
        `
      case 'Entregue':
        return `
          background-color: #dcfce7;
          color: #16a34a;
        `
      default:
        return `
          background-color: ${theme.colors.mx.gray[200]};
          color: ${theme.colors.mx.gray[700]};
        `
    }
  }}
`

export const OrderCustomer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

export const CustomerName = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.mx.black};
`

export const CustomerPhone = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`

export const OrderItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

export const ItemsTitle = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.mx.black};
`

export const ItemsList = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeights.normal};
`

export const OrderDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

export const OrderDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const DetailLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
`

export const DetailValue = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.colors.mx.black};
`

export const OrderNotes = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.mx.gray[50]};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border-left: 3px solid ${({ theme }) => theme.colors.mx.red};
`

export const NotesLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.mx.black};
`

export const NotesText = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeights.normal};
`
