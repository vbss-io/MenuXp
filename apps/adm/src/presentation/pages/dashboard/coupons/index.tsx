import { GetRestaurantCouponsUsecase } from '@/application/coupons/get-restaurant-coupons.usecase'
import { CouponStatus } from '@/domain/enums/coupons/coupon-status.enum'
import type { Coupon } from '@/domain/models/coupon.model'
import { CouponCard } from '@/presentation/components/entities/coupons/coupon-card'
import { Filters, type CouponFilters } from '@/presentation/components/entities/coupons/coupon-filters'
import { CouponModal } from '@/presentation/components/entities/coupons/coupon-modal'
import { Breadcrumb } from '@/presentation/components/ui/breadcrumb'
import { useAuth } from '@/presentation/hooks/use-auth'
import { useDebounce } from '@/presentation/hooks/use-debounce'
import { Button, FormInput, Loading, Pagination } from '@menuxp/ui'
import { MagnifyingGlassIcon, PlusIcon, TicketIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import * as Page from '../styles'
import * as S from './styles'

export const Coupons = () => {
  const { restaurantId } = useAuth()
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCoupon, setEditingCoupon] = useState<Coupon | undefined>()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const [filters, setFilters] = useState<CouponFilters>({
    searchMask: '',
    includeInactive: false,
    includeExpired: false,
    sortField: 'code',
    sortOrder: 'asc'
  })

  const debouncedSearchMask = useDebounce(filters.searchMask, 500)

  const loadCoupons = async () => {
    if (!restaurantId) return
    setIsLoading(true)
    try {
      const getCouponsUsecase = new GetRestaurantCouponsUsecase()
      const couponsData = await getCouponsUsecase.execute({
        restaurantId,
        includeInactive: filters.includeInactive
      })
      let filteredCoupons = couponsData.coupons
      if (debouncedSearchMask) {
        const search = debouncedSearchMask.toLowerCase()
        filteredCoupons = filteredCoupons.filter(
          (coupon) =>
            coupon.code.toLowerCase().includes(search) ||
            coupon.name.toLowerCase().includes(search) ||
            coupon.description?.toLowerCase().includes(search)
        )
      }
      if (!filters.includeExpired) {
        filteredCoupons = filteredCoupons.filter(
          (coupon) => coupon.status !== CouponStatus.EXPIRED && new Date() <= new Date(coupon.validUntil)
        )
      }
      filteredCoupons.sort((a, b) => {
        let aValue: string | number | Date
        let bValue: string | number | Date
        switch (filters.sortField) {
          case 'code':
            aValue = a.code
            bValue = b.code
            break
          case 'name':
            aValue = a.name
            bValue = b.name
            break
          case 'validUntil':
            aValue = new Date(a.validUntil).getTime()
            bValue = new Date(b.validUntil).getTime()
            break
          case 'createdAt':
            aValue = new Date(a.createdAt).getTime()
            bValue = new Date(b.createdAt).getTime()
            break
          default:
            aValue = a.code
            bValue = b.code
        }
        if (aValue < bValue) return filters.sortOrder === 'asc' ? -1 : 1
        if (aValue > bValue) return filters.sortOrder === 'asc' ? 1 : -1
        return 0
      })
      setCoupons(filteredCoupons)
      setTotalItems(filteredCoupons.length)
    } catch (error) {
      toast.error('Erro ao carregar cupons')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (restaurantId) {
      loadCoupons()
      setCurrentPage(1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    restaurantId,
    debouncedSearchMask,
    filters.includeInactive,
    filters.includeExpired,
    filters.sortField,
    filters.sortOrder
  ])

  const handleCreateCoupon = () => {
    setEditingCoupon(undefined)
    setIsModalOpen(true)
  }

  const handleEditCoupon = (coupon: Coupon) => {
    setEditingCoupon(coupon)
    setIsModalOpen(true)
  }

  const handleDeleteCoupon = (couponId: string) => {
    setCoupons((prev) => prev.filter((coupon) => coupon.id !== couponId))
  }

  const handleModalSuccess = () => {
    loadCoupons()
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <Page.Container>
      <Breadcrumb lastPath="Cupons" />
      <Page.Header>
        <Page.ActionsRow>
          <FormInput
            id="search"
            label=""
            placeholder="Buscar cupons..."
            value={filters.searchMask}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFilters((prev) => ({ ...prev, searchMask: e.target.value }))
            }
            leftIcon={<MagnifyingGlassIcon size={16} />}
          />
          <Page.ActionsRowButtons>
            <Filters
              filters={filters}
              onFiltersChange={setFilters}
              onReset={() =>
                setFilters({
                  searchMask: '',
                  includeInactive: false,
                  includeExpired: false,
                  sortField: 'code',
                  sortOrder: 'asc'
                })
              }
            />
            <Button variant="primary" onClick={handleCreateCoupon} size="md" leftIcon={<PlusIcon size={16} />}>
              Novo Cupom
            </Button>
          </Page.ActionsRowButtons>
        </Page.ActionsRow>
      </Page.Header>
      <Page.Content>
        {isLoading ? (
          <Page.LoadingWrapper>
            <Loading />
          </Page.LoadingWrapper>
        ) : (
          <>
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              {coupons.length > 0 ? (
                <S.CouponsGrid>
                  <AnimatePresence>
                    {coupons.map((coupon) => (
                      <CouponCard
                        key={coupon.id}
                        coupon={coupon}
                        onEdit={handleEditCoupon}
                        onDelete={handleDeleteCoupon}
                        onRefresh={loadCoupons}
                      />
                    ))}
                  </AnimatePresence>
                </S.CouponsGrid>
              ) : (
                <Page.EmptyState>
                  <Page.EmptyStateIcon>
                    <TicketIcon size={48} />
                  </Page.EmptyStateIcon>
                  <Page.EmptyStateTitle>
                    {filters.searchMask ? 'Nenhum cupom encontrado' : 'Nenhum cupom cadastrado'}
                  </Page.EmptyStateTitle>
                  <Page.EmptyStateDescription>
                    {filters.searchMask
                      ? 'Tente ajustar os termos de busca ou filtros'
                      : 'Crie seu primeiro cupom de desconto para atrair mais clientes'}
                  </Page.EmptyStateDescription>
                  {!filters.searchMask && (
                    <Button
                      variant="primary"
                      onClick={handleCreateCoupon}
                      size="md"
                      style={{ marginTop: '16px' }}
                      leftIcon={<PlusIcon size={16} />}
                    >
                      Criar Primeiro Cupom
                    </Button>
                  )}
                </Page.EmptyState>
              )}
            </motion.div>
            <Pagination
              currentPage={currentPage}
              totalItems={totalItems}
              itemsPerPage={20}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </Page.Content>
      <CouponModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        coupon={editingCoupon}
        onSuccess={handleModalSuccess}
      />
    </Page.Container>
  )
}
