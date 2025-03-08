<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted } from 'vue'
import DashboardScreen from './components/Dashboard.vue'
import LoadingScreen from './components/LoadingScreen.vue'
import LoginScreen from './components/LoginScreen.vue'
import OfflineScreen from './components/OfflineScreen.vue'
import { AuthData } from '../../types/AuthData'

const status = ref<{
  status: string
} | null>(null)

const LoginData = ref<AuthData>()
const IsLoggedIn = ref<boolean | false>(false)
//const isLoading = ref(true)
window.electron.ipcRenderer.invoke('luna:update').then(async (e) => {
  if(!e) return;
  await window.electron.ipcRenderer.invoke('luna:login').then((LoginResponse) => {
    LoginData.value = LoginResponse
  })
  //IsLoggedIn.value = true
})


// WIP (seeing what i can do)

// REMOVE FOR PROD THIS IS TO SKIP STUFF
onMounted(() => {
 

  // wow
  window.electron.ipcRenderer.on('update-status', (_, Newstatus) => {
    console.log(`old ${status} / new ${Newstatus.status} status`)
    status.value = Newstatus
  })

  window.electron.ipcRenderer.on('IsLoggedIn', (_, ShouldAutoLogin) => {
    IsLoggedIn.value = ShouldAutoLogin as boolean
  })

  //window.electron.ipcRenderer.on('AuthData', (_, AuthData) => {

  //});

  window.electron.ipcRenderer.on('luna:token', async (_, token) => {
    //window.electron.ipcRenderer.send('luna:token', token)
    console.log('Received token:', token)

    try {
      const URLfr = await window.data.getEnv()
      const response = await axios.get(`${URLfr?.MainBackend}/launcher/api/v1/login`, {
        headers: {
          Authorization: `${token}`
        }
      })

      if (response.data) {
        console.log(response.data)
        window.electron.ipcRenderer.send('luna:auth-data', token, response.data)
        console.log('SIMGA NIGMA ' + (await window.data.getAuthData()))

        window.electron.ipcRenderer.invoke('luna:get-auth-data').then((LoginResponse) => {
          LoginData.value = LoginResponse
        })

        

        // sessionStorage.setItem('authData', JSON.stringify(response.data));
      }
    } catch (error) {
      console.error('Error contacting backend: 2~' + error)
    }
  })
  //isLoading.value = false

  return {
    status,
    LoginData
  }
})
</script>

<template>
  <OfflineScreen
    :status="status"
    v-if="status?.status === 'offline' || status?.status === 'update-available'"
  />
  <LoginScreen v-else-if="status?.status === 'online' && !IsLoggedIn" />
  <DashboardScreen :LoginResponse="LoginData" v-else-if="IsLoggedIn" />
  <LoadingScreen v-else />
</template>
