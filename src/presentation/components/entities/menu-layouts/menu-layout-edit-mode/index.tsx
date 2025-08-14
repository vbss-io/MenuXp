import { CheckIcon, WarningIcon, XIcon } from '@phosphor-icons/react'
import { Button } from '@vbss-ui/button'
import { Input } from '@vbss-ui/input'
import { Textarea } from '@vbss-ui/textarea'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { UpdateMenuLayoutUsecase } from '@/application/menu-layouts/update-menu-layout.usecase'
import type { MenuLayout } from '@/domain/models/menu-layout.model'

import * as S from './styles'

interface MenuLayoutEditModeProps {
  layout: MenuLayout
  onSave: (updatedLayout: MenuLayout) => void
  onCancel: () => void
}

export const MenuLayoutEditMode = ({ layout, onSave, onCancel }: MenuLayoutEditModeProps) => {
  const [formData, setFormData] = useState({
    name: layout.name,
    description: layout.description || ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    if (!formData.name.trim()) {
      toast.error('Nome é obrigatório')
      return
    }
    setIsLoading(true)
    try {
      const updateLayoutUsecase = new UpdateMenuLayoutUsecase()
      await updateLayoutUsecase.execute({
        layoutId: layout.id,
        name: formData.name,
        description: formData.description || undefined
      })
      const updatedLayout = {
        ...layout,
        name: formData.name,
        description: formData.description || undefined
      }
      onSave(updatedLayout)
      toast.success('Layout atualizado com sucesso!')
    } catch (error) {
      toast.error('Erro ao atualizar layout')
      console.error('Error updating layout:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      name: layout.name,
      description: layout.description || ''
    })
    onCancel()
  }

  return (
    <S.EditModeContainer>
      <S.EditHeader>
        <h3>Editando Layout</h3>
        <S.ActionButtons>
          <Button variant="ghost" size="sm" onClick={handleCancel} disabled={isLoading}>
            <XIcon size={16} />
            Cancelar
          </Button>
          <Button variant="primary" size="sm" onClick={handleSave} loading={isLoading}>
            <CheckIcon size={16} />
            Salvar
          </Button>
        </S.ActionButtons>
      </S.EditHeader>
      <S.ConfigSection>
        <h4>Configurações</h4>
        <S.FormField>
          <label>Nome do Layout</label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="Digite o nome do layout"
            disabled={isLoading}
          />
        </S.FormField>
        <S.FormField>
          <label>Descrição (opcional)</label>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            placeholder="Digite uma descrição para o layout"
            disabled={isLoading}
            rows={3}
          />
        </S.FormField>
        <S.WarningContainer>
          <WarningIcon size={16} />
          <span>Apenas você verá o nome e descrição</span>
        </S.WarningContainer>
      </S.ConfigSection>
    </S.EditModeContainer>
  )
}
