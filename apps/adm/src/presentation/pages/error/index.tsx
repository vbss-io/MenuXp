import { useAuth } from '@/presentation/hooks/use-auth'
import { Button } from '@menuxp/ui'
import { HouseIcon, WarningCircleIcon } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

import * as S from './styles'

export const Error = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  const handleGoBack = () => {
    if (user) {
      navigate('/dashboard')
    } else {
      navigate('/')
    }
  }

  return (
    <S.Container>
      <S.ErrorContent variants={containerVariants} initial="hidden" animate="visible">
        <S.TitleContainer variants={itemVariants}>
          <WarningCircleIcon size={48} weight="duotone" />
          <S.Title>ERROR</S.Title>
        </S.TitleContainer>
        <S.Message variants={itemVariants}>
          Ops! Parece que algo deu errado. Esta página encontrou um erro inesperado.
        </S.Message>
        <S.ButtonContainer variants={itemVariants}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={handleGoBack} variant="primary" size="lg" leftIcon={<HouseIcon size={20} weight="fill" />}>
              {user ? 'Voltar ao Dashboard' : 'Voltar ao Menu'}
            </Button>
          </motion.div>
        </S.ButtonContainer>
      </S.ErrorContent>
    </S.Container>
  )
}
