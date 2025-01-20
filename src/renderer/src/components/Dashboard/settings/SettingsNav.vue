<template>
  <div class="sidebar">
    <a @click="$emit('back')" class="BackButton">Back</a>
    <ul class="nav-links">
      <li>
        <a @click="$emit('changeTab', 'home')"> Account </a>
      </li>
      <li>
        <a @click="$emit('changeTab', 'home')"> Themes </a>
      </li>
      <li>
        <a @click="$emit('changeTab', 'home')"> ykyk </a>
      </li>
    </ul>

    <div class="bottom">
      <div class="split"></div>
      <div class="SignoutButton">Sign out</div>
    </div>
  </div>
</template>

<!--cant be bothered-->
<style>
.bottom {
  width: 90%;
}

.SignoutButton {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 40px;
  background: linear-gradient(90deg, rgba(153, 153, 153, 0.1) 0%, rgba(255, 255, 255, 0.1) 100%);
  border-radius: 10px;
  margin-bottom: 10px;
  color: white;
} 
.BackButton {
  margin-top: 20px;
  margin-left: 15px;
  background: rgba(217, 217, 217, 0.05);
  border-radius: 50px;
  margin-right: auto;
}
</style>
