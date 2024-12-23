import { app, shell, BrowserWindow, ipcMain, dialog  } from 'electron'
import path, { join, resolve } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { update } from './updatecheck'
import { AuthData } from '../types/AuthData'
import { saveTokenToIni } from './IniConfig'
import user, { login } from './login'

import { spawn, execSync } from 'child_process'
//import axios from 'axios'

let mainWindow: BrowserWindow | null
let authData: AuthData | null = null

import dllinjector from '../../resources/dllinjector.node';
import { existsSync, lstatSync } from 'fs'
import { GrabNews } from './GrabNews'

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
      console.log(await update(mainWindow!));
      if(!await update(mainWindow!)) {
        return null;
      }

      await GrabNews(mainWindow!); // if news fail will just default to default news!

      // Load Other stuff??? news

      return "e";
    })

    ipcMain.handle('luna:login', () => {
      return login(authData!, mainWindow!)
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

    ipcMain.on('luna:launchgame', (_, { gameExePath, dllPath }) => {
      console.log(gameExePath)
      console.log(dllPath)
      const ShippingEAC = path.join(
        gameExePath,
        'FortniteGame\\Binaries\\Win64\\FortniteClient-Win64-Shipping_BE.exe'
      )
      if(existsSync(ShippingEAC)) {
        const EACProcess = spawn(ShippingEAC);
        console.log(EACProcess.pid);
        dllinjector.freezeProcess(EACProcess.pid);
      }

      const ForniteLauncher = path.join(
        gameExePath,
        'FortniteGame\\Binaries\\Win64\\FortniteLauncher.exe'
      )

      if(existsSync(ForniteLauncher)) {
        const ForniteLauncherProcess = spawn(ForniteLauncher);
        dllinjector.freezeProcess(ForniteLauncherProcess.pid);
      }
   
     
      const gameExecutablePath = path.join(
        gameExePath,
        'FortniteGame\\Binaries\\Win64\\FortniteClient-Win64-Shipping.exe'
      )
      execSync("set OPENSSL_ia32cap=:~0x20000000");
      const gameProcess = spawn(
        gameExecutablePath,
        ('-epicapp=Fortnite -epicenv=Prod -epiclocale=en-us -epicportal -skippatchcheck -noeac -fromfl=be -fltoken=e8eb05fag41046i3hd23c89c -frombe AUTH_TYPE=exchangecode -AUTH_LOGIN=unused -AUTH_PASSWORD=' +
          user.user?.AccessToken).split(' '),
        { env: { OPENSSL_ia32cap: ':~0x20000000' } }
      )
      dllinjector.injectDll(gameProcess.pid, dllPath);
      console.log('PORN!')
    })

    ipcMain.handle('dialog:openFile', async () => {
      const result = await dialog.showOpenDialog({
        properties: ['openDirectory']
      });
    
      if (result.canceled) {
        return null;
      } else {
        // check if the folder contains "FortniteGame" and "Engine" if doesnt just send back a error!!
        const selectedPath = result.filePaths[0];
        const fortniteGamePath = path.join(selectedPath, 'FortniteGame');
        const enginePath = path.join(selectedPath, 'Engine');
        const hasFortniteGame = existsSync(fortniteGamePath) && lstatSync(fortniteGamePath).isDirectory();
        const hasEngine = existsSync(enginePath) && lstatSync(enginePath).isDirectory();
    
        if (hasFortniteGame && hasEngine) {
          return selectedPath;
        }else {
          return "Error"
        }
        
        
      }
    });
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
