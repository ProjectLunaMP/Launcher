
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const showPopup = ref(false);
const UpdateText = ref("...")

onMounted(() => {
  window.electron.ipcRenderer.on('gameStatus', (_, { 
    Launching, 
    Type,
    Message }) => {
    //showPopup.value = Launching;
    if (Type == "Message") {
      showPopup.value = true;
      //console.log(Progress);
      UpdateText.value = `${Message}`
    }
    else if(Type == "Error")
    {
      UpdateText.value = "Failed :/"
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
      <p>{{ UpdateText }}</p>
      <div>Close</div>
    </div>
  </div>
</template>

