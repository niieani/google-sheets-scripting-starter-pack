import { getColumnName } from './helpers'
import axios from 'axios'

export function onOpen(e: any) {
  const menu = SpreadsheetApp.getUi().createAddonMenu()
  menu.addItem('Start workflow', 'workflow')
  menu.addToUi()
}

export async function workflow() {
  const client = axios.create({ responseType: 'json' })

  try {
    const result = await client.get('https://ifconfig.co/json')
    const { data } = result
    Logger.log(`My IP is: ${data.ip}`)

    const sheet = SpreadsheetApp.getActive()
    const keys = Object.keys(data)
    const values = keys.map((key) =>
      typeof data[key] === 'object'
        ? JSON.stringify(data[key], null, 2)
        : data[key],
    )
    const cellData = [keys, values]
    const range = sheet.getRange(
      `A1:${getColumnName(keys.length)}${cellData.length}`,
    )
    range.setValues(cellData)
  } catch (e) {
    Logger.log('Error')
    Logger.log(e)
  }
}
