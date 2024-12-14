<template>
  <NavBarScreen />
  I have these lucid dreams
</template>

<script>
import NavBarScreen from './Dashboard/Nav.vue'

export default {
  components: {
    NavBarScreen
  },
  props: {
    LoginResponse: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    getData() {
      console.log(this.LoginResponse)
      return this.LoginResponse
    }
  }
}
</script>
