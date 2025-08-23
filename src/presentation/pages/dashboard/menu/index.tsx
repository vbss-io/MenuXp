import { PlusIcon } from '@phosphor-icons/react'
import { Button } from '@vbss-ui/button'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

import { RemoveSectionUsecase } from '@/application/menu-layouts/sections/remove-section.usecase'
import { MenuSectionType } from '@/domain/enums/menu-layouts/menu-section-type.enum'
import type { MenuLayout, MenuSection } from '@/domain/models/menu-layout.model'
import { AddSectionButton } from '@/presentation/components/entities/menu-layouts/add-section-button'
import { MenuLayoutCard } from '@/presentation/components/entities/menu-layouts/menu-layout-card'
import { MenuLayoutEditMode } from '@/presentation/components/entities/menu-layouts/menu-layout-edit-mode'
import { SectionDialog } from '@/presentation/components/entities/menu-layouts/section-dialog'
import { BannerSection } from '@/presentation/components/entities/menu-layouts/sections/banner-section'
import { CarouselSection } from '@/presentation/components/entities/menu-layouts/sections/carousel-section'
import { CategoriesSection } from '@/presentation/components/entities/menu-layouts/sections/categories-section'
import { MenuItemsSection } from '@/presentation/components/entities/menu-layouts/sections/menu-items-section'
import { Breadcrumb } from '@/presentation/components/ui/breadcrumb'
import { Loading } from '@/presentation/components/ui/loading'
import { useMenuLayouts } from '@/presentation/hooks/use-menu-layouts'

import * as S from './styles'

// To-Do: Update Styles
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

  const handleEditLayout = (layout: MenuLayout) => {
    if (selectedLayout?.id === layout.id) {
      setIsEditMode(true)
    } else {
      loadLayout(layout.id)
      setIsEditMode(true)
    }
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

  const handleDeleteLayout = (_layoutId: string) => {
    // TODO: Implementar exclusão
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
    <S.Container>
      <Breadcrumb lastPath="Layouts do Menu" />
      <S.Header>
        <S.Title>Layouts do Menu</S.Title>
        <S.Subtitle>Gerencie os layouts de exibição do seu cardápio</S.Subtitle>
      </S.Header>
      <S.LayoutsGrid>
        {layouts.map((layout) => (
          <MenuLayoutCard
            key={layout.id}
            layout={layout}
            onSelect={handleSelectLayout}
            onEdit={handleEditLayout}
            onDelete={handleDeleteLayout}
          />
        ))}
        <S.CreateCard onClick={handleCreateLayout}>
          <PlusIcon size={24} />
          <span>Novo Layout</span>
        </S.CreateCard>
      </S.LayoutsGrid>
      <S.PreviewHeader>
        <h3>{selectedLayout ? `Visualização: ${selectedLayout.name}` : 'Visualização'}</h3>
        {selectedLayout && !isEditMode && (
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button variant="outline" size="sm" onClick={() => setIsEditMode(true)}>
              Editar Layout
            </Button>
            <Button
              variant={isSectionEditMode ? 'ghost' : 'outline'}
              size="sm"
              onClick={() => setIsSectionEditMode(!isSectionEditMode)}
            >
              {isSectionEditMode ? 'Sair da Edição' : 'Editar Seções'}
            </Button>
          </div>
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
      {selectedLayout && !isEditMode && (
        <S.ResizablePreviewSection ref={containerRef}>
          <S.ResizableHandle onMouseDown={handleMouseDown} />
          <S.PreviewContent>
            <S.SectionsContainer>
              {isSectionEditMode && (
                <AddSectionButton
                  onAddSection={handleAddSection}
                  position={0}
                  disabled={isLoading}
                  availableSections={sections}
                />
              )}
              {selectedLayout.sections.map((section, index) => (
                <React.Fragment key={`${section.type}-${index}`}>
                  {section.type === MenuSectionType.BANNER && (
                    <BannerSection
                      section={section}
                      mode={isSectionEditMode ? 'preview-edit' : 'view'}
                      onRemove={() => handleRemoveSection(index)}
                      onEdit={isSectionEditMode ? () => handleEditSection(section) : undefined}
                      onSectionUpdated={handleSectionUpdated}
                      sectionDefinitions={sections}
                      layoutId={selectedLayout.id}
                    />
                  )}
                  {section.type === MenuSectionType.CAROUSEL && (
                    <CarouselSection
                      section={section}
                      mode={isSectionEditMode ? 'preview-edit' : 'view'}
                      onRemove={() => handleRemoveSection(index)}
                      onEdit={isSectionEditMode ? () => handleEditSection(section) : undefined}
                      onSectionUpdated={handleSectionUpdated}
                      sectionDefinitions={sections}
                      layoutId={selectedLayout.id}
                    />
                  )}
                  {section.type === MenuSectionType.CATEGORIES && (
                    <CategoriesSection
                      section={section}
                      mode={isSectionEditMode ? 'preview-edit' : 'view'}
                      onRemove={() => handleRemoveSection(index)}
                      onEdit={isSectionEditMode ? () => handleEditSection(section) : undefined}
                      onSectionUpdated={handleSectionUpdated}
                      sectionDefinitions={sections}
                      layoutId={selectedLayout.id}
                      menuLayout={selectedLayout.layout}
                    />
                  )}
                  {section.type === MenuSectionType.MENU_ITEMS && (
                    <MenuItemsSection
                      section={section}
                      mode={isSectionEditMode ? 'preview-edit' : 'view'}
                      onRemove={() => handleRemoveSection(index)}
                      onEdit={isSectionEditMode ? () => handleEditSection(section) : undefined}
                      onSectionUpdated={handleSectionUpdated}
                      sectionDefinitions={sections}
                      layoutId={selectedLayout.id}
                    />
                  )}
                  {isSectionEditMode && (
                    <AddSectionButton
                      onAddSection={handleAddSection}
                      position={index + 1}
                      disabled={isLoading}
                      availableSections={sections}
                    />
                  )}
                </React.Fragment>
              ))}
            </S.SectionsContainer>
          </S.PreviewContent>
        </S.ResizablePreviewSection>
      )}
      {!selectedLayout && (
        <S.PreviewSection>
          <S.PreviewContent>
            <S.EmptyState>
              <p>Selecione um layout para visualizar</p>
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
  )
}
