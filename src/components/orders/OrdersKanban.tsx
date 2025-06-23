import React, { useContext, useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';
import OrderCard from './OrderCard';
import StatusConfirmModal from './StatusConfirmModal';
import OrderDetailModal from './OrderDetailModal';

const columnsOrder = ['Recebido', 'Confirmado', 'Em Produção', 'Pronto', 'Saiu para Entrega', 'Entregue'];
const columnColors = {
  'Recebido': 'from-warning-50 to-warning-100 border-warning-500',
  'Confirmado': 'from-info-50 to-info-100 border-info-500',
  'Em Produção': 'from-purple-50 to-purple-100 border-purple-500',
  'Pronto': 'from-accent-2-50 to-accent-2-100 border-accent-2-500',
  'Saiu para Entrega': 'from-primary-50 to-primary-100 border-primary-500',
  'Entregue': 'from-gray-50 to-gray-100 border-gray-500'
};

export default function OrdersKanban() {
  const { orders, updateOrderStatus } = useContext(AppContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingStatusChange, setPendingStatusChange] = useState<{
    orderId: number;
    newStatus: string;
    orderData?: any;
  } | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  
  const location = useLocation();

  // Handle opening order modal from search
  useEffect(() => {
    if (location.state?.openOrderId) {
      setSelectedOrderId(location.state.openOrderId);
      // Clear the state to prevent reopening on subsequent visits
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleStatusChange = (orderId: number, newStatus: string) => {
    const order = orders.find(o => o.id === orderId);
    setPendingStatusChange({ orderId, newStatus, orderData: order });
    setShowConfirmModal(true);
  };

  const confirmStatusChange = async () => {
    if (!pendingStatusChange) return;
    
    setIsProcessing(true);
    setErrorMessage(null);
    
    try {
      await updateOrderStatus(pendingStatusChange.orderId, pendingStatusChange.newStatus);
      setShowConfirmModal(false);
      setPendingStatusChange(null);
    } catch (error) {
      console.error('Failed to update order status:', error);
      setErrorMessage(`Falha ao atualizar status do pedido #${pendingStatusChange.orderId}. Clique para tentar novamente.`);
    } finally {
      setIsProcessing(false);
    }
  };

  const onDragEnd = async (result: any) => {
    const { source, destination, draggableId } = result;
    
    // Dropped outside a valid droppable
    if (!destination) return;
    
    // Dropped in the same column
    if (source.droppableId === destination.droppableId) return;
    
    const orderId = parseInt(draggableId);
    const newStatus = columnsOrder[parseInt(destination.droppableId)];
    
    handleStatusChange(orderId, newStatus);
  };
  
  const retryStatusUpdate = async (orderId: number, newStatus: string) => {
    setIsProcessing(true);
    setErrorMessage(null);
    
    try {
      await updateOrderStatus(orderId, newStatus);
    } catch (error) {
      console.error('Failed to retry update:', error);
      setErrorMessage(`Falha ao atualizar status. Por favor tente novamente mais tarde.`);
    } finally {
      setIsProcessing(false);
    }
  };

  // Include canceled orders in a separate section
  const allOrders = orders.filter(order => order.status !== 'Cancelado');
  const canceledOrders = orders.filter(order => order.status === 'Cancelado');

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-section font-bold text-text-primary">Pedidos</h1>
      </div>
      
      {errorMessage && (
        <div 
          className="toast-error mb-4 cursor-pointer"
          onClick={() => setErrorMessage(null)}
        >
          {errorMessage}
        </div>
      )}
      
      <div className="flex space-x-4 overflow-x-auto pb-4">
        <DragDropContext onDragEnd={onDragEnd}>
          {columnsOrder.map((colName, index) => (
            <Droppable key={colName} droppableId={index.toString()}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`w-72 rounded-sm bg-gradient-to-b ${columnColors[colName]} p-3 flex-shrink-0 border border-black
                    ${snapshot.isDraggingOver ? 'ring-2 ring-primary-500 shadow-lg' : ''} transition-all duration-200`}
                >
                  <h3 className="text-center font-semibold mb-3 p-2 bg-bg-dark rounded-sm shadow-sm text-text-primary border border-black text-nav">
                    {colName} ({allOrders.filter(o => o.status === colName).length})
                  </h3>
                  <div className="space-y-2 min-h-[200px]">
                    {allOrders
                      .filter(order => order.status === colName)
                      .map((order, idx) => (
                        <Draggable 
                          key={order.id.toString()} 
                          draggableId={order.id.toString()} 
                          index={idx}
                          isDragDisabled={isProcessing}
                        >
                          {(provided, snapshot) => (
                            <OrderCard
                              order={order}
                              provided={provided}
                              snapshot={snapshot}
                              onStatusChange={handleStatusChange}
                              canAdvance={index < columnsOrder.length - 1}
                              nextStatus={index < columnsOrder.length - 1 ? columnsOrder[index + 1] : null}
                            />
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
        
        {/* Canceled Orders Section */}
        {canceledOrders.length > 0 && (
          <div className="w-72 rounded-sm bg-gradient-to-b from-error-50 to-error-100 border border-error-500 p-3 flex-shrink-0">
            <h3 className="text-center font-semibold mb-3 p-2 bg-bg-dark rounded-sm shadow-sm text-error-700 border border-black text-nav">
              Cancelados ({canceledOrders.length})
            </h3>
            <div className="space-y-2 min-h-[200px]">
              {canceledOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  provided={null}
                  snapshot={null}
                  onStatusChange={handleStatusChange}
                  canAdvance={false}
                  nextStatus={null}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {showConfirmModal && pendingStatusChange && (
        <StatusConfirmModal
          order={pendingStatusChange.orderData}
          newStatus={pendingStatusChange.newStatus}
          onConfirm={confirmStatusChange}
          onCancel={() => {
            setShowConfirmModal(false);
            setPendingStatusChange(null);
          }}
          isProcessing={isProcessing}
        />
      )}

      {selectedOrderId && (
        <OrderDetailModal
          order={orders.find(o => o.id === selectedOrderId)!}
          onClose={() => setSelectedOrderId(null)}
        />
      )}
    </div>
  );
}