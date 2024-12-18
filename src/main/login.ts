import { BrowserWindow } from 'electron'
import { readTokenFromIni } from './IniConfig'
import { AuthData } from '../types/AuthData'
import axios from 'axios'

class UserService {
  user: AuthData | null;

  constructor() {
    this.user = null;
  }

  login(authData: AuthData, TOKEN: string) {
    this.user = authData;
    this.user.AccessToken = TOKEN;

    this.user.RoleColor = this.DoTheRolesBud(authData.RoleName);

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
}

const user = new UserService();
export default user;

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
      user.login(response.data, TOKEN);
      mainWindow!.webContents.send('IsLoggedIn', true)
      //update-status
      return user.user;
    }
  } catch (error) {
    console.error('Error contacting backend:')
  }

  return null
}
