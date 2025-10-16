import { XIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'

import { Button } from '@menuxp/ui'

import * as S from './styles'

interface MobileHeaderProps {
  setShowMobile: (show: boolean) => void
}

const mobileVariants = {
  initial: {
    x: '100%',
    opacity: 0
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 200,
      damping: 25,
      mass: 1
    }
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 200,
      damping: 25,
      mass: 1
    }
  }
}

const logoVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      type: 'spring' as const,
      stiffness: 200,
      damping: 25,
      mass: 1
    }
  }
}

export const MobileHeader = ({ setShowMobile }: MobileHeaderProps) => {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.width = '100%'
    return () => {
      document.body.style.overflow = originalStyle
      document.body.style.position = ''
      document.body.style.width = ''
    }
  }, [])

  const handleHomeLinkClick = (href: string) => {
    setShowMobile(false)
    setTimeout(() => {
      const element = document.querySelector(href)
      if (element) {
        const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80
        window.scrollTo({ top: offsetTop, behavior: 'smooth' })
      }
    }, 100)
  }

  const homeNavLinks = [
    { label: 'Funcionalidades', href: '#features' },
    { label: 'Gamificação', href: '#gamificacao' },
    { label: 'Gestão', href: '#kanban' },
    { label: 'FAQ', href: '#faq' }
  ]

  return (
    <AnimatePresence>
      <S.MobileContainer variants={mobileVariants} initial="initial" animate="animate" exit="exit">
        <S.CloseButton onClick={() => setShowMobile(false)}>
          <XIcon size={24} weight="bold" />
        </S.CloseButton>
        <S.MobileContent className="mobile-header-content">
          <S.MobileHeaderSection>
            <motion.div variants={logoVariants} initial="initial" whileHover="hover">
              <S.MobileLogo onClick={() => window.location.assign('/')}>
                <img src="/images/menuxp-logo.svg" alt="MenuXP" />
              </S.MobileLogo>
            </motion.div>
          </S.MobileHeaderSection>
          <S.HomeNavSection>
            <S.HomeNavTitle>Navegação</S.HomeNavTitle>
            <S.HomeNavLinks>
              {homeNavLinks.map((link) => (
                <S.HomeNavLink
                  key={link.href}
                  href={link.href}
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault()
                    handleHomeLinkClick(link.href)
                  }}
                >
                  {link.label}
                </S.HomeNavLink>
              ))}
            </S.HomeNavLinks>
          </S.HomeNavSection>
          <S.MobileButtonsContainer>
            <Button
              onClick={() => window.open(`${import.meta.env.VITE_ADM_FRONTEND}/login`, '_self')}
              variant="white"
              size="md"
            >
              Entrar
            </Button>
            <Button
              onClick={() => window.open(`${import.meta.env.VITE_ADM_FRONTEND}/register`, '_self')}
              variant="primary"
              size="md"
            >
              Cadastrar
            </Button>
          </S.MobileButtonsContainer>
        </S.MobileContent>
      </S.MobileContainer>
    </AnimatePresence>
  )
}
