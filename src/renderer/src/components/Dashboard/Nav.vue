<template>
  <div class="sidebar">
    <a class="title">LUNA</a>
    <ul class="nav-links">
      <li>
        <a @click="$emit('changeTab', 'home')" :class="{'nav-active': currentTab === 'home'}">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"
            />
          </svg>

          Home
        </a>
      </li>
      <li>
        <a @click="$emit('changeTab', 'library')" :class="{'nav-active': currentTab === 'library'}">
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
        <div class="InfoBox">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 12V7.5M12 15.3354V15.375M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <a class="BuildTitle">Public Build Available!</a>
        <a class="BuildS">Season 3</a>
        <a class="BuildB">3.6-CL-4019403</a>
        <a class="info-button">Download Now!</a>
      </div>
      <div class="split"></div>
      <div class="UserDetails">
        <div class="profilePicture" :style="profileStyle">
          <div class="profile-indicator"></div>
        </div>

        <div class="profile-details">
          <span class="username">{{ user.username }}</span>
          <span class="role" :style="roleStyle">{{ user.RoleName }}</span>
     
        </div>

        <div class="leftButton"  @click="$emit('changeTab', 'settings')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="bi bi-gear-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"
            />
          </svg>
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
    },
    currentTab: {
      type: String,
      required: true
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
