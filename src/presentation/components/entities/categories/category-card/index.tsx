import { EyeIcon, EyeSlashIcon, PencilIcon, TrashIcon, PlusIcon, CircleIcon } from '@phosphor-icons/react'
import { Button } from '@vbss-ui/button'
import { Chip } from '@vbss-ui/chip'
import { Dialog } from '@vbss-ui/dialog'
import { useState } from 'react'

import { DeleteCategoryUsecase } from '@/application/categories/delete-category.usecase'
import { ToggleCategoryStatusUsecase } from '@/application/categories/toggle-category-status.usecase'
import type { Category } from '@/domain/models/category.model'
import { ICONS, ICONS_KEYS } from '@/domain/consts/icons.const'
import { Loading } from '@/presentation/components/ui/loading'
import { useAuth } from '@/presentation/hooks/use-auth'
import toast from 'react-hot-toast'

import * as S from './styles'

interface CategoryCardProps {
  category: Category
  onEdit: (category: Category) => void
  onDelete: (categoryId: string) => void
  onRefresh: () => void
  onCreateSubCategory: (parentCategoryId: string) => void
}

export const CategoryCard = ({ category, onEdit, onDelete, onRefresh, onCreateSubCategory }: CategoryCardProps) => {
  const { restaurantId } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [subToDelete, setSubToDelete] = useState<Category | null>(null)
  const [isSubDeleteDialogOpen, setIsSubDeleteDialogOpen] = useState(false)

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

  const handleDeleteSub = async () => {
    if (!restaurantId || !subToDelete) return
    setIsLoading(true)
    try {
      const deleteCategoryUsecase = new DeleteCategoryUsecase()
      await deleteCategoryUsecase.execute({ categoryId: subToDelete.id })
      toast.success('Subcategoria excluída com sucesso!')
      setSubToDelete(null)
      onRefresh()
    } catch (error) {
      toast.error('Erro ao excluir subcategoria')
      console.error(error)
    } finally {
      setIsLoading(false)
      setIsSubDeleteDialogOpen(false)
    }
  }

  const getStatusIcon = () => {
    if (isLoading) return <Loading />
    return category.isActive ? <EyeSlashIcon size={16} /> : <EyeIcon size={16} />
  }

  const getCategoryIcon = () => {
    if (!category.icon) {
      return <CircleIcon size={20} />
    }

    const iconKey = ICONS_KEYS[category.icon]
    if (!iconKey) {
      return <CircleIcon size={20} />
    }

    const IconComponent = ICONS[iconKey as keyof typeof ICONS]
    if (!IconComponent) {
      return <CircleIcon size={20} />
    }

    return <IconComponent size={20} />
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

  const hasSubCategories = Array.isArray(category.subCategories) && category.subCategories.length > 0

  return (
    <S.Card variants={cardVariants} initial="hidden" animate="visible" exit="exit">
      <S.CardHeader>
        <S.CardTitleContainer>
          <S.CardIcon>{getCategoryIcon()}</S.CardIcon>
          <S.CardTitle>{category.name}</S.CardTitle>
        </S.CardTitleContainer>
        <Chip
          backgroundColor={category.isActive ? 'hsl(160, 84%, 39%)' : 'hsl(0, 84%, 60%)'}
          textColor="white"
          size="md"
        >
          {category.isActive ? 'Ativa' : 'Inativa'}
        </Chip>
      </S.CardHeader>

      <S.CardContent>
        {category.description && <S.CardDescription>{category.description}</S.CardDescription>}

        <S.SubCategoriesContainer>
          <S.SubCategoriesHeader>
            <strong>Sub Categorias:</strong>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onCreateSubCategory(category.id)}
              style={{ padding: '4px 8px', fontSize: 12 }}
            >
              <PlusIcon size={14} />
              Adicionar
            </Button>
          </S.SubCategoriesHeader>

          {hasSubCategories ? (
            <S.SubCategoriesList>
              {(category.subCategories ?? []).map((sub) => (
                <Chip
                  key={sub.id}
                  backgroundColor="hsl(201, 100%, 44%)"
                  textColor="white"
                  size="md"
                  onClick={() => onEdit(sub)}
                >
                  {sub.name}
                  <TrashIcon
                    size={14}
                    onClick={(e) => {
                      e.stopPropagation()
                      setSubToDelete(sub)
                      setIsSubDeleteDialogOpen(true)
                    }}
                  />
                </Chip>
              ))}
            </S.SubCategoriesList>
          ) : (
            <S.EmptySubCategoriesText>Nenhuma subcategoria criada</S.EmptySubCategoriesText>
          )}
        </S.SubCategoriesContainer>
      </S.CardContent>

      <S.CardFooter>
        <S.ActionsContainer>
          <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
            title="Excluir Categoria"
            variant="outline"
            disableTextColor
            description={
              hasSubCategories
                ? 'Exclua todas as subcategorias antes de excluir esta categoria.'
                : `Tem certeza que deseja excluir a categoria "${category.name}"? Essa ação não poderá ser desfeita.`
            }
            footer={
              <S.ModalFooter>
                <Button variant="ghost" onClick={() => setIsDeleteDialogOpen(false)} disabled={isLoading}>
                  Cancelar
                </Button>
                <Button
                  variant="primary"
                  $danger
                  onClick={handleDelete}
                  loading={isLoading}
                  disabled={hasSubCategories}
                  title={hasSubCategories ? 'Exclua as subcategorias primeiro' : ''}
                >
                  Confirmar Exclusão
                </Button>
              </S.ModalFooter>
            }
          />

          <Dialog
            open={isSubDeleteDialogOpen}
            onOpenChange={setIsSubDeleteDialogOpen}
            title="Excluir Subcategoria"
            variant="outline"
            disableTextColor
            description={
              subToDelete && subToDelete.name
                ? `Tem certeza que deseja excluir a subcategoria "${subToDelete.name}"? Essa ação não poderá ser desfeita.`
                : ''
            }
            footer={
              <S.ModalFooter>
                <Button variant="ghost" onClick={() => setIsSubDeleteDialogOpen(false)} disabled={isLoading}>
                  Cancelar
                </Button>
                <Button variant="primary" $danger onClick={handleDeleteSub} loading={isLoading}>
                  Confirmar Exclusão
                </Button>
              </S.ModalFooter>
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

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDeleteDialogOpen(true)}
            disabled={isLoading || hasSubCategories}
            title={hasSubCategories ? 'Exclua as subcategorias primeiro' : ''}
          >
            <TrashIcon size={16} />
            Excluir
          </Button>
        </S.ActionsContainer>
      </S.CardFooter>
    </S.Card>
  )
}
