import { ListIcon } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { MobileHeader } from '@/pages/home/components/header/mobile'
import NavBar from '@/pages/home/components/home-navbar'

import * as S from './styles'

const logoVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 17
    }
  }
}

export const Header = () => {
  const [showMobile, setShowMobile] = useState(false)

  return (
    <S.HeaderContainer>
      <S.HeaderContent>
        <S.LeftSection>
          <motion.div variants={logoVariants} initial="initial" whileHover="hover">
            <S.Logo onClick={() => window.location.assign('/')}>
              <img src="/images/menuxp-logo.svg" alt="MenuXP" />
            </S.Logo>
          </motion.div>
          <S.NavBarWrapper>
            <NavBar />
          </S.NavBarWrapper>
        </S.LeftSection>
        <S.RightSection>
          <S.MobileMenuButton onClick={() => setShowMobile(!showMobile)} aria-label="Toggle menu">
            <ListIcon size={24} weight="bold" />
          </S.MobileMenuButton>
          <S.ButtonsContainer>
            <Button
              size="sm"
              onClick={() => window.open(`${import.meta.env.VITE_ADM_FRONTEND}/login`, '_self')}
              variant="outline"
            >
              Entrar
            </Button>
            <Button
              size="sm"
              onClick={() => window.open(`${import.meta.env.VITE_ADM_FRONTEND}/register`, '_self')}
              variant="primary"
            >
              Cadastrar
            </Button>
          </S.ButtonsContainer>
        </S.RightSection>
      </S.HeaderContent>
      {showMobile && <MobileHeader setShowMobile={setShowMobile} />}
    </S.HeaderContainer>
  )
}
