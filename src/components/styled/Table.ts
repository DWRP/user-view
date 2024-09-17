import styled from 'styled-components'

import {
  Table as AriaTable,
  Cell,
  Column,
  Row,
  TableHeader,
} from 'react-aria-components'

const TableContainer = styled.div`
  overflow-x: auto;
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 0.5rem;
  box-shadow: ${({ theme }) => theme.boxShadow};
  transition: background-color 0.2s, color 0.2s;
  padding: 1rem; /* Adiciona espaçamento interno */
`

const TableStyled = styled(AriaTable)`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px; /* Define uma largura mínima para a tabela */

  @media (max-width: 600px) {
    min-width: 500px; /* Ajusta a largura mínima para telas muito pequenas */
  }
`

const TableHead = styled(TableHeader)`
  background-color: ${({ theme }) => theme.tableHeaderBackground};
`

const TableRow = styled(Row)`
  border-top: 1px solid ${({ theme }) => theme.borderColor};
`

const TableHeaderCell = styled(Column)`
  padding: 0.75rem;
  text-align: left;
  color: ${({ theme }) => theme.text};
  font-weight: bold;
  font-size: 1rem;

  /* Ajustes em telas pequenas */
  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 0.5rem;
  }
`

const TableCell = styled(Cell)`
  padding: 0.75rem;
  color: ${({ theme }) => theme.text};
  font-size: 0.95rem;

  /* Ajustes em telas pequenas */
  @media (max-width: 480px) {
    font-size: 0.85rem;
    padding: 0.5rem;
  }
`

export const Table = {
  Root: TableContainer,
  Table: TableStyled,
  Header: TableHead,
  Row: TableRow,
  Column: TableHeaderCell,
  Cell: TableCell,
}
