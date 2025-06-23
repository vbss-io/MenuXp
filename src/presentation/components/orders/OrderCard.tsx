import type { Order } from '@/presentation/contexts/AppContext'
import {
  Banknote,
  ChevronRight,
  Clock,
  CreditCard,
  DollarSign,
  MapPin,
  MessageCircle,
  Smartphone,
  User
} from 'lucide-react'
import { useState } from 'react'
import OrderDetailModal from './OrderDetailModal'

interface OrderCardProps {
  order: Order
  provided: any
  snapshot: any
  onStatusChange?: (orderId: number, newStatus: string) => void
  canAdvance?: boolean
  nextStatus?: string | null
}

export default function OrderCard({
  order,
  provided,
  snapshot,
  onStatusChange,
  canAdvance,
  nextStatus
}: OrderCardProps) {
  const [showModal, setShowModal] = useState(false)
  const [showCancelReason, setShowCancelReason] = useState(false)

  const getTimeSinceStart = (startTime: string) => {
    const start = new Date(startTime)
    const now = new Date()
    const diffMin = Math.floor((now.getTime() - start.getTime()) / 60000)
    return diffMin
  }

  const slaMin = getTimeSinceStart(order.sla_start)
  const slaColor =
    slaMin > 15
      ? 'bg-error-100 text-error-800 border-error-500'
      : slaMin > 8
        ? 'bg-warning-100 text-warning-800 border-warning-500'
        : 'bg-accent-2-100 text-accent-2-800 border-accent-2-500'

  const getOrderTypeIcon = () => {
    switch (order.order_type) {
      case 'delivery':
        return <MapPin className="h-4 w-4 text-info-600" aria-label="Delivery" />
      case 'mesa':
        return (
          <div className="flex items-center text-accent-2-600">
            <User className="h-4 w-4 mr-1" aria-label="Mesa" />
            <span className="text-xs">Mesa {order.table_id}</span>
          </div>
        )
      case 'balcao':
      default:
        return <User className="h-4 w-4 text-warning-600" aria-label="Balcão" />
    }
  }

  const getPaymentIcon = () => {
    switch (order.payment_method) {
      case 'cartao_credito':
        return <CreditCard className="h-4 w-4 text-info-600" aria-label="Cartão de Crédito" />
      case 'cartao_debito':
        return <CreditCard className="h-4 w-4 text-accent-2-600" aria-label="Cartão de Débito" />
      case 'pix':
        return <Smartphone className="h-4 w-4 text-accent-600" aria-label="PIX" />
      case 'dinheiro':
        return <Banknote className="h-4 w-4 text-warning-600" aria-label="Dinheiro" />
      default:
        return <DollarSign className="h-4 w-4 text-gray-600" aria-label="Outro" />
    }
  }

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(`Olá ${order.customer_name}, sobre seu pedido #${order.id}...`)
    const whatsappUrl = `https://wa.me/${order.customer_phone.replace(/\D/g, '')}?text=${message}`
    window.open(whatsappUrl, '_blank')
  }

  const handleAdvanceStatus = () => {
    if (canAdvance && nextStatus && onStatusChange) {
      onStatusChange(order.id, nextStatus)
    }
  }

  if (order.status === 'Cancelado') {
    return (
      <div className="p-4 mb-3 bg-bg-dark rounded-sm shadow-sm border-l-4 border-error-500 border border-black">
        <div className="flex justify-between items-center mb-2">
          <button
            onClick={() => setShowModal(true)}
            className="font-bold text-text-primary hover:text-primary-600 transition-colors text-body"
          >
            #{order.id}
          </button>
          <span className="text-xs px-2 py-1 rounded-sm status-canceled">CANCELADO</span>
        </div>

        <div className="space-y-1 mb-3">
          {order.items.slice(0, 2).map((item, index) => (
            <div key={index} className="text-subtitle flex justify-between">
              <span>
                {item.qty}× {item.name}
              </span>
            </div>
          ))}
          {order.items.length > 2 && <div className="text-xs text-gray-500">+{order.items.length - 2} itens...</div>}
        </div>

        <button
          onClick={() => setShowCancelReason(!showCancelReason)}
          className="w-full text-xs text-error-600 hover:text-error-800 mb-2 transition-colors"
        >
          {showCancelReason ? 'Ocultar motivo' : 'Ver motivo do cancelamento'}
        </button>

        {showCancelReason && (
          <div className="bg-error-50 p-2 rounded-sm text-xs text-error-700 mb-2 border border-black">
            <p className="font-medium">Motivo:</p>
            <p>{order.cancel_reason}</p>
            <button
              onClick={handleWhatsAppContact}
              className="mt-2 inline-flex items-center text-accent-2-600 hover:text-accent-2-800 transition-colors"
            >
              <MessageCircle className="h-3 w-3 mr-1" />
              Contatar cliente
            </button>
          </div>
        )}

        <div className="flex justify-between items-center text-xs text-gray-500 pt-2 border-t border-black">
          <div className="flex items-center space-x-2">
            {getOrderTypeIcon()}
            {getPaymentIcon()}
          </div>
          <span className="font-medium text-body">R$ {order.total.toFixed(2)}</span>
        </div>

        {showModal && <OrderDetailModal order={order} onClose={() => setShowModal(false)} />}
      </div>
    )
  }

  const cardProps = provided
    ? {
        ref: provided.innerRef,
        ...provided.draggableProps,
        ...provided.dragHandleProps
      }
    : {}

  return (
    <div
      {...cardProps}
      className={`card-basic mb-3 border-l-4 
        ${
          order.order_type === 'delivery'
            ? 'border-info-500'
            : order.order_type === 'mesa'
              ? 'border-accent-2-500'
              : 'border-warning-500'
        } 
        ${snapshot?.isDragging ? 'shadow-lg opacity-90 rotate-1' : ''}
        transition-all duration-200 hover:shadow-md`}
    >
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={() => setShowModal(true)}
          className="font-bold text-text-primary hover:text-primary-600 transition-colors text-body"
        >
          #{order.id}
        </button>
        <div className="flex items-center space-x-2">
          <span className={`text-xs px-2 py-1 rounded-sm flex items-center border ${slaColor}`}>
            <Clock className="h-3 w-3 mr-1" />
            {slaMin} min
          </span>
          {canAdvance && nextStatus && (
            <button
              onClick={handleAdvanceStatus}
              className="p-1 rounded-sm bg-primary-100 hover:bg-primary-200 text-primary-600 transition-colors border border-black"
              title={`Avançar para ${nextStatus}`}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-1 mb-3">
        {order.items.slice(0, 2).map((item, index) => (
          <div key={index} className="text-subtitle flex justify-between text-text-secondary">
            <span>
              {item.qty}× {item.name}
            </span>
          </div>
        ))}
        {order.items.length > 2 && <div className="text-xs text-gray-500">+{order.items.length - 2} itens...</div>}
      </div>

      <div className="flex justify-between items-center text-xs text-gray-500 pt-2 border-t border-black">
        <div className="flex items-center space-x-2">
          {getOrderTypeIcon()}
          {getPaymentIcon()}
        </div>
        <span className="font-medium text-text-primary text-body">R$ {order.total.toFixed(2)}</span>
      </div>

      {showModal && <OrderDetailModal order={order} onClose={() => setShowModal(false)} />}
    </div>
  )
}
