// To-Do: Refatorar styles and remove tailwind
import { ArrowRight, Loader2 } from 'lucide-react'
import React, { useState } from 'react'

const LeadForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    scenario: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'E-mail inválido'
    }

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)
    setErrors({})

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Here you would normally send data to your CRM/HubSpot/Google Sheets
      console.log('Form submitted:', formData)

      // Show success message (in a real app, you might redirect or show a modal)
      alert('Obrigado! Entraremos em contato em até 1 dia útil.')

      // Reset form
      setFormData({
        name: '',
        email: '',
        whatsapp: '',
        scenario: ''
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Erro ao enviar formulário. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="brut-card p-8 bg-white">
      <h4 className="font-title text-2xl font-regular text-center mb-6">Solicite uma demonstração</h4>

      <form onSubmit={handleSubmit} aria-label="Formulário para solicitar demonstração">
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-body font-medium text-gray-700 mb-2">
              Nome *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Seu nome completo"
              className={`brut-input w-full ${errors.name ? 'border-red-500' : ''}`}
              required
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block font-body font-medium text-gray-700 mb-2">
              E-mail *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu.email@exemplo.com"
              className={`brut-input w-full ${errors.email ? 'border-red-500' : ''}`}
              required
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="whatsapp" className="block font-body font-medium text-gray-700 mb-2">
              WhatsApp
            </label>
            <input
              type="text"
              id="whatsapp"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              placeholder="(11) 99999-9999"
              className="brut-input w-full"
            />
          </div>

          <div>
            <label htmlFor="scenario" className="block font-body font-medium text-gray-700 mb-2">
              Conte-nos sobre seu cenário
            </label>
            <textarea
              id="scenario"
              name="scenario"
              value={formData.scenario}
              onChange={handleChange}
              placeholder="Tipo de restaurante, volume de pedidos, principais desafios..."
              rows={4}
              className="brut-input w-full resize-none"
            />
          </div>

          <button type="submit" disabled={isSubmitting} className="btn-brut w-full justify-center">
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <ArrowRight className="w-5 h-5" />
                Quero ver uma demo
              </>
            )}
          </button>

          <p className="text-sm text-gray-600 text-center">Ao enviar, entraremos em contato em até 1 dia útil.</p>
        </div>
      </form>
    </div>
  )
}

export default LeadForm
