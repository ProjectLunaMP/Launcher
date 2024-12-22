<template>
  <NavBarScreen @changeTab="setTab" :currentTab="TabName" :LoginResponse="getData" />
  <div style="margin-left: 258px; overflow: hidden">
    <transition :name="transitionName">
      <div :key="currentTab" class="tab-content">
        <div v-if="currentTab === 'home'" key="home" class="tab-content">
          <HomeTab @newsItem="newsItem" :LoginResponse="getData" />
        </div>
        <div v-if="currentTab === 'library'" key="library" class="tab-content">
          <LibraryTab />
        </div>

        <div v-if="currentTab === 'newspopout'" key="newspopout" class="tab-content">
          <NewsPage @back="TabBack" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import NavBarScreen from './Dashboard/Nav.vue'
import HomeTab from './Dashboard/Tabs/HomeTab.vue'
import LibraryTab from './Dashboard/Tabs/LibraryTab.vue'
import NewsPage from './Dashboard/Tabs/NewsPage.vue'

export default {
  data() {
    return {
      currentTab: 'home',
      TabName: 'home',
      transitionName: 'slide-left'
    }
  },
  components: {
    NavBarScreen,
    HomeTab,
    LibraryTab,
    NewsPage
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
    newsItem(tab) {
      console.log(tab)
      this.currentTab = null // this clears the background only
      this.transitionName = ''
      setTimeout(() => {
        this.transitionName = 'slide-left'
        this.currentTab = 'newspopout' // ig
      }, 100)
    },
    TabBack(tab) {
      console.log("TEST + " + tab)
      // just no check (buggy without proper use)
      this.currentTab = null
      this.transitionName = ''
      setTimeout(() => {
        this.transitionName = 'slide-left'
        this.TabName = tab
        this.currentTab = tab
      }, 100)
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
</style>
