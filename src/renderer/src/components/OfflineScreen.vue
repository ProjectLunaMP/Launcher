<template>
  <div class="loginUI">
    <div class="login-container" style="height: 250px">
      <div class="toppart">
        <a>LUNA</a>
        <img src="../assets/stars.png" />
      </div>
      <a
        class="details"
        style="display: flex; justify-content: center; align-items: center; height: 100vh"
        >{{ statusMessage }}</a
      >
    </div>
    <p class="NeedHelpYeah">
      Need help? Visit our
      <a href="https://discord.gg/nkQHAjgmzv" target="_blank">Support Server.</a>
    </p>
  </div>
</template>

<style src="../assets/login.css"></style>

<script>
export default {
  props: {
    status: {
      type: null,
      required: true
    }
  },
  computed: {
    statusMessage() {
      if (this.status.status === 'offline') {
        return 'Servers Offline.'
      } else if (this.status.status === 'update-available') {
        return 'Update Available'
      }
      return ''
    }
  }
}
</script>
