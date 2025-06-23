import React, { useContext, useEffect, useState } from 'react'
import {
  Clock,
  Package,
  AlertCircle,
  TrendingUp,
  Truck,
  CheckCircle,
  Play,
  Pause,
  Square,
  Target,
  Gift,
  Star
} from 'lucide-react'
import InfoCard from './InfoCard'
import MissionsCard from './MissionsCard'
import OperationModal from './OperationModal'
import { AppContext } from '@/presentation/contexts/AppContext'
import { Order } from '@/presentation/contexts/AppContext'

interface KPIs {
  totalOrders: number
  avgPrepTime: string
  canceled: number
  revenue: string
  outForDelivery: number
  delivered: number
}

export default function Dashboard() {
  const { orders, operationStatus, startOperation, pauseOperation, endOperation, settings } = useContext(AppContext)
  const [kpis, setKpis] = useState<KPIs>({
    totalOrders: 0,
    avgPrepTime: '00:00',
    canceled: 0,
    revenue: 'R$ 0,00',
    outForDelivery: 0,
    delivered: 0
  })
  const [showOperationModal, setShowOperationModal] = useState(false)
  const [operationAction, setOperationAction] = useState<'start' | 'pause' | 'end' | null>(null)

  useEffect(() => {
    if (orders.length === 0) return

    // Calculate KPIs from orders
    const today = new Date().toISOString().split('T')[0]

    const todayOrders = orders.filter((order) => order.timestamp.split('T')[0] === today)

    const totalOrders = todayOrders.length
    const canceled = todayOrders.filter((o) => o.status === 'Cancelado').length
    const outForDelivery = todayOrders.filter((o) => o.status === 'Saiu para Entrega').length
    const delivered = todayOrders.filter((o) => o.status === 'Entregue').length

    // Calculate revenue
    const revenue = todayOrders
      .filter((order) => order.status !== 'Cancelado')
      .reduce((sum, order) => sum + order.total, 0)

    // Calculate average preparation time (mock for prototype)
    // In a real app, this would compare timestamps between status changes
    setKpis({
      totalOrders,
      avgPrepTime: '00:18',
      canceled,
      revenue: `R$ ${revenue.toFixed(2)}`,
      outForDelivery,
      delivered
    })
  }, [orders])

  const handleOperationAction = (action: 'start' | 'pause' | 'end') => {
    setOperationAction(action)
    setShowOperationModal(true)
  }

  const confirmOperationAction = () => {
    if (operationAction === 'start') {
      startOperation()
    } else if (operationAction === 'pause') {
      pauseOperation()
    } else if (operationAction === 'end') {
      endOperation()
    }
    setShowOperationModal(false)
    setOperationAction(null)
  }

  const getOperationButton = () => {
    switch (operationStatus) {
      case 'stopped':
        return (
          <button
            onClick={() => handleOperationAction('start')}
            className="btn-primary text-lg font-semibold shadow-button px-6 py-3"
          >
            <Play size={24} className="mr-2" />
            Iniciar Operação
          </button>
        )
      case 'running':
        return (
          <div className="flex space-x-3">
            <button onClick={() => handleOperationAction('pause')} className="btn-secondary">
              <Pause size={20} className="mr-2" />
              Pausar Operação
            </button>
            <button
              onClick={() => handleOperationAction('end')}
              className="btn-primary bg-error-500 hover:bg-error-600"
            >
              <Square size={20} className="mr-2" />
              Encerrar Operação
            </button>
          </div>
        )
      case 'paused':
        return (
          <div className="flex space-x-3">
            <button
              onClick={() => handleOperationAction('start')}
              className="btn-primary bg-accent-2-500 hover:bg-accent-2-600"
            >
              <Play size={20} className="mr-2" />
              Retomar Operação
            </button>
            <button
              onClick={() => handleOperationAction('end')}
              className="btn-primary bg-error-500 hover:bg-error-600"
            >
              <Square size={20} className="mr-2" />
              Encerrar Operação
            </button>
          </div>
        )
      default:
        return null
    }
  }

  const getStatusBadge = () => {
    switch (operationStatus) {
      case 'running':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-sm text-subtitle font-medium bg-accent-2-100 text-accent-2-800 border border-black">
            <div className="w-2 h-2 bg-accent-2-500 rounded-sm mr-2 animate-pulse"></div>
            Operação Ativa
          </span>
        )
      case 'paused':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-sm text-subtitle font-medium bg-warning-100 text-warning-800 border border-black">
            <div className="w-2 h-2 bg-warning-500 rounded-sm mr-2"></div>
            Operação Pausada
          </span>
        )
      case 'stopped':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-sm text-subtitle font-medium bg-gray-100 text-gray-800 border border-black">
            <div className="w-2 h-2 bg-gray-500 rounded-sm mr-2"></div>
            Operação Parada
          </span>
        )
      default:
        return null
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-section font-bold">Dashboard</h1>
        {operationStatus !== 'stopped' && (
          <div className="flex items-center space-x-4">
            {getStatusBadge()}
            {getOperationButton()}
          </div>
        )}
      </div>

      {operationStatus === 'stopped' ? (
        <div className="text-center py-20">
          <div className="max-w-md mx-auto">
            <div className="mb-6">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-sm bg-gray-100 mb-4 border border-black">
                <Play className="h-8 w-8 text-gray-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Operação Parada</h2>
              <p className="text-gray-600 text-body">
                Inicie a operação para começar a receber pedidos e visualizar os dados do dashboard.
              </p>
            </div>
            {getOperationButton()}
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
            <InfoCard title="Pedidos do Dia" value={kpis.totalOrders} icon={Package} colorScheme="blue" />

            <InfoCard title="Tempo Médio de Preparo" value={kpis.avgPrepTime} icon={Clock} colorScheme="green" />

            <InfoCard title="Cancelamentos" value={kpis.canceled} icon={AlertCircle} colorScheme="red" />

            <InfoCard title="Faturamento Diário" value={kpis.revenue} icon={TrendingUp} colorScheme="purple" />

            <InfoCard title="Saiu para Entrega" value={kpis.outForDelivery} icon={Truck} colorScheme="yellow" />

            <InfoCard title="Entregues" value={kpis.delivered} icon={CheckCircle} colorScheme="green" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="card-basic">
              <h2 className="text-xl font-semibold mb-4">Visão Geral do Dia</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-medium mb-3 text-body">Distribuição de Pedidos</h3>
                  <div className="h-60 flex items-end space-x-4 border-b border-l border-black">
                    {settings.operation_types.map((type) => {
                      const displayName = type === 'delivery' ? 'Delivery' : type === 'mesa' ? 'Mesa' : 'Balcão'
                      const count = orders.filter((o) => o.order_type.toLowerCase() === type.toLowerCase()).length
                      const height = count ? `${(count / orders.length) * 100}%` : '10%'

                      return (
                        <div key={type} className="flex flex-col items-center flex-1">
                          <div className="w-full flex justify-center mb-2 text-subtitle">{count}</div>
                          <div
                            style={{ height }}
                            className={`w-full border border-black ${
                              type === 'delivery' ? 'bg-blue-400' : type === 'mesa' ? 'bg-green-400' : 'bg-yellow-400'
                            } rounded-t-sm`}
                          ></div>
                          <div className="w-full text-center mt-2 text-subtitle">{displayName}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3 text-body">Status dos Pedidos</h3>
                  <div className="space-y-4">
                    {[
                      'Recebido',
                      'Confirmado',
                      'Em Produção',
                      'Pronto',
                      'Saiu para Entrega',
                      'Entregue',
                      'Cancelado'
                    ].map((status) => {
                      const count = orders.filter((o) => o.status === status).length
                      const percentage = orders.length ? Math.round((count / orders.length) * 100) : 0

                      return (
                        <div key={status} className="space-y-1">
                          <div className="flex justify-between text-subtitle">
                            <span>{status}</span>
                            <span>
                              {count} pedidos ({percentage}%)
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 h-2 rounded-sm overflow-hidden border border-black">
                            <div
                              className={`h-full ${
                                status === 'Recebido'
                                  ? 'bg-yellow-500'
                                  : status === 'Confirmado'
                                    ? 'bg-blue-500'
                                    : status === 'Em Produção'
                                      ? 'bg-indigo-500'
                                      : status === 'Pronto'
                                        ? 'bg-green-500'
                                        : status === 'Saiu para Entrega'
                                          ? 'bg-orange-500'
                                          : status === 'Entregue'
                                            ? 'bg-gray-500'
                                            : 'bg-red-500'
                              }`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

            <MissionsCard />
          </div>
        </>
      )}

      {showOperationModal && operationAction && (
        <OperationModal
          action={operationAction}
          onConfirm={confirmOperationAction}
          onCancel={() => {
            setShowOperationModal(false)
            setOperationAction(null)
          }}
        />
      )}
    </div>
  )
}
