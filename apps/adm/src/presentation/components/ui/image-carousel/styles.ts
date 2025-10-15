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
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  overflow: hidden;
  border: 2px solid ${({ theme }) => theme.colors.mx.black};
  flex-shrink: 0;

  &:hover {
    border-color: ${({ theme }) => theme.colors.mx.red};
  }
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
  background-color: ${({ theme }) => theme.colors.mx.white};
  border: 2px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
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
  color: ${({ theme }) => theme.colors.mx.red};
  background-color: ${({ theme }) => theme.colors.mx.white};
`

export const NavigationButton = styled.button<{ $direction: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${({ $direction }) => ($direction === 'left' ? 'left: 1rem;' : 'right: 1rem;')}
  color: ${({ theme }) => theme.colors.mx.white};
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
  background-color: ${({ theme }) => theme.colors.mx.white};
  min-height: 0;
  margin-bottom: ${({ theme }) => theme.spacing.md};
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
  background-color: ${({ theme }) => theme.colors.mx.white};
  color: ${({ theme }) => theme.colors.mx.red};
`

export const ModalNavigationButton = styled(NavigationButton)`
  background: ${({ theme }) => theme.colors.mx.red};
  border: 2px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  box-shadow: ${({ theme }) => theme.shadows.brutalist};
  transition: all ${({ theme }) => theme.animations.durations.normal} ${({ theme }) => theme.animations.easings.ease};

  &:hover {
    background: ${({ theme }) => theme.colors.mx.black};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.brutalistHover};
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
  border: 2px solid ${({ $active, theme }) => ($active ? theme.colors.mx.red : theme.colors.mx.black)};
  background: ${({ theme }) => theme.colors.mx.white};
  padding: 0;
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  overflow: hidden;
  width: 64px;
  height: 64px;
  cursor: pointer;
  opacity: ${({ $active }) => ($active ? 1 : 0.7)};
  transition: all ${({ theme }) => theme.animations.durations.normal} ${({ theme }) => theme.animations.easings.ease};

  &:hover {
    border-color: ${({ theme }) => theme.colors.mx.red};
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`
