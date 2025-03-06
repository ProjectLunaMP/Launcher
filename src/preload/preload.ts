import { contextBridge } from 'electron'
import { ElectronAPI, electronAPI } from '@electron-toolkit/preload'
//import { AuthData } from '../types/AuthData'
/*
declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
  }
}
*/
declare global {
  interface Window {
    electron: ElectronAPI,
    data: {
      //setAuthData: (data: { token: string, username: string }) => void;
      getAuthData: () => Promise<{ token: string, username: string } | null>;
    },
    application: {
       BaseURL: string
    }
  }
}



const api = {}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('data', {
     // onAuthData: (callback: (data: AuthData) => void) =>
      //  electronAPI.ipcRenderer.on('luna:auth-data', (_, data: AuthData) => callback(data)),
      getAuthData: () => electronAPI.ipcRenderer.invoke('luna:get-auth-data'),
    })
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('application', {
        BaseURL: globalThis.BaseURL
      }
    )
  } catch (error) {
    console.error(error)
  }
} else {
  console.timeLog('not running')
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}


console.log("Preload File Loaded")