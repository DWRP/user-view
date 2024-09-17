import styled from 'styled-components'

const HeaderContainer = styled.header`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  @media (max-width: 320px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`

const HeaderOptions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 1rem;
`

export const Header = {
  Root: HeaderContainer,
  Title,
  Options: HeaderOptions,
}
