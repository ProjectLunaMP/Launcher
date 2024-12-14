import { ipcRenderer } from 'electron';

declare global {
  interface Window {
    electron: {
      ipcRenderer: typeof ipcRenderer;
    },
    data: {
      //setAuthData: (data: { token: string, username: string }) => void;
      getAuthData: () => Promise<{ token: string, username: string } | null>;
    }
  }
}

export {}; 
