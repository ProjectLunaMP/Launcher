import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join, resolve } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { update } from './updatecheck'
import { AuthData } from '../types/AuthData'
import { saveTokenToIni } from './IniConfig'
import { login } from './login'
//import axios from 'axios'

let mainWindow: BrowserWindow | null
let authData: AuthData | null = null

function createWindow(): void {
  //registerProtocol()
  const preloadPath = join(__dirname, '../preload/preload.js')
  console.log('Preload script path:', preloadPath)

  if (!mainWindow) {
    mainWindow = new BrowserWindow({
      width: 1270,
      height: 720,
      show: false,
      ...(process.platform === 'linux' ? { icon } : {}),
      webPreferences: {
        preload: join(__dirname, '../preload/preload.js'),
        contextIsolation: true,
        nodeIntegration: false,
        sandbox: false
      },
      resizable: false
    })

    //  mainWindow.setMenu(null) // god

    mainWindow.on('ready-to-show', () => {
      mainWindow!.show()
    })

    mainWindow.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url)
      return { action: 'deny' }
    })

    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
      mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
    }

    ipcMain.on('luna:update', async () => {
      console.log('TEST')
      update(mainWindow!)
    })

    ipcMain.handle('luna:login', () => {
      return login(authData!, mainWindow!)
    })

    ipcMain.on('luna:auth-data', (_, token: string, data: AuthData) => {
      saveTokenToIni(token)
      authData = data
      if (authData) {
        authData.AccessToken = token
        mainWindow!.webContents.send('IsLoggedIn', true)
      }
    })

    ipcMain.handle('luna:get-auth-data', () => {
      return authData
    })
    //ipcMain.on('luna:get-auth-data', async (_) => mainWindow!.webContents.send('AuthData', authData));
  }
}

app.whenReady().then(() => {
  console.log(mainWindow)

  var requestSingleInstanceLock = app.requestSingleInstanceLock()
  if (!requestSingleInstanceLock) {
    app.quit()
  } else {
    app.on('second-instance', (event, argv) => {
      event.preventDefault()
      if (argv && argv.length > 1) {
        const rawToken = argv.find((arg) => arg.startsWith('lunafn://'))

        if (rawToken) {
          const token = rawToken.replace('lunafn://', '').split('/')[0]
          console.log('Token', token)
          if (mainWindow) {
            mainWindow.webContents.send('luna:token', token)
            mainWindow.focus()
          }
        }
      }
    })
  }

  // this isnt inwdows
  /* app.on('open-url', (event, url) => {
    event.preventDefault()
    const token = new URL(url).pathname.split('/')[1]
    console.log('Token:', token)

    ipcRenderer.send("luna:token", token)
    if (mainWindow) {
      mainWindow.webContents.send('protocol-token', token)
      mainWindow.focus();
    }
  })*/

  const appPathProd = resolve(app.getAppPath())

  console.log('dsad ' + join(appPathProd, '../../Luna.exe'))
  electronApp.setAppUserModelId('com.luna')

  app.setAsDefaultProtocolClient('LunaFN', join(appPathProd, '../../Luna.exe'))

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  console.log(mainWindow)
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
