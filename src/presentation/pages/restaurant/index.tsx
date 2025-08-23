import { useParams } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  font-size: 24px;
  font-weight: bold;
  color: #333;
`
// To-Do: Implement restaurant page for clients
export const RestaurantPage = () => {
  const { slug } = useParams<{ slug: string }>()
  return <Container>{slug}</Container>
}
