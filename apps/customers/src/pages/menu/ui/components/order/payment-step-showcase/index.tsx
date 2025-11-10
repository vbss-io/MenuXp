import { useState } from 'react'

import { PaymentStep } from '@/components/order/checkout-slide-view/payment-step'
import { OperationType, PaymentMethod } from '@/types/order'

import * as S from '../../styles'

const mockClient = {
  id: '1',
  name: 'João Silva',
  phone: '11987654321',
  restaurantId: '1',
  address: {
    street: 'Rua das Flores',
    number: '123',
    complement: 'Apto 45',
    neighborhood: 'Centro',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01234-567'
  },
  createdAt: new Date(),
  updatedAt: new Date()
}

export const PaymentStepShowcase = () => {
  const [guestPhone1, setGuestPhone1] = useState('')
  const [guestName1, setGuestName1] = useState('')
  const [, setPhoneVerified1] = useState(false)
  const [, setIsNewClient1] = useState(false)
  const [orderType1, setOrderType1] = useState<OperationType>(OperationType.DELIVERY)
  const [paymentMethod1, setPaymentMethod1] = useState<PaymentMethod>(PaymentMethod.DINHEIRO)
  const [isScheduled1, setIsScheduled1] = useState(false)
  const [scheduledDate1, setScheduledDate1] = useState('')
  const [scheduledTime1, setScheduledTime1] = useState('')

  const [guestPhone2, setGuestPhone2] = useState('')
  const [guestName2, setGuestName2] = useState('')
  const [, setPhoneVerified2] = useState(false)
  const [, setIsNewClient2] = useState(false)
  const [orderType2, setOrderType2] = useState<OperationType>(OperationType.DELIVERY)
  const [paymentMethod2, setPaymentMethod2] = useState<PaymentMethod>(PaymentMethod.PIX)
  const [isScheduled2, setIsScheduled2] = useState(false)
  const [scheduledDate2, setScheduledDate2] = useState('')
  const [scheduledTime2, setScheduledTime2] = useState('')

  const [orderType3, setOrderType3] = useState<OperationType>(OperationType.BALCAO)
  const [paymentMethod3, setPaymentMethod3] = useState<PaymentMethod>(PaymentMethod.CARTAO_CREDITO)
  const [isScheduled3, setIsScheduled3] = useState(false)
  const [scheduledDate3, setScheduledDate3] = useState('')
  const [scheduledTime3, setScheduledTime3] = useState('')

  const [orderType4, setOrderType4] = useState<OperationType>(OperationType.DELIVERY)
  const [paymentMethod4, setPaymentMethod4] = useState<PaymentMethod>(PaymentMethod.CARTAO_DEBITO)
  const [isScheduled4, setIsScheduled4] = useState(true)
  const [scheduledDate4, setScheduledDate4] = useState('2025-12-15')
  const [scheduledTime4, setScheduledTime4] = useState('19:30')

  const [guestPhone5, setGuestPhone5] = useState('')
  const [guestName5, setGuestName5] = useState('')
  const [, setPhoneVerified5] = useState(false)
  const [, setIsNewClient5] = useState(false)
  const [orderType5, setOrderType5] = useState<OperationType>(OperationType.MESA)
  const [paymentMethod5, setPaymentMethod5] = useState<PaymentMethod>(PaymentMethod.PIX)
  const [isScheduled5, setIsScheduled5] = useState(false)
  const [scheduledDate5, setScheduledDate5] = useState('')
  const [scheduledTime5, setScheduledTime5] = useState('')

  const [orderType6, setOrderType6] = useState<OperationType>(OperationType.DELIVERY)
  const [paymentMethod6, setPaymentMethod6] = useState<PaymentMethod>(PaymentMethod.DINHEIRO)
  const [isScheduled6, setIsScheduled6] = useState(true)
  const [scheduledDate6, setScheduledDate6] = useState('2025-12-20')
  const [scheduledTime6, setScheduledTime6] = useState('12:00')

  return (
    <S.ShowcaseContainer>
      <S.Label>PaymentStep - Guest User with Delivery</S.Label>
      <S.ShowcaseGrid>
        <div style={{ maxWidth: '500px', width: '100%' }}>
          <PaymentStep
            client={null}
            orderType={orderType1}
            paymentMethod={paymentMethod1}
            isScheduled={isScheduled1}
            scheduledDate={scheduledDate1}
            scheduledTime={scheduledTime1}
            canAcceptImmediateOrders={true}
            canAcceptScheduledOrders={true}
            mustSchedule={false}
            guestPhone={guestPhone1}
            guestName={guestName1}
            onOrderTypeChange={setOrderType1}
            onPaymentMethodChange={setPaymentMethod1}
            onIsScheduledChange={setIsScheduled1}
            onScheduledDateChange={setScheduledDate1}
            onScheduledTimeChange={setScheduledTime1}
            onGuestPhoneChange={setGuestPhone1}
            onGuestNameChange={setGuestName1}
            onPhoneVerified={setPhoneVerified1}
            onIsNewClient={setIsNewClient1}
          />
        </div>
      </S.ShowcaseGrid>
      <S.Label>PaymentStep - Guest User with PIX Payment</S.Label>
      <S.ShowcaseGrid>
        <div style={{ maxWidth: '500px', width: '100%' }}>
          <PaymentStep
            client={null}
            orderType={orderType2}
            paymentMethod={paymentMethod2}
            isScheduled={isScheduled2}
            scheduledDate={scheduledDate2}
            scheduledTime={scheduledTime2}
            canAcceptImmediateOrders={true}
            canAcceptScheduledOrders={false}
            mustSchedule={false}
            guestPhone={guestPhone2}
            guestName={guestName2}
            onOrderTypeChange={setOrderType2}
            onPaymentMethodChange={setPaymentMethod2}
            onIsScheduledChange={setIsScheduled2}
            onScheduledDateChange={setScheduledDate2}
            onScheduledTimeChange={setScheduledTime2}
            onGuestPhoneChange={setGuestPhone2}
            onGuestNameChange={setGuestName2}
            onPhoneVerified={setPhoneVerified2}
            onIsNewClient={setIsNewClient2}
          />
        </div>
      </S.ShowcaseGrid>
      <S.Label>PaymentStep - Logged User with Pickup</S.Label>
      <S.ShowcaseGrid>
        <div style={{ maxWidth: '500px', width: '100%' }}>
          <PaymentStep
            client={mockClient}
            orderType={orderType3}
            paymentMethod={paymentMethod3}
            isScheduled={isScheduled3}
            scheduledDate={scheduledDate3}
            scheduledTime={scheduledTime3}
            canAcceptImmediateOrders={true}
            canAcceptScheduledOrders={true}
            mustSchedule={false}
            guestPhone=""
            guestName=""
            onOrderTypeChange={setOrderType3}
            onPaymentMethodChange={setPaymentMethod3}
            onIsScheduledChange={setIsScheduled3}
            onScheduledDateChange={setScheduledDate3}
            onScheduledTimeChange={setScheduledTime3}
            onGuestPhoneChange={() => {}}
            onGuestNameChange={() => {}}
            onPhoneVerified={() => {}}
            onIsNewClient={() => {}}
          />
        </div>
      </S.ShowcaseGrid>
      <S.Label>PaymentStep - Logged User with Scheduled Delivery</S.Label>
      <S.ShowcaseGrid>
        <div style={{ maxWidth: '500px', width: '100%' }}>
          <PaymentStep
            client={mockClient}
            orderType={orderType4}
            paymentMethod={paymentMethod4}
            isScheduled={isScheduled4}
            scheduledDate={scheduledDate4}
            scheduledTime={scheduledTime4}
            canAcceptImmediateOrders={true}
            canAcceptScheduledOrders={true}
            mustSchedule={false}
            guestPhone=""
            guestName=""
            onOrderTypeChange={setOrderType4}
            onPaymentMethodChange={setPaymentMethod4}
            onIsScheduledChange={setIsScheduled4}
            onScheduledDateChange={setScheduledDate4}
            onScheduledTimeChange={setScheduledTime4}
            onGuestPhoneChange={() => {}}
            onGuestNameChange={() => {}}
            onPhoneVerified={() => {}}
            onIsNewClient={() => {}}
          />
        </div>
      </S.ShowcaseGrid>
      <S.Label>PaymentStep - Guest User with Dine-in</S.Label>
      <S.ShowcaseGrid>
        <div style={{ maxWidth: '500px', width: '100%' }}>
          <PaymentStep
            client={null}
            orderType={orderType5}
            paymentMethod={paymentMethod5}
            isScheduled={isScheduled5}
            scheduledDate={scheduledDate5}
            scheduledTime={scheduledTime5}
            canAcceptImmediateOrders={true}
            canAcceptScheduledOrders={false}
            mustSchedule={false}
            guestPhone={guestPhone5}
            guestName={guestName5}
            onOrderTypeChange={setOrderType5}
            onPaymentMethodChange={setPaymentMethod5}
            onIsScheduledChange={setIsScheduled5}
            onScheduledDateChange={setScheduledDate5}
            onScheduledTimeChange={setScheduledTime5}
            onGuestPhoneChange={setGuestPhone5}
            onGuestNameChange={setGuestName5}
            onPhoneVerified={setPhoneVerified5}
            onIsNewClient={setIsNewClient5}
          />
        </div>
      </S.ShowcaseGrid>
      <S.Label>PaymentStep - Restaurant Closed (Must Schedule)</S.Label>
      <S.ShowcaseGrid>
        <div style={{ maxWidth: '500px', width: '100%' }}>
          <PaymentStep
            client={mockClient}
            orderType={orderType6}
            paymentMethod={paymentMethod6}
            isScheduled={isScheduled6}
            scheduledDate={scheduledDate6}
            scheduledTime={scheduledTime6}
            canAcceptImmediateOrders={false}
            canAcceptScheduledOrders={true}
            mustSchedule={true}
            guestPhone=""
            guestName=""
            onOrderTypeChange={setOrderType6}
            onPaymentMethodChange={setPaymentMethod6}
            onIsScheduledChange={setIsScheduled6}
            onScheduledDateChange={setScheduledDate6}
            onScheduledTimeChange={setScheduledTime6}
            onGuestPhoneChange={() => {}}
            onGuestNameChange={() => {}}
            onPhoneVerified={() => {}}
            onIsNewClient={() => {}}
          />
        </div>
      </S.ShowcaseGrid>
    </S.ShowcaseContainer>
  )
}
