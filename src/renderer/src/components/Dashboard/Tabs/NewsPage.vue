<template>
  <div class="outer-class">
    <div class="inner-class">
      <div @click="$emit('back', 'home')" class="BackButton">Back</div>

      <div class="NewsImage"></div>

      <div class="NewsContent">
        <!--News Stuff forced in this div!-->
        <strong>News Failed To Load</strong>
    </div>
    </div>
  </div>
</template>

<style src="../../../assets/NewsPage.css"></style>
