import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Loading } from '@menuxp/ui'

import * as S from './styles'

export const LoadingPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/')
    }, 2000)

    return () => clearTimeout(timer)
  }, [navigate])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  const contentVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.2
      }
    }
  }

  return (
    <S.Container>
      <S.LoadingContent variants={containerVariants} initial="hidden" animate="visible">
        <S.LoadingWrapper variants={contentVariants}>
          <Loading />
        </S.LoadingWrapper>
      </S.LoadingContent>
    </S.Container>
  )
}
