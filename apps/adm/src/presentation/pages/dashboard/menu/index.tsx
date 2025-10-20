import { PlusIcon } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

import { ActivateMenuLayoutUsecase } from '@/application/menu-layouts/activate-menu-layout.usecase'
import { DeleteMenuLayoutUsecase } from '@/application/menu-layouts/delete-menu-layout.usecase'
import { RemoveSectionUsecase } from '@/application/menu-layouts/sections/remove-section.usecase'
import { MenuSectionType } from '@/domain/enums/menu-layouts/menu-section-type.enum'
import type { MenuLayout, MenuSection } from '@/domain/models/menu-layout.model'
import { AddSectionButton } from '@/presentation/components/entities/menu-layouts/add-section-button'
import { ClientPreviewIframe } from '@/presentation/components/entities/menu-layouts/client-preview-iframe'
import { MenuLayoutCard } from '@/presentation/components/entities/menu-layouts/menu-layout-card'
import { MenuLayoutEditMode } from '@/presentation/components/entities/menu-layouts/menu-layout-edit-mode'
import { ReorderSections } from '@/presentation/components/entities/menu-layouts/reorder-sections'
import { SectionDialog } from '@/presentation/components/entities/menu-layouts/section-dialog'
import { BannerSection } from '@/presentation/components/entities/menu-layouts/sections/banner-section'
import { CarouselSection } from '@/presentation/components/entities/menu-layouts/sections/carousel-section'
import { CategoriesSection } from '@/presentation/components/entities/menu-layouts/sections/categories-section'
import { CombosSection } from '@/presentation/components/entities/menu-layouts/sections/combos-section'
import { MenuItemsSection } from '@/presentation/components/entities/menu-layouts/sections/menu-items-section'
import { Breadcrumb } from '@/presentation/components/ui/breadcrumb'
import { Button } from '@menuxp/ui'
import { Loading } from '@/presentation/components/ui/loading'
import { useMenuLayouts } from '@/presentation/hooks/use-menu-layouts'
import { useSectionReorder } from '@/presentation/hooks/use-section-reorder'

import * as S from './styles'

export const MenuPage = () => {
  const {
    layouts,
    selectedLayout,
    sections,
    isLoading,
    error,
    loadLayouts,
    loadLayout,
    loadSections,
    createLayout,
    updateSelectedLayout
  } = useMenuLayouts()
  const [isEditMode, setIsEditMode] = useState(false)
  const [isSectionEditMode, setIsSectionEditMode] = useState(false)
  const [isReorderMode, setIsReorderMode] = useState(false)
  const [sectionDialog, setSectionDialog] = useState<{
    isOpen: boolean
    mode: 'add' | 'edit'
    sectionType?: MenuSectionType
    section?: MenuSection
    position?: number
  }>({
    isOpen: false,
    mode: 'add'
  })

  const containerRef = useRef<HTMLDivElement>(null)
  const [isResizing, setIsResizing] = useState(false)

  const {
    reorderedSections,
    isLoading: isReorderLoading,
    handleReorder,
    handleSaveOrder
  } = useSectionReorder({
    sections: selectedLayout?.sections || [],
    layoutId: selectedLayout?.id || '',
    onSectionsReordered: (newSections) => {
      if (selectedLayout) {
        updateSelectedLayout({
          ...selectedLayout,
          sections: newSections
        })
      }
    }
  })

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing || !containerRef.current) return
      const containerRect = containerRef.current.getBoundingClientRect()
      const newWidth = e.clientX - containerRect.left
      if (newWidth >= 300 && newWidth <= window.innerWidth * 0.9) {
        containerRef.current.style.width = `${newWidth}px`
      }
    },
    [isResizing]
  )

  const handleMouseUp = useCallback(() => {
    setIsResizing(false)
  }, [])

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'col-resize'
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
  }, [isResizing, handleMouseMove, handleMouseUp])

  useEffect(() => {
    loadLayouts()
    loadSections()
  }, [loadLayouts, loadSections])

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  const handleSelectLayout = (layout: MenuLayout) => {
    loadLayout(layout.id)
  }

  const handleRemoveSection = async (sectionIndex: number) => {
    if (!selectedLayout) return
    const sectionToRemove = selectedLayout.sections[sectionIndex]
    if (!sectionToRemove.id) {
      toast.error('Não é possível remover uma seção sem ID')
      return
    }
    try {
      const removeSectionUsecase = new RemoveSectionUsecase()
      await removeSectionUsecase.execute({
        layoutId: selectedLayout.id,
        sectionId: sectionToRemove.id
      })
      await loadLayout(selectedLayout.id)
      toast.success('Seção removida com sucesso!')
    } catch (error) {
      console.error('Error removing section:', error)
      toast.error('Erro ao remover seção')
    }
  }

  const handleDeleteLayout = async (layoutId: string) => {
    try {
      if (selectedLayout?.id === layoutId) {
        toast.error('Não é possível deletar o layout atual')
        return
      }
      const deleteLayoutUsecase = new DeleteMenuLayoutUsecase()
      await deleteLayoutUsecase.execute({ layoutId })
      await loadLayouts()
      toast.success('Layout excluído com sucesso!')
    } catch (error) {
      console.error('Error deleting layout:', error)
      toast.error('Erro ao excluir layout')
    }
  }

  const handleActivateLayout = async (layoutId: string) => {
    try {
      const activateLayoutUsecase = new ActivateMenuLayoutUsecase()
      await activateLayoutUsecase.execute({ layoutId })
      await loadLayouts()
      toast.success('Layout ativado com sucesso!')
    } catch (error) {
      console.error('Error activating layout:', error)
      toast.error('Erro ao ativar layout')
    }
  }

  const handleCreateLayout = async () => {
    try {
      await createLayout()
      toast.success('Layout criado com sucesso!')
    } catch (error) {
      console.error('Error creating layout:', error)
      toast.error('Erro ao criar layout')
    }
  }

  const handleAddSection = (sectionType: MenuSectionType, position: number) => {
    setSectionDialog({
      isOpen: true,
      mode: 'add',
      sectionType,
      position
    })
  }

  const handleEditSection = (section: MenuSection) => {
    setSectionDialog({
      isOpen: true,
      mode: 'edit',
      section
    })
  }

  const handleCloseSectionDialog = () => {
    setSectionDialog({
      isOpen: false,
      mode: 'add'
    })
  }

  const handleSectionUpdated = async () => {
    if (!selectedLayout) return
    try {
      await loadLayout(selectedLayout.id!)
      toast.success('Seção atualizada com sucesso!')
    } catch (error) {
      console.error('Error loading layout:', error)
      toast.error('Erro ao atualizar layout')
    }
  }

  const handleSaveReorder = useCallback(async () => {
    await handleSaveOrder()
    setIsReorderMode(false)
  }, [handleSaveOrder])

  const getReorderButtonText = () => {
    if (isReorderLoading) return 'Salvando...'
    return isReorderMode ? 'Sair da Ordenação' : 'Ordenar Seções'
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 }
    }
  }

  if (isLoading && layouts.length === 0) {
    return (
      <S.Container>
        <S.LoadingWrapper>
          <Loading />
        </S.LoadingWrapper>
      </S.Container>
    )
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <S.Container>
        <Breadcrumb lastPath="Layouts do Menu" />
        <S.Header />
        <S.LayoutsGrid>
          {layouts.map((layout) => (
            <MenuLayoutCard
              key={layout.id}
              layout={layout}
              onSelect={handleSelectLayout}
              onDelete={handleDeleteLayout}
              onActivate={handleActivateLayout}
              isSelected={selectedLayout?.id === layout.id}
            />
          ))}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <S.CreateCard onClick={handleCreateLayout}>
              <PlusIcon size={24} />
              <span>Novo Layout</span>
            </S.CreateCard>
          </motion.div>
        </S.LayoutsGrid>
        <S.PreviewHeader>
          <S.PreviewTitle>{selectedLayout ? `Visualização: ${selectedLayout.name}` : 'Visualização'}</S.PreviewTitle>
          {selectedLayout && !isEditMode && (
            <S.PreviewActions>
              <Button variant="outline" size="sm" onClick={() => setIsEditMode(true)}>
                Editar Layout
              </Button>
              <Button
                variant={isSectionEditMode ? 'secondary' : 'outline'}
                size="sm"
                onClick={() => setIsSectionEditMode(!isSectionEditMode)}
              >
                {isSectionEditMode ? 'Sair da Edição' : 'Editar Seções'}
              </Button>
              <Button
                variant={isReorderMode ? 'secondary' : 'outline'}
                size="sm"
                onClick={isReorderMode ? handleSaveReorder : () => setIsReorderMode(true)}
                disabled={isReorderLoading}
              >
                {getReorderButtonText()}
              </Button>
            </S.PreviewActions>
          )}
        </S.PreviewHeader>
        {selectedLayout && isEditMode && (
          <S.EditSection>
            <MenuLayoutEditMode
              layout={selectedLayout}
              onSave={(updatedLayout) => {
                if (selectedLayout) {
                  const newSelectedLayout = {
                    ...selectedLayout,
                    ...updatedLayout
                  }
                  updateSelectedLayout(newSelectedLayout)
                }
                setIsEditMode(false)
              }}
              onCancel={() => setIsEditMode(false)}
            />
          </S.EditSection>
        )}
        {selectedLayout && isReorderMode && (
          <S.EditSection>
            <ReorderSections sections={reorderedSections} onReorder={handleReorder} />
          </S.EditSection>
        )}
        {selectedLayout && !isEditMode && !isReorderMode && (
          <S.ResizablePreviewSection ref={containerRef}>
            <S.ResizableHandle onMouseDown={handleMouseDown} />
            <S.PreviewContent>
              {isSectionEditMode ? (
                <S.SectionsContainer>
                  <AddSectionButton
                    onAddSection={handleAddSection}
                    position={0}
                    disabled={isLoading}
                    availableSections={sections}
                  />
                  {selectedLayout.sections.map((section, index) => (
                    <React.Fragment key={`${section.type}-${index}`}>
                      {section.type === MenuSectionType.BANNER && (
                        <BannerSection
                          section={section}
                          mode="preview-edit"
                          onRemove={() => handleRemoveSection(index)}
                          onEdit={() => handleEditSection(section)}
                          onSectionUpdated={handleSectionUpdated}
                          sectionDefinitions={sections}
                          layoutId={selectedLayout.id}
                        />
                      )}
                      {section.type === MenuSectionType.CAROUSEL && (
                        <CarouselSection
                          section={section}
                          mode="preview-edit"
                          onRemove={() => handleRemoveSection(index)}
                          onEdit={() => handleEditSection(section)}
                          onSectionUpdated={handleSectionUpdated}
                          sectionDefinitions={sections}
                          layoutId={selectedLayout.id}
                        />
                      )}
                      {section.type === MenuSectionType.CATEGORIES && (
                        <CategoriesSection
                          section={section}
                          mode="preview-edit"
                          onRemove={() => handleRemoveSection(index)}
                          onEdit={() => handleEditSection(section)}
                          onSectionUpdated={handleSectionUpdated}
                          sectionDefinitions={sections}
                          layoutId={selectedLayout.id}
                          menuLayout={selectedLayout.layout}
                        />
                      )}
                      {section.type === MenuSectionType.MENU_ITEMS && (
                        <MenuItemsSection
                          section={section}
                          mode="preview-edit"
                          onRemove={() => handleRemoveSection(index)}
                          onEdit={() => handleEditSection(section)}
                          onSectionUpdated={handleSectionUpdated}
                          sectionDefinitions={sections}
                          layoutId={selectedLayout.id}
                          menuLayout={selectedLayout.layout}
                        />
                      )}
                      {section.type === MenuSectionType.COMBOS && (
                        <CombosSection
                          section={section}
                          mode="preview-edit"
                          onRemove={() => handleRemoveSection(index)}
                          onEdit={() => handleEditSection(section)}
                          onSectionUpdated={handleSectionUpdated}
                          sectionDefinitions={sections}
                          layoutId={selectedLayout.id}
                          menuLayout={selectedLayout.layout}
                        />
                      )}
                      <AddSectionButton
                        onAddSection={handleAddSection}
                        position={index + 1}
                        disabled={isLoading}
                        availableSections={sections}
                      />
                    </React.Fragment>
                  ))}
                </S.SectionsContainer>
              ) : (
                <ClientPreviewIframe />
              )}
            </S.PreviewContent>
          </S.ResizablePreviewSection>
        )}
        {!selectedLayout && (
          <S.PreviewSection>
            <S.PreviewContent>
              <S.EmptyState>
                <S.EmptyStateIcon>
                  <PlusIcon size={48} />
                </S.EmptyStateIcon>
                <S.EmptyStateText>Selecione um layout para visualizar</S.EmptyStateText>
              </S.EmptyState>
            </S.PreviewContent>
          </S.PreviewSection>
        )}
        {sectionDialog.isOpen && selectedLayout && (
          <SectionDialog
            isOpen={sectionDialog.isOpen}
            onClose={handleCloseSectionDialog}
            onSectionUpdated={handleSectionUpdated}
            layoutId={selectedLayout.id}
            mode={sectionDialog.mode}
            sectionType={sectionDialog.sectionType}
            section={sectionDialog.section}
            position={sectionDialog.position}
          />
        )}
      </S.Container>
    </motion.div>
  )
}
