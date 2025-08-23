import { CaretDownIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'

import { ICONS, ICONS_KEYS } from '@/domain/consts/icons.const'

import * as S from './styles'

export interface ComboboxOption {
  label: string
  value: string
  displayLabel?: string
  icon?: string
}

export interface ComboboxProps {
  label?: string
  error?: string
  theme?: 'default' | 'retro' | 'retro-secondary'
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  onSearch?: (searchTerm: string) => Promise<ComboboxOption[]>
  disabled?: boolean
}

// To-Do: Update Styles to match new design
export const Combobox = ({
  label,
  error,
  theme = 'default',
  placeholder,
  value,
  onChange,
  onSearch,
  disabled = false
}: ComboboxProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [options, setOptions] = useState<ComboboxOption[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedOption, setSelectedOption] = useState<ComboboxOption | null>(null)
  const [isUserTyping, setIsUserTyping] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const selectClass = theme || ''

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (!isUserTyping) {
      if (value) {
        const option = options.find((opt) => opt.value === value)
        if (option) {
          setSelectedOption(option)
          setSearchTerm(option.label)
        } else if (options.length === 0 && onSearch) {
          handleSearch('')
        }
      } else {
        setSelectedOption(null)
        setSearchTerm('')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, options, isUserTyping, onSearch])

  const handleSearch = useMemo(() => {
    return async (term: string) => {
      if (!onSearch) {
        setOptions([])
        return
      }
      setIsLoading(true)
      try {
        const results = await onSearch(term)
        setOptions(results)
      } catch (error) {
        console.error('Error searching options:', error)
        setOptions([])
      } finally {
        setIsLoading(false)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm])

  const handleSelectOption = (option: ComboboxOption) => {
    setSelectedOption(option)
    setSearchTerm(option.label)
    setIsOpen(false)
    setIsUserTyping(false)
    onChange?.(option.value)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setSearchTerm(newValue)
    setIsUserTyping(true)
    if (!newValue) {
      setSelectedOption(null)
      onChange?.('')
    }
    handleSearch(newValue)
  }
  const handleInputFocus = () => {
    if (!disabled) {
      setIsOpen(true)
      handleSearch(searchTerm)
    }
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && options.length > 0) {
      e.preventDefault()
      handleSelectOption(options[0])
    } else if (e.key === 'Escape') {
      setIsOpen(false)
      setIsUserTyping(false)
      inputRef.current?.blur()
    }
  }

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen)
      if (!isOpen) {
        inputRef.current?.focus()
        handleSearch(searchTerm)
      }
    }
  }

  const renderIcon = (iconKey?: string) => {
    if (!iconKey) return null

    const iconName = ICONS_KEYS[iconKey]
    if (iconName && ICONS[iconName as keyof typeof ICONS]) {
      const IconComponent = ICONS[iconName as keyof typeof ICONS]
      return <IconComponent size={16} />
    }
    return null
  }

  const renderDropdownContent = () => {
    if (isLoading) {
      return <S.LoadingMessage>Carregando...</S.LoadingMessage>
    }
    if (options.length > 0) {
      return options.map((option) => (
        <S.Option
          key={option.value}
          onClick={() => handleSelectOption(option)}
          className={selectedOption?.value === option.value ? 'selected' : ''}
        >
          <S.OptionContent>
            {renderIcon(option.icon)}
            <span>{option.displayLabel || option.label}</span>
          </S.OptionContent>
        </S.Option>
      ))
    }
    if (searchTerm.length > 0) {
      return <S.EmptyMessage>Nenhum resultado encontrado</S.EmptyMessage>
    }
    return null
  }

  return (
    <S.ComboboxContainer ref={containerRef}>
      {label && <S.Label className={selectClass}>{label}</S.Label>}
      <S.ComboboxWrapper>
        <S.InputWrapper>
          <S.Input
            ref={inputRef}
            type="text"
            className={selectClass}
            placeholder={placeholder}
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onKeyDown={handleInputKeyDown}
            disabled={disabled}
          />
          <S.IconButton type="button" onClick={toggleDropdown} disabled={disabled} className={selectClass}>
            <CaretDownIcon
              size={16}
              weight="bold"
              style={{
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s'
              }}
            />
          </S.IconButton>
        </S.InputWrapper>
        <AnimatePresence>
          {isOpen && (
            <S.Dropdown
              as={motion.div}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={selectClass}
            >
              {renderDropdownContent()}
            </S.Dropdown>
          )}
        </AnimatePresence>
      </S.ComboboxWrapper>
      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
    </S.ComboboxContainer>
  )
}

Combobox.displayName = 'Combobox'
