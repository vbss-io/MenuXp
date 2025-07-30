import styled from 'styled-components'

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  max-height: calc(90vh - 120px);
  padding-right: 8px;
  padding-bottom: 16px;
`

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const FormGroupFull = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  grid-column: 1 / -1;
`

export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`

export const Textarea = styled.textarea`
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  resize: vertical;
  min-height: 80px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &.error {
    border-color: #ef4444;
  }
`

export const ErrorMessage = styled.span`
  font-size: 12px;
  color: #ef4444;
  margin-top: 4px;
`

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
`
