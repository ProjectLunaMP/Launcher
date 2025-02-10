<template>
  <div class="outer-class">
    <div class="leftPart">
      <div class="PlayerClass">
        <div class="inner-div">
          <div class="pl-icon" :style="profileStyle"><!--ICON--></div>
          <div class="text-container">
            <span class="greeting">Hi, {{ getData.username }}!</span>
            <span class="description">Relive OG Fortnite <b>Season 2</b> with <b>Luna!</b></span>
          </div>
        </div>
      </div>
      <div class="UserData">
        <div class="UserSection">
          <div class="BTClass">
            <span class="UserBTValue">21</span>
            <span class="UserBTDec">Battle Pass Tier</span>
          </div>

          <div class="UserImage" :style="BpTier"><!--ICON--></div>
        </div>
        <div class="UserSection">
          <div class="BTClass">
            <span class="UserBTValue">21</span>
            <span class="UserBTDec">Season Level</span>
          </div>

          <div class="UserImage" :style="BpLevel"><!--ICON--></div>
        </div>
      </div>

      <div class="SeasonNews">
        <div class="content">
          <div class="OuterSeasonNewsLaunchClock">
            <div class="SeasonNewsLaunchClock">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                fill="currentColor"
                class="bi bi-clock"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"
                />
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
              </svg>
              <a>3:01</a>
            </div>
          </div>

          <div class="SeasonNewsInfo">
            <span class="SeasonNewsInfoName">Luna</span>
            <span class="SeasonNewsInfoSeason">Season 2</span>
            <span class="SeasonNewsInfoDec">
              <span class="highlight">Season 2, with the slogan</span>
              Fort Knights, <span class="highlight">was the second season of </span>Fortnite: Battle
              Royale.
            </span>
          </div>

          <div class="SeasonNewsLaunchContent">
            <span class="GameName">Fortnite</span>
            <span class="GameVersion">1.11.0-CL-3807424</span>

            <a> Install </a>
          </div>
        </div>

        <div class="imgstuff" :style="SeasonNewsIM"></div>
      </div>
    </div>

    <div class="rightDivvv"></div>
  </div>

  <div class="AllNews">
    <h2>News & Updates</h2>

    <div class="AllNewsGrid">
      <div v-for="(note, index) in newsData.PatchNotes" :key="index" :style="{ backgroundImage: `url(${note.NewsImage})`}" class="news-item">
        <div @click="$emit('newsItem', index)" class="AllNewsGridItem">
          <span class="badge">NEW!</span>
          <div class="NewsGridContent">
            <h3>{{ note.Title }}</h3>
            <p>{{ note.DateUploaded }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.news-item {
    background: url('https://i.pinimg.com/736x/7f/ec/1f/7fec1f6bc2cbbb27d274a701119a2fb9.jpg') center center / cover no-repeat;
    border-radius: 10px;
}
</style>

<script>
import imagePath from '../../../assets/tempplayer.png'
import BPTierPath from '../../../assets/BPTier.png'
import BPLevelPath from '../../../assets/BPLevel.png'
import SeasonTempPath from '../../../assets/SeasonTemp.png'

export default {
  props: {
    LoginResponse: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      newsData: { PatchNotes: [] }
    }
  },
  computed: {
    getData() {
      console.log('HOME ' + JSON.stringify(this.LoginResponse))

      return this.LoginResponse
    },
    profileStyle() {
      return {
        backgroundImage: `url(${this.getData.character})`
      }
    },
    BpTier() {
      return {
        backgroundImage: `url(${BPTierPath})`
      }
    },
    BpLevel() {
      return {
        backgroundImage: `url(${BPLevelPath})`
      }
    },
    SeasonNewsIM() {
      return {
        backgroundImage: `url(${SeasonTempPath})`
      }
    }
  },
  mounted() {
    this.fetchNewsData()
  },
  methods: {
    async fetchNewsData() {
      try {
        const fetchedNews = await window.electron.ipcRenderer.invoke('luna:get-news-data')
        this.newsData = fetchedNews
        console.log('Fetched News:', this.newsData)
      } catch (error) {
        console.error('Error fetching news data:', error)
      }
    }
  }
}
</script>

<style src="../../../assets/HomePage.css"></style>
