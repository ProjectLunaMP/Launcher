import axios from 'axios'
import { BrowserWindow } from 'electron'
import user from './login'

export async function GrabNews(mainWindow: BrowserWindow): Promise<void> {
  try {
    const response = await axios.get('http://127.0.0.1:1111/launcher/api/v1/news')

    if (response.data) {
      console.log(response.data)
      await user.SetupNews(response.data);
    }
  } catch (err) {}
}
