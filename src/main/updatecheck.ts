import axios from 'axios';
import { BrowserWindow } from 'electron';
import { readFileSync } from 'fs'
import { join } from 'path'

const getAppVersion = (): string => {
  const packageJsonPath = join(__dirname, '../../package.json')
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))
  return packageJson.version
}

export async function update(mainWindow: BrowserWindow): Promise<void> {
  console.log('UPDATE ' + getAppVersion())

  try{
    axios.get("http://127.0.0.1:1111/launcher/api/v1/version").then(response => {
      if(response.data){
        console.log(response.data);
        if(response.data.LauncherVersion === getAppVersion()) {
          console.log("TEST!!");
          // not sure
          mainWindow.webContents.send('update-status', { status: 'online' });
        }else {
          mainWindow.webContents.send('update-status', { status: 'update-available' });
        }
      }
    }).catch(err => {
      console.error(err);
      // Servers could be offline!
      mainWindow.webContents.send('update-status', { status: 'offline' });
    })
  }catch (err) {
    console.error("WEIRD " + err);
  }
}
