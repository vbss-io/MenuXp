import { PlusIcon } from '@phosphor-icons/react'
import { Button } from '@vbss-ui/button'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

import {
  UpdateMenuLayoutUsecase,
  type UpdateMenuLayoutUsecaseInput,
  type UpdateMenuLayoutUsecaseSection
} from '@/application/menu-layouts/update-menu-layout.usecase'
import { MenuSectionType } from '@/domain/enums/menu-layouts/menu-section-type.enum'
import type { MenuLayout, MenuSection } from '@/domain/models/menu-layout.model'
import { AddSectionButton } from '@/presentation/components/entities/menu-layouts/add-section-button'
import { AddSectionDialog } from '@/presentation/components/entities/menu-layouts/add-section-dialog'
import { MenuLayoutCard } from '@/presentation/components/entities/menu-layouts/menu-layout-card'
import { MenuLayoutEditMode } from '@/presentation/components/entities/menu-layouts/menu-layout-edit-mode'
import { BannerSection } from '@/presentation/components/entities/menu-layouts/sections/banner-section'
import { CarouselSection } from '@/presentation/components/entities/menu-layouts/sections/carousel-section'
import { Breadcrumb } from '@/presentation/components/ui/breadcrumb'
import { Loading } from '@/presentation/components/ui/loading'
import { useMenuLayouts } from '@/presentation/hooks/use-menu-layouts'

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
    updateSelectedLayout
  } = useMenuLayouts()
  const [isEditMode, setIsEditMode] = useState(false)
  const [isSectionEditMode, setIsSectionEditMode] = useState(false)
  const [pendingSectionUpdates, setPendingSectionUpdates] = useState<Map<number, MenuSection>>(new Map())
  const [pendingFiles, setPendingFiles] = useState<Map<string, File>>(new Map())
  const [removeMedias, setRemoveMedias] = useState<string[]>([])
  const [addSectionDialog, setAddSectionDialog] = useState<{
    isOpen: boolean
    sectionType: MenuSectionType | null
    position: number
  }>({
    isOpen: false,
    sectionType: null,
    position: 0
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

  const handleUpdateSection = (sectionIndex: number, updatedSection: MenuSection) => {
    if (!selectedLayout) return
    const updatedSections = [...selectedLayout.sections]
    updatedSections[sectionIndex] = updatedSection
    const updatedLayout = {
      ...selectedLayout,
      sections: updatedSections
    }
    updateSelectedLayout(updatedLayout)
    setPendingSectionUpdates((prev) => new Map(prev.set(sectionIndex, updatedSection)))
  }

  const handleSaveSections = async () => {
    if (!selectedLayout) return
    try {
      const filesToUpload: File[] = []
      const updatedSections = [...selectedLayout.sections]
      pendingSectionUpdates.forEach((updatedSection, index) => {
        updatedSections[index] = updatedSection
      })
      pendingFiles.forEach((file, key) => {
        const keyStr = key.toString()
        const isCarousel = keyStr.includes('-')
        if (isCarousel) {
          const [sectionIndexStr, imageIndexStr] = keyStr.split('-')
          const sectionIndex = parseInt(sectionIndexStr, 10)
          const imageIndex = parseInt(imageIndexStr, 10)
          const section = updatedSections[sectionIndex]

          if (section && section.id) {
            const fileExtension = file.name.split('.').pop()
            const fileName = `${section.id}-${imageIndex}.${fileExtension}`
            const renamedFile = new File([file], fileName, { type: file.type })
            filesToUpload.push(renamedFile)
          }
        } else {
          const sectionIndex = parseInt(keyStr, 10)
          const section = updatedSections[sectionIndex]

          if (section && section.id) {
            const fileExtension = file.name.split('.').pop()
            const fileName = `${section.id}.${fileExtension}`
            const renamedFile = new File([file], fileName, { type: file.type })
            filesToUpload.push(renamedFile)
          }
        }
      })
      const updateData: UpdateMenuLayoutUsecaseInput = {
        layoutId: selectedLayout.id
      }
      if (removeMedias.length > 0) {
        updateData.removeMedias = removeMedias
      }
      updateData.sections = updatedSections.map((section) => {
        const sectionData: UpdateMenuLayoutUsecaseSection = {
          type: section.type,
          config: section.config as Record<string, unknown>
        }
        if (section.id) {
          sectionData.id = section.id
        }
        return sectionData
      })
      if (filesToUpload.length > 0) {
        updateData.files = filesToUpload
      }
      const updateLayoutUsecase = new UpdateMenuLayoutUsecase()
      await updateLayoutUsecase.execute(updateData)
      await loadLayout(selectedLayout.id)
      setPendingSectionUpdates(new Map())
      setPendingFiles(new Map())
      setRemoveMedias([])
      setIsSectionEditMode(false)
      toast.success('Seções salvas com sucesso!')
    } catch (error) {
      console.error('Error saving sections:', error)
      toast.error('Erro ao salvar seções')
    }
  }

  const handlePendingFileChange = (sectionIndex: number, file: File | null, imageIndex?: number) => {
    if (file) {
      const key = imageIndex !== undefined ? `${sectionIndex}-${imageIndex}` : sectionIndex.toString()
      setPendingFiles((prev) => new Map(prev.set(key, file)))
    } else {
      setPendingFiles((prev) => {
        const newMap = new Map(prev)
        if (imageIndex !== undefined) {
          const key = `${sectionIndex}-${imageIndex}`
          newMap.delete(key)
        } else {
          newMap.delete(sectionIndex.toString())
        }
        return newMap
      })
    }
  }

  const handleRemoveMedia = (mediaUrl: string) => {
    setRemoveMedias((prev) => {
      if (!prev.includes(mediaUrl)) {
        const newRemoveMedias = [...prev, mediaUrl]
        return newRemoveMedias
      }
      return prev
    })
  }

  const handleRemoveSection = (sectionIndex: number) => {
    if (!selectedLayout) return
    const updatedSections = selectedLayout.sections.filter((_, index) => index !== sectionIndex)
    const updatedLayout = {
      ...selectedLayout,
      sections: updatedSections
    }
    updateSelectedLayout(updatedLayout)
    setPendingSectionUpdates((prev) => {
      const newMap = new Map()
      prev.forEach((value, key) => {
        if (key < sectionIndex) {
          newMap.set(key, value)
        } else if (key > sectionIndex) {
          newMap.set(key - 1, value)
        }
      })
      return newMap
    })
    setPendingFiles((prev) => {
      const newMap = new Map()
      prev.forEach((value, key) => {
        if (Number(key) < sectionIndex) {
          newMap.set(key, value)
        } else if (Number(key) > sectionIndex) {
          newMap.set(Number(key) - 1, value)
        }
      })
      return newMap
    })
    toast.success('Seção removida com sucesso!')
  }

  const handleCancelSections = () => {
    setPendingSectionUpdates(new Map())
    setPendingFiles(new Map())
    setIsSectionEditMode(false)
  }

  const handleDeleteLayout = (_layoutId: string) => {
    // TODO: Implementar exclusão
  }

  const handleCreateLayout = () => {
    // TODO: Implementar criação
  }

  const handleAddSection = (sectionType: MenuSectionType, position: number) => {
    setAddSectionDialog({
      isOpen: true,
      sectionType,
      position
    })
  }

  const handleCloseAddSectionDialog = () => {
    setAddSectionDialog({
      isOpen: false,
      sectionType: null,
      position: 0
    })
  }

  const handleConfirmAddSection = async (newSection: MenuSection, files?: File[]) => {
    if (!selectedLayout) return
    try {
      const updatedSections = [...selectedLayout.sections]
      updatedSections.splice(addSectionDialog.position, 0, newSection)
      const updatedLayout = {
        ...selectedLayout,
        sections: updatedSections
      }
      updateSelectedLayout(updatedLayout)
      const updateData: {
        layoutId: string
        sections: Array<{
          id?: string
          type: string
          config: Record<string, unknown>
        }>
        files?: File[]
      } = {
        layoutId: selectedLayout.id,
        sections: updatedSections.map((section) => {
          const sectionData: UpdateMenuLayoutUsecaseSection = {
            type: section.type,
            config: section.config as Record<string, unknown>
          }
          if (section.id) {
            sectionData.id = section.id
          }

          return sectionData
        })
      }
      if (files && files.length > 0) {
        updateData.files = files.map((file, index) => {
          const fileExtension = file.name.split('.').pop()
          const renamedFile = new File([file], `NEW-${addSectionDialog.position}-${index}.${fileExtension}`, {
            type: file.type,
            lastModified: file.lastModified
          })
          return renamedFile
        })
      }
      const updateLayoutUsecase = new UpdateMenuLayoutUsecase()
      await updateLayoutUsecase.execute(updateData)
      await loadLayout(selectedLayout.id)
      toast.success('Seção adicionada com sucesso!')
    } catch (error) {
      console.error('Error adding section:', error)
      toast.error('Erro ao adicionar seção')
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
            {!isSectionEditMode ? (
              <Button variant="outline" size="sm" onClick={() => setIsSectionEditMode(true)}>
                Editar Seções
              </Button>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={handleCancelSections}>
                  Cancelar
                </Button>
                <Button variant="primary" size="sm" onClick={handleSaveSections}>
                  Salvar
                </Button>
              </>
            )}
          </div>
        )}
      </S.PreviewHeader>
      {selectedLayout && isEditMode && (
        <S.EditSection>
          <MenuLayoutEditMode
            layout={selectedLayout}
            onSave={(_updatedLayout) => {
              // TODO: Atualizar o layout na lista
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
                      isEditMode={isSectionEditMode}
                      onUpdate={
                        isSectionEditMode ? (updatedSection) => handleUpdateSection(index, updatedSection) : () => {}
                      }
                      onRemove={() => handleRemoveSection(index)}
                      sectionDefinitions={sections}
                      layoutId={selectedLayout.id}
                      onPendingFileChange={isSectionEditMode ? handlePendingFileChange : () => {}}
                      sectionIndex={index}
                    />
                  )}
                  {section.type === MenuSectionType.CAROUSEL && (
                    <CarouselSection
                      section={section}
                      isEditMode={isSectionEditMode}
                      onUpdate={
                        isSectionEditMode ? (updatedSection) => handleUpdateSection(index, updatedSection) : () => {}
                      }
                      onRemove={() => handleRemoveSection(index)}
                      sectionDefinitions={sections}
                      layoutId={selectedLayout.id}
                      onPendingFileChange={
                        isSectionEditMode
                          ? (_, file, imageIndex) => handlePendingFileChange(index, file, imageIndex)
                          : () => {}
                      }
                      onRemoveMedia={isSectionEditMode ? handleRemoveMedia : undefined}
                      sectionIndex={index}
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
      {addSectionDialog.sectionType && (
        <AddSectionDialog
          isOpen={addSectionDialog.isOpen}
          onClose={handleCloseAddSectionDialog}
          onConfirm={handleConfirmAddSection}
          sectionType={addSectionDialog.sectionType}
          sectionDefinitions={sections}
          position={addSectionDialog.position}
        />
      )}
    </S.Container>
  )
}
