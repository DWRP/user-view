import { Table } from '@components/styled/Table'
import { render } from '../../../utils/test-utils'
import '@testing-library/jest-dom'
import 'jest-styled-components'
import { darkTheme, lightTheme } from '@themes/theme'
import { axe, toHaveNoViolations } from 'jest-axe'
import { TableBody } from 'react-aria-components'
import type { DefaultTheme } from 'styled-components'

expect.extend(toHaveNoViolations)

const renderTable = (theme: DefaultTheme) => {
  return render(
    <Table.Root aria-label="table-container">
      <Table.Table aria-label="user-table">
        <Table.Header>
          <Table.Row>
            <Table.Column isRowHeader>Name</Table.Column>
            <Table.Column>Email</Table.Column>
          </Table.Row>
        </Table.Header>
        <TableBody>
          <Table.Row>
            <Table.Cell>John Doe</Table.Cell>
            <Table.Cell>john@example.com</Table.Cell>
          </Table.Row>
        </TableBody>
      </Table.Table>
    </Table.Root>,
    { theme },
  )
}

describe('Table Component (styled)', () => {
  test.each([
    ['light', lightTheme],
    ['dark', darkTheme],
  ])(
    'should apply correct styles in TableContainer with %s theme',
    (_, theme) => {
      const { container } = renderTable(theme)
      const tableContainer = container.firstChild

      expect(tableContainer).toBeInTheDocument()
      expect(tableContainer).toHaveStyleRule(
        'background-color',
        theme.cardBackground,
      )
      expect(tableContainer).toHaveStyleRule('box-shadow', theme.boxShadow)
      expect(tableContainer).toHaveStyleRule('border-radius', '0.5rem')
      expect(tableContainer).toHaveStyleRule('padding', '1rem')
    },
  )

  test.each([
    ['light', lightTheme],
    ['dark', darkTheme],
  ])('should apply correct styles in TableHeader with %s theme', (_, theme) => {
    const { container } = renderTable(theme)
    const tableHeader = container.querySelector('thead')

    expect(tableHeader).toBeInTheDocument()
    expect(tableHeader).toHaveStyleRule(
      'background-color',
      theme.tableHeaderBackground,
    )
  })

  test.each([
    ['light', lightTheme],
    ['dark', darkTheme],
  ])('should apply correct styles in TableRow with %s theme', (_, theme) => {
    const { container } = renderTable(theme)
    const tableRow = container.querySelector('tr')

    expect(tableRow).toBeInTheDocument()
    expect(tableRow?.firstChild).toHaveStyleRule('color', theme.text)
  })

  test.each([
    ['light', lightTheme],
    ['dark', darkTheme],
  ])('should apply correct styles in TableColumn with %s theme', (_, theme) => {
    const { container } = renderTable(theme)
    const tableHeaderCell = container.querySelector('th')

    expect(tableHeaderCell).toBeInTheDocument()
    expect(tableHeaderCell).toHaveStyleRule('padding', '0.75rem')
    expect(tableHeaderCell).toHaveStyleRule('text-align', 'left')
    expect(tableHeaderCell).toHaveStyleRule('color', theme.text)
  })

  test.each([
    ['light', lightTheme],
    ['dark', darkTheme],
  ])('should apply correct styles in TableCell with %s theme', (_, theme) => {
    const { container } = renderTable(theme)
    const tableCell = container.querySelector('td')

    expect(tableCell).toBeInTheDocument()
    expect(tableCell).toHaveStyleRule('padding', '0.75rem')
    expect(tableCell).toHaveStyleRule('color', theme.text)
  })

  test.each([
    ['light', lightTheme],
    ['dark', darkTheme],
  ])('should be accessible with %s theme', async (_, theme) => {
    const { container } = renderTable(theme)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
