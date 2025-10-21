import { GetCombosUsecase } from '@/application/combos/get-combos.usecase'
import type { MenuSection } from '@/domain/models/menu-layout.model'
import { getCombosConfig } from '@/presentation/hooks/use-menu-layouts'
import { useRestaurant } from '@/presentation/hooks/use-restaurant'
import { Button } from '@menuxp/ui'
import { PackageIcon, PencilIcon, TrashIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'

import * as S from '../styles'
import type { ComboData } from '../types'

interface CombosPreviewEditProps {
  section: MenuSection
  onEdit?: () => void
  onRemove?: () => void
  menuLayout?: string
}

export const CombosPreviewEdit: React.FC<CombosPreviewEditProps> = ({ section, onEdit, onRemove }) => {
  const [combos, setCombos] = useState<ComboData[]>([])
  const { restaurant } = useRestaurant()

  const combosData = getCombosConfig(section)
  const sectionType = (combosData?.type as 'custom' | 'best_sellers' | 'discounts') || 'custom'
  const sectionTitle = combosData?.title || getDefaultTitle(sectionType)
  const isCustomType = sectionType === 'custom'

  function getDefaultTitle(type: string): string {
    switch (type) {
      case 'best_sellers':
        return 'Combos Mais Vendidos'
      case 'discounts':
        return 'Combos com Descontos'
      case 'custom':
      default:
        return ''
    }
  }

  function getTypeDisplayName(type: string): string {
    switch (type) {
      case 'custom':
        return 'Combos Personalizados'
      case 'best_sellers':
        return 'Mais Vendidos'
      case 'discounts':
        return 'Com Descontos'
      default:
        return 'Combos Personalizados'
    }
  }

  const loadCombos = useCallback(async () => {
    if (!restaurant?.id) return
    const getCombosUsecase = new GetCombosUsecase()
    const result = await getCombosUsecase.execute({
      restaurantId: restaurant.id,
      includeInactive: false
    })
    const allCombos = result.combos.map((combo) => {
      let medias: string[] = []
      if (Array.isArray(combo.medias)) {
        medias = combo.medias
      } else if (combo.medias) {
        medias = [combo.medias]
      }

      return {
        id: combo.id,
        name: combo.name,
        description: combo.description,
        categoryId: combo.categoryId,
        price: combo.price,
        stock: combo.stock ?? 0,
        discount: combo.discount ?? 0,
        medias,
        items: combo.items,
        optionals: combo.optionals
      }
    })
    setCombos(allCombos)
  }, [restaurant?.id])

  useEffect(() => {
    loadCombos()
  }, [loadCombos])

  const selectedCombos =
    isCustomType && combosData?.comboIds ? combos.filter((combo) => combosData.comboIds?.includes(combo.id)) : []

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <S.PreviewContainer>
          <S.PreviewHeader>
            <S.PreviewTitle>
              <PackageIcon size={20} />
              <span>Combos</span>
            </S.PreviewTitle>
            <S.ActionButtons>
              {onEdit && (
                <Button variant="outline" size="sm" onClick={onEdit}>
                  <PencilIcon size={16} />
                </Button>
              )}
              {onRemove && (
                <Button variant="outline" size="sm" onClick={onRemove}>
                  <TrashIcon size={16} />
                </Button>
              )}
            </S.ActionButtons>
          </S.PreviewHeader>
          <S.PreviewContent>
            {isCustomType && selectedCombos.length > 0 && (
              <S.MenuItemsPreviewList>
                {selectedCombos.slice(0, 4).map((combo) => (
                  <S.MenuItemPreviewItem key={combo.id}>
                    <S.MenuItemPreviewImage>
                      {combo.medias && combo.medias.length > 0 ? (
                        <img src={combo.medias[0]} alt={combo.name} />
                      ) : (
                        <div>Sem imagem</div>
                      )}
                    </S.MenuItemPreviewImage>
                    <S.MenuItemPreviewName>{combo.name}</S.MenuItemPreviewName>
                  </S.MenuItemPreviewItem>
                ))}
                {selectedCombos.length > 4 && <S.MoreItemsIndicator>+{selectedCombos.length - 4}</S.MoreItemsIndicator>}
              </S.MenuItemsPreviewList>
            )}
            <S.ConfigurationPreview>
              <S.ConfigurationItem>
                <S.ConfigurationLabel>Tipo:</S.ConfigurationLabel>
                <S.ConfigurationValue>{getTypeDisplayName(sectionType)}</S.ConfigurationValue>
              </S.ConfigurationItem>
              {sectionTitle && (
                <S.ConfigurationItem>
                  <S.ConfigurationLabel>Título:</S.ConfigurationLabel>
                  <S.ConfigurationValue>{sectionTitle}</S.ConfigurationValue>
                </S.ConfigurationItem>
              )}
              {isCustomType && (
                <S.ConfigurationItem>
                  <S.ConfigurationLabel>Quantidade:</S.ConfigurationLabel>
                  <S.ConfigurationValue>
                    {selectedCombos.length} {selectedCombos.length === 1 ? 'combo' : 'combos'}
                  </S.ConfigurationValue>
                </S.ConfigurationItem>
              )}
            </S.ConfigurationPreview>
          </S.PreviewContent>
        </S.PreviewContainer>
      </motion.div>
    </AnimatePresence>
  )
}
