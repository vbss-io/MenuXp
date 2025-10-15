import { ChatCircleIcon, KanbanIcon, QrCodeIcon, ShoppingCartIcon } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import React from 'react'

import * as S from './styles'

interface Step {
  icon: React.ReactNode
  title: string
  description: string
}

const HowItWorks: React.FC = () => {
  const steps: Step[] = [
    {
      icon: <QrCodeIcon size={24} weight="fill" />,
      title: 'Cliente escaneia o QR ou acessa sua URL',
      description: 'Sem login, diminui fricção com cliente resultando em maior chance de venda.'
    },
    {
      icon: <ShoppingCartIcon size={24} weight="fill" />,
      title: 'Checkout rápido',
      description: 'Pagamento online ou na retirada/entrega.'
    },
    {
      icon: <ChatCircleIcon size={24} weight="fill" />,
      title: 'Acompanhamento em tempo real',
      description: 'O cliente recebe um link único por WhatsApp/SMS e acompanha seu pedido.'
    },
    {
      icon: <KanbanIcon size={24} weight="fill" />,
      title: 'Gestão Completa',
      description: 'Pendente → Recebido → Em preparo → Pronto → Saiu p/ entrega → Entregue → Cancelado.'
    }
  ]

  const mockOrdersByStatus = {
    Pendente: [
      {
        id: 3021,
        customer: 'João Silva',
        phone: '(11) 99999-1111',
        status: 'Pendente',
        items: '1 X-Burger, 2 Refrigerantes',
        orderType: 'Mesa',
        paymentMethod: 'Cartão',
        total: 45.9,
        notes: 'Sem cebola'
      },
      {
        id: 3025,
        customer: 'Bruno Rocha',
        phone: '(11) 99999-5555',
        status: 'Pendente',
        items: '1 Combo Família',
        orderType: 'Delivery',
        paymentMethod: 'Cartão',
        total: 89.9,
        notes: 'Entregar após 19h'
      }
    ],
    Recebido: [
      {
        id: 3022,
        customer: 'Maria Souza',
        phone: '(11) 99999-2222',
        status: 'Recebido',
        items: '1 Pizza M, 1 Suco',
        orderType: 'Balcão',
        paymentMethod: 'PIX',
        total: 38.5
      }
    ],
    'Em Preparo': [
      {
        id: 3023,
        customer: 'Carlos Pereira',
        phone: '(11) 99999-3333',
        status: 'Em Preparo',
        items: '1 Salada Caesar, 1 Água',
        orderType: 'Delivery',
        paymentMethod: 'Dinheiro',
        total: 28.0,
        notes: 'Pouco molho'
      },
      {
        id: 3027,
        customer: 'Pedro Santos',
        phone: '(11) 99999-7777',
        status: 'Em Preparo',
        items: '1 Hambúrguer Artesanal',
        orderType: 'Balcão',
        paymentMethod: 'Cartão',
        total: 42.0
      }
    ],
    Pronto: [
      {
        id: 3024,
        customer: 'Ana Lima',
        phone: '(11) 99999-4444',
        status: 'Pronto',
        items: '2 Açaí G',
        orderType: 'Balcão',
        paymentMethod: 'PIX',
        total: 24.0
      },
      {
        id: 3028,
        customer: 'Fernanda Costa',
        phone: '(11) 99999-8888',
        status: 'Pronto',
        items: '1 Prato Executivo',
        orderType: 'Mesa',
        paymentMethod: 'PIX',
        total: 35.9
      }
    ]
  }

  const statusColumns = [
    { key: 'Pendente', title: 'Pendente', color: '#dc2626' },
    { key: 'Recebido', title: 'Recebido', color: '#d97706' },
    { key: 'Em Preparo', title: 'Em Preparo', color: '#d97706' },
    { key: 'Pronto', title: 'Pronto', color: '#16a34a' }
  ]

  return (
    <S.HowItWorksSection id="kanban">
      <S.HowItWorksContainer>
        <S.SectionHeader>
          <S.SectionTitle>Fluxo simples, resultados poderosos</S.SectionTitle>
          <S.SectionDescription>Veja como funciona nosso sistema de gestão de pedidos</S.SectionDescription>
        </S.SectionHeader>
        <S.StepsContainer>
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <S.StepItem>
                <S.StepIcon>{step.icon}</S.StepIcon>
                <S.StepContent>
                  <S.StepTitle>
                    {index + 1}. {step.title}
                  </S.StepTitle>
                  <S.StepDescription>{step.description}</S.StepDescription>
                </S.StepContent>
              </S.StepItem>
            </motion.div>
          ))}
        </S.StepsContainer>
        <S.KanbanSection>
          <S.KanbanTitle>Gestão de Pedidos</S.KanbanTitle>
          <S.KanbanContainer>
            <S.KanbanBoard>
              {statusColumns.map((column) => (
                <S.KanbanColumn key={column.key}>
                  <S.ColumnHeader>
                    <S.ColumnTitle $color={column.color}>{column.title}</S.ColumnTitle>
                    <S.ColumnCount>
                      {mockOrdersByStatus[column.key as keyof typeof mockOrdersByStatus].length}
                    </S.ColumnCount>
                  </S.ColumnHeader>
                  <S.ColumnContent>
                    {mockOrdersByStatus[column.key as keyof typeof mockOrdersByStatus].map((order) => (
                      <S.OrderCard key={order.id}>
                        <S.OrderCardHeader>
                          <S.OrderId>#{order.id}</S.OrderId>
                        </S.OrderCardHeader>

                        <S.OrderCardBody>
                          <S.OrderCustomer>
                            <S.CustomerName>{order.customer}</S.CustomerName>
                            <S.CustomerPhone>{order.phone}</S.CustomerPhone>
                          </S.OrderCustomer>
                          <S.OrderItems>
                            <S.ItemsTitle>Itens:</S.ItemsTitle>
                            <S.ItemsList>{order.items}</S.ItemsList>
                          </S.OrderItems>
                          <S.OrderDetails>
                            <S.OrderDetail>
                              <S.DetailLabel>Tipo:</S.DetailLabel>
                              <S.DetailValue>{order.orderType}</S.DetailValue>
                            </S.OrderDetail>
                            <S.OrderDetail>
                              <S.DetailLabel>Pagamento:</S.DetailLabel>
                              <S.DetailValue>{order.paymentMethod}</S.DetailValue>
                            </S.OrderDetail>
                            <S.OrderDetail>
                              <S.DetailLabel>Total:</S.DetailLabel>
                              <S.DetailValue>R$ {order.total.toFixed(2)}</S.DetailValue>
                            </S.OrderDetail>
                          </S.OrderDetails>
                          {'notes' in order && order.notes && (
                            <S.OrderNotes>
                              <S.NotesLabel>Observações:</S.NotesLabel>
                              <S.NotesText>{order.notes}</S.NotesText>
                            </S.OrderNotes>
                          )}
                        </S.OrderCardBody>
                      </S.OrderCard>
                    ))}
                  </S.ColumnContent>
                </S.KanbanColumn>
              ))}
            </S.KanbanBoard>
          </S.KanbanContainer>
        </S.KanbanSection>
      </S.HowItWorksContainer>
    </S.HowItWorksSection>
  )
}

export default HowItWorks
