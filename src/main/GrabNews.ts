import axios from 'axios'
//import { BrowserWindow } from 'electron'
import user from './login'

export async function GrabNews(): Promise<void> {
  try {
    
    const response = await axios.get(`${globalThis.BaseURL}/launcher/api/v1/news`)

    if (response.data) {
      //console.log(response.data)
      await user.SetupNews(response.data);
    }
  } catch (err) {}
}
