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

const LoginData = ref<AuthData>();
const IsLoggedIn = ref<boolean | false>(false)
//const isLoading = ref(true)
window.electron.ipcRenderer.send('luna:update')

// WIP (seeing what i can do)
//const ipcHandle = () => window.electron.ipcRenderer.send('ping') //  <a target="_blank" rel="noreferrer" @click="ipcHandle">Send IPC</a>

// REMOVE FOR PROD THIS IS TO SKIP STUFF
onMounted(() => {
  var LoginResponse = window.electron.ipcRenderer.invoke('luna:login').then((LoginResponse) => {
    LoginData.value = LoginResponse;
  })
  
  console.log('LOGIN AUTO DATA ' + LoginResponse)
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
      const response = await axios.get('http://127.0.0.1:1111/launcher/api/v1/login', {
        headers: {
          Authorization: `${token}`
        }
      })

      if (response.data) {
        window.electron.ipcRenderer.send('luna:auth-data', token, response.data)
        console.log('SIMGA NIGMA ' + await window.data.getAuthData())

        window.electron.ipcRenderer.invoke('luna:get-auth-data').then((LoginResponse) => {
          LoginData.value = LoginResponse;
        })

        // sessionStorage.setItem('authData', JSON.stringify(response.data));
      }
    } catch (error) {
      console.error('Error contacting backend:')
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
