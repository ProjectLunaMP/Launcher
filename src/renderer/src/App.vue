<script setup lang="ts">
import { ref, onMounted } from 'vue'
import LoadingScreen from './components/LoadingScreen.vue'
import LoginScreen from './components/LoginScreen.vue'

const isLoading = ref(true)
// WIP (seeing what i can do)
//const ipcHandle = () => window.electron.ipcRenderer.send('ping') //  <a target="_blank" rel="noreferrer" @click="ipcHandle">Send IPC</a>

// REMOVE FOR PROD THIS IS TO SKIP STUFF
onMounted(() => {
  isLoading.value = false
})
</script>

<template>
  <LoginScreen v-if="!isLoading" />
  <LoadingScreen v-else />
</template>
