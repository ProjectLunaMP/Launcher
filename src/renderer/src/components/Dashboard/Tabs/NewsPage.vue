<template>
  <div class="outer-class">
    <div class="inner-class">
      <div @click="$emit('back', 'home')" class="BackButton">Back</div>

      <div class="NewsImage" :style="{ backgroundImage: `url(${newsData.NewsBanner})`}"></div>

      <div class="NewsContent" v-html="newsData.NewsContent"></div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    newsData: {
      required: true
    }
  }
}
</script>

<style src="../../../assets/NewsPage.css"></style>
