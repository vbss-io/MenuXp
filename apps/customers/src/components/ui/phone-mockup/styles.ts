import styled from 'styled-components'

interface PhoneMockupContainerProps {
  $size: 'sm' | 'md' | 'lg'
}

export const PhoneMockupContainer = styled.div<PhoneMockupContainerProps>`
  position: relative;
  max-width: ${({ $size }) => {
    switch ($size) {
      case 'sm':
        return '200px'
      case 'lg':
        return '400px'
      default:
        return '300px'
    }
  }};
  width: 100%;
  margin: 0 auto;
  z-index: 1;
`

export const PhoneFrame = styled.div`
  background-color: ${({ theme }) => theme.colors.mx.black};
  border-radius: 2rem;
  padding: 0.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`

export const PhoneScreen = styled.div`
  background-color: ${({ theme }) => theme.colors.mx.white};
  border-radius: 1.5rem;
  overflow: hidden;
  aspect-ratio: 9/19.5;
  position: relative;
`

export const PhoneStatusBar = styled.div`
  background-color: ${({ theme }) => theme.colors.mx.black};
  color: ${({ theme }) => theme.colors.mx.white};
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const PhoneContent = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.mx.black};
  overflow: hidden;
`

export const PhoneImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
`

export const PhoneBadge = styled.div`
  background-color: ${({ theme }) => theme.colors.mx.yellow};
  color: ${({ theme }) => theme.colors.mx.white};
  font-weight: 600;
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(0, 0, 0, 0.1);
  white-space: nowrap;
  display: inline-block;

  @media (min-width: 640px) {
    font-size: 0.875rem;
    padding: 0.25rem 0.75rem;
  }
`

export const PhoneIndicators = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
`

export const PhoneIndicator = styled.div<{ $active?: boolean }>`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: ${({ $active, theme }) => ($active ? theme.colors.mx.black : theme.colors.mx.gray[300])};
  transition: background-color 0.3s ease;
`
