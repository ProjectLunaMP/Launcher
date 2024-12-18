<template>
  <div class="sidebar">
    <a class="title">LUNA</a>
    <ul class="nav-links">
      <li><a href="#" class="nav-active">Home</a></li>
      <li><a href="#">Library</a></li>
    </ul>
    <div class="bottom">
      <div class="info">
        <div class="InfoBox"></div>
        <a class="BuildTitle">Public Build Available!</a>
        <a class="BuildS">Season 2</a>
        <a class="BuildB">1.11-CL-3807424</a>
        <a class="info-button">Download Now!</a>
      </div>
      <div class="split"></div>
      <div class="UserDetails">
        <div class="profilePicture" :style="profileStyle"></div>

        <div class="profile-details">
          <span class="username">{{ user.username }}</span>
          <span class="role" :style="roleStyle">{{ user.RoleName }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="../../assets/SideBar.css"></style>

<script>
import imagePath from '../../assets/DefaultCharacter.png'
export default {
  props: {
    LoginResponse: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    profileStyle() {
      return {
        backgroundImage: `url(${imagePath})`
      }
    },
    roleStyle() { 
      return { color: this.LoginResponse.RoleColor }
    },
    user() {
      //console.log("RIZZLER " + JSON.stringify(this.LoginResponse))
      return this.LoginResponse
    }
  }
}
</script>
