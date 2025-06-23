import React, { useState, useEffect, useContext } from 'react';
import { X } from 'lucide-react';
import { AppContext, MenuItem } from '../../contexts/AppContext';

interface MenuModalFormProps {
  item: MenuItem | null;
  onClose: () => void;
}

const categories = [
  { id: 10, name: 'Principal' },
  { id: 11, name: 'Bebidas' },
  { id: 12, name: 'Sobremesas & Doces' },
  { id: 13, name: 'Combos e Promoções' },
  { id: 14, name: 'Complementos' }
];

export default function MenuModalForm({ item, onClose }: MenuModalFormProps) {
  const { updateMenuItem, createMenuItem } = useContext(AppContext);
  const [formData, setFormData] = useState<Omit<MenuItem, 'id' | 'restaurant_id'> & { id?: number, restaurant_id?: number }>({
    category_id: 10,
    name: '',
    price: 0,
    image_url: '',
    stock: 0,
    discount: 0
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  useEffect(() => {
    if (item) {
      setFormData({
        id: item.id,
        restaurant_id: item.restaurant_id,
        category_id: item.category_id,
        name: item.name,
        price: item.price,
        image_url: item.image_url,
        stock: item.stock,
        discount: item.discount
      });
    }
  }, [item]);

  function validateForm() {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name || formData.name.length < 3) {
      newErrors.name = "Nome precisa ter no mínimo 3 caracteres";
    }
    
    if (!formData.price || formData.price <= 0) {
      newErrors.price = "Preço precisa ser maior que zero";
    }
    
    if (formData.stock < 0) {
      newErrors.stock = "Estoque não pode ser negativo";
    }

    if (formData.discount < 0 || formData.discount > 100) {
      newErrors.discount = "Desconto deve estar entre 0% e 100%";
    }
    
    if (formData.image_url && 
        !formData.image_url.match(/\.(jpeg|jpg|gif|png)$/i) && 
        !formData.image_url.startsWith('http')) {
      newErrors.image_url = "URL de imagem inválida (deve ser .jpg, .png, .gif ou URL válida)";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value
    }));
    
    // Clear the error for this field when user edits
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (item?.id) {
      updateMenuItem(formData as MenuItem);
    } else {
      createMenuItem(formData);
    }
    
    onClose();
  }

  const finalPrice = formData.price - (formData.price * formData.discount / 100);

  return (
    <div className="modal-overlay">
      <div className="modal-content max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="modal-header flex justify-between items-center">
          <h2 className="text-body font-semibold text-text-primary">
            {item ? 'Editar Item' : 'Novo Item'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-subtitle font-medium text-text-primary mb-1">
              Nome
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className={`input-base w-full ${errors.name ? 'border-error-500' : ''}`}
            />
            {errors.name && <p className="mt-1 text-subtitle text-error-500">{errors.name}</p>}
          </div>
          
          <div>
            <label htmlFor="price" className="block text-subtitle font-medium text-text-primary mb-1">
              Preço (R$)
            </label>
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={handleChange}
              className={`input-base w-full ${errors.price ? 'border-error-500' : ''}`}
            />
            {errors.price && <p className="mt-1 text-subtitle text-error-500">{errors.price}</p>}
          </div>

          <div>
            <label htmlFor="discount" className="block text-subtitle font-medium text-text-primary mb-1">
              Desconto (%)
            </label>
            <input
              id="discount"
              name="discount"
              type="number"
              step="1"
              min="0"
              max="100"
              value={formData.discount}
              onChange={handleChange}
              className={`input-base w-full ${errors.discount ? 'border-error-500' : ''}`}
            />
            {errors.discount && <p className="mt-1 text-subtitle text-error-500">{errors.discount}</p>}
            {formData.discount > 0 && (
              <p className="mt-1 text-subtitle text-accent-2-600">
                Preço final: R$ {finalPrice.toFixed(2)}
              </p>
            )}
          </div>
          
          <div>
            <label htmlFor="stock" className="block text-subtitle font-medium text-text-primary mb-1">
              Estoque
            </label>
            <input
              id="stock"
              name="stock"
              type="number"
              step="1"
              min="0"
              value={formData.stock}
              onChange={handleChange}
              className={`input-base w-full ${errors.stock ? 'border-error-500' : ''}`}
            />
            {errors.stock && <p className="mt-1 text-subtitle text-error-500">{errors.stock}</p>}
          </div>
          
          <div>
            <label htmlFor="category_id" className="block text-subtitle font-medium text-text-primary mb-1">
              Categoria
            </label>
            <select
              id="category_id"
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className="select-base w-full"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="image_url" className="block text-subtitle font-medium text-text-primary mb-1">
              URL da Imagem
            </label>
            <input
              id="image_url"
              name="image_url"
              type="text"
              value={formData.image_url}
              onChange={handleChange}
              className={`input-base w-full ${errors.image_url ? 'border-error-500' : ''}`}
            />
            {errors.image_url && <p className="mt-1 text-subtitle text-error-500">{errors.image_url}</p>}
            
            {formData.image_url && !errors.image_url && (
              <div className="mt-2">
                <p className="text-subtitle text-gray-500 mb-1">Prévia:</p>
                <img 
                  src={formData.image_url} 
                  alt="Prévia"
                  className="h-20 w-20 object-cover rounded-sm border border-black" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Erro+na+imagem';
                    setErrors(prev => ({...prev, image_url: "URL de imagem inválida ou inacessível"}));
                  }}
                />
              </div>
            )}
          </div>
          
          <div className="pt-4 flex justify-end space-x-3 border-t border-black">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-primary bg-primary-500 hover:bg-primary-600"
            >
              {item ? 'Atualizar' : 'Criar Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}