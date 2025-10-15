import { WarningIcon, XIcon } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { GetCombosUsecase } from '@/application/combos/get-combos.usecase'
import { AddSectionUsecase } from '@/application/menu-layouts/sections/add-section.usecase'
import { UpdateCombosSectionUsecase } from '@/application/menu-layouts/sections/update-combos-section.usecase'
import { MenuSectionType } from '@/domain/enums/menu-layouts/menu-section-type.enum'
import type { CombosConfig, MenuSection } from '@/domain/models/menu-layout.model'
import type { MenuSectionDefinition } from '@/domain/models/menu-section-definition.model'
import { Button } from '@/presentation/components/ui/button'
import { Combobox, type ComboboxOption } from '@/presentation/components/ui/combobox'
import { FormInput } from '@/presentation/components/ui/form-input'
import { Loading } from '@/presentation/components/ui/loading'
import { validateSection } from '@/presentation/hooks/use-menu-layouts'
import { useRestaurant } from '@/presentation/hooks/use-restaurant'

import * as S from '../styles'
import type { ComboData } from '../types'

interface CombosEditProps {
  section?: MenuSection
  layoutId: string
  position?: number
  onSectionUpdated?: () => void
  onClose?: () => void
  sectionDefinitions?: MenuSectionDefinition[]
}

export const CombosEdit: React.FC<CombosEditProps> = ({
  section,
  layoutId,
  position,
  onSectionUpdated,
  onClose,
  sectionDefinitions = []
}) => {
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [combos, setCombos] = useState<ComboData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [tempSelectedCombos, setTempSelectedCombos] = useState<ComboData[]>([])
  const [tempSelectedComboIds, setTempSelectedComboIds] = useState<string[]>([])
  const [tempType, setTempType] = useState<'custom' | 'best_sellers' | 'discounts'>('custom')
  const [tempTitle, setTempTitle] = useState('')
  const { restaurant } = useRestaurant()

  const isEditing = !!section

  const getCombosData = () => {
    if (!section || section.type !== MenuSectionType.COMBOS) return null
    return section.config as CombosConfig
  }

  const combosData = isEditing ? getCombosData() : null
  const sectionType = isEditing ? (combosData?.type as 'custom' | 'best_sellers' | 'discounts') || 'custom' : 'custom'
  const sectionTitle = isEditing ? combosData?.title || getDefaultTitle(sectionType) : ''
  const isAllCombos = isEditing ? combosData?.comboIds === null || combosData?.comboIds === undefined : true

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

  useEffect(() => {
    if (isEditing && sectionDefinitions.length > 0 && section) {
      const validation = validateSection(section, sectionDefinitions)
      setValidationErrors(validation.errors)
    }
  }, [section, sectionDefinitions, isEditing])

  useEffect(() => {
    if (isEditing) {
      setTempType(sectionType)
      setTempTitle(sectionTitle)
      if (sectionType === 'custom' && !isAllCombos && combosData?.comboIds) {
        setTempSelectedComboIds(combosData.comboIds)
        if (restaurant?.id) {
          loadCombosForEdit()
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionType, sectionTitle, isAllCombos, combosData?.comboIds, restaurant?.id, isEditing])

  const loadCombosForEdit = useCallback(async () => {
    if (!isEditing || !restaurant?.id || !combosData?.comboIds) return

    try {
      const getCombosUsecase = new GetCombosUsecase()
      const result = await getCombosUsecase.execute({
        restaurantId: restaurant.id,
        includeInactive: false
      })

      const selectedCombos = result.combos
        .filter((combo) => combosData?.comboIds?.includes(combo.id))
        .map((combo) => {
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

      setTempSelectedCombos(selectedCombos)
    } catch {
      toast.error('Erro ao carregar combos')
    }
  }, [restaurant?.id, combosData?.comboIds, isEditing])

  const loadAllCombos = useCallback(async () => {
    if (!restaurant?.id) return

    setIsLoading(true)
    try {
      const getCombosUsecase = new GetCombosUsecase()
      const result = await getCombosUsecase.execute({
        restaurantId: restaurant.id,
        includeInactive: false
      })
      const processedCombos = result.combos.map((combo) => {
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

      setCombos(processedCombos)
    } catch {
      toast.error('Erro ao carregar combos')
    } finally {
      setIsLoading(false)
    }
  }, [restaurant?.id])

  useEffect(() => {
    loadAllCombos()
  }, [loadAllCombos])

  const handleSave = async () => {
    if (isEditing) {
      if (!section?.id || !layoutId) {
        toast.error('Erro: informações da seção inválidas')
        return
      }
      setIsLoading(true)
      try {
        const updateCombosUsecase = new UpdateCombosSectionUsecase()
        await updateCombosUsecase.execute({
          layoutId,
          sectionId: section.id,
          type: tempType,
          title: tempTitle || undefined,
          comboIds: tempType === 'custom' ? tempSelectedComboIds : null
        })

        onSectionUpdated?.()
        onClose?.()
        toast.success('Seção de combos atualizada com sucesso!')
      } catch {
        toast.error('Erro ao atualizar seção de combos')
      } finally {
        setIsLoading(false)
      }
    } else {
      if (!layoutId || position === undefined || position === null) {
        toast.error('Erro: informações de layout inválidas')
        return
      }
      setIsLoading(true)
      try {
        const addSectionUsecase = new AddSectionUsecase()
        const newSection: MenuSection = {
          type: MenuSectionType.COMBOS,
          config: {
            type: tempType,
            title: tempTitle || undefined,
            comboIds: tempType === 'custom' ? tempSelectedComboIds : null
          }
        }
        await addSectionUsecase.execute({
          layoutId,
          section: newSection,
          position
        })
        onSectionUpdated?.()
        onClose?.()
        toast.success('Seção de combos adicionada com sucesso!')
      } catch {
        toast.error('Erro ao adicionar seção de combos')
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleComboRemove = (comboId: string) => {
    setTempSelectedComboIds((prev) => prev.filter((id) => id !== comboId))
    setTempSelectedCombos((prev) => prev.filter((combo) => combo.id !== comboId))
  }

  const handleTypeChange = (newType: 'custom' | 'best_sellers' | 'discounts') => {
    setTempType(newType)
    setTempTitle(getDefaultTitle(newType))
  }

  const handleComboSearch = async (searchTerm: string): Promise<ComboboxOption[]> => {
    if (!restaurant?.id) return []

    try {
      const getCombosUsecase = new GetCombosUsecase()
      const result = await getCombosUsecase.execute({
        restaurantId: restaurant.id,
        includeInactive: false
      })

      return result.combos
        .filter((combo) => !tempSelectedComboIds.includes(combo.id))
        .filter((combo) => combo.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .map((combo) => {
          let firstImage: string | undefined
          if (Array.isArray(combo.medias) && combo.medias.length > 0) {
            firstImage = combo.medias[0]
          } else if (typeof combo.medias === 'string') {
            firstImage = combo.medias
          }

          return {
            label: combo.name,
            value: combo.id,
            displayLabel: `${combo.name} - ${formatPrice(combo.price, combo.discount)}`,
            icon: firstImage
          }
        })
    } catch (error) {
      console.error('Erro ao buscar combos:', error)
      return []
    }
  }

  const handleComboSelect = (comboId: string) => {
    const combo = combos.find((item) => item.id === comboId)
    if (combo && !tempSelectedComboIds.includes(comboId)) {
      setTempSelectedComboIds((prev) => [...prev, comboId])
      setTempSelectedCombos((prev) => [...prev, combo])
    }
  }

  const formatPrice = (price: number, discount?: number) => {
    const finalPrice = discount ? price - (price * discount) / 100 : price
    return finalPrice.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
  }

  const getButtonText = () => {
    return isEditing ? 'Salvar Alterações' : 'Adicionar Seção'
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  }

  const formVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  }

  return (
    <S.EditContainer variants={containerVariants} initial="hidden" animate="visible">
      <S.EditContent>
        <S.Description>
          {isEditing
            ? 'Configure o tipo de exibição e quais combos serão mostrados nesta seção.'
            : 'Configure o tipo de exibição e quais combos serão mostrados na nova seção.'}
        </S.Description>
        <S.FormFields variants={formVariants}>
          <S.FormField>
            <S.FormLabel>Tipo de Seção</S.FormLabel>
            <S.SelectionButtons>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant={tempType === 'custom' ? 'secondary' : 'primary'}
                  size="sm"
                  onClick={() => handleTypeChange('custom')}
                  disabled={isLoading}
                >
                  Combos Personalizados
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant={tempType === 'best_sellers' ? 'secondary' : 'primary'}
                  size="sm"
                  onClick={() => handleTypeChange('best_sellers')}
                  disabled={isLoading}
                >
                  Mais Vendidos
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant={tempType === 'discounts' ? 'secondary' : 'primary'}
                  size="sm"
                  onClick={() => handleTypeChange('discounts')}
                  disabled={isLoading}
                >
                  Com Descontos
                </Button>
              </motion.div>
            </S.SelectionButtons>
          </S.FormField>
          <S.FormField>
            <FormInput
              type="text"
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
              placeholder={getDefaultTitle(tempType)}
              id={'title'}
              label={'Título da Seção (opcional)'}
            />
          </S.FormField>
          {tempType === 'custom' && (
            <>
              <S.FormField>
                <S.FormLabel>Adicionar combo</S.FormLabel>
                <Combobox
                  placeholder="Digite para buscar combos..."
                  onSearch={handleComboSearch}
                  onChange={handleComboSelect}
                />
              </S.FormField>
              {tempSelectedCombos.length > 0 && (
                <S.FormField>
                  <S.FormLabel>Combos selecionados ({tempSelectedCombos.length})</S.FormLabel>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {tempSelectedCombos.map((combo) => (
                      <div
                        key={combo.id}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '12px',
                          border: '2px solid #e5e7eb',
                          borderRadius: '8px',
                          backgroundColor: '#ffffff'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                          {combo.medias && combo.medias.length > 0 && (
                            <img
                              src={combo.medias[0]}
                              alt={combo.name}
                              style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '4px',
                                objectFit: 'cover'
                              }}
                            />
                          )}
                          <div style={{ flex: 1 }}>
                            <S.MenuItemName>{combo.name}</S.MenuItemName>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleComboRemove(combo.id)}
                          style={{ minWidth: '32px', height: '32px', padding: '0' }}
                        >
                          <XIcon size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </S.FormField>
              )}
            </>
          )}
        </S.FormFields>
        {isLoading && (
          <S.UploadingOverlay>
            <Loading />
            <span>{isEditing ? 'Salvando alterações...' : 'Adicionando seção...'}</span>
          </S.UploadingOverlay>
        )}
        {validationErrors.length > 0 && (
          <S.ValidationErrors>
            {validationErrors.map((error, index) => (
              <S.ValidationError key={index}>
                <WarningIcon size={16} />
                <span>{error}</span>
              </S.ValidationError>
            ))}
          </S.ValidationErrors>
        )}
        <S.ModalFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading ? <Loading /> : getButtonText()}
            </Button>
          </motion.div>
        </S.ModalFooter>
      </S.EditContent>
    </S.EditContainer>
  )
}
