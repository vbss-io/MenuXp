import { PackageIcon } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'

import { ComboCard } from '@/components/combo/combo-card'
import { ComboDialog } from '@/components/combo/combo-dialog'
import { Loading } from '@menuxp/ui'
import { useRestaurant } from '@/hooks/use-restaurant'
import type { Combo } from '@/types/combo'
import { MenuSectionType, type CombosConfig, type MenuSection } from '@/types/menu-layout'

import { getRestaurantMenuCombos } from '@/services/menu/get-combos'
import * as S from './styles'

interface CombosSectionProps {
  section: MenuSection
  mockCombos?: Combo[]
}

export const CombosSection: React.FC<CombosSectionProps> = ({ section, mockCombos }) => {
  const { layout } = useRestaurant()
  const { restaurant } = useRestaurant()

  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [selectedCombo, setSelectedCombo] = useState<Combo | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dragStartTime, setDragStartTime] = useState(0)
  const [dragStartPosition, setDragStartPosition] = useState({ x: 0, y: 0 })
  const [hasMoved, setHasMoved] = useState(false)
  const [isDragActive, setIsDragActive] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const getCombosConfig = (section: MenuSection): CombosConfig | null => {
    if (section.type === MenuSectionType.COMBOS) {
      return section.config as CombosConfig
    }
    return null
  }

  const combosData = getCombosConfig(section)
  const sectionType = (combosData?.type as 'custom' | 'best_sellers' | 'discounts') || 'custom'
  const sectionTitle = combosData?.title || getDefaultTitle(sectionType)
  const isAllCombos = combosData?.comboIds === null || combosData?.comboIds === undefined

  const { data: apiCombos = [], isLoading } = useQuery({
    queryKey: ['combos', restaurant?.id, sectionType, combosData?.comboIds],
    queryFn: () =>
      getRestaurantMenuCombos({
        restaurantId: restaurant?.id?.toString() as string,
        type: sectionType,
        comboIds: sectionType === 'custom' && !isAllCombos && combosData?.comboIds ? combosData.comboIds : undefined
      }),
    enabled: !!restaurant?.id && !mockCombos
  })

  const combos = mockCombos || apiCombos

  function getDefaultTitle(type: string): string {
    switch (type) {
      case 'best_sellers':
        return 'Combos Mais Vendidos'
      case 'discounts':
        return 'Combos em Promoção'
      case 'custom':
      default:
        return 'Combos'
    }
  }

  const handleAddToCart = (combo: Combo) => {
    if (isDragActive) {
      return
    }
    setSelectedCombo(combo)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setSelectedCombo(null)
  }

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    if (target.closest('.add-to-cart-button')) {
      return
    }
    if (!containerRef.current) return
    setIsDragging(true)
    setIsDragActive(true)
    setStartX(e.pageX - containerRef.current.offsetLeft)
    setScrollLeft(containerRef.current.scrollLeft)
    setDragStartTime(Date.now())
    setDragStartPosition({ x: e.pageX, y: e.pageY })
    setHasMoved(false)
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return
      const deltaX = Math.abs(e.pageX - dragStartPosition.x)
      const deltaY = Math.abs(e.pageY - dragStartPosition.y)
      if (deltaX > 5 || deltaY > 5) {
        setHasMoved(true)
        e.preventDefault()
        const x = e.pageX - containerRef.current.offsetLeft
        const walk = (x - startX) * 2
        containerRef.current.scrollLeft = scrollLeft - walk
      }
    },
    [isDragging, startX, scrollLeft, dragStartPosition]
  )

  const handleMouseUp = useCallback(() => {
    const dragDuration = Date.now() - dragStartTime
    if (dragDuration < 150 && !hasMoved) {
      setIsDragging(false)
      setTimeout(() => setIsDragActive(false), 100)
      return
    }
    setIsDragging(false)
    setTimeout(() => setIsDragActive(false), 100)
  }, [dragStartTime, hasMoved])

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false)
    setTimeout(() => setIsDragActive(false), 100)
  }, [])

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'grabbing'
      document.body.style.userSelect = 'none'
    } else {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  if (isLoading) {
    return (
      <S.ViewContainer className={`view-container combos-section layout-${layout}`}>
        <S.LoadingContainer className="loading-container">
          <Loading />
          <span>Carregando combos...</span>
        </S.LoadingContainer>
      </S.ViewContainer>
    )
  }

  if (!combos.length) {
    return (
      <S.ViewContainer className={`view-container combos-section layout-${layout}`}>
        <S.EmptyStateContainer className="empty-state-container">
          <S.EmptyStateDescription className="empty-state-description">
            Não há combos disponíveis para exibir nesta seção.
          </S.EmptyStateDescription>
        </S.EmptyStateContainer>
      </S.ViewContainer>
    )
  }

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <S.ViewContainer className={`view-container combos-section layout-${layout}`}>
            {sectionTitle && (
              <S.SectionTitle className="section-title">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <PackageIcon size={20} />
                  <span>{sectionTitle}</span>
                </div>
              </S.SectionTitle>
            )}
            <S.CombosGrid
              ref={containerRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
              className="combos-grid"
            >
              {combos.map((combo, index) => (
                <motion.div
                  key={combo.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <ComboCard item={combo} onAddToCart={handleAddToCart} disabled={isDragActive} />
                </motion.div>
              ))}
            </S.CombosGrid>
          </S.ViewContainer>
        </motion.div>
      </AnimatePresence>
      {selectedCombo && <ComboDialog isOpen={isDialogOpen} onClose={handleCloseDialog} item={selectedCombo} />}
    </>
  )
}
