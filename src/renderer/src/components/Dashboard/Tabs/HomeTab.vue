<template>
  <div class="outer-class">
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

         <div class="UserImage" :style="BpTier" ><!--ICON--></div>
      </div>
      <div class="UserSection">
         <div class="BTClass">
          <span class="UserBTValue">21</span>
          <span class="UserBTDec">Season Level</span>
         </div>

         <div class="UserImage" :style="BpLevel" ><!--ICON--></div>
      </div>
    </div>
  </div>
</template>

<script>
import imagePath from '../../../assets/tempplayer.png'
import BPTierPath from '../../../assets/BPTier.png'
import BPLevelPath from '../../../assets/BPLevel.png'
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
    }
  }
}
</script>

<style src="../../../assets/HomePage.css"></style>
