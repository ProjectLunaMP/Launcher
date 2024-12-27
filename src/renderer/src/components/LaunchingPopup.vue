<template>
    
  <div v-if="showPopup" class="popup-overlay">
    <div @click.stop class="popup-content">
      <span class="PopupTitle">Game is launching!</span>

      <div>Close</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';


const showPopup = ref(false);

window.electron.ipcRenderer.on('gameStatus', (_, { Launching }) => {
    showPopup.value = Launching;
});

</script>
