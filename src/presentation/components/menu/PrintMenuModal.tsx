import { AppContext } from '@/presentation/contexts/AppContext'
import { Download, X } from 'lucide-react'
import { useContext, useState } from 'react'

interface PrintMenuModalProps {
  onClose: () => void
}

const categories = {
  10: 'Principal',
  11: 'Bebidas',
  12: 'Sobremesas & Doces',
  13: 'Combos e Promoções',
  14: 'Complementos'
}

export default function PrintMenuModal({ onClose }: PrintMenuModalProps) {
  const { menuItems, settings } = useContext(AppContext)
  const [selectedTemplate, setSelectedTemplate] = useState('simple')

  const templates = [
    {
      id: 'simple',
      name: 'Simples',
      description: 'Lista simples com nome e preço'
    },
    {
      id: 'detailed',
      name: 'Detalhado',
      description: 'Inclui imagens e descrições'
    },
    {
      id: 'categories',
      name: 'Por Categorias',
      description: 'Organizado por categorias'
    },
    {
      id: 'promotional',
      name: 'Promocional',
      description: 'Destaca itens com desconto'
    }
  ]

  const calculateDiscountedPrice = (price: number, discount: number) => {
    return price - (price * discount) / 100
  }

  const generateMenuHTML = () => {
    const itemsByCategory = menuItems.reduce(
      (acc, item) => {
        const categoryName = categories[item.category_id] || 'Outros'
        if (!acc[categoryName]) {
          acc[categoryName] = []
        }
        acc[categoryName].push(item)
        return acc
      },
      {} as Record<string, typeof menuItems>
    )

    let html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Cardápio - ${settings.name}</title>
        <style>
          body { 
            font-family: 'Roboto Mono', monospace; 
            margin: 20px; 
            color: #2B2A29;
            background: #F4E1C2;
          }
          .header { 
            text-align: center; 
            margin-bottom: 30px; 
            border-bottom: 2px solid #E83D3B;
            padding-bottom: 20px;
          }
          .logo { 
            max-height: 80px; 
            margin-bottom: 10px; 
          }
          .restaurant-name { 
            font-size: 32px; 
            font-weight: bold; 
            color: #E83D3B; 
            margin: 10px 0;
          }
          .category { 
            margin: 30px 0; 
          }
          .category-title { 
            font-size: 20px; 
            font-weight: bold; 
            color: #E83D3B; 
            border-bottom: 1px solid #2B2A29; 
            padding-bottom: 5px; 
            margin-bottom: 15px;
          }
          .item { 
            margin: 15px 0; 
            padding: 10px; 
            border: 1px solid #000;
            border-radius: 4px;
            background: white;
          }
          .item-header { 
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
          }
          .item-name { 
            font-weight: bold; 
            font-size: 16px; 
          }
          .item-price { 
            font-weight: bold; 
            color: #E83D3B; 
          }
          .item-original-price { 
            text-decoration: line-through; 
            color: #999; 
            font-size: 14px; 
            margin-right: 10px;
          }
          .discount-badge { 
            background: #E83D3B; 
            color: white; 
            padding: 2px 6px; 
            border-radius: 4px; 
            font-size: 12px; 
            margin-left: 10px;
          }
          .item-image { 
            width: 60px; 
            height: 60px; 
            object-fit: cover; 
            border-radius: 4px; 
            margin-right: 15px; 
            float: left;
            border: 1px solid #000;
          }
          .item-content { 
            overflow: hidden; 
          }
          .stock-info { 
            font-size: 12px; 
            color: #666; 
            margin-top: 5px;
          }
          @media print {
            body { margin: 0; background: white; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          ${settings.logo_url ? `<img src="${settings.logo_url}" alt="Logo" class="logo">` : ''}
          <div class="restaurant-name">${settings.name}</div>
          <div>Cardápio Atualizado em ${new Date().toLocaleDateString('pt-BR')}</div>
        </div>
    `

    if (selectedTemplate === 'simple') {
      html += '<div class="simple-menu">'
      menuItems.forEach((item) => {
        const finalPrice = calculateDiscountedPrice(item.price, item.discount)
        html += `
          <div class="item">
            <div class="item-header">
              <span class="item-name">${item.name}</span>
              <span class="item-price">
                ${item.discount > 0 ? `<span class="item-original-price">R$ ${item.price.toFixed(2)}</span>` : ''}
                R$ ${finalPrice.toFixed(2)}
                ${item.discount > 0 ? `<span class="discount-badge">${item.discount}% OFF</span>` : ''}
              </span>
            </div>
          </div>
        `
      })
      html += '</div>'
    } else if (selectedTemplate === 'detailed') {
      html += '<div class="detailed-menu">'
      menuItems.forEach((item) => {
        const finalPrice = calculateDiscountedPrice(item.price, item.discount)
        html += `
          <div class="item">
            <img src="${item.image_url}" alt="${item.name}" class="item-image">
            <div class="item-content">
              <div class="item-header">
                <span class="item-name">${item.name}</span>
                <span class="item-price">
                  ${item.discount > 0 ? `<span class="item-original-price">R$ ${item.price.toFixed(2)}</span>` : ''}
                  R$ ${finalPrice.toFixed(2)}
                  ${item.discount > 0 ? `<span class="discount-badge">${item.discount}% OFF</span>` : ''}
                </span>
              </div>
              <div class="stock-info">Estoque: ${item.stock} unidades</div>
            </div>
          </div>
        `
      })
      html += '</div>'
    } else if (selectedTemplate === 'categories') {
      Object.entries(itemsByCategory).forEach(([categoryName, items]) => {
        html += `
          <div class="category">
            <div class="category-title">${categoryName}</div>
        `
        items.forEach((item) => {
          const finalPrice = calculateDiscountedPrice(item.price, item.discount)
          html += `
            <div class="item">
              <div class="item-header">
                <span class="item-name">${item.name}</span>
                <span class="item-price">
                  ${item.discount > 0 ? `<span class="item-original-price">R$ ${item.price.toFixed(2)}</span>` : ''}
                  R$ ${finalPrice.toFixed(2)}
                  ${item.discount > 0 ? `<span class="discount-badge">${item.discount}% OFF</span>` : ''}
                </span>
              </div>
            </div>
          `
        })
        html += '</div>'
      })
    } else if (selectedTemplate === 'promotional') {
      const itemsWithDiscount = menuItems.filter((item) => item.discount > 0)
      const itemsWithoutDiscount = menuItems.filter((item) => item.discount === 0)

      if (itemsWithDiscount.length > 0) {
        html += `
          <div class="category">
            <div class="category-title">🔥 PROMOÇÕES</div>
        `
        itemsWithDiscount.forEach((item) => {
          const finalPrice = calculateDiscountedPrice(item.price, item.discount)
          html += `
            <div class="item">
              <img src="${item.image_url}" alt="${item.name}" class="item-image">
              <div class="item-content">
                <div class="item-header">
                  <span class="item-name">${item.name}</span>
                  <span class="item-price">
                    <span class="item-original-price">R$ ${item.price.toFixed(2)}</span>
                    R$ ${finalPrice.toFixed(2)}
                    <span class="discount-badge">${item.discount}% OFF</span>
                  </span>
                </div>
              </div>
            </div>
          `
        })
        html += '</div>'
      }

      if (itemsWithoutDiscount.length > 0) {
        html += `
          <div class="category">
            <div class="category-title">CARDÁPIO REGULAR</div>
        `
        itemsWithoutDiscount.forEach((item) => {
          html += `
            <div class="item">
              <div class="item-header">
                <span class="item-name">${item.name}</span>
                <span class="item-price">R$ ${item.price.toFixed(2)}</span>
              </div>
            </div>
          `
        })
        html += '</div>'
      }
    }

    html += `
        </body>
      </html>
    `

    return html
  }

  const handlePrint = () => {
    const menuHTML = generateMenuHTML()
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(menuHTML)
      printWindow.document.close()
      printWindow.focus()
      setTimeout(() => {
        printWindow.print()
      }, 500)
    }
  }

  const handleDownloadPDF = () => {
    const menuHTML = generateMenuHTML()
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(menuHTML)
      printWindow.document.close()
      printWindow.focus()
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="modal-header flex justify-between items-center">
          <h2 className="text-body font-semibold text-text-primary">Imprimir Cardápio</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors" aria-label="Fechar">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-body font-medium mb-4 text-text-primary">Escolha um template:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className={`p-4 border rounded-sm cursor-pointer transition-all ${
                    selectedTemplate === template.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-black hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <div className="flex items-center mb-2">
                    <input
                      type="radio"
                      checked={selectedTemplate === template.id}
                      onChange={() => setSelectedTemplate(template.id)}
                      className="mr-2"
                    />
                    <h4 className="font-medium text-text-primary text-subtitle">{template.name}</h4>
                  </div>
                  <p className="text-subtitle text-text-secondary">{template.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-bg-light p-4 rounded-sm border border-black mb-6">
            <h4 className="font-medium mb-2 text-text-primary text-subtitle">Prévia do Template</h4>
            <p className="text-subtitle text-text-secondary mb-3">
              {templates.find((t) => t.id === selectedTemplate)?.description}
            </p>
            <div className="text-subtitle text-gray-500">
              Total de itens: {menuItems.length} | Itens com desconto:{' '}
              {menuItems.filter((item) => item.discount > 0).length}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handlePrint}
              className="btn-primary bg-primary-500 hover:bg-primary-600 flex-1 inline-flex items-center justify-center"
            >
              <Download size={18} className="mr-2" />
              Abrir para Impressão
            </button>

            <button onClick={onClose} className="btn-secondary flex-1">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
