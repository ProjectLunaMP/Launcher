import { contextBridge } from 'electron'
import { ElectronAPI, electronAPI } from '@electron-toolkit/preload'
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
    electron: ElectronAPI
  }
}
const api = {}

console.log("dsaadsasdasdasadsdasdas")
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
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
