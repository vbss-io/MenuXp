import styled from 'styled-components'

export const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`

export const ImageWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: ${({ theme }) => theme.spacing.sm};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  flex-shrink: 0;
`

export const ImagesContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  overflow-x: auto;
  min-height: 60px;
`

export const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  overflow: hidden;
  cursor: pointer;
`

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const Placeholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.background};
`

export const NavigationButton = styled.button<{ $direction: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${({ $direction }) => ($direction === 'left' ? 'left: 1rem;' : 'right: 1rem;')}
  color: ${({ theme }) => theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
`

export const ModalCarouselContainer = styled.div`
  width: 100%;
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
`

export const ModalImageContainer = styled.div`
  flex: 1 1 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
  min-height: 0;
`

export const ModalImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`

export const ModalPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.primary};
`

export const ModalNavigationButton = styled(NavigationButton)`
  background: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.spacing.xxl};

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`

export const ThumbsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};
  min-height: 56px;
`

export const Thumb = styled.button<{ $active?: boolean }>`
  border: 2px solid ${({ $active, theme }) => ($active ? theme.colors.primary : 'transparent')};
  background: none;
  padding: 0;
  border-radius: ${({ theme }) => theme.spacing.sm};
  overflow: hidden;
  width: 64px;
  height: 64px;
  cursor: pointer;
  opacity: ${({ $active }) => ($active ? 1 : 0.7)};
  transition:
    border 0.2s,
    opacity 0.2s;

  &:hover {
    opacity: 1;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`
