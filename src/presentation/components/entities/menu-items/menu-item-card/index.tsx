import { CaretDownIcon, CaretUpIcon, EyeIcon, EyeSlashIcon, PencilIcon, TrashIcon } from '@phosphor-icons/react'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { DeleteMenuItemUsecase } from '@/application/menu-items/delete-menu-item.usecase'
import { ToggleMenuItemStatusUsecase } from '@/application/menu-items/toggle-menu-item-status.usecase'
import type { MenuItem } from '@/domain/models/menu-item.model'
import { ImageCarousel } from '@/presentation/@to-do/components/ui/image-carousel'
import { Loading } from '@/presentation/@to-do/components/ui/loading'
import { Button } from '@/presentation/components/ui/button'
import { Chip } from '@/presentation/components/ui/chip'
import { Dialog } from '@/presentation/components/ui/dialog'
import { useAuth } from '@/presentation/hooks/use-auth'

import * as S from './styles'

interface MenuItemCardProps {
  menuItem: MenuItem
  onEdit: (menuItem: MenuItem) => void
  onDelete: (menuItemId: string) => void
  onRefresh: () => void
}

export const MenuItemCard = ({ menuItem, onEdit, onDelete, onRefresh }: MenuItemCardProps) => {
  const { restaurantId } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [showOptionals, setShowOptionals] = useState(false)

  const handleToggleStatus = async () => {
    if (!restaurantId) return
    setIsLoading(true)
    try {
      const toggleStatusUsecase = new ToggleMenuItemStatusUsecase()
      await toggleStatusUsecase.execute({ menuItemId: menuItem.id })
      toast.success(`Item ${menuItem.isActive ? 'desativado' : 'ativado'} com sucesso!`)
      onRefresh()
    } catch (error) {
      toast.error('Erro ao alterar status do item')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!restaurantId) return
    setIsLoading(true)
    try {
      const deleteMenuItemUsecase = new DeleteMenuItemUsecase()
      await deleteMenuItemUsecase.execute({ menuItemId: menuItem.id })
      toast.success('Item excluído com sucesso!')
      onDelete(menuItem.id)
    } catch (error) {
      toast.error('Erro ao excluir item')
      console.error(error)
    } finally {
      setIsLoading(false)
      setIsDeleteDialogOpen(false)
    }
  }

  const getStatusIcon = () => {
    if (isLoading) return <Loading />
    return menuItem.isActive ? <EyeSlashIcon size={16} /> : <EyeIcon size={16} />
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

  const hasOptionals = Array.isArray(menuItem.optionals) && menuItem.optionals.length > 0
  const hasImages = Array.isArray(menuItem.medias) && menuItem.medias.length > 0

  const convertedImages = Array.isArray(menuItem.medias)
    ? menuItem.medias.map((media) => {
        if (typeof media === 'string') return media
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (media as any)?.url || media
      })
    : // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [typeof menuItem.medias === 'string' ? menuItem.medias : (menuItem.medias as any)?.url || menuItem.medias]

  return (
    <>
      <S.Card variants={cardVariants} initial="hidden" animate="visible" exit="exit" whileHover={{ y: -2 }}>
        <S.CardHeader>
          <S.CardTitle>{menuItem.name}</S.CardTitle>
          <Chip backgroundColor={menuItem.isActive ? '#22c55e' : '#ef4444'} textColor="white" size="sm">
            {menuItem.isActive ? 'Ativo' : 'Inativo'}
          </Chip>
        </S.CardHeader>
        <S.CardContent>
          {menuItem.description && <S.CardDescription>{menuItem.description}</S.CardDescription>}
          {hasImages && (
            <S.ImagesContainer>
              <S.ImagesLabel>Imagens:</S.ImagesLabel>
              <ImageCarousel images={convertedImages} />
            </S.ImagesContainer>
          )}
          <S.CardInfo>
            <Chip backgroundColor="#ef4444" textColor="white" size="xs">
              {menuItem.categoryName}
            </Chip>
            <Chip backgroundColor="#ef4444" textColor="white" size="xs">
              Preço: R$ {menuItem.price.toFixed(2)}
            </Chip>
            <Chip backgroundColor="#ef4444" textColor="white" size="xs">
              Estoque: {menuItem.stock}
            </Chip>
            {menuItem.discount > 0 && (
              <Chip backgroundColor="#ef4444" textColor="white" size="xs">
                Desconto: {menuItem.discount}%
              </Chip>
            )}
          </S.CardInfo>
          {hasOptionals && (
            <S.OptionalsSection>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowOptionals(!showOptionals)}
                leftIcon={showOptionals ? <CaretUpIcon size={14} /> : <CaretDownIcon size={14} />}
              >
                Ver Adicionais ({menuItem.optionals.length})
              </Button>
              {showOptionals && (
                <S.OptionalsList>
                  {menuItem.optionals.map((optional, index) => (
                    <S.OptionalItem key={index}>
                      <span>{optional.name}</span>
                      <span>
                        +R$ {optional.price.toFixed(2)}
                        {optional.maxQuantity && ` (máx: ${optional.maxQuantity})`}
                      </span>
                    </S.OptionalItem>
                  ))}
                </S.OptionalsList>
              )}
            </S.OptionalsSection>
          )}
        </S.CardContent>
        <S.CardFooter>
          <S.ActionsContainer>
            <Dialog
              open={isDeleteDialogOpen}
              onOpenChange={setIsDeleteDialogOpen}
              title="Excluir Item"
              variant="outline"
              disableTextColor
              description={`Tem certeza que deseja excluir o item "${menuItem.name}"? Essa ação não poderá ser desfeita.`}
              footer={
                <S.DialogFooter>
                  <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} disabled={isLoading}>
                    Cancelar
                  </Button>
                  <Button variant="primary" onClick={handleDelete} disabled={isLoading}>
                    Confirmar Exclusão
                  </Button>
                </S.DialogFooter>
              }
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(menuItem)}
              disabled={isLoading}
              leftIcon={<PencilIcon size={16} />}
            >
              Editar
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleToggleStatus}
              disabled={isLoading}
              leftIcon={getStatusIcon()}
            >
              {menuItem.isActive ? 'Desativar' : 'Ativar'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsDeleteDialogOpen(true)}
              disabled={isLoading}
              leftIcon={<TrashIcon size={16} />}
            >
              Excluir
            </Button>
          </S.ActionsContainer>
        </S.CardFooter>
      </S.Card>
    </>
  )
}
