import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import { config } from 'dotenv'
config()

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'src/main/index.ts'),
          _gameWorker: resolve(__dirname, 'src/_gameWorker.ts')
        }
      }
    },
    define: {
      'process.env.VITE_API_PROD': JSON.stringify(process.env.VITE_API_PROD),
      'process.env.VITE_PROD': JSON.stringify(process.env.VITE_PROD)
    }
  },
  preload: {
    resolve: {
      alias: {
        '@electron-toolkit/preload': resolve('node_modules/@electron-toolkit/preload')
      }
    },
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [vue()]
  }
})
