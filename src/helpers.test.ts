import { getColumnName } from './helpers'

test('convert column number to letter', () => {
  expect(getColumnName(5)).toBe('E')
})
