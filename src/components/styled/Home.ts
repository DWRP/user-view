import { styled } from 'styled-components'

const Container = styled.div`
  height: 100vh;

  margin: 0 auto;
  padding: 1rem;

  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};

  transition: background-color 0.2s, color 0.2s;
`

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 640px) {
    flex-direction: row;
    align-items: flex-end;
  }
  justify-content: space-between;
  align-items: flex-end;
  gap: 1rem;
  margin-bottom: 1.5rem;
`

export const Home = {
  Container,
  Controls,
}
