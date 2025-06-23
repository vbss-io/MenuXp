import React, { useState, useContext } from 'react';
import { X, MessageCircle, MapPin, User, CreditCard, Banknote, Smartphone, DollarSign } from 'lucide-react';
import { Order, AppContext } from '../../contexts/AppContext';

interface OrderDetailModalProps {
  order: Order;
  onClose: () => void;
}

export default function OrderDetailModal({ order, onClose }: OrderDetailModalProps) {
  const { cancelOrder } = useContext(AppContext);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const getOrderTypeDisplay = () => {
    switch (order.order_type) {
      case 'delivery':
        return { text: 'Delivery', icon: <MapPin className="h-5 w-5 text-info-600" /> };
      case 'mesa':
        return { text: `Mesa ${order.table_id}`, icon: <User className="h-5 w-5 text-accent-2-600" /> };
      case 'balcao':
        return { text: 'Balcão', icon: <User className="h-5 w-5 text-warning-600" /> };
      default:
        return { text: 'Não especificado', icon: <User className="h-5 w-5 text-gray-600" /> };
    }
  };

  const getPaymentMethodDisplay = () => {
    switch (order.payment_method) {
      case 'cartao_credito':
        return { text: 'Cartão de Crédito', icon: <CreditCard className="h-5 w-5 text-info-600" /> };
      case 'cartao_debito':
        return { text: 'Cartão de Débito', icon: <CreditCard className="h-5 w-5 text-accent-2-600" /> };
      case 'pix':
        return { text: 'PIX', icon: <Smartphone className="h-5 w-5 text-accent-600" /> };
      case 'dinheiro':
        return { text: 'Dinheiro', icon: <Banknote className="h-5 w-5 text-warning-600" /> };
      default:
        return { text: 'Não especificado', icon: <DollarSign className="h-5 w-5 text-gray-600" /> };
    }
  };

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(`Olá ${order.customer_name}, sobre seu pedido #${order.id}...`);
    const whatsappUrl = `https://wa.me/${order.customer_phone.replace(/\D/g, '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCancelOrder = async () => {
    if (!cancelReason.trim()) {
      alert('Por favor, informe o motivo do cancelamento.');
      return;
    }

    setIsProcessing(true);
    try {
      await cancelOrder(order.id, cancelReason);
      onClose();
    } catch (error) {
      console.error('Failed to cancel order:', error);
      alert('Erro ao cancelar pedido. Tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  const orderType = getOrderTypeDisplay();
  const paymentMethod = getPaymentMethodDisplay();

  return (
    <div className="modal-overlay">
      <div className="modal-content max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="modal-header flex justify-between items-center">
          <h2 className="text-body font-semibold text-text-primary">
            {showCancelConfirm ? 'Cancelar Pedido' : `Detalhes do Pedido #${order.id}`}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Fechar"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          {!showCancelConfirm ? (
            <>
              {/* Customer Info */}
              <div className="mb-6">
                <h3 className="text-body font-medium mb-3 text-text-primary">Informações do Cliente</h3>
                <div className="bg-bg-light p-4 rounded-sm border border-black">
                  <p className="text-body text-text-primary"><strong>Nome:</strong> {order.customer_name}</p>
                  <p className="text-body text-text-primary"><strong>Telefone:</strong> {order.customer_phone}</p>
                  {order.delivery_address && (
                    <p className="text-body text-text-primary"><strong>Endereço:</strong> {order.delivery_address}</p>
                  )}
                </div>
              </div>

              {/* Order Type and Payment */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-body font-medium mb-3 text-text-primary">Tipo de Pedido</h3>
                  <div className="bg-bg-light p-4 rounded-sm border border-black flex items-center">
                    {orderType.icon}
                    <span className="ml-2 font-medium text-text-primary text-body">{orderType.text}</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-body font-medium mb-3 text-text-primary">Forma de Pagamento</h3>
                  <div className="bg-bg-light p-4 rounded-sm border border-black flex items-center">
                    {paymentMethod.icon}
                    <span className="ml-2 font-medium text-text-primary text-body">{paymentMethod.text}</span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-6">
                <h3 className="text-body font-medium mb-3 text-text-primary">Itens do Pedido</h3>
                <div className="bg-bg-light p-4 rounded-sm border border-black">
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-body text-text-primary">{item.qty}× {item.name}</span>
                        <span className="font-medium text-body text-text-primary">R$ {(item.price * item.qty).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-black pt-2 mt-2">
                    <div className="flex justify-between items-center font-bold text-body">
                      <span className="text-text-primary">Total:</span>
                      <span className="text-text-primary">R$ {order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Status */}
              <div className="mb-6">
                <h3 className="text-body font-medium mb-3 text-text-primary">Status do Pedido</h3>
                <div className="bg-bg-light p-4 rounded-sm border border-black">
                  <span className={`inline-block px-3 py-1 rounded-sm text-subtitle font-medium border border-black ${
                    order.status === 'Recebido' ? 'status-received' :
                    order.status === 'Confirmado' ? 'status-confirmed' :
                    order.status === 'Em Produção' ? 'status-production' :
                    order.status === 'Pronto' ? 'status-ready' :
                    order.status === 'Saiu para Entrega' ? 'status-delivery' :
                    order.status === 'Entregue' ? 'status-delivered' :
                    'status-canceled'
                  }`}>
                    {order.status}
                  </span>
                  {order.cancel_reason && (
                    <div className="mt-2 text-subtitle text-error-600">
                      <strong>Motivo do cancelamento:</strong> {order.cancel_reason}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleWhatsAppContact}
                  className="btn-primary bg-accent-2-500 hover:bg-accent-2-600 flex-1 inline-flex items-center justify-center"
                >
                  <MessageCircle size={18} className="mr-2" />
                  Falar com Cliente
                </button>
                
                <button
                  onClick={onClose}
                  className="btn-secondary flex-1"
                >
                  Voltar
                </button>
              </div>

              {/* Cancel Order Link */}
              {order.status !== 'Cancelado' && order.status !== 'Entregue' && (
                <div className="mt-4 text-center">
                  <button
                    onClick={() => setShowCancelConfirm(true)}
                    className="text-error-600 hover:text-error-800 text-subtitle underline transition-colors"
                  >
                    Desejo cancelar este pedido
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Cancel Confirmation */
            <div className="text-center">
              <div className="mb-6">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-sm bg-error-100 mb-4 border border-black">
                  <X className="h-6 w-6 text-error-600" />
                </div>
                <h3 className="text-body font-medium text-text-primary mb-2">
                  Confirmar Cancelamento
                </h3>
                <p className="text-subtitle text-text-secondary mb-4">
                  O cliente será avisado sobre o cancelamento e esta operação é irreversível.
                </p>
              </div>

              <div className="mb-6">
                <label htmlFor="cancelReason" className="block text-subtitle font-medium text-text-primary mb-2">
                  Motivo do cancelamento:
                </label>
                <textarea
                  id="cancelReason"
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  rows={3}
                  className="input-base w-full"
                  placeholder="Descreva o motivo do cancelamento..."
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowCancelConfirm(false)}
                  className="btn-secondary flex-1"
                  disabled={isProcessing}
                >
                  Voltar
                </button>
                
                <button
                  onClick={handleCancelOrder}
                  disabled={isProcessing || !cancelReason.trim()}
                  className="btn-primary bg-error-500 hover:bg-error-600 flex-1"
                >
                  {isProcessing ? 'Cancelando...' : 'Confirmar Cancelamento'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}