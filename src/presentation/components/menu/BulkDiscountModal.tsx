import React, { useState, useContext } from 'react';
import { X, Percent } from 'lucide-react';
import { AppContext } from '@/presentation/contexts/AppContext';

interface BulkDiscountModalProps {
  selectedItems: number[];
  onClose: () => void;
}

export default function BulkDiscountModal({ selectedItems, onClose }: BulkDiscountModalProps) {
  const { menuItems, applyBulkDiscount } = useContext(AppContext);
  const [discount, setDiscount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedMenuItems = menuItems.filter(item => selectedItems.includes(item.id));

  const handleApplyDiscount = async () => {
    if (discount < 0 || discount > 100) {
      alert('O desconto deve estar entre 0% e 100%');
      return;
    }

    setIsProcessing(true);
    try {
      applyBulkDiscount(selectedItems, discount);
      onClose();
    } catch (error) {
      console.error('Failed to apply bulk discount:', error);
      alert('Erro ao aplicar desconto. Tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content max-w-md w-full">
        <div className="modal-header flex justify-between items-center">
          <h2 className="text-body font-semibold text-text-primary">Aplicar Desconto em Lote</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Fechar"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-body font-medium mb-3 text-text-primary">Itens Selecionados ({selectedItems.length})</h3>
            <div className="bg-bg-light p-4 rounded-sm border border-black max-h-40 overflow-y-auto">
              {selectedMenuItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-1">
                  <span className="text-subtitle text-text-primary">{item.name}</span>
                  <span className="text-subtitle text-text-secondary">R$ {item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="discount" className="block text-subtitle font-medium text-text-primary mb-2">
              Desconto (%)
            </label>
            <div className="relative">
              <input
                id="discount"
                type="number"
                min="0"
                max="100"
                step="1"
                value={discount}
                onChange={(e) => setDiscount(parseInt(e.target.value) || 0)}
                className="input-base w-full pr-10"
                placeholder="0"
              />
              <Percent className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            </div>
            <p className="mt-1 text-subtitle text-gray-500">
              Digite um valor entre 0% e 100%
            </p>
          </div>

          {discount > 0 && (
            <div className="mb-6 bg-accent-50 p-4 rounded-sm border border-black">
              <h4 className="font-medium text-accent-800 mb-2 text-subtitle">Prévia dos Preços</h4>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {selectedMenuItems.slice(0, 3).map((item) => {
                  const newPrice = item.price - (item.price * discount / 100);
                  return (
                    <div key={item.id} className="flex justify-between text-subtitle">
                      <span className="text-text-primary">{item.name}</span>
                      <span>
                        <span className="line-through text-gray-500">R$ {item.price.toFixed(2)}</span>
                        {' → '}
                        <span className="text-accent-600 font-medium">R$ {newPrice.toFixed(2)}</span>
                      </span>
                    </div>
                  );
                })}
                {selectedMenuItems.length > 3 && (
                  <div className="text-subtitle text-gray-500 text-center">
                    +{selectedMenuItems.length - 3} itens...
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              className="btn-secondary flex-1"
              disabled={isProcessing}
            >
              Cancelar
            </button>
            
            <button
              onClick={handleApplyDiscount}
              disabled={isProcessing || discount < 0 || discount > 100}
              className="btn-primary bg-accent-500 hover:bg-accent-600 flex-1 inline-flex items-center justify-center"
            >
              <Percent size={18} className="mr-2" />
              {isProcessing ? 'Aplicando...' : 'Aplicar Desconto'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}