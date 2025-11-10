import { useState } from 'react'

import { ClientNameSlide } from '@/components/client/client-name-slide'

import * as S from '../../styles'

export const ClientNameSlideShowcase: React.FC = () => {
  const [isOpen1, setIsOpen1] = useState(false)
  const [isOpen2, setIsOpen2] = useState(false)
  const [isOpen3, setIsOpen3] = useState(false)
  const [isOpen4, setIsOpen4] = useState(false)

  return (
    <S.ShowcaseContainer>
      <S.Label>ClientNameSlide</S.Label>
      <S.ShowcaseGrid>
        <S.ShowcaseItem>
          <div>
            <h3 style={{ marginBottom: '1rem', fontSize: '14px', fontWeight: '600' }}>Empty Name (Closed)</h3>
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
              Open Name Slide (Empty)
            </button>
            <ClientNameSlide isOpen={isOpen1} onClose={() => setIsOpen1(false)} />
          </div>
        </S.ShowcaseItem>
        <S.ShowcaseItem>
          <div>
            <h3 style={{ marginBottom: '1rem', fontSize: '14px', fontWeight: '600' }}>With Existing Name (Closed)</h3>
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
              Open Name Slide (With Data)
            </button>
            <ClientNameSlide isOpen={isOpen2} onClose={() => setIsOpen2(false)} />
          </div>
        </S.ShowcaseItem>
        <S.ShowcaseItem>
          <div>
            <h3 style={{ marginBottom: '1rem', fontSize: '14px', fontWeight: '600' }}>Name Edit Mode (Closed)</h3>
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
              Open Name Slide (Edit)
            </button>
            <ClientNameSlide isOpen={isOpen3} onClose={() => setIsOpen3(false)} />
          </div>
        </S.ShowcaseItem>
        <S.ShowcaseItem>
          <div>
            <h3 style={{ marginBottom: '1rem', fontSize: '14px', fontWeight: '600' }}>New Name Creation (Closed)</h3>
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
              Open Name Slide (New)
            </button>
            <ClientNameSlide isOpen={isOpen4} onClose={() => setIsOpen4(false)} />
          </div>
        </S.ShowcaseItem>
      </S.ShowcaseGrid>
    </S.ShowcaseContainer>
  )
}
