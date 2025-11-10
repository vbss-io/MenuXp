import { useState } from 'react'

import { ClientAddressSlide } from '@/components/client/client-address-slide'

import * as S from '../../styles'

export const ClientAddressSlideShowcase: React.FC = () => {
  const [isOpen1, setIsOpen1] = useState(false)
  const [isOpen2, setIsOpen2] = useState(false)
  const [isOpen3, setIsOpen3] = useState(false)
  const [isOpen4, setIsOpen4] = useState(false)

  return (
    <S.ShowcaseContainer>
      <S.Label>ClientAddressSlide</S.Label>
      <S.ShowcaseGrid>
        <S.ShowcaseItem>
          <div>
            <h3 style={{ marginBottom: '1rem', fontSize: '14px', fontWeight: '600' }}>Empty Address (Closed)</h3>
            <button
              onClick={() => setIsOpen1(true)}
              style={{
                padding: '0.75rem 1.5rem',
                background: 'var(--restaurant-primary-color)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Open Address Slide (Empty)
            </button>
            <ClientAddressSlide isOpen={isOpen1} onClose={() => setIsOpen1(false)} />
          </div>
        </S.ShowcaseItem>
        <S.ShowcaseItem>
          <div>
            <h3 style={{ marginBottom: '1rem', fontSize: '14px', fontWeight: '600' }}>
              With Existing Address (Closed)
            </h3>
            <button
              onClick={() => setIsOpen2(true)}
              style={{
                padding: '0.75rem 1.5rem',
                background: 'var(--restaurant-primary-color)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Open Address Slide (With Data)
            </button>
            <ClientAddressSlide isOpen={isOpen2} onClose={() => setIsOpen2(false)} />
          </div>
        </S.ShowcaseItem>
        <S.ShowcaseItem>
          <div>
            <h3 style={{ marginBottom: '1rem', fontSize: '14px', fontWeight: '600' }}>Address Edit Mode (Closed)</h3>
            <button
              onClick={() => setIsOpen3(true)}
              style={{
                padding: '0.75rem 1.5rem',
                background: 'var(--restaurant-primary-color)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Open Address Slide (Edit)
            </button>
            <ClientAddressSlide isOpen={isOpen3} onClose={() => setIsOpen3(false)} />
          </div>
        </S.ShowcaseItem>
        <S.ShowcaseItem>
          <div>
            <h3 style={{ marginBottom: '1rem', fontSize: '14px', fontWeight: '600' }}>New Address Creation (Closed)</h3>
            <button
              onClick={() => setIsOpen4(true)}
              style={{
                padding: '0.75rem 1.5rem',
                background: 'var(--restaurant-primary-color)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Open Address Slide (New)
            </button>
            <ClientAddressSlide isOpen={isOpen4} onClose={() => setIsOpen4(false)} />
          </div>
        </S.ShowcaseItem>
      </S.ShowcaseGrid>
    </S.ShowcaseContainer>
  )
}
