import { useState } from 'react'

import { ClientAddressForm } from '@/components/client/client-address-form'
import type { Address } from '@/types/address'

import * as S from '../../styles'

export const ClientAddressFormShowcase: React.FC = () => {
  const emptyAddress: Partial<Address> = {
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: ''
  }

  const partialAddress: Partial<Address> = {
    street: 'Av. Paulista',
    number: '1000',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: ''
  }

  const completeAddress: Partial<Address> = {
    street: 'Av. Paulista',
    number: '1000',
    complement: 'Apto 101',
    neighborhood: 'Bela Vista',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01310-100'
  }

  const errorAddress: Partial<Address> = {
    street: '',
    number: '',
    complement: '',
    neighborhood: 'Centro',
    city: 'Rio de Janeiro',
    state: '',
    zipCode: '12345'
  }

  const [, setAddress1] = useState<Address>(emptyAddress as Address)
  const [, setAddress2] = useState<Address>(partialAddress as Address)
  const [, setAddress3] = useState<Address>(completeAddress as Address)
  const [, setAddress4] = useState<Address>(errorAddress as Address)

  const handleSubmit = (address: Address) => {
    console.log('Address submitted:', address)
  }

  const handleSaveForFuture = async () => {
    console.log('Saving address for future orders')
  }

  return (
    <S.ShowcaseContainer>
      <S.Label>ClientAddressForm</S.Label>
      <S.ShowcaseGrid>
        <S.ShowcaseItem>
          <div style={{ maxWidth: '500px', width: '100%' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '14px', fontWeight: '600' }}>Empty Form</h3>
            <ClientAddressForm initialData={emptyAddress} onChange={setAddress1} onSubmit={handleSubmit} />
          </div>
        </S.ShowcaseItem>
        <S.ShowcaseItem>
          <div style={{ maxWidth: '500px', width: '100%' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '14px', fontWeight: '600' }}>Partially Filled</h3>
            <ClientAddressForm initialData={partialAddress} onChange={setAddress2} onSubmit={handleSubmit} />
          </div>
        </S.ShowcaseItem>
        <S.ShowcaseItem>
          <div style={{ maxWidth: '500px', width: '100%' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '14px', fontWeight: '600' }}>Complete Address</h3>
            <ClientAddressForm
              initialData={completeAddress}
              onChange={setAddress3}
              onSubmit={handleSubmit}
              showSaveOption
              onSaveForFuture={handleSaveForFuture}
            />
          </div>
        </S.ShowcaseItem>
        <S.ShowcaseItem>
          <div style={{ maxWidth: '500px', width: '100%' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '14px', fontWeight: '600' }}>With Errors</h3>
            <ClientAddressForm initialData={errorAddress} onChange={setAddress4} onSubmit={handleSubmit} />
          </div>
        </S.ShowcaseItem>
        <S.ShowcaseItem>
          <div style={{ maxWidth: '500px', width: '100%' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '14px', fontWeight: '600' }}>Disabled State</h3>
            <ClientAddressForm initialData={completeAddress} onSubmit={handleSubmit} disabled />
          </div>
        </S.ShowcaseItem>
        <S.ShowcaseItem>
          <div style={{ maxWidth: '500px', width: '100%' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '14px', fontWeight: '600' }}>With Save Option</h3>
            <ClientAddressForm
              initialData={completeAddress}
              onSubmit={handleSubmit}
              showSaveOption
              onSaveForFuture={handleSaveForFuture}
            />
          </div>
        </S.ShowcaseItem>
      </S.ShowcaseGrid>
    </S.ShowcaseContainer>
  )
}
