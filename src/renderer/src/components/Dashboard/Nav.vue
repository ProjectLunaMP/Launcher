<template>
  <div class="sidebar">
    <a class="title">LUNA</a>
    <ul class="nav-links">
      <li>
        <a href="#" class="nav-active">
          <svg viewBox="0 0 22 22" class="icon" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M18.6828 9.96875L17.1875 8.47447V4.8125C17.1875 4.24531 16.7234 3.78125 16.1562 3.78125H15.125C14.5578 3.78125 14.0938 4.24531 14.0938 4.8125V5.38278L12.0312 3.32234C11.7497 3.05628 11.4919 2.75 11 2.75C10.5081 2.75 10.2503 3.05628 9.96875 3.32234L3.31719 9.96875C2.99544 10.3039 2.75 10.5483 2.75 11C2.75 11.5806 3.1955 12.0312 3.78125 12.0312H4.8125V18.2188C4.8125 18.7859 5.27656 19.25 5.84375 19.25H7.90625C8.47579 19.25 8.9375 18.7883 8.9375 18.2188V14.0938C8.9375 13.5266 9.40156 13.0625 9.96875 13.0625H12.0312C12.5984 13.0625 13.0625 13.5266 13.0625 14.0938V18.2188C13.0625 18.7883 13.0086 19.25 13.5781 19.25H16.1562C16.7234 19.25 17.1875 18.7859 17.1875 18.2188V12.0312H18.2188C18.8045 12.0312 19.25 11.5806 19.25 11C19.25 10.5483 19.0046 10.3039 18.6828 9.96875Z"
              stroke="white"
              stroke-width="2"
              stroke-linejoin="round"
            />
          </svg>
          Home
        </a>
      </li>
      <li>
        <a href="#">
          <svg viewBox="0 0 22 22" class="icon" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2.20089 7.71529L2.20081 16.2792C2.2008 17.3838 3.09623 18.2793 4.2008 18.2793L17.7996 18.2793C18.9042 18.2793 19.7996 17.3839 19.7997 16.2794L19.7999 7.42808C19.7999 6.87578 19.3522 6.42805 18.7999 6.42805H11.0767L8.54206 3.72055H3.20033C2.6479 3.72055 2.20012 4.16821 2.20029 4.72064C2.20056 5.59058 2.2009 6.84483 2.20089 7.71529Z"
              stroke="white"
              stroke-opacity="0.5"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          Library
        </a>
      </li>
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
