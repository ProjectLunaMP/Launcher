<template>
  <NavBarScreen @changeTab="setTab" :currentTab="TabName" :LoginResponse="getData" />
  <div style="margin-left: 258px; overflow: hidden">
    <transition :name="transitionName">
      <div :key="currentTab" class="tab-content">
        <div v-if="currentTab === 'home'" key="home" class="tab-content">
          <HomeTab @newsItem="newsItem" :LoginResponse="getData" />
        </div>
        <div v-if="currentTab === 'library'" key="library" class="tab-content">
          <LibraryTab ref="libraryTab" @OpenLibraryPath="OpenLibraryPath" />
        </div>

        <div v-if="currentTab === 'newspopout'" key="newspopout" class="tab-content">
          <NewsPage @back="TabBack" :newsData="newsData" />
        </div>
      </div>
    </transition>
  </div>

  <LaunchingPopup />

  <div
    @click="OpenLibraryPath(false)"
    class="popup-overlay"
    v-if="LibraryshowPopup"
    key="LibraryshowPopup"
  >
    <div @click.stop class="popup-content">
      <span class="PopupTitle">Import Installation</span>
      <span class="PopupDec"
        >To get started, import your Fortnite installation folder that contains the
        "<strong>FortniteGame</strong>" and "<strong>Engine</strong>" directories.</span
      >
      <div class="InputContr">
        <input type="text" placeholder="Enter your path" ref="fileInput" />
        <div class="file-explorer-icon" @click="openFileExplorer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v.64c.57.265.94.876.856 1.546l-.64 5.124A2.5 2.5 0 0 1 12.733 15H3.266a2.5 2.5 0 0 1-2.481-2.19l-.64-5.124A1.5 1.5 0 0 1 1 6.14zM2 6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5a.5.5 0 0 0-.5.5zm-.367 1a.5.5 0 0 0-.496.562l.64 5.124A1.5 1.5 0 0 0 3.266 14h9.468a1.5 1.5 0 0 0 1.489-1.314l.64-5.124A.5.5 0 0 0 14.367 7z"
            />
          </svg>
        </div>
        <div @click="AddBuildFR" class="next-to-input">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M14.854 4.854a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 4H3.5A2.5 2.5 0 0 0 1 6.5v8a.5.5 0 0 0 1 0v-8A1.5 1.5 0 0 1 3.5 5h9.793l-3.147 3.146a.5.5 0 0 0 .708.708z"
            />
          </svg>
        </div>
      </div>

      <div class="RightContainer" v-if="messageMessage.trim() !== ''">
        <span :style="{ color: messageColor }">{{ messageMessage }}</span>
      </div>
    </div>
  </div>

  <div
    @click="OpenLibraryPathFinal(false)"
    class="popup-overlay"
    v-if="LibraryshowPopupFinal"
    key="LibraryshowPopupFinal"
  >
    <div @click.stop class="popup-contentFinal">
      <span class="PopupTitleFinal">Import Installation</span>
      <div class="popup-contentBox">
        <div class="Image-container">
          <img
            class="ImageClass"
            src="https://imgs.search.brave.com/Imr9HmKFIWPmoe4UyHrjUGN2fTch3QPS-W4dm2AOGTo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzFlSHVwRUVIUlMu/anBn"
            alt="Popup Image"
          />
        </div>

        <div class="info-container">
          <a class="InfoTitle">Fortnite</a>
          <a class="Smallerthingy">Version: {{ BuildID }}</a>
          <a class="Smallerthingy">Size on Disk: TDB</a>
          <a class="Smallerthingy">Release Date: TDB</a>

          <div @click="AddBuildFRV2" class="FinalButtonThing">Add to Library</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBarScreen from './Dashboard/Nav.vue'
import HomeTab from './Dashboard/Tabs/HomeTab.vue'
import LibraryTab from './Dashboard/Tabs/LibraryTab.vue'
import NewsPage from './Dashboard/Tabs/NewsPage.vue'
import LaunchingPopup from './LaunchingPopup.vue'

export default {
  data() {
    return {
      currentTab: 'home',
      TabName: 'home',
      transitionName: 'slide-left',
      newsData: null,
      GameLaunchingPopup: true,
      messageColor: 'orange',
      messageMessage: '',
      LibraryshowPopup: false,
      LibraryshowPopupFinal: false,
      BuildID: '0-CL'
    }
  },
  components: {
    NavBarScreen,
    HomeTab,
    LibraryTab,
    NewsPage,
    LaunchingPopup
  },
  props: {
    LoginResponse: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    setTab(tab) {
      console.log(tab)
      if (tab != this.TabName) {
        this.currentTab = null
        this.TabName = null
        this.transitionName = ''
        setTimeout(() => {
          this.transitionName = 'slide-left'
          this.TabName = tab
          this.currentTab = tab
        }, 100)
      }
    },
    openFileExplorer() {
      window.electron.ipcRenderer.invoke('dialog:openFile').then((filePath) => {
        if (filePath) {
          if (filePath && !filePath.startsWith('Error')) {
            this.$refs.fileInput.value = filePath
            this.messageColor = '#5FFF81'
            this.messageMessage = 'Looks Good!'
          } else {
            // error
            this.messageColor = 'red'
            this.messageMessage = 'error with path'
          }
        }
      })
    },
    async newsItem(tab) {
      console.log(tab)
      this.currentTab = null // this clears the background only
      this.transitionName = ''
      const fetchedNews = await window.electron.ipcRenderer.invoke('luna:get-news-data')
      this.newsData = fetchedNews.PatchNotes[tab]

      setTimeout(() => {
        this.transitionName = 'slide-left'
        this.currentTab = 'newspopout' // ig
      }, 100)
    },
    TabBack(tab) {
      console.log('TEST + ' + tab)
      // just no check (buggy without proper use)
      this.currentTab = null
      this.transitionName = ''
      setTimeout(() => {
        this.transitionName = 'slide-left'
        this.TabName = tab
        this.currentTab = tab
      }, 100)
    },
    OpenLibraryPath(Should = true) {
      console.log(Should)
      this.LibraryshowPopup = Should
      this.messageMessage = ''
    },
    OpenLibraryPathFinal(Should = true) {
      console.log(Should)
      this.LibraryshowPopupFinal = Should
      //this.messageMessage = ''
    },
    async AddBuildFR() {
      console.log('SIGMA')
      if (this.$refs.fileInput.value != '') {
        //console.log('YIPPIE')
        var PathValue = this.$refs.fileInput.value
        const AddPath = await window.electron.ipcRenderer.invoke('luna:addpath', { PathValue })

        if (AddPath && !AddPath.startsWith('Error')) {
          if (AddPath == 'already~build') {
            this.messageColor = 'orange'
            this.messageMessage = 'You already added this build'
            this.$refs.libraryTab.loadBuilds(true) // ehhh why not
          } else {
            // ngl we need to check if the fully failed but who cares
            // since we can't send strings back we need to get the json data
            //luna:GetTempBuildData
            this.OpenLibraryPath(false)
            // if it fails it will just not show lol
            const data = await window.electron.ipcRenderer.invoke('luna:GetTempBuildData')
            this.BuildID = data.VersionID.split('-')
            if (this.BuildID.length >= 3) {
              this.BuildID = this.BuildID.slice(1).join('-')
            } else {
              this.BuildID = data.VersionID
            }

            this.OpenLibraryPathFinal(true)
          }
        } else {
          // error
          this.messageColor = 'red'
          this.messageMessage = 'error with path'
        }
        console.log(AddPath)
      }
    },
    async AddBuildFRV2() {
      // we just grab temp data lol so we don't need params
      const AddPathV2 = await window.electron.ipcRenderer.invoke('luna:addpathV2')

      if (AddPathV2 && !AddPathV2.startsWith('Error')) {
        // close?
        this.OpenLibraryPath(false)
        this.OpenLibraryPathFinal(false)

        // tell library to reload or smth/?!?!
        this.$refs.libraryTab.loadBuilds(true)
      } else {
        // NEED TO DO
        console.log('ERror btw')
      }
    }
  },
  computed: {
    getData() {
      //console.log("69 "+ JSON.stringify(this.LoginResponse))
      return this.LoginResponse
    }
  }
}
</script>

<style>
.tab-content {
  width: 100%;
  height: 100%;
}
.slide-left-enter-active {
  transition: transform 0.35s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}
.slide-left-enter-from {
  transform: translateX(100%);
}

.slide-left-leave-active {
  transition: none;
  display: none;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-content {
  width: 525px;
  height: 200px;
  background-color: #1c1c1c;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.PopupTitle {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.PopupDec {
  font-size: 16px;
  text-align: center;
  margin-bottom: 20px;
  width: 90%;
}

.InputContr {
  position: relative;
  display: flex;
  align-items: center;
}

input {
  margin-right: 10px;
  width: 360px;
  height: 40px;
  border: 3px solid #353535 !important;
  background-color: transparent;
  color: white;
  border-radius: 5px;
  outline: none;
  font-family: 'DM Sans', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  box-sizing: border-box;
} /* C:\OG\1.11.0 */

input:focus {
  border-color: none;
}

.next-to-input {
  color: white;
  width: 40px;
  height: 40px;
  background-color: #353535;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.file-explorer-icon {
  position: absolute;
  right: 52px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 34px;
  color: white;
  background-color: #1c1c1c;
}

.file-explorer-icon svg {
  width: 16px;
  height: 16px;
  fill: white;
}

.RightContainer {
  margin-top: 15px;
  width: 90%;
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
  margin-right: 90%; /* works good enough */
}

.RightContainer span {
  font-size: 14px;
  color: #5fff81;
}

/* NEED TO MOVE  */
.PopupTitleFinal {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}

.popup-contentFinal {
  width: 630px;
  height: 400px;
  background-color: #1c1c1c;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.popup-contentBox {
  width: 90%;
  display: flex;
  gap: 20px;
}

.Image-container {
  width: 240px;
  height: 309.14px;
}
.ImageClass {
  width: 240px;
  height: 309.14px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
}

.info-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: white;
  position: relative;
}

.InfoTitle {
  font-size: 24px;
  font-family: 'DM Sans', sans-serif;
  font-weight: bold;
}

.Smallerthingy {
  font-size: 14px;
  font-family: 'DM Sans', sans-serif;
  font-weight: bold;
}

.FinalButtonThing {
  background-color: #363636;
  width: 170px;
  height: 40px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  position: absolute;
  bottom: 0;
  border-radius: 5px;
  right: 0;
}
</style>
