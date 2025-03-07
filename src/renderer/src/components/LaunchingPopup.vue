
<script setup>
import { ref, onMounted } from 'vue';

const showPopup = ref(false);
const UpdateText = ref("...")

onMounted(() => {
  window.electron.ipcRenderer.on('gameStatus', (_, { Launching, Type }) => {
    //showPopup.value = Launching;
    if (Type == "DLL") {
      showPopup.value = true;
      UpdateText.value = "Downloading DLL"
    }
    console.log(Type);
    if (!Launching && Type == "")
      showPopup.value = false;
  });
});
</script>

<template>

  <div v-if="showPopup" class="popup-overlay">
    <div @click.stop class="popup-content">
      <span class="PopupTitle">Game is launching! ~ TDB</span>
      <p>{{ UpdateText.value }}</p>
      <div>Close</div>
    </div>
  </div>
</template>

