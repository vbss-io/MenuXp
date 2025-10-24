import { DeleteComboUsecase } from '@/application/combos/delete-combo.usecase'
import { ToggleComboStatusUsecase } from '@/application/combos/toggle-combo-status.usecase'
import type { Combo } from '@/domain/models/combo.model'
import { useAuth } from '@/presentation/hooks/use-auth'
import { Button, Chip, Dialog, ImageCarousel, Loading } from '@menuxp/ui'
import { CaretDownIcon, CaretUpIcon, EyeIcon, EyeSlashIcon, PencilIcon, TrashIcon } from '@phosphor-icons/react'
import { useState } from 'react'
import toast from 'react-hot-toast'

import * as S from './styles'

interface ComboCardProps {
  combo: Combo
  onEdit: (combo: Combo) => void
  onDelete: (comboId: string) => void
  onRefresh: () => void
}

export const ComboCard = ({ combo, onEdit, onDelete, onRefresh }: ComboCardProps) => {
  const { restaurantId } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [showOptionals, setShowOptionals] = useState(false)
  const [showItems, setShowItems] = useState(false)

  const handleToggleStatus = async () => {
    if (!restaurantId) return
    setIsLoading(true)
    try {
      const toggleStatusUsecase = new ToggleComboStatusUsecase()
      await toggleStatusUsecase.execute({ comboId: combo.id })
      toast.success(`Combo ${combo.isActive ? 'desativado' : 'ativado'} com sucesso!`)
      onRefresh()
    } catch (error) {
      toast.error('Erro ao alterar status do combo')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!restaurantId) return
    setIsLoading(true)
    try {
      const deleteComboUsecase = new DeleteComboUsecase()
      await deleteComboUsecase.execute({ comboId: combo.id })
      toast.success('Combo excluído com sucesso!')
      onDelete(combo.id)
    } catch (error) {
      toast.error('Erro ao excluir combo')
      console.error(error)
    } finally {
      setIsLoading(false)
      setIsDeleteDialogOpen(false)
    }
  }

  const getStatusIcon = () => {
    if (isLoading) return <Loading />
    return combo.isActive ? <EyeSlashIcon size={16} /> : <EyeIcon size={16} />
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

  const hasOptionals = Array.isArray(combo.optionals) && combo.optionals.length > 0
  const hasItems = Array.isArray(combo.items) && combo.items.length > 0
  const hasImages = Array.isArray(combo.medias) && combo.medias.length > 0

  const convertedImages = Array.isArray(combo.medias)
    ? combo.medias.map((media) => {
        if (typeof media === 'string') return media
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (media as any)?.url || media
      })
    : // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [typeof combo.medias === 'string' ? combo.medias : (combo.medias as any)?.url || combo.medias]

  return (
    <>
      <S.Card variants={cardVariants} initial="hidden" animate="visible" exit="exit" whileHover={{ y: -2 }}>
        <S.CardHeader>
          <S.CardTitle title={combo.name}>{combo.name}</S.CardTitle>
          <S.StatusBadge>
            <Chip backgroundColor={combo.isActive ? '#22c55e' : '#ef4444'} textColor="white" size="sm">
              {combo.isActive ? 'Ativo' : 'Inativo'}
            </Chip>
          </S.StatusBadge>
        </S.CardHeader>
        <S.CardContent>
          {combo.description && (
            <S.CardDescription title={combo.description}>{combo.description}</S.CardDescription>
          )}
          {hasImages && (
            <S.ImagesContainer>
              <S.ImagesLabel>Imagens:</S.ImagesLabel>
              <ImageCarousel images={convertedImages} />
            </S.ImagesContainer>
          )}
          <S.CardInfo>
            <Chip backgroundColor="#3b82f6" textColor="white" size="xs">
              Preço: R$ {combo.price.toFixed(2)}
            </Chip>
            {combo.stock !== undefined && combo.stock > 0 && (
              <Chip backgroundColor="#3b82f6" textColor="white" size="xs">
                Estoque: {combo.stock}
              </Chip>
            )}
            {combo.discount !== undefined && combo.discount > 0 && (
              <Chip backgroundColor="#3b82f6" textColor="white" size="xs">
                Desconto: {combo.discount}%
              </Chip>
            )}
            <Chip backgroundColor="#3b82f6" textColor="white" size="xs">
              Itens: {combo.items.length}
            </Chip>
          </S.CardInfo>
          {hasItems && (
            <S.ItemsSection>
              <Button
                variant="white"
                size="sm"
                onClick={() => setShowItems(!showItems)}
                leftIcon={showItems ? <CaretUpIcon size={14} /> : <CaretDownIcon size={14} />}
              >
                Itens ({combo.items.length})
              </Button>
              {showItems && (
                <S.ItemsList>
                  {combo.items.map((item, index) => (
                    <S.ItemRow key={index}>
                      <span>{item.name}</span>
                      <span>
                        {item.quantity}x R$ {item.price.toFixed(2)}
                      </span>
                    </S.ItemRow>
                  ))}
                </S.ItemsList>
              )}
            </S.ItemsSection>
          )}
          {hasOptionals && (
            <S.OptionalsSection>
              <Button
                variant="white"
                size="sm"
                onClick={() => setShowOptionals(!showOptionals)}
                leftIcon={showOptionals ? <CaretUpIcon size={14} /> : <CaretDownIcon size={14} />}
              >
                Adicionais ({combo.optionals.length})
              </Button>
              {showOptionals && (
                <S.OptionalsList>
                  {combo.optionals.map((optional, index) => (
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
              title="Excluir Combo"
              variant="outline"
              disableTextColor
              description={`Tem certeza que deseja excluir o combo "${combo.name}"? Essa ação não poderá ser desfeita.`}
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
              variant="ghost"
              size="sm"
              onClick={() => setIsDeleteDialogOpen(true)}
              disabled={isLoading}
              leftIcon={<TrashIcon size={16} />}
            >
              Excluir
            </Button>
            <Button
              variant={combo.isActive ? 'white' : 'primary'}
              size="sm"
              onClick={handleToggleStatus}
              disabled={isLoading}
              leftIcon={getStatusIcon()}
            >
              {combo.isActive ? 'Desativar' : 'Ativar'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(combo)}
              disabled={isLoading}
              leftIcon={<PencilIcon size={16} />}
              className="edit-button"
            >
              Editar
            </Button>
          </S.ActionsContainer>
        </S.CardFooter>
      </S.Card>
    </>
  )
}
