import { createContext, useState, useEffect, type ReactNode } from 'react'
import mockOrdersData from '@/application/data/mockOrders.json'
import mockMenuItemsData from '@/application/data/mockMenuItems.json'
import mockSettingsData from '@/application/data/mockSettings.json'
import mockMessagesData from '@/application/data/mockMessages.json'

// Define types
export interface OrderItem {
  name: string
  qty: number
  price: number
}

export interface Order {
  id: number
  restaurant_id: number
  status: string
  total: number
  customer_phone: string
  customer_name: string
  order_type: string
  table_id?: number
  payment_method: string
  items: OrderItem[]
  timestamp: string
  sla_start: string
  cancel_reason?: string
  delivery_address?: string
}

export interface MenuItem {
  id: number
  restaurant_id: number
  category_id: number
  name: string
  price: number
  image_url: string
  stock: number
  discount: number
}

export interface Template {
  [key: string]: string
}

export interface BusinessHours {
  [key: string]: string
}

export interface Settings {
  restaurant_id: number
  name: string
  logo_url: string
  theme_color: string
  whatsapp_number: string
  qr_code_url: string
  business_hours: BusinessHours
  templates: Template
  operation_types: string[]
  payment_methods: string[]
  delivery_fee: number
}

export interface Message {
  id: number
  order_id: number
  template_name: string
  status: string
  timestamp: string
}

export interface Notification {
  id: number
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
}

export interface OperationReport {
  id: string
  date: string
  startTime: string
  endTime: string
  duration: string
  totalOrders: number
  completedOrders: number
  canceledOrders: number
  revenue: number
  orders: Order[]
}

interface AppContextType {
  orders: Order[]
  menuItems: MenuItem[]
  settings: Settings
  messages: Message[]
  notifications: Notification[]
  operationStatus: 'stopped' | 'running' | 'paused'
  operationStartTime: string | null
  operationReports: OperationReport[]
  completedMissions: string[]
  updateOrderStatus: (orderId: number, newStatus: string) => Promise<void>
  cancelOrder: (orderId: number, reason: string) => Promise<void>
  updateMenuItem: (item: MenuItem) => void
  createMenuItem: (item: Omit<MenuItem, 'id'>) => void
  deleteMenuItem: (id: number) => void
  applyBulkDiscount: (itemIds: number[], discount: number) => void
  updateSettings: (newSettings: Settings) => void
  resendMessage: (messageId: number) => Promise<void>
  addNotification: (notification: Omit<Notification, 'id'>) => void
  removeNotification: (id: number) => void
  startOperation: () => void
  pauseOperation: () => void
  endOperation: () => void
  generateReport: () => OperationReport
  completeMission: (missionId: string) => void
}

// Create context with default values
export const AppContext = createContext<AppContextType>({
  orders: [],
  menuItems: [],
  settings: {
    restaurant_id: 0,
    name: '',
    logo_url: '',
    theme_color: '',
    whatsapp_number: '',
    qr_code_url: '',
    business_hours: {},
    templates: {},
    operation_types: [],
    payment_methods: [],
    delivery_fee: 0
  },
  messages: [],
  notifications: [],
  operationStatus: 'stopped',
  operationStartTime: null,
  operationReports: [],
  completedMissions: [],
  updateOrderStatus: async () => {},
  cancelOrder: async () => {},
  updateMenuItem: () => {},
  createMenuItem: () => {},
  deleteMenuItem: () => {},
  applyBulkDiscount: () => {},
  updateSettings: () => {},
  resendMessage: async () => {},
  addNotification: () => {},
  removeNotification: () => {},
  startOperation: () => {},
  pauseOperation: () => {},
  endOperation: () => {},
  generateReport: () => ({}) as OperationReport,
  completeMission: () => {}
})

interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  const [orders, setOrders] = useState<Order[]>([])
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [settings, setSettings] = useState<Settings>({
    restaurant_id: 0,
    name: '',
    logo_url: '',
    theme_color: '',
    whatsapp_number: '',
    qr_code_url: '',
    business_hours: {},
    templates: {},
    operation_types: [],
    payment_methods: [],
    delivery_fee: 0
  })
  const [messages, setMessages] = useState<Message[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [operationStatus, setOperationStatus] = useState<'stopped' | 'running' | 'paused'>('stopped')
  const [operationStartTime, setOperationStartTime] = useState<string | null>(null)
  const [operationReports, setOperationReports] = useState<OperationReport[]>([])
  const [completedMissions, setCompletedMissions] = useState<string[]>([])

  // Load initial data
  useEffect(() => {
    // Only load orders if operation is running
    if (operationStatus === 'running') {
      setOrders(mockOrdersData)
    } else {
      setOrders([])
    }
    setMenuItems(mockMenuItemsData)
    setSettings(mockSettingsData)
    setMessages(mockMessagesData)

    // Apply theme color from settings
    if (mockSettingsData.theme_color) {
      document.documentElement.style.setProperty('--theme-color', mockSettingsData.theme_color)
    }
  }, [operationStatus])

  // Auto-end operation after 24 hours
  useEffect(() => {
    if (operationStatus === 'running' && operationStartTime) {
      const startTime = new Date(operationStartTime)
      const now = new Date()
      const diffHours = (now.getTime() - startTime.getTime()) / (1000 * 60 * 60)

      if (diffHours >= 24) {
        endOperation()
        addNotification({
          type: 'warning',
          message: 'Operação encerrada automaticamente após 24 horas. Relatório gerado.'
        })
      }
    }
  }, [operationStatus, operationStartTime])

  const simulateApiCall = async (successRate = 0.9): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const isSuccess = Math.random() < successRate
        resolve(isSuccess)
      }, 800)
    })
  }

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Date.now()
    setNotifications((prev) => [...prev, { ...notification, id }])

    // Auto-remove after 5 seconds
    setTimeout(() => {
      removeNotification(id)
    }, 5000)

    return id
  }

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const startOperation = () => {
    setOperationStatus('running')
    setOperationStartTime(new Date().toISOString())
    setOrders(mockOrdersData)

    addNotification({
      type: 'success',
      message: 'Operação iniciada! Seu restaurante está online e pronto para receber pedidos.'
    })
  }

  const pauseOperation = () => {
    setOperationStatus('paused')

    addNotification({
      type: 'warning',
      message: 'Operação pausada. Novos pedidos não serão aceitos temporariamente.'
    })
  }

  const endOperation = () => {
    const report = generateReport()
    setOperationReports((prev) => [...prev, report])
    setOperationStatus('stopped')
    setOperationStartTime(null)
    setOrders([])

    addNotification({
      type: 'info',
      message: `Operação encerrada. Relatório do dia gerado com ${report.totalOrders} pedidos.`
    })
  }

  const generateReport = (): OperationReport => {
    const now = new Date()
    const startTime = operationStartTime ? new Date(operationStartTime) : now
    const duration = Math.floor((now.getTime() - startTime.getTime()) / (1000 * 60))

    const completedOrders = orders.filter((o) => o.status === 'Entregue').length
    const canceledOrders = orders.filter((o) => o.status === 'Cancelado').length
    const revenue = orders.filter((o) => o.status !== 'Cancelado').reduce((sum, order) => sum + order.total, 0)

    return {
      id: `report-${Date.now()}`,
      date: now.toISOString().split('T')[0],
      startTime: startTime.toISOString(),
      endTime: now.toISOString(),
      duration: `${Math.floor(duration / 60)}h ${duration % 60}m`,
      totalOrders: orders.length,
      completedOrders,
      canceledOrders,
      revenue,
      orders: [...orders]
    }
  }

  const completeMission = (missionId: string) => {
    setCompletedMissions((prev) => [...prev, missionId])

    addNotification({
      type: 'success',
      message: 'Missão concluída! Recompensa resgatada com sucesso.'
    })
  }

  const updateOrderStatus = async (orderId: number, newStatus: string) => {
    const success = await simulateApiCall()

    if (!success) {
      throw new Error(`Failed to update order ${orderId} status to ${newStatus}`)
    }

    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))

    // If status change requires a message
    const statusTemplateMap: { [key: string]: string } = {
      Recebido: 'order_received',
      Confirmado: 'order_confirmed',
      'Em Produção': 'order_in_production',
      Pronto: 'order_ready',
      'Saiu para Entrega': 'order_out_for_delivery',
      Entregue: 'order_delivered'
    }

    if (statusTemplateMap[newStatus]) {
      const newMessage: Message = {
        id: Math.max(...messages.map((m) => m.id), 0) + 1,
        order_id: orderId,
        template_name: statusTemplateMap[newStatus],
        status: 'sent',
        timestamp: new Date().toISOString()
      }

      setMessages((prev) => [...prev, newMessage])

      addNotification({
        type: 'success',
        message: `Pedido #${orderId} ${newStatus.toLowerCase()} e mensagem enviada.`
      })
    }
  }

  const cancelOrder = async (orderId: number, reason: string) => {
    const success = await simulateApiCall()

    if (!success) {
      throw new Error(`Failed to cancel order ${orderId}`)
    }

    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status: 'Cancelado', cancel_reason: reason } : order))
    )

    const newMessage: Message = {
      id: Math.max(...messages.map((m) => m.id), 0) + 1,
      order_id: orderId,
      template_name: 'order_canceled',
      status: 'sent',
      timestamp: new Date().toISOString()
    }

    setMessages((prev) => [...prev, newMessage])

    addNotification({
      type: 'warning',
      message: `Pedido #${orderId} cancelado. Motivo: ${reason}`
    })
  }

  const updateMenuItem = (item: MenuItem) => {
    setMenuItems((prev) => prev.map((menuItem) => (menuItem.id === item.id ? { ...item } : menuItem)))

    addNotification({
      type: 'success',
      message: `Item "${item.name}" atualizado com sucesso.`
    })
  }

  const createMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem = {
      ...item,
      id: Math.max(...menuItems.map((m) => m.id), 0) + 1,
      restaurant_id: 1
    }

    setMenuItems((prev) => [...prev, newItem])

    addNotification({
      type: 'success',
      message: `Item "${item.name}" criado com sucesso.`
    })
  }

  const deleteMenuItem = (id: number) => {
    const itemToDelete = menuItems.find((item) => item.id === id)

    setMenuItems((prev) => prev.filter((item) => item.id !== id))

    if (itemToDelete) {
      addNotification({
        type: 'info',
        message: `Item "${itemToDelete.name}" removido.`
      })
    }
  }

  const applyBulkDiscount = (itemIds: number[], discount: number) => {
    setMenuItems((prev) => prev.map((item) => (itemIds.includes(item.id) ? { ...item, discount } : item)))

    addNotification({
      type: 'success',
      message: `Desconto de ${discount}% aplicado a ${itemIds.length} itens.`
    })
  }

  const updateSettings = (newSettings: Settings) => {
    setSettings(newSettings)

    // Update theme color
    document.documentElement.style.setProperty('--theme-color', newSettings.theme_color)

    addNotification({
      type: 'success',
      message: 'Configurações salvas com sucesso.'
    })
  }

  const resendMessage = async (messageId: number) => {
    const success = await simulateApiCall(0.9)

    if (!success) {
      throw new Error(`Failed to resend message ${messageId}`)
    }

    setMessages((prev) =>
      prev.map((message) =>
        message.id === messageId ? { ...message, status: 'sent', timestamp: new Date().toISOString() } : message
      )
    )

    addNotification({
      type: 'success',
      message: 'Mensagem reenviada com sucesso.'
    })
  }

  return (
    <AppContext.Provider
      value={{
        orders,
        menuItems,
        settings,
        messages,
        notifications,
        operationStatus,
        operationStartTime,
        operationReports,
        completedMissions,
        updateOrderStatus,
        cancelOrder,
        updateMenuItem,
        createMenuItem,
        deleteMenuItem,
        applyBulkDiscount,
        updateSettings,
        resendMessage,
        addNotification,
        removeNotification,
        startOperation,
        pauseOperation,
        endOperation,
        generateReport,
        completeMission
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
