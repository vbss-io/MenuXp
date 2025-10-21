import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 0;
`

export const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.mx.black};
  letter-spacing: 0.2px;
  display: block;
  margin: 0;
`

export const Title = styled.h3`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.mx.black};
  letter-spacing: 0.2px;
`

export const Counter = styled.span`
  font-size: 14px;
  font-weight: 600;
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.mx.black};
`

export const RulesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 0;
`

export const RuleItem = styled.span`
  font-size: 12px;
  font-weight: 500;
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: #6b6b6b;
  background: #f9fafb;
  padding: 4px 8px;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
`

export const UploadWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border: 2px dashed ${({ theme }) => theme.colors.mx.black};
  border-radius: 12px;
  background: #FFFFFF;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${({ theme }) => theme.colors.mx.red}10;
    transform: translateY(-2px);
    box-shadow: 0 4px 0px ${({ theme }) => theme.colors.mx.black};
  }
`

export const UploadLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.mx.black};
  text-align: center;
`

export const UploadText = styled.span`
  font-size: 16px;
  font-weight: 600;
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.mx.black};
`

export const UploadInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`

export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
  width: 100%;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

export const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
  width: 100%;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }
`

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border: 1px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: 12px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.mx.white};
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 0px ${({ theme }) => theme.colors.mx.black};
  }
`

export const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const CoverBadge = styled.div<{ active: boolean }>`
  width: 24px;
  height: 24px;
  background: ${({ theme }) => theme.colors.mx.red};
  border: 1px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${({ theme, active }) => active ? theme.colors.mx.yellow : theme.colors.mx.white};
  box-shadow: 1px 1px 0px ${({ theme }) => theme.colors.mx.black};

  &:hover {
    background: ${({ theme }) => theme.colors.mx.red};
    color: ${({ theme }) => theme.colors.mx.yellow};
    transform: translateY(-1px);
    box-shadow: 2px 2px 0px ${({ theme }) => theme.colors.mx.black};
  }
`

export const ButtonsContainer = styled.div`
  position: absolute;
  top: 6px;
  right: 6px;
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
`

// Removed ImageActions and ActionButton - no longer needed due to button consolidation

export const RemoveButton = styled.button`
  width: 24px;
  height: 24px;
  background: ${({ theme }) => theme.colors.mx.red};
  border: 1px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${({ theme }) => theme.colors.mx.white};
  box-shadow: 1px 1px 0px ${({ theme }) => theme.colors.mx.black};

  &:hover {
    transform: translateY(-1px);
    box-shadow: 2px 2px 0px ${({ theme }) => theme.colors.mx.black};
  }
`

export const Error = styled.p`
  margin: 0;
  font-size: 12px;
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.mx.red};
  padding: 8px 12px;
  background: ${({ theme }) => theme.colors.mx.red}10;
  border: 1px solid ${({ theme }) => theme.colors.mx.red}30;
  border-radius: 6px;
`