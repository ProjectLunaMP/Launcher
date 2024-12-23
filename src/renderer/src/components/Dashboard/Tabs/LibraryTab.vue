<template>
  <div class="outer-class">
    <div class="LIBItemsGrid">
      <div v-for="(note, index) in builds" class="LibItem">
        <div class="LibItemOuter">
          <div class="LibItemBottom">
            <span class="GameNameF"> Fortnite </span>
            <span class="GameVersion"> {{ versionCache[note.VersionID] || 'Loading...' }} </span>
          </div>
        </div>
      </div>
      <!--This one is forced and actually different-->
      <div class="LibItemForced">
        <div @click="$emit('OpenLibraryPath')" class="LibItemOuter">
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
  data() {
    return {
      builds: [],
      versionCache: {},
      dataLoaded: false 
    }
  },
  methods: {
    async loadBuilds(shouldturnfalse) {
      if(shouldturnfalse) this.dataLoaded = false;
      console.log(this.dataLoaded)
      if(this.dataLoaded) return;
      try {
   
        const response = await window.electron.ipcRenderer.invoke('luna:get-builds')
        this.builds = response
        console.log('NIG' + this.builds)

        for (const note of this.builds) {
          if (note.VersionID && !this.versionCache[note.VersionID]) {
            this.versionCache[note.VersionID] = await window.electron.ipcRenderer.invoke('luna:getBuildVersion', note.VersionID)
          }
        }
        this.dataLoaded = true;
      } catch (error) {
        console.error('Failed to load builds:', error)
      }
    },

    // need to remove this (kinda forced)
    async launchGame() {
      try {
        const gameExePath = 'G:\\fortnite builds\\27548a59-417a-4b57-aeb9-9fe615855c31'
        const dllPath = 'C:\\Users\\Zephironyx\\AppData\\Roaming\\FortLauncher\\FortCurl.dll'
        window.electron.ipcRenderer.send('luna:launchgame', { gameExePath, dllPath })
      } catch (error) {
        alert('Error launching game')
      }
    },
  },
  mounted() {
    this.loadBuilds()
  }
}
</script>

<style src="../../../assets/LibraryPage.css"></style>
