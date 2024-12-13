<script setup lang="ts">

import { ref, onMounted } from 'vue'
import LoadingScreen from './components/LoadingScreen.vue'
import LoginScreen from './components/LoginScreen.vue'
import OfflineScreen from './components/OfflineScreen.vue';

const status = ref<{
  status: string
} | null>(null);; 
const isLoading = ref(true)

window.electron.ipcRenderer.send('luna:update')
// WIP (seeing what i can do)
//const ipcHandle = () => window.electron.ipcRenderer.send('ping') //  <a target="_blank" rel="noreferrer" @click="ipcHandle">Send IPC</a>

// REMOVE FOR PROD THIS IS TO SKIP STUFF
onMounted(() => {
 
  // wow
  window.electron.ipcRenderer.on('update-status', (_, Newstatus) => {
      console.log(`old ${status} / new ${Newstatus.status} status`);
      status.value = Newstatus;
  });
  //isLoading.value = false

  return {
    status
  }
})



</script>

<template>
  <OfflineScreen :status="status" v-if="status?.status === 'offline' || status?.status === 'update-available'" />
  <LoginScreen v-else-if="status?.status === 'online'" />
  <LoadingScreen v-else />
</template>
