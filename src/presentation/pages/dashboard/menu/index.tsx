import type { MenuItem } from '@/domain/models/menu-item.model'
import BulkDiscountModal from '@/presentation/components/menu/BulkDiscountModal'
import MenuModalForm from '@/presentation/components/menu/MenuModalForm'
import PrintMenuModal from '@/presentation/components/menu/PrintMenuModal'
import { AppContext } from '@/presentation/contexts/AppContext'
import { Pencil, Percent, Plus, Printer, Trash2 } from 'lucide-react'
import { useContext, useState } from 'react'

export const Menu = () => {
  const { menuItems, deleteMenuItem } = useContext(AppContext)
  const [showModal, setShowModal] = useState(false)
  const [showPrintModal, setShowPrintModal] = useState(false)
  const [showBulkDiscountModal, setShowBulkDiscountModal] = useState(false)
  const [editItem, setEditItem] = useState<MenuItem | null>(null)
  const [showConfirmDelete, setShowConfirmDelete] = useState<number | null>(null)
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  function handleEditClick(item: MenuItem) {
    setEditItem(item)
    setShowModal(true)
  }

  function handleDeleteClick(id: number) {
    setShowConfirmDelete(id)
  }

  function confirmDelete(id: number) {
    deleteMenuItem(id)
    setShowConfirmDelete(null)
  }

  function closeModal() {
    setShowModal(false)
    setEditItem(null)
  }

  function handleSelectItem(id: number) {
    setSelectedItems((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]))
  }

  function handleSelectAll() {
    if (selectedItems.length === menuItems.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(menuItems.map((item) => item.id))
    }
  }

  const calculateDiscountedPrice = (price: number, discount: number) => {
    return price - (price * discount) / 100
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-section font-bold text-text-primary">Gerenciar Cardápio</h1>
        <div className="flex space-x-3">
          {selectedItems.length > 0 && (
            <button
              onClick={() => setShowBulkDiscountModal(true)}
              className="btn-primary bg-primary-500 hover:bg-primary-600"
            >
              <Percent size={18} className="mr-1" />
              Aplicar Desconto ({selectedItems.length})
            </button>
          )}
          <button onClick={() => setShowPrintModal(true)} className="btn-secondary">
            <Printer size={18} className="mr-1" />
            Imprimir
          </button>
          <button onClick={() => setShowModal(true)} className="btn-primary bg-accent-2-500 hover:bg-accent-2-600">
            <Plus size={18} className="mr-1" />
            Novo Item
          </button>
        </div>
      </div>

      <div className="card-basic overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-secondary-500">
              <tr>
                <th scope="col" className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === menuItems.length && menuItems.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-nav font-medium text-text-invert uppercase tracking-wider"
                >
                  Imagem
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-nav font-medium text-text-invert uppercase tracking-wider"
                >
                  Nome
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-nav font-medium text-text-invert uppercase tracking-wider"
                >
                  Preço
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-nav font-medium text-text-invert uppercase tracking-wider"
                >
                  Desconto
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-nav font-medium text-text-invert uppercase tracking-wider"
                >
                  Preço Final
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-nav font-medium text-text-invert uppercase tracking-wider"
                >
                  Estoque
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-nav font-medium text-text-invert uppercase tracking-wider"
                >
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-bg-dark divide-y divide-gray-200">
              {menuItems.map((item) => (
                <tr key={item.id} className="hover:bg-bg-light transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="h-10 w-10 rounded-sm object-cover border border-black"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-body font-medium text-text-primary">{item.name}</div>
                    <div className="text-subtitle text-text-secondary">ID: {item.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-body text-text-primary font-medium">R$ {item.price.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.discount > 0 ? (
                      <span className="badge-level bg-primary-100 text-primary-800">{item.discount}% OFF</span>
                    ) : (
                      <span className="text-gray-400 text-subtitle">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-body font-medium text-text-primary">
                      R$ {calculateDiscountedPrice(item.price, item.discount).toFixed(2)}
                    </div>
                    {item.discount > 0 && (
                      <div className="text-subtitle text-gray-500 line-through">R$ {item.price.toFixed(2)}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className={`inline-flex px-2 py-1 text-subtitle rounded-sm border border-black ${
                        item.stock > 10
                          ? 'bg-accent-2-100 text-accent-2-800'
                          : item.stock > 5
                            ? 'bg-warning-100 text-warning-800'
                            : 'bg-error-100 text-error-800'
                      }`}
                    >
                      {item.stock} unidades
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-subtitle font-medium">
                    <button
                      onClick={() => handleEditClick(item)}
                      className="text-info-600 hover:text-info-900 mr-3 transition-colors"
                      aria-label={`Edit ${item.name}`}
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(item.id)}
                      className="text-error-600 hover:text-error-900 transition-colors"
                      aria-label={`Delete ${item.name}`}
                    >
                      <Trash2 size={18} />
                    </button>

                    {showConfirmDelete === item.id && (
                      <div className="modal-overlay">
                        <div className="modal-content max-w-md mx-auto">
                          <div className="modal-header">
                            <h3 className="text-body font-medium text-text-primary">Confirmar exclusão</h3>
                          </div>
                          <div className="p-6">
                            <p className="mb-6 text-body text-text-secondary">
                              Tem certeza que deseja excluir <strong>{item.name}</strong>? Esta ação não pode ser
                              desfeita.
                            </p>
                            <div className="flex justify-end space-x-3">
                              <button onClick={() => setShowConfirmDelete(null)} className="btn-secondary">
                                Cancelar
                              </button>
                              <button
                                onClick={() => confirmDelete(item.id)}
                                className="btn-primary bg-error-500 hover:bg-error-600"
                              >
                                Excluir
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && <MenuModalForm item={editItem} onClose={closeModal} />}

      {showPrintModal && <PrintMenuModal onClose={() => setShowPrintModal(false)} />}

      {showBulkDiscountModal && (
        <BulkDiscountModal
          selectedItems={selectedItems}
          onClose={() => {
            setShowBulkDiscountModal(false)
            setSelectedItems([])
          }}
        />
      )}
    </div>
  )
}
