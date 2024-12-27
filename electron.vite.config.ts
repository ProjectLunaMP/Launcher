import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'

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
    }
  },
  preload: {
    resolve: {
      alias: {
        '@electron-toolkit/preload': resolve('node_modules/@electron-toolkit/preload'),
      },
    },
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
      }
    },
    plugins: [vue()]
    
  }
})
