import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import path, { join, resolve } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { update } from './updatecheck'
import { AuthData } from '../types/AuthData'
import { saveTokenToIni } from './IniConfig'
import user, { login } from './login'

//import { spawn, execSync } from 'child_process'
//import axios from 'axios'

let mainWindow: BrowserWindow | null
let authData: AuthData | null = null

//import dllinjector from '../../resources/dllinjector.node'
import { existsSync, lstatSync, readFileSync, writeFileSync } from 'fs'
import { GrabNews } from './GrabNews'
import { getBuildVersion } from './VersionSearcher'
import { handleBuildConfig } from './JsonConfig'
import { FortniteDetect } from './FortniteDetect'
import { Worker, WorkerOptions } from 'worker_threads'

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

    ipcMain.handle('luna:update', async () => {
      console.log(await update(mainWindow!))
      if (!(await update(mainWindow!))) {
        return null
      }

      await GrabNews() // if news fail will just default to default news!

      // Load Other stuff??? news

      return 'e'
    })

    ipcMain.handle('luna:login', () => {
      return login(/*authData!, */ mainWindow!)
    })

    ipcMain.on('luna:auth-data', async (_, token: string, data: AuthData) => {
      saveTokenToIni(token)
      if (authData) {
        await user.login(data, token)
        //authData.AccessToken = token
        mainWindow!.webContents.send('IsLoggedIn', true)
      }
    })

    ipcMain.handle('luna:get-auth-data', () => {
      return user.user
    })

    ipcMain.handle('luna:get-news-data', () => {
      return user.news
    })

    ipcMain.on('luna:launchgame', (_, { gameExePath }) => {
      setImmediate(() => {
        mainWindow?.webContents.send('gameStatus', { Launching: true });

        const lunaFolderPath = join(app.getPath('userData'), 'Luna')
        const dllPath = join(lunaFolderPath, 'FortCurl.dll')
        //
        const workerOptions: WorkerOptions = {
          workerData: { gameExePath, dllPath, user: user }
        }

        const worker = new Worker(path.join(__dirname, '_gameWorker.js'), workerOptions)

        worker.on('message', (message) => {
          if (message.status === 'success') {
            console.log('Game launched successfully!')
            //event.sender.send('luna:gameStatus', 'Game launched successfully!')
            mainWindow?.webContents.send('gameStatus', { Launching: false });
          } else {
            console.error('Error launching game:', message.message)
            mainWindow?.webContents.send('gameStatus', { Launching: false });
          }
        })

        worker.on('error', (error) => {
          console.error('Worker error:', error)
          mainWindow?.webContents.send('gameStatus', { Launching: false });
        })

        worker.on('exit', (code) => {
          if (code !== 0) {
            console.error(`Worker stopped with exit code ${code}`)
          }
        })
      })
      console.log('PORN!')
    })

    ipcMain.handle('luna:addpath', async (_, { PathValue }) => {
      console.log(PathValue)
      const fortniteGamePath = path.join(PathValue, 'FortniteGame')
      const enginePath = path.join(PathValue, 'Engine')
      const hasFortniteGame =
        existsSync(fortniteGamePath) && lstatSync(fortniteGamePath).isDirectory()
      const hasEngine = existsSync(enginePath) && lstatSync(enginePath).isDirectory()

      if (hasFortniteGame && hasEngine) {
        const gameExecutablePath = path.join(
          PathValue,
          'FortniteGame\\Binaries\\Win64\\FortniteClient-Win64-Shipping.exe'
        )

        const result = await getBuildVersion(gameExecutablePath)

        if (result == 'ERROR') {
          return 'Error'
        } else {
          var Reponse = handleBuildConfig(
            Buffer.from(result, 'utf-8').toString('base64'),
            result,
            PathValue
          )

          return Reponse
          //writeToConfig(PathValue, gameExecutablePath, Buffer.from(result, 'utf-8').toString('base64'))
        }

        // other stuf
        //getBuildVersion
      } else {
        // tell the thing that called this that theres a path error!
        return 'Error'
      }
    })

    ipcMain.handle('dialog:openFile', async () => {
      const result = await dialog.showOpenDialog({
        properties: ['openDirectory']
      })

      if (result.canceled) {
        return null
      } else {
        // check if the folder contains "FortniteGame" and "Engine" if doesnt just send back a error!!
        const selectedPath = result.filePaths[0]
        const fortniteGamePath = path.join(selectedPath, 'FortniteGame')
        const enginePath = path.join(selectedPath, 'Engine')
        const hasFortniteGame =
          existsSync(fortniteGamePath) && lstatSync(fortniteGamePath).isDirectory()
        const hasEngine = existsSync(enginePath) && lstatSync(enginePath).isDirectory()

        if (hasFortniteGame && hasEngine) {
          return selectedPath
        } else {
          return 'Error'
        }
      }
    })

    ipcMain.handle('luna:get-builds', async () => {
      try {
        const lunaFolderPath = join(app.getPath('userData'), 'Luna')
        const FilePath = join(lunaFolderPath, 'builds.json')
        if (!existsSync(FilePath)) {
          writeFileSync(FilePath, JSON.stringify([]))
        }
        const builds = JSON.parse(readFileSync(FilePath, 'utf-8'))
        return builds
      } catch (error) {
        console.error('Error reading build.json file!', error)
        return []
      }
    })

    ipcMain.handle('luna:getBuildVersion', async (_, buildString: string) => {
      return FortniteDetect(buildString)
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
