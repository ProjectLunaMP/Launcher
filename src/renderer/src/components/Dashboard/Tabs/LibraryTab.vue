<template>
  <div class="outer-class" >
    <div class="LIBItemsGrid">
      <div
        v-for="(note, index) in builds"
        class="LibItem"
        
        :style="getBackgroundStyle(note.buildPath)" 
      >
        <div @click="launchGame(note.buildPath)" class="LibItemOuter">
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
      if (shouldturnfalse) this.dataLoaded = false
      console.log(this.dataLoaded)
      if (this.dataLoaded) return
      try {
        const response = await window.electron.ipcRenderer.invoke('luna:get-builds')
        this.builds = response
        console.log('NIG' + this.builds)

        for (const note of this.builds) {
          if (note.VersionID && !this.versionCache[note.VersionID]) {
            this.versionCache[note.VersionID] = await window.electron.ipcRenderer.invoke(
              'luna:getBuildVersion',
              note.VersionID
            )
          }
        }
        this.dataLoaded = true
      } catch (error) {
        console.error('Failed to load builds:', error)
      }
    },

    getBackgroundStyle(buildPath) {
      // you cant load local files :((
      //const path = `file:///${buildPath.replace(/\\/g, '/')}/FortniteGame/Content/Splash/Splash.bmp`;
     // console.log(path);  
      return {
        background: `url(http://127.0.0.1:3000/files/Splash.bmp) center center / cover no-repeat`,
      };
    },

    async launchGame(gameExePath) {
      try {
        //const gameExePath = 'G:\\fortnite builds\\27548a59-417a-4b57-aeb9-9fe615855c31'
        
        // sends dashboard page info to popup!
        
        window.electron.ipcRenderer.send('luna:launchgame', { gameExePath });
      } catch (error) {
        alert('Error launching game')
      }
    }
  },
  mounted() {
    this.loadBuilds()
  }
}
</script>

<style src="../../../assets/LibraryPage.css"></style>
