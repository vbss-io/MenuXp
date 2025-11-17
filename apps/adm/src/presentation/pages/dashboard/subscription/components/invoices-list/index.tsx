import { Button } from '@menuxp/ui'
import { DownloadIcon, FileTextIcon } from '@phosphor-icons/react'

import type { Invoice } from '@/domain/models/subscription.model'

import * as S from './styles'

interface InvoicesListProps {
  invoices: Invoice[]
}

export const InvoicesList = ({ invoices }: InvoicesListProps) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency.toUpperCase()
    }).format(amount)
  }

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      paid: 'Paga',
      open: 'Em Aberto',
      void: 'Cancelada',
      uncollectible: 'Não Cobrável'
    }
    return statusMap[status] || status
  }

  const getStatusColor = (status: string): 'paid' | 'open' | 'void' => {
    if (status === 'paid') return 'paid'
    if (status === 'void' || status === 'uncollectible') return 'void'
    return 'open'
  }

  const handleDownload = (url: string | null) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <S.Card>
      <S.CardHeader>
        <S.CardTitle>Histórico de Faturas</S.CardTitle>
      </S.CardHeader>
      <S.CardBody>
        <S.InvoicesTable>
          <S.TableHeader>
            <S.HeaderCell>Data</S.HeaderCell>
            <S.HeaderCell>Valor</S.HeaderCell>
            <S.HeaderCell>Status</S.HeaderCell>
            <S.HeaderCell>Ações</S.HeaderCell>
          </S.TableHeader>
          <S.TableBody>
            {invoices.map((invoice) => (
              <S.TableRow key={invoice.id}>
                <S.TableCell>
                  <S.CellContent>
                    <FileTextIcon size={20} />
                    <span>{formatDate(invoice.dueDate)}</span>
                  </S.CellContent>
                </S.TableCell>
                <S.TableCell>
                  <S.Amount>{formatPrice(invoice.amount, invoice.currency)}</S.Amount>
                </S.TableCell>
                <S.TableCell>
                  <S.StatusBadge $status={getStatusColor(invoice.status)}>
                    {getStatusLabel(invoice.status)}
                  </S.StatusBadge>
                </S.TableCell>
                <S.TableCell>
                  <S.Actions>
                    {invoice.hostedInvoiceUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<DownloadIcon size={14} />}
                        onClick={() => handleDownload(invoice.hostedInvoiceUrl)}
                      >
                        Ver
                      </Button>
                    )}
                    {invoice.invoicePdf && (
                      <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<DownloadIcon size={14} />}
                        onClick={() => handleDownload(invoice.invoicePdf)}
                      >
                        PDF
                      </Button>
                    )}
                  </S.Actions>
                </S.TableCell>
              </S.TableRow>
            ))}
          </S.TableBody>
        </S.InvoicesTable>
      </S.CardBody>
    </S.Card>
  )
}
