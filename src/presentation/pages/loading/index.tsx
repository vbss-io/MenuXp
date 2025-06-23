import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { Loading } from '@/presentation/components/ui/loading'

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 5rem);
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background};
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`

export const LoadingPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/')
    }, 2000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <Container>
      <Content>
        <Loading />
      </Content>
    </Container>
  )
}
