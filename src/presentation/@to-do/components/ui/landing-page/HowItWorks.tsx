// To-Do: Refatorar styles and remove tailwind
import { motion } from 'framer-motion'
import {
  AlertTriangle,
  Check,
  Clock,
  CreditCard,
  MapPin,
  MessageSquare,
  Play,
  QrCode,
  ShoppingCart,
  Trello,
  Truck,
  User,
  UtensilsCrossed,
  X
} from 'lucide-react'
import React, { useEffect, useMemo, useState } from 'react'

type StatusKey = 'pendente' | 'recebido' | 'em_preparo' | 'pronto' | 'saiu_entrega' | 'entregue' | 'cancelado'

type Order = {
  id: number
  customer: string
  status: StatusKey
  itemsSummary: string // "1 X-Burger, 2 Refrigerantes"
  notes?: string[] // ["SEM CEBOLA", "Alergia: lactose"]
  receivedAt: string // ISO (ex: new Date().toISOString())
  eta?: string // Previsão (ISO)
  payment: 'cartao' | 'pix' | 'dinheiro' | 'pendente'
  place: { type: 'mesa' | 'balcao' | 'delivery'; label: string } // "Mesa 04"
}

const STATUS_META: Record<StatusKey, { title: string; header: string; dot: string }> = {
  pendente: { title: 'Pendente', header: 'bg-red-100 border-red-300', dot: 'bg-red-500' },
  recebido: { title: 'Recebido', header: 'bg-amber-100 border-amber-300', dot: 'bg-amber-500' },
  em_preparo: { title: 'Em Preparo', header: 'bg-yellow-100 border-yellow-300', dot: 'bg-yellow-500' },
  pronto: { title: 'Pronto', header: 'bg-green-100 border-green-300', dot: 'bg-green-500' },
  saiu_entrega: { title: 'Saiu p/ Entrega', header: 'bg-blue-100 border-blue-300', dot: 'bg-blue-500' },
  entregue: { title: 'Entregue', header: 'bg-emerald-100 border-emerald-300', dot: 'bg-emerald-500' },
  cancelado: { title: 'Cancelado', header: 'bg-gray-200 border-gray-300', dot: 'bg-gray-500' }
}

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <QrCode className="w-6 h-6" />,
      title: 'Cliente escaneia o QR ou acessa sua URL',
      description: 'Sem login, diminui fricção com cliente resultando em maior chance de venda.'
    },
    {
      icon: <ShoppingCart className="w-6 h-6" />,
      title: 'Checkout rápido',
      description: 'Pagamento online ou na retirada/entrega.'
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'Acompanhamento em tempo real',
      description: 'O cliente recebe um link único por WhatsApp/SMS e acompanha seu pedido.'
    },
    {
      icon: <Trello className="w-6 h-6" />,
      title: 'Gestão Completa',
      description: 'Pendente → Recebido → Em preparo → Pronto → Saiu p/ entrega → Entregue → Cancelado.'
    }
  ]

  // ---- DEMO: dados de pedidos (mock) ----
  const initialOrders: Order[] = useMemo(
    () => [
      {
        id: 3021,
        customer: 'João Silva',
        status: 'pendente',
        itemsSummary: '1 X-Burger, 2 Refrigerantes',
        notes: ['SEM CEBOLA', 'Alergia: lactose'],
        receivedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 min atrás
        eta: new Date(Date.now() + 20 * 60 * 1000).toISOString(),
        payment: 'cartao',
        place: { type: 'mesa', label: 'Mesa 04' }
      },
      {
        id: 3022,
        customer: 'Maria Souza',
        status: 'recebido',
        itemsSummary: '1 Pizza M, 1 Suco',
        notes: ['Borda recheada'],
        receivedAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
        eta: new Date(Date.now() + 25 * 60 * 1000).toISOString(),
        payment: 'pix',
        place: { type: 'balcao', label: 'Retirada no balcão' }
      },
      {
        id: 3023,
        customer: 'Carlos Pereira',
        status: 'em_preparo',
        itemsSummary: '1 Salada Caesar, 1 Água',
        notes: ['Pouco molho'],
        receivedAt: new Date(Date.now() - 22 * 60 * 1000).toISOString(),
        eta: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
        payment: 'pendente',
        place: { type: 'delivery', label: 'Delivery' }
      },
      {
        id: 3024,
        customer: 'Ana Lima',
        status: 'pronto',
        itemsSummary: '2 Açaí G',
        notes: ['Granola separada'],
        receivedAt: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
        eta: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        payment: 'cartao',
        place: { type: 'balcao', label: 'Retirada no balcão' }
      },
      {
        id: 3025,
        customer: 'Bruno Rocha',
        status: 'saiu_entrega',
        itemsSummary: '1 Yakisoba, 1 Chá Gelado',
        notes: ['Pimenta média'],
        receivedAt: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
        eta: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
        payment: 'cartao',
        place: { type: 'delivery', label: 'Delivery' }
      },
      {
        id: 3026,
        customer: 'Luiza Martins',
        status: 'entregue',
        itemsSummary: '1 Combo Família',
        receivedAt: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
        eta: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        payment: 'pix',
        place: { type: 'delivery', label: 'Delivery' }
      },
      {
        id: 3027,
        customer: 'Rafael Dias',
        status: 'cancelado',
        itemsSummary: '1 Espresso',
        notes: ['Cliente solicitou cancelamento'],
        receivedAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
        payment: 'pendente',
        place: { type: 'mesa', label: 'Mesa 02' }
      }
    ],
    []
  )

  // Tick a cada 1 min p/ atualizar "tempo decorrido"
  const [, setNow] = useState(Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 60 * 1000)
    return () => clearInterval(t)
  }, [])

  const formatTime = (iso?: string) =>
    iso ? new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'

  const diffMinutes = (fromIso: string) => Math.max(0, Math.floor((Date.now() - new Date(fromIso).getTime()) / 60000))

  const columns: { key: StatusKey; title: string }[] = [
    { key: 'pendente', title: 'Pendente' },
    { key: 'recebido', title: 'Recebido' },
    { key: 'em_preparo', title: 'Em Preparo' },
    { key: 'pronto', title: 'Pronto' },
    { key: 'saiu_entrega', title: 'Saiu p/ Entrega' },
    { key: 'entregue', title: 'Entregue' },
    { key: 'cancelado', title: 'Cancelado' }
  ]

  // ---- UI helpers ----
  const PaymentPill: React.FC<{ payment: Order['payment'] }> = ({ payment }) => {
    const map = {
      cartao: { label: 'Cartão ✓', cls: 'bg-emerald-100 text-emerald-700 border-emerald-300' },
      pix: { label: 'PIX ✓', cls: 'bg-emerald-100 text-emerald-700 border-emerald-300' },
      dinheiro: { label: 'Dinheiro', cls: 'bg-slate-100 text-slate-700 border-slate-300' },
      pendente: { label: 'Pagamento pendente', cls: 'bg-red-100 text-red-700 border-red-300' }
    } as const
    const m = map[payment]
    return (
      <span className={`inline-flex items-center px-2 py-0.5 text-[11px] rounded-full border ${m.cls}`}>{m.label}</span>
    )
  }

  const PlaceBadge: React.FC<{ place: Order['place'] }> = ({ place }) => {
    const icon =
      place.type === 'mesa' ? (
        <UtensilsCrossed className="w-3.5 h-3.5" />
      ) : place.type === 'balcao' ? (
        <User className="w-3.5 h-3.5" />
      ) : (
        <Truck className="w-3.5 h-3.5" />
      )
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] rounded-full border bg-slate-100 text-slate-700 border-slate-300">
        {icon}
        {place.label}
      </span>
    )
  }

  const OrderCard: React.FC<{ order: Order }> = ({ order }) => {
    const meta = STATUS_META[order.status]
    const elapsed = diffMinutes(order.receivedAt)
    const etaLabel = order.eta ? formatTime(order.eta) : undefined

    // Ações (demo): só logs/confirm; em app real, dispararia event/handler
    const handleAction = (type: 'start' | 'done' | 'cancel') => {
      if (type === 'cancel' && !confirm('Confirmar cancelamento do pedido?')) return
      // eslint-disable-next-line no-console
      console.log('Ação', type, 'no pedido', order.id)
    }

    return (
      <div className="rounded-lg border border-black/10 bg-white shadow-sm overflow-hidden w-full">
        {/* Header colorido conforme status */}
        <div className={`px-3 py-2 border-b ${meta.header} flex items-center justify-between`}>
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className={`w-2 h-2 rounded-full ${meta.dot}`} />
            <span className="uppercase tracking-wide">{meta.title}</span>
          </div>
          <span className="text-[11px] text-black/70">#{order.id}</span>
        </div>

        {/* Corpo */}
        <div className="p-3 space-y-3">
          {/* Cliente (ID removido aqui, já aparece no topo) */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium">
              <User className="w-4 h-4 text-black/70" />
              <span>{order.customer}</span>
            </div>
            <PlaceBadge place={order.place} />
          </div>

          {/* Itens + observações */}
          <div className="space-y-1 w-full">
            <div className="flex items-start gap-2 text-sm w-full">
              <ShoppingCart className="w-4 h-4 text-black/60 mt-0.5 flex-shrink-0" />
              <p className="text-black/80 break-words">{order.itemsSummary}</p>
            </div>
            {order.notes && order.notes.length > 0 && (
              <div className="flex flex-wrap gap-1 pl-6 w-full">
                {order.notes.map((n, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded bg-yellow-50 border border-yellow-200 text-[11px] font-semibold tracking-wide break-words"
                  >
                    {n.toUpperCase()}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Horários */}
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-black/60" />
              <div>
                <p className="font-semibold leading-4">Recebido</p>
                <p className="text-black/60 leading-4">{formatTime(order.receivedAt)}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-black/60" />
              <div>
                <p className="font-semibold leading-4">Decorrido</p>
                <p className="text-black/60 leading-4">{elapsed} min</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-black/60" />
              <div>
                <p className="font-semibold leading-4">Previsão</p>
                <p className="text-black/60 leading-4">{etaLabel ?? '—'}</p>
              </div>
            </div>
          </div>

          {/* Contexto */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2 flex-shrink-0">
              <CreditCard className="w-4 h-4 text-black/60" />
              <PaymentPill payment={order.payment} />
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <MapPin className="w-4 h-4 text-black/60" />
              <span className="text-xs text-black/70 break-words">{order.place.label}</span>
            </div>
          </div>

          {/* Ações */}
          <div className="flex flex-wrap gap-2 pt-1 w-full">
            {/* Exemplo de regras simples por status */}
            {order.status === 'pendente' && (
              <button
                onClick={() => handleAction('start')}
                className="btn-brut !py-1 !px-2 text-xs inline-flex items-center gap-1"
              >
                <Play className="w-3.5 h-3.5" /> Iniciar
              </button>
            )}
            {['recebido', 'em_preparo'].includes(order.status) && (
              <button
                onClick={() => handleAction('done')}
                className="btn-brut !py-1 !px-2 text-xs inline-flex items-center gap-1"
              >
                <Check className="w-3.5 h-3.5" /> Concluir
              </button>
            )}
            {['pronto'].includes(order.status) && (
              <button
                onClick={() => handleAction('done')}
                className="btn-brut !py-1 !px-2 text-xs inline-flex items-center gap-1"
              >
                <Truck className="w-3.5 h-3.5" /> Enviar
              </button>
            )}
            {!['entregue', 'cancelado'].includes(order.status) && (
              <button
                onClick={() => handleAction('cancel')}
                className="btn-brut white !py-1 !px-2 text-xs inline-flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" /> Cancelar
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  const ordersByStatus = (status: StatusKey) => initialOrders.filter((o) => o.status === status)

  return (
    <section id="kanban" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Steps */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-title text-3xl sm:text-4xl font-regular text-black mb-8">
              Fluxo simples, resultados poderosos
            </h3>

            <div className="space-y-6">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex space-x-4"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[var(--mx-red)] rounded-full border border-black flex items-center justify-center text-white">
                      {step.icon}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-body font-semibold text-lg text-black mb-2">
                      {index + 1}. {step.title}
                    </h4>
                    <p className="font-body text-gray-600">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Kanban Mock (7 colunas, responsivo) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full"
          >
            <div className="brut-card p-6 bg-white w-full">
              <h4 className="font-title text-xl font-regular text-center mb-4">Gestão de Pedidos</h4>

              {/* wrapper responsivo com scroll horizontal no mobile */}
              <div className="w-full overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]">
                <div className="grid grid-flow-col auto-cols-[280px] sm:auto-cols-[320px] gap-4 snap-x snap-mandatory w-full">
                  {columns.map((col) => (
                    <div key={col.key} className="space-y-2 snap-start w-full">
                      <div className={`rounded-lg p-2 text-center border ${STATUS_META[col.key].header}`}>
                        <h5 className="font-body font-semibold text-sm">{col.title}</h5>
                      </div>

                      <div className="space-y-3">
                        {ordersByStatus(col.key).length === 0 && (
                          <div className="text-center text-xs text-black/50 py-4 border rounded-lg bg-slate-50">
                            Sem pedidos
                          </div>
                        )}
                        {ordersByStatus(col.key).map((order) => (
                          <OrderCard key={order.id} order={order} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* legenda rápida de cores */}
              <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-black/70">
                <span className="inline-flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-red-500" /> Pendente
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-yellow-500" /> Preparo
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-green-500" /> Pronto
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
