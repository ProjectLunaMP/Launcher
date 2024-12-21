<template>
  <div class="outer-class">
    <div class="leftPart">
      <div class="PlayerClass">
        <div class="inner-div">
          <div class="pl-icon" :style="profileStyle"><!--ICON--></div>
          <div class="text-container">
            <span class="greeting">Hi, player!</span>
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
              <div><!--ICON--></div>
              <a>3:01</a>
            </div>
          </div>

          <div class="SeasonNewsInfo">
            <span class="SeasonNewsInfoName">Luna</span>
            <span class="SeasonNewsInfoSeason">Season 2</span>
            <span class="SeasonNewsInfoDec">
              <span class="highlight">Season 2, with the slogan</span>
              Fort Knights,  <span class="highlight">was the second season of </span>Fortnite: Battle
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
      <div class="AllNewsGridItem"></div>
      <div class="AllNewsGridItem"></div>
      <div class="AllNewsGridItem"></div>
      <div class="AllNewsGridItem"></div>
      <div class="AllNewsGridItem"></div>
      <div class="AllNewsGridItem"></div>
      <div class="AllNewsGridItem"></div>
      <div class="AllNewsGridItem"></div>
      <div class="AllNewsGridItem"></div>
      <div class="AllNewsGridItem"></div>
      <div class="AllNewsGridItem"></div>
    </div>
  </div>
</template>

<script>
import imagePath from '../../../assets/tempplayer.png'
import BPTierPath from '../../../assets/BPTier.png'
import BPLevelPath from '../../../assets/BPLevel.png'
import SeasonTempPath from '../../../assets/SeasonTemp.png'
export default {
  computed: {
    profileStyle() {
      return {
        backgroundImage: `url(${imagePath})`
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
  }
}
</script>

<style src="../../../assets/HomePage.css"></style>
