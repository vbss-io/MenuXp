import { CheckIcon, WarningIcon, XIcon } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { UpdateMenuLayoutUsecase } from '@/application/menu-layouts/update-menu-layout.usecase'
import { LAYOUTS } from '@/domain/consts/layouts.const'
import type { MenuLayout } from '@/domain/models/menu-layout.model'
import { Button } from '@/presentation/components/ui/button'
import { FormInput } from '@/presentation/components/ui/form-input'
import { Loading } from '@/presentation/components/ui/loading'
import { FormTextarea } from '@/presentation/components/ui/form-textarea'

import * as S from './styles'

interface MenuLayoutEditModeProps {
  layout: MenuLayout
  onSave: (updatedLayout: MenuLayout) => void
  onCancel: () => void
}

export const MenuLayoutEditMode = ({ layout, onSave, onCancel }: MenuLayoutEditModeProps) => {
  const [formData, setFormData] = useState({
    name: layout.name,
    description: layout.description || '',
    layout: layout.layout || 'default'
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
        description: formData.description || undefined,
        layout: formData.layout
      })
      const updatedLayout = {
        ...layout,
        name: formData.name,
        description: formData.description || undefined,
        layout: formData.layout
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
      description: layout.description || '',
      layout: layout.layout || 'default'
    })
    onCancel()
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <S.EditModeContainer>
        <S.EditHeader>
          <S.EditTitle>Editando Layout</S.EditTitle>
          <S.ActionButtons>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              disabled={isLoading}
              leftIcon={<XIcon size={16} />}
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSave}
              disabled={isLoading}
              leftIcon={isLoading ? <Loading /> : <CheckIcon size={16} />}
            >
              {isLoading ? 'Salvando...' : 'Salvar'}
            </Button>
          </S.ActionButtons>
        </S.EditHeader>
        <S.ConfigSection>
          <S.SectionTitle>Configurações</S.SectionTitle>
          <S.FormField>
            <FormInput
              id="name"
              label="Nome do Layout"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Digite o nome do layout"
              disabled={isLoading}
            />
          </S.FormField>
          <S.FormField>
            <FormTextarea
              id="description"
              label="Descrição (opcional)"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Digite uma descrição para o layout"
              disabled={isLoading}
              rows={3}
            />
          </S.FormField>
          <S.FormField>
            <S.FieldLabel>Layout</S.FieldLabel>
            <S.LayoutGrid>
              {Object.entries(LAYOUTS).map(([key, layoutOption]) => (
                <motion.div key={key} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <S.LayoutOption
                    selected={formData.layout === key}
                    onClick={() => setFormData((prev) => ({ ...prev, layout: key }))}
                    disabled={isLoading}
                  >
                    <S.LayoutImage src={layoutOption.image} alt={layoutOption.name} />
                    <S.LayoutName>{layoutOption.name}</S.LayoutName>
                  </S.LayoutOption>
                </motion.div>
              ))}
            </S.LayoutGrid>
          </S.FormField>
          <S.WarningContainer>
            <WarningIcon size={16} />
            <span>Apenas você verá o nome e descrição</span>
          </S.WarningContainer>
        </S.ConfigSection>
      </S.EditModeContainer>
    </motion.div>
  )
}
