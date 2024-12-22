<template>
  <div class="outer-class">
    <div class="inner-class">
      <div @click="$emit('back', 'home')" class="BackButton">Back</div>

      <div class="NewsImage"></div>

      <div class="NewsContent">
        <!--News Stuff forced in this div!-->
        <strong>The Importance of Safe Sex: Protecting Your Health and Future</strong>
        <p>Safe sex is an essential part of maintaining your health and well-being. It involves taking precautions to reduce the risk of sexually transmitted infections (STIs) and unintended pregnancies. Practicing safe sex isn’t just about using protection; it’s about fostering open communication, making informed decisions, and showing respect for yourself and your partner.</p>
        <br>
        <strong>Why Safe Sex Matters</strong>
        <p>STIs, such as HIV, chlamydia, and gonorrhea, can have serious health consequences if left untreated. Using condoms or dental dams significantly lowers the risk of transmission. Additionally, safe sex helps prevent unplanned pregnancies, giving you greater control over your future.</p>
    </div>
    </div>
  </div>
</template>

<style src="../../../assets/NewsPage.css"></style>
