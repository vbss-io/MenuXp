import type { Settings as SettingsModel } from '@/domain/models/settings.model'
import ProgressBar from '@/presentation/components/settings/ProgressBar'
import { AppContext } from '@/presentation/contexts/AppContext'
import { QrCode } from 'lucide-react'
import React, { useContext, useState } from 'react'

export const Settings = () => {
  const { settings, updateSettings } = useContext(AppContext)
  const [formData, setFormData] = useState<SettingsModel>(settings)
  const [activeTab, setActiveTab] = useState<'brand' | 'hours' | 'templates' | 'operations'>('brand')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target

    // Handle checkboxes for arrays
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      if (name === 'payment_methods' || name === 'operation_types') {
        const currentArray = formData[name as keyof SettingsModel] as string[]
        const newArray = checked ? [...currentArray, value] : currentArray.filter((item) => item !== value)
        setFormData((prev) => ({ ...prev, [name]: newArray }))
      }
      return
    }

    // Handle nested properties
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof SettingsModel],
          [child]: value
        }
      }))
    } else if (Object.keys(settings.templates).includes(name)) {
      setFormData((prev) => ({
        ...prev,
        templates: {
          ...prev.templates,
          [name]: value
        }
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateSettings(formData)
  }

  const generateQRCode = () => {
    const menuUrl = `https://menuxp.com/menu/${formData.restaurant_id}`
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(menuUrl)}`
    setFormData((prev) => ({ ...prev, qr_code_url: qrUrl }))
  }

  const downloadQRCode = () => {
    if (formData.qr_code_url) {
      const link = document.createElement('a')
      link.href = formData.qr_code_url
      link.download = 'qr-code-cardapio.png'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-section font-bold text-text-primary">Configurações</h1>
        <ProgressBar settings={formData} />
      </div>

      <div className="card-basic overflow-hidden">
        <div className="border-b border-black">
          <nav className="flex -mb-px">
            <button
              className={`px-4 py-3 font-medium text-nav border-b-2 transition-colors ${
                activeTab === 'brand'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-text-secondary hover:text-text-primary hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('brand')}
            >
              Branding
            </button>
            <button
              className={`px-4 py-3 font-medium text-nav border-b-2 transition-colors ${
                activeTab === 'operations'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-text-secondary hover:text-text-primary hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('operations')}
            >
              Operações
            </button>
            <button
              className={`px-4 py-3 font-medium text-nav border-b-2 transition-colors ${
                activeTab === 'hours'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-text-secondary hover:text-text-primary hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('hours')}
            >
              Horários
            </button>
            <button
              className={`px-4 py-3 font-medium text-nav border-b-2 transition-colors ${
                activeTab === 'templates'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-text-secondary hover:text-text-primary hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('templates')}
            >
              Templates WhatsApp
            </button>
          </nav>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {activeTab === 'brand' && (
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-subtitle font-medium text-text-primary mb-1">
                  Nome do Restaurante
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-base w-full"
                />
              </div>

              <div>
                <label htmlFor="logo_url" className="block text-subtitle font-medium text-text-primary mb-1">
                  Logo URL
                </label>
                <input
                  type="text"
                  id="logo_url"
                  name="logo_url"
                  value={formData.logo_url}
                  onChange={handleChange}
                  className="input-base w-full"
                />
                {formData.logo_url && (
                  <div className="mt-2">
                    <img
                      src={formData.logo_url}
                      alt="Logo Preview"
                      className="h-16 object-contain border border-black rounded-sm"
                    />
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="theme_color" className="block text-subtitle font-medium text-text-primary mb-1">
                  Cor do Tema
                </label>
                <div className="flex items-center">
                  <input
                    type="color"
                    id="theme_color"
                    name="theme_color"
                    value={formData.theme_color}
                    onChange={handleChange}
                    className="h-10 w-10 border border-black rounded-sm p-1 mr-2"
                  />
                  <input
                    type="text"
                    value={formData.theme_color}
                    onChange={handleChange}
                    name="theme_color"
                    className="input-base"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="whatsapp_number" className="block text-subtitle font-medium text-text-primary mb-1">
                  Número WhatsApp
                </label>
                <input
                  type="tel"
                  id="whatsapp_number"
                  name="whatsapp_number"
                  value={formData.whatsapp_number}
                  onChange={handleChange}
                  placeholder="+55 00 00000-0000"
                  className="input-base w-full"
                />
              </div>

              <div>
                <label className="block text-subtitle font-medium text-text-primary mb-1">QR Code do Cardápio</label>
                <div className="bg-bg-light p-4 rounded-sm border border-black">
                  <div className="flex items-start space-x-4">
                    <div className="flex-1">
                      <p className="text-subtitle text-text-secondary mb-3">
                        Gere um QR Code para que os clientes possam acessar seu cardápio digital facilmente.
                      </p>
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          onClick={generateQRCode}
                          className="btn-primary bg-primary-500 hover:bg-primary-600 inline-flex items-center"
                        >
                          <QrCode size={16} className="mr-1" />
                          Gerar QR Code
                        </button>
                        {formData.qr_code_url && (
                          <button
                            type="button"
                            onClick={downloadQRCode}
                            className="btn-primary bg-accent-2-500 hover:bg-accent-2-600 inline-flex items-center"
                          >
                            Baixar
                          </button>
                        )}
                      </div>
                    </div>
                    {formData.qr_code_url && (
                      <div className="flex-shrink-0">
                        <img
                          src={formData.qr_code_url}
                          alt="QR Code do Cardápio"
                          className="w-24 h-24 border border-black rounded-sm"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'operations' && (
            <div className="space-y-6">
              <div>
                <label className="block text-subtitle font-medium text-text-primary mb-3">Tipos de Operação</label>
                <div className="space-y-2">
                  {[
                    { value: 'delivery', label: 'Delivery', icon: '🚚' },
                    { value: 'balcao', label: 'Balcão', icon: '🥤' },
                    { value: 'mesa', label: 'Comer no Local (Mesas)', icon: '🍽️' }
                  ].map((type) => (
                    <label key={type.value} className="flex items-center">
                      <input
                        type="checkbox"
                        name="operation_types"
                        value={type.value}
                        checked={formData.operation_types.includes(type.value)}
                        onChange={handleChange}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 mr-3"
                      />
                      <span className="mr-2">{type.icon}</span>
                      <span className="text-body text-text-primary">{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {formData.operation_types.includes('delivery') && (
                <div>
                  <label htmlFor="delivery_fee" className="block text-subtitle font-medium text-text-primary mb-1">
                    Taxa de Entrega (R$)
                  </label>
                  <input
                    type="number"
                    id="delivery_fee"
                    name="delivery_fee"
                    step="0.01"
                    min="0"
                    value={formData.delivery_fee}
                    onChange={handleChange}
                    className="input-base w-full"
                  />
                </div>
              )}

              <div>
                <label className="block text-subtitle font-medium text-text-primary mb-3">
                  Métodos de Pagamento Aceitos
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 'cartao_credito', label: 'Cartão de Crédito', icon: '💳' },
                    { value: 'cartao_debito', label: 'Cartão de Débito', icon: '💳' },
                    { value: 'pix', label: 'PIX', icon: '📱' },
                    { value: 'dinheiro', label: 'Dinheiro', icon: '💵' }
                  ].map((method) => (
                    <label key={method.value} className="flex items-center">
                      <input
                        type="checkbox"
                        name="payment_methods"
                        value={method.value}
                        checked={formData.payment_methods.includes(method.value)}
                        onChange={handleChange}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 mr-3"
                      />
                      <span className="mr-2">{method.icon}</span>
                      <span className="text-body text-text-primary">{method.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'hours' && (
            <div className="space-y-4">
              <p className="text-subtitle text-text-secondary mb-4">
                Configure os horários de funcionamento do seu estabelecimento.
              </p>

              {Object.entries(formData.business_hours).map(([day, hours]) => (
                <div key={day} className="flex items-center">
                  <label htmlFor={`hours-${day}`} className="w-1/3 block text-subtitle font-medium text-text-primary">
                    {day.charAt(0).toUpperCase() + day.slice(1)}:
                  </label>
                  <input
                    type="text"
                    id={`hours-${day}`}
                    name={`business_hours.${day}`}
                    value={hours}
                    onChange={handleChange}
                    placeholder="00:00-00:00"
                    className="input-base w-2/3"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="space-y-6">
              <p className="text-subtitle text-text-secondary mb-4">
                Configure as mensagens enviadas automaticamente para seus clientes. Use as tags{' '}
                <code className="bg-bg-light px-1 rounded-sm border border-black">
                  #{'{'}order_id{'}'}
                </code>{' '}
                e{' '}
                <code className="bg-bg-light px-1 rounded-sm border border-black">
                  #{'{'}cancel_reason{'}'}
                </code>{' '}
                que serão substituídas pelos valores reais.
              </p>

              {Object.entries(formData.templates).map(([key, value]) => (
                <div key={key}>
                  <label htmlFor={key} className="block text-subtitle font-medium text-text-primary mb-1">
                    {key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                  </label>
                  <textarea
                    id={key}
                    name={key}
                    value={value}
                    onChange={handleChange}
                    rows={3}
                    className="input-base w-full"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button type="submit" className="btn-primary bg-primary-500 hover:bg-primary-600">
              Salvar Configurações
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
