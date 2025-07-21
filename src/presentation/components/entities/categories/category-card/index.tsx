import { EyeIcon, EyeSlashIcon, PencilIcon, TrashIcon } from '@phosphor-icons/react'
import { Button } from '@vbss-ui/button'
import { Chip } from '@vbss-ui/chip'
import { Dialog } from '@vbss-ui/dialog'
import { useState } from 'react'

import { DeleteCategoryUsecase } from '@/application/categories/delete-category.usecase'
import { ToggleCategoryStatusUsecase } from '@/application/categories/toggle-category-status.usecase'
import type { Category } from '@/domain/models/category.model'
import { Loading } from '@/presentation/components/ui/loading'
import { useAuth } from '@/presentation/hooks/use-auth'
import toast from 'react-hot-toast'

import * as S from './styles'

interface CategoryCardProps {
  category: Category
  onEdit: (category: Category) => void
  onDelete: (categoryId: string) => void
  onRefresh: () => void
}

export const CategoryCard = ({ category, onEdit, onDelete, onRefresh }: CategoryCardProps) => {
  const { restaurantId } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleToggleStatus = async () => {
    if (!restaurantId) return

    setIsLoading(true)
    try {
      const toggleStatusUsecase = new ToggleCategoryStatusUsecase()
      await toggleStatusUsecase.execute({ categoryId: category.id })

      toast.success(`Categoria ${category.isActive ? 'desativada' : 'ativada'} com sucesso!`)
      onRefresh()
    } catch (error) {
      toast.error('Erro ao alterar status da categoria')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!restaurantId) return

    setIsLoading(true)
    try {
      const deleteCategoryUsecase = new DeleteCategoryUsecase()
      await deleteCategoryUsecase.execute({ categoryId: category.id })

      toast.success('Categoria excluída com sucesso!')
      onDelete(category.id)
    } catch (error) {
      toast.error('Erro ao excluir categoria')
      console.error(error)
    } finally {
      setIsLoading(false)
      setIsDeleteDialogOpen(false)
    }
  }

  const getStatusIcon = () => {
    if (isLoading) return <Loading />
    return category.isActive ? <EyeSlashIcon size={16} /> : <EyeIcon size={16} />
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.2 }
    }
  }

  return (
    <S.Card variants={cardVariants} initial="hidden" animate="visible" exit="exit" whileHover={{ y: -2 }}>
      <S.CardHeader>
        <S.CardTitle>{category.name}</S.CardTitle>
        <Chip className={category.isActive ? 'active' : 'inactive'} size="md">
          {category.isActive ? 'Ativa' : 'Inativa'}
        </Chip>
      </S.CardHeader>
      {category.description && <S.CardDescription>{category.description}</S.CardDescription>}
      {Array.isArray(category.subCategories) && category.subCategories.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <strong style={{ fontSize: 13, color: '#888' }}>Sub Categorias:</strong>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
            {category.subCategories.map((sub) => (
              <Chip key={sub.id} variant="outline" size="md" style={{ cursor: 'pointer' }} onClick={() => onEdit(sub)}>
                {sub.name}
              </Chip>
            ))}
          </div>
        </div>
      )}
      <S.CardFooter>
        <S.ActionsContainer>
          <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
            title="Excluir Categoria"
            variant="outline"
            disableTextColor
            description={`Tem certeza que deseja excluir a categoria "${category.name}"? Essa ação não poderá ser desfeita.`}
            footer={
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                <Button variant="ghost" onClick={() => setIsDeleteDialogOpen(false)} disabled={isLoading}>
                  Cancelar
                </Button>
                <Button variant="primary" $danger onClick={handleDelete} loading={isLoading}>
                  Confirmar Exclusão
                </Button>
              </div>
            }
          />
          <Button variant="ghost" size="sm" onClick={() => onEdit(category)} disabled={isLoading}>
            <PencilIcon size={16} />
            Editar
          </Button>
          <Button variant="ghost" size="sm" onClick={handleToggleStatus} disabled={isLoading}>
            {getStatusIcon()}
            {category.isActive ? 'Desativar' : 'Ativar'}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setIsDeleteDialogOpen(true)} disabled={isLoading}>
            <TrashIcon size={16} />
            Excluir
          </Button>
        </S.ActionsContainer>
      </S.CardFooter>
    </S.Card>
  )
}
