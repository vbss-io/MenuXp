import { Button } from '@menuxp/ui'
import { HouseIcon, RocketIcon } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useTranslator } from 'vbss-translator'

import * as S from './styles'

export const NotFound = () => {
  const { t } = useTranslator()
  const navigate = useNavigate()

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

  return (
    <S.Container>
      <S.NotFoundContent variants={containerVariants} initial="hidden" animate="visible">
        <S.TitleContainer variants={itemVariants}>
          <RocketIcon size={48} weight="duotone" />
          <S.Title>{t('GAME OVER')}</S.Title>
        </S.TitleContainer>
        <S.Message variants={itemVariants}>
          {t(
            'Ops! Parece que você encontrou um glitch na matrix. Esta página não existe ou foi movida para outro lugar.'
          )}
        </S.Message>
        <S.ButtonContainer variants={itemVariants}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => navigate('/')}
              variant="primary"
              size="lg"
              leftIcon={<HouseIcon size={20} weight="fill" />}
            >
              {t('Voltar a Home')}
            </Button>
          </motion.div>
        </S.ButtonContainer>
      </S.NotFoundContent>
    </S.Container>
  )
}
