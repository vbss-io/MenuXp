import styled from 'styled-components'

const Container = styled.main`
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('/images/image-5.jpg');
    opacity: 0.1;
    pointer-events: none;
  }
`

export const Home = () => {
  return <Container>MenuXp</Container>
}
