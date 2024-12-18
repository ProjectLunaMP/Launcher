<template>
  <NavBarScreen :LoginResponse="getData" />
  <div style="margin-left: 258px; ">
    I have these lucid dreams
  </div>
 
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
      //console.log("69 "+ JSON.stringify(this.LoginResponse))
      return this.LoginResponse
    }
  }
}
</script>
