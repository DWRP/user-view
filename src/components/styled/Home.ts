import { styled } from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
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
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: flex-end;
  }
`

const Content = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  height: calc(100dvh - 320px);
  padding-bottom: 1rem;
`

const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: flex-start;
  padding: 1rem 0;
`

const Footer = styled.footer`
  padding: 0.5rem 0;
  text-align: center;
  border-top: 1px solid ${({ theme }) => theme.text};
`

export const Home = {
  Container,
  Controls,
  Content,
  Main,
  Footer,
}
