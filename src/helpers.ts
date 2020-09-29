export function getColumnName(columnNumber: number) {
  let dividend = columnNumber
  let columnName = ''
  let modulo: number

  while (dividend > 0) {
    modulo = (dividend - 1) % 26
    columnName = String.fromCharCode(65 + modulo).toString() + columnName
    dividend = Math.floor((dividend - modulo) / 26)
  }

  return columnName
}
