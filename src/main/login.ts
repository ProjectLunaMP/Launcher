import { BrowserWindow } from 'electron'
import { readTokenFromIni } from './IniConfig'
import { AuthData } from '../types/AuthData'
import { LauncherNews } from '../types/NewsData'
import axios from 'axios'
import { setActivity } from './rpc'

class UserService {
  user: AuthData | null;
  news: LauncherNews | null;

  constructor() {
    this.user = null;
    this.news = null;
  }

  async login(authData: AuthData, TOKEN: string) {
    this.user = authData;
    this.user.AccessToken = TOKEN;
    this.user.RoleColor = this.DoTheRolesBud(authData.RoleName);
    this.user.character = await this.DoMyCharacterBud(authData.character);
  }

  async SetupNews(newsData: LauncherNews) {
    this.news = newsData
  }

  DoTheRolesBud(ROLE: string): string{
    const roleColors = {
      'Server Booster': '#f47fff',
      'Admin': "#9b59b6",
      'Developer': "#3fffd5",
      "Moderator": "#3498db",
      "Helper": "#d036f6",
      "Private": "#ff3c9d",
      'Owner': "#e91e63"
    }

    return roleColors[ROLE as keyof typeof roleColors] ?? 'lightgray';
  }

  async DoMyCharacterBud(Character: string): Promise<string> {
    try{

      return `https://fortnite-api.com/images/cosmetics/br/${Character}/icon.png`
      /*const response = await fetch(`https://fortnite-api.com/v2/cosmetics/br/${Character}`); 
      const data = await response.json();

      if(data){
        return data.data.images.icon
      }*/
    }catch(err){

    }

    return "https://fortnite-api.com/images/cosmetics/br/cid_001_athena_commando_f_default/icon.png"
  }
}

const user = new UserService();
export default user;

export async function login(mainWindow: BrowserWindow): Promise<AuthData | null> {
  var TOKEN = readTokenFromIni()
  console.log('TOKEN ' + TOKEN)
  try {
    console.log(globalThis.MainBackend);
    const response = await axios.get(`${globalThis.MainBackend}/launcher/api/v1/login`, {
      headers: {
        Authorization: `${TOKEN}`
      }
    })

    if (response.data) {
      await user.login(response.data, TOKEN);
      mainWindow!.webContents.send('IsLoggedIn', true)
      setActivity(`Logged In as ${user.user?.username}`)
      //update-status
      return user.user;
    }
  } catch (error) {
    setActivity(); // failed so defualt one
    console.error('Error contacting backend: ' + error)
  }

  return null
}
