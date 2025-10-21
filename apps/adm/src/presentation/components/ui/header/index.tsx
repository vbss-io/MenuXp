import { MobileHeader } from '@/presentation/components/ui/header/mobile'
import { UserMenu } from '@/presentation/components/ui/user-menu'
import { useAuth } from '@/presentation/hooks/use-auth'
import { Button } from '@menuxp/ui'
import { ListIcon } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

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
  const { user } = useAuth()
  const [showMobile, setShowMobile] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  if (!isMobile) {
    return null
  }

  return (
    <S.HeaderContainer>
      <S.HeaderContent>
        <S.LeftSection>
          <motion.div variants={logoVariants} initial="initial" whileHover="hover">
            <S.Logo onClick={() => window.location.assign('/')}>
              <img src="/images/menuxp-logo.svg" alt="MenuXP" />
            </S.Logo>
          </motion.div>
        </S.LeftSection>
        <S.RightSection>
          <S.MobileMenuButton onClick={() => setShowMobile(!showMobile)} aria-label="Toggle menu">
            <ListIcon size={24} weight="bold" />
          </S.MobileMenuButton>
          {!user ? (
            <S.ButtonsContainer>
              <Button size="sm" as="a" href="/login" variant="outline">
                Entrar
              </Button>
              <Button size="sm" as="a" href="/register" variant="primary">
                Cadastrar
              </Button>
            </S.ButtonsContainer>
          ) : (
            <S.UserMenuWrapper>
              <UserMenu />
            </S.UserMenuWrapper>
          )}
        </S.RightSection>
      </S.HeaderContent>
      {showMobile && <MobileHeader setShowMobile={setShowMobile} />}
    </S.HeaderContainer>
  )
}
