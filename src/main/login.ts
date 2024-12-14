import { BrowserWindow } from 'electron'
import { readTokenFromIni } from './IniConfig'
import { AuthData } from '../types/AuthData'
import axios from 'axios'

export async function login(authData: AuthData, mainWindow: BrowserWindow): Promise<AuthData | null> {
  var TOKEN = readTokenFromIni()
  console.log('TOKEN ' + TOKEN)
  try {
    const response = await axios.get('http://127.0.0.1:1111/launcher/api/v1/login', {
      headers: {
        Authorization: `${TOKEN}`
      }
    })

    if (response.data) {
      authData = response.data
      if (authData) {
        authData.AccessToken = TOKEN
        console.log('SIMGA NIGMA ' + authData)
        mainWindow!.webContents.send('IsLoggedIn', true)
        //update-status
        return authData
      }
    }
  } catch (error) {
    console.error('Error contacting backend:')
  }

  return null
}
