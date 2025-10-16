import { useEffect, useState } from 'react'

import { FormCheckbox } from '@menuxp/ui'
import { FormInput } from '@menuxp/ui'
import type { Address } from '@/types/address'

import * as S from './styles'

interface ClientAddressFormProps {
  initialData?: Partial<Address>
  onChange?: (address: Address) => void
  onSubmit?: (address: Address) => void
  showSaveOption?: boolean
  onSaveForFuture?: () => Promise<void>
  className?: string
  disabled?: boolean
  controlled?: boolean
}

export const ClientAddressForm = ({
  initialData,
  onChange,
  onSubmit,
  showSaveOption = false,
  onSaveForFuture,
  className,
  disabled = false,
  controlled = false
}: ClientAddressFormProps) => {
  const [formData, setFormData] = useState<Address>({
    street: initialData?.street || '',
    number: initialData?.number || '',
    complement: initialData?.complement || '',
    neighborhood: initialData?.neighborhood || '',
    city: initialData?.city || '',
    state: initialData?.state || '',
    zipCode: initialData?.zipCode || ''
  })

  const [saveForFuture, setSaveForFuture] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof Address, string>>>({})
  const [touched, setTouched] = useState<Partial<Record<keyof Address, boolean>>>({})

  const currentData = controlled && initialData ? (initialData as Address) : formData

  useEffect(() => {
    if (!controlled && initialData) {
      setFormData({
        street: initialData.street || '',
        number: initialData.number || '',
        complement: initialData.complement || '',
        neighborhood: initialData.neighborhood || '',
        city: initialData.city || '',
        state: initialData.state || '',
        zipCode: initialData.zipCode || ''
      })
    }
  }, [initialData, controlled])

  useEffect(() => {
    if (!controlled && onChange) {
      onChange(formData)
    }
  }, [formData, onChange, controlled])

  const validateField = (field: keyof Address, value: string): string | undefined => {
    const requiredFields: (keyof Address)[] = ['street', 'number', 'neighborhood', 'city', 'state', 'zipCode']
    if (requiredFields.includes(field) && !value.trim()) {
      return 'Este campo é obrigatório'
    }
    if (field === 'zipCode' && value && !/^\d{5}-?\d{3}$/.test(value)) {
      return 'CEP inválido. Use o formato: 00000-000'
    }
    if (field === 'state' && value && value.length !== 2) {
      return 'Use a sigla do estado (ex: SP, RJ)'
    }
    return undefined
  }

  const handleInputChange = (field: keyof Address, value: string) => {
    const error = validateField(field, value)
    setErrors((prev) => ({ ...prev, [field]: error }))
    if (controlled && onChange) {
      const updatedData = { ...currentData, [field]: value }
      onChange(updatedData)
    } else {
      const updatedData = { ...formData, [field]: value }
      setFormData(updatedData)
    }
  }

  const handleBlur = (field: keyof Address) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    const error = validateField(field, currentData[field] || '')
    setErrors((prev) => ({ ...prev, [field]: error }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit(currentData)
    }
  }

  const handleSaveForFutureChange = (checked: boolean) => {
    setSaveForFuture(checked)
    if (checked && onSaveForFuture) {
      onSaveForFuture()
    }
  }

  const isValid = () => {
    return !!(
      currentData.street &&
      currentData.number &&
      currentData.neighborhood &&
      currentData.city &&
      currentData.state &&
      currentData.zipCode
    )
  }

  return (
    <S.FormContainer className={className}>
      <S.Form onSubmit={handleSubmit}>
        <FormInput
          id="street"
          label="Rua *"
          type="text"
          placeholder="Digite a rua"
          value={currentData.street}
          onChange={(e) => handleInputChange('street', e.target.value)}
          onBlur={() => handleBlur('street')}
          error={touched.street ? errors.street : undefined}
          required
          disabled={disabled}
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <FormInput
            id="number"
            label="Número *"
            type="text"
            placeholder="Nº"
            value={currentData.number}
            onChange={(e) => handleInputChange('number', e.target.value)}
            onBlur={() => handleBlur('number')}
            error={touched.number ? errors.number : undefined}
            required
            disabled={disabled}
          />
          <FormInput
            id="zipCode"
            label="CEP *"
            type="text"
            placeholder="00000-000"
            value={currentData.zipCode}
            onChange={(e) => handleInputChange('zipCode', e.target.value)}
            onBlur={() => handleBlur('zipCode')}
            error={touched.zipCode ? errors.zipCode : undefined}
            required
            disabled={disabled}
          />
        </div>
        <FormInput
          id="complement"
          label="Complemento"
          type="text"
          placeholder="Apto, bloco, etc."
          value={currentData.complement || ''}
          onChange={(e) => handleInputChange('complement', e.target.value)}
          disabled={disabled}
        />
        <FormInput
          id="neighborhood"
          label="Bairro *"
          type="text"
          placeholder="Digite o bairro"
          value={currentData.neighborhood}
          onChange={(e) => handleInputChange('neighborhood', e.target.value)}
          onBlur={() => handleBlur('neighborhood')}
          error={touched.neighborhood ? errors.neighborhood : undefined}
          required
          disabled={disabled}
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <FormInput
            id="city"
            label="Cidade *"
            type="text"
            placeholder="Digite a cidade"
            value={currentData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            onBlur={() => handleBlur('city')}
            error={touched.city ? errors.city : undefined}
            required
            disabled={disabled}
          />
          <FormInput
            id="state"
            label="Estado *"
            type="text"
            placeholder="UF"
            value={currentData.state}
            onChange={(e) => handleInputChange('state', e.target.value.toUpperCase())}
            onBlur={() => handleBlur('state')}
            error={touched.state ? errors.state : undefined}
            required
            disabled={disabled}
            maxLength={2}
          />
        </div>
        {showSaveOption && onSaveForFuture && (
          <S.SaveAddressOption>
            <FormCheckbox
              id="save-address-for-future"
              label="Salvar este endereço para pedidos futuros"
              checked={saveForFuture}
              onCheckedChange={handleSaveForFutureChange}
              disabled={disabled}
              fontSize="sm"
              fontWeight="normal"
              variant="primary"
              size="sm"
            />
          </S.SaveAddressOption>
        )}
      </S.Form>
      <div style={{ display: 'none' }}>{JSON.stringify({ currentData, isValid: isValid() })}</div>
    </S.FormContainer>
  )
}
