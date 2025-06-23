import type { Order } from '@/presentation/contexts/AppContext'
import { ArrowRight, X } from 'lucide-react'

interface StatusConfirmModalProps {
  order: Order
  newStatus: string
  onConfirm: () => void
  onCancel: () => void
  isProcessing: boolean
}

export default function StatusConfirmModal({
  order,
  newStatus,
  onConfirm,
  onCancel,
  isProcessing
}: StatusConfirmModalProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Recebido':
        return 'text-warning-600'
      case 'Confirmado':
        return 'text-info-600'
      case 'Em Produção':
        return 'text-purple-600'
      case 'Pronto':
        return 'text-accent-2-600'
      case 'Saiu para Entrega':
        return 'text-accent-600'
      case 'Entregue':
        return 'text-gray-600'
      default:
        return 'text-gray-600'
    }
  }

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'Confirmado':
        return 'O cliente será notificado que o pedido foi confirmado.'
      case 'Em Produção':
        return 'O cliente será notificado que o pedido está sendo preparado.'
      case 'Pronto':
        return 'O cliente será notificado que o pedido está pronto.'
      case 'Saiu para Entrega':
        return 'O cliente será notificado que o pedido saiu para entrega.'
      case 'Entregue':
        return 'O pedido será marcado como entregue e finalizado.'
      default:
        return 'O status do pedido será atualizado.'
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content max-w-md w-full">
        <div className="modal-header flex justify-between items-center">
          <h2 className="text-body font-semibold text-text-primary">Confirmar Mudança de Status</h2>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Fechar"
            disabled={isProcessing}
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <span className={`font-semibold text-subtitle ${getStatusColor(order.status)}`}>{order.status}</span>
              <ArrowRight className="h-5 w-5 text-gray-400" />
              <span className={`font-semibold text-subtitle ${getStatusColor(newStatus)}`}>{newStatus}</span>
            </div>

            <div className="bg-bg-light p-4 rounded-sm border border-black mb-4">
              <h3 className="font-medium text-text-primary mb-2 text-subtitle">Pedido #{order.id}</h3>
              <p className="text-subtitle text-text-secondary">{order.customer_name}</p>
              <p className="text-subtitle text-text-secondary">{order.customer_phone}</p>
            </div>

            <p className="text-subtitle text-text-secondary mb-4">{getStatusMessage(newStatus)}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={onCancel} className="btn-secondary flex-1" disabled={isProcessing}>
              Cancelar
            </button>

            <button
              onClick={onConfirm}
              disabled={isProcessing}
              className="btn-primary bg-primary-500 hover:bg-primary-600 flex-1"
            >
              {isProcessing ? 'Atualizando...' : 'Confirmar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
