import { Button } from '@/presentation/components/ui/button'
import { Chip } from '@/presentation/components/ui/chip'
import { EyeIcon, EyeSlashIcon, PencilIcon, TicketIcon, TrashIcon } from '@phosphor-icons/react'
import { Dialog } from '@vbss-ui/dialog'
import { useState } from 'react'

import { DeleteCouponUsecase } from '@/application/coupons/delete-coupon.usecase'
import { ToggleCouponStatusUsecase } from '@/application/coupons/toggle-coupon-status.usecase'
import { CouponStatus } from '@/domain/enums/coupons/coupon-status.enum'
import { CouponType } from '@/domain/enums/coupons/coupon-type.enum'
import type { Coupon } from '@/domain/models/coupon.model'
import { Loading } from '@/presentation/components/ui/loading'
import { useAuth } from '@/presentation/hooks/use-auth'
import toast from 'react-hot-toast'

import * as S from './styles'

interface CouponCardProps {
  coupon: Coupon
  onEdit: (coupon: Coupon) => void
  onDelete: (couponId: string) => void
  onRefresh: () => void
}

export const CouponCard = ({ coupon, onEdit, onDelete, onRefresh }: CouponCardProps) => {
  const { restaurantId } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleToggleStatus = async () => {
    if (!restaurantId) return
    setIsLoading(true)
    try {
      const toggleStatusUsecase = new ToggleCouponStatusUsecase()
      await toggleStatusUsecase.execute({ couponId: coupon.id })
      toast.success(`Cupom ${coupon.status === CouponStatus.ACTIVE ? 'desativado' : 'ativado'} com sucesso!`)
      onRefresh()
    } catch (error) {
      toast.error('Erro ao alterar status do cupom')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!restaurantId) return
    setIsLoading(true)
    try {
      const deleteCouponUsecase = new DeleteCouponUsecase()
      await deleteCouponUsecase.execute({ couponId: coupon.id })
      toast.success('Cupom excluído com sucesso!')
      onDelete(coupon.id)
    } catch (error) {
      toast.error('Erro ao excluir cupom')
      console.error(error)
    } finally {
      setIsLoading(false)
      setIsDeleteDialogOpen(false)
    }
  }

  const getStatusIcon = () => {
    if (isLoading) return <Loading />
    return coupon.status === CouponStatus.ACTIVE ? <EyeSlashIcon size={16} /> : <EyeIcon size={16} />
  }

  const getStatusColor = () => {
    if (coupon.status === CouponStatus.ACTIVE) return '#22c55e'
    if (coupon.status === CouponStatus.EXPIRED) return '#6b7280'
    return '#ef4444'
  }

  const getStatusLabel = () => {
    if (coupon.status === CouponStatus.ACTIVE) return 'Ativo'
    if (coupon.status === CouponStatus.EXPIRED) return 'Expirado'
    return 'Inativo'
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date)
  }

  const formatValue = () => {
    if (coupon.type === CouponType.PERCENTAGE) {
      return `${coupon.value}%`
    }
    return `R$ ${coupon.value.toFixed(2)}`
  }

  const isExpired = coupon.status === CouponStatus.EXPIRED || new Date() > new Date(coupon.validUntil)

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
    <S.Card variants={cardVariants} initial="hidden" animate="visible" exit="exit">
      <S.CardHeader>
        <S.CardTitleContainer>
          <S.CardIcon>
            <TicketIcon size={20} />
          </S.CardIcon>
          <S.CardTitle>{coupon.code}</S.CardTitle>
        </S.CardTitleContainer>
        <Chip backgroundColor={getStatusColor()} textColor="white" size="sm">
          {getStatusLabel()}
        </Chip>
      </S.CardHeader>
      <S.CardContent>
        <S.CouponName>{coupon.name}</S.CouponName>
        {coupon.description && <S.CardDescription>{coupon.description}</S.CardDescription>}

        <S.InfoGrid>
          <S.InfoItem>
            <S.InfoLabel>Tipo:</S.InfoLabel>
            <S.InfoValue>{coupon.type === CouponType.PERCENTAGE ? 'Percentual' : 'Valor Fixo'}</S.InfoValue>
          </S.InfoItem>
          <S.InfoItem>
            <S.InfoLabel>Desconto:</S.InfoLabel>
            <S.InfoValue>{formatValue()}</S.InfoValue>
          </S.InfoItem>
          <S.InfoItem>
            <S.InfoLabel>Usos:</S.InfoLabel>
            <S.InfoValue>
              {coupon.usedCount} / {coupon.maxUses}
            </S.InfoValue>
          </S.InfoItem>
          <S.InfoItem>
            <S.InfoLabel>Válido de:</S.InfoLabel>
            <S.InfoValue>{formatDate(coupon.validFrom)}</S.InfoValue>
          </S.InfoItem>
          <S.InfoItem>
            <S.InfoLabel>Válido até:</S.InfoLabel>
            <S.InfoValue>{formatDate(coupon.validUntil)}</S.InfoValue>
          </S.InfoItem>
          {coupon.minOrderValue && (
            <S.InfoItem>
              <S.InfoLabel>Pedido mín.:</S.InfoLabel>
              <S.InfoValue>R$ {coupon.minOrderValue.toFixed(2)}</S.InfoValue>
            </S.InfoItem>
          )}
          {coupon.maxDiscountValue && coupon.type === CouponType.PERCENTAGE && (
            <S.InfoItem>
              <S.InfoLabel>Desconto máx.:</S.InfoLabel>
              <S.InfoValue>R$ {coupon.maxDiscountValue.toFixed(2)}</S.InfoValue>
            </S.InfoItem>
          )}
        </S.InfoGrid>
      </S.CardContent>
      <S.CardFooter>
        <S.ActionsContainer>
          <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
            title="Excluir Cupom"
            variant="outline"
            disableTextColor
            description={`Tem certeza que deseja excluir o cupom "${coupon.code}"? Essa ação não poderá ser desfeita.`}
            footer={
              <S.ModalFooter>
                <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} disabled={isLoading}>
                  Cancelar
                </Button>
                <Button variant="primary" onClick={handleDelete} disabled={isLoading}>
                  Confirmar Exclusão
                </Button>
              </S.ModalFooter>
            }
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(coupon)}
            disabled={isLoading || isExpired}
            title={isExpired ? 'Não é possível editar cupons expirados' : ''}
            leftIcon={<PencilIcon size={16} />}
          >
            Editar
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleToggleStatus}
            disabled={isLoading || isExpired}
            title={isExpired ? 'Não é possível ativar cupons expirados' : ''}
            leftIcon={getStatusIcon()}
          >
            {coupon.status === CouponStatus.ACTIVE ? 'Desativar' : 'Ativar'}
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
  )
}
