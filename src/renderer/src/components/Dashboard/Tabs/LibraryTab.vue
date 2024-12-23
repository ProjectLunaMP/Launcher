<template>
  <div class="outer-class">
    <div class="LIBItemsGrid">
      <div class="LibItem">
        <div class="LibItemOuter">
          <div class="LibItemBottom">
            <span class="GameNameF"> Fortnite </span>
            <span class="GameVersion"> 1.11-CL-3807424 </span>
          </div>
        </div>
      </div>
      <div class="LibItem">
        <div class="LibItemOuter">
          <div class="LibItemBottom">
            <span class="GameNameF"> Fortnite </span>
            <span class="GameVersion"> 1.11-CL-3807424 </span>
          </div>
        </div>
      </div>
      <!--This one is forced and actually different-->
      <div class="LibItemForced">
        <div class="LibItemOuter">
          <div class="LibItemBottomForced">
            <span class="ImportFR">Import</span>
            <span class="ImportDec">Add a new instance of Fortnite.</span>
          </div>
        </div>
      </div>
    </div>
    <!-- do you?

   <button @click="launchGame">Launch!!!!</button> -->
  </div>
</template>

<script>
export default {
  methods: {
    async launchGame() {
      try {
        const gameExePath = 'G:\\fortnite builds\\27548a59-417a-4b57-aeb9-9fe615855c31'
        const dllPath = 'C:\\Users\\Zephironyx\\AppData\\Roaming\\FortLauncher\\FortCurl.dll'
        window.electron.ipcRenderer.send('luna:launchgame', { gameExePath, dllPath })
      } catch (error) {
        alert('Error launching game')
      }
    }
  }
}
</script>

<style src="../../../assets/LibraryPage.css"></style>
