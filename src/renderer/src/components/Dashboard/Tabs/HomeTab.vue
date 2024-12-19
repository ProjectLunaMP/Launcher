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
      <div class="UserSection"></div>
      <div class="UserSection"></div>
    </div>
  </div>
</template>

<script>
import imagePath from '../../../assets/tempplayer.png'
export default {
  computed: {
    profileStyle() {
      return {
        backgroundImage: `url(${imagePath})`
      }
    }
  }
}
</script>

<style src="../../../assets/HomePage.css"></style>
