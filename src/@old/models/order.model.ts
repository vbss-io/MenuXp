import type { OrderItem } from '@/@old/models/order-item.model'

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
