<template>
    do you?

    <button @click="launchGame">Launch!!!!</button>
</template>

<script>
export default {
  methods: {
    async launchGame() {
      try {
        const gameExePath = 'G:\\fortnite builds\\27548a59-417a-4b57-aeb9-9fe615855c31';
        const dllPath = 'C:\\Users\\Zephironyx\\AppData\\Roaming\\FortLauncher\\FortCurl.dll';
        window.electron.ipcRenderer.send('luna:launchgame', { gameExePath, dllPath });
      } catch (error) {
        alert('Error launching game');
      }
    }
  }
}
</script>