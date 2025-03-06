<template>
  <div class="loginUI">
    <div class="login-container">
      <div class="toppart">
        <a>LUNA</a>
        <img src="../assets/stars.png" />
      </div>
      <a class="details">You'll need to login in via Discord to use any of our in-game services.</a>
      <button @click="handleProceed" :disabled="waitingForCallback">
        <span v-if="waitingForCallback">Waiting for callback...</span>
        <span v-else>Proceed</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-arrow-90deg-right"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M14.854 4.854a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 4H3.5A2.5 2.5 0 0 0 1 6.5v8a.5.5 0 0 0 1 0v-8A1.5 1.5 0 0 1 3.5 5h9.793l-3.147 3.146a.5.5 0 0 0 .708.708z"
          />
        </svg>
      </button>
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
  data() {
    return {
      waitingForCallback: false,
    };
  },
  methods: {
    handleProceed() {
      this.waitingForCallback = true;

      const discordLoginUrl = "https://discord.com/oauth2/authorize?client_id=1204822508373811282&response_type=code&redirect_uri=https%3A%2F%2Fdashboard.lunafn.org%2Fauth%2Fapi%2Fv1%2Fcallback&scope=email+identify+guilds";
      window.open(discordLoginUrl, "_blank");
    },
  },
};
</script>