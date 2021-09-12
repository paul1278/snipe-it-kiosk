<template>
  <b-container class="text-center mt-5">
    <h1>Please login</h1>
    <b-icon-person-badge class="login-icon mt-4 mb-4" v-if="!this.loading" />
    <b-spinner class="spinner-big mt-4 mb-4" v-else />
    <b-alert :show="this.showAlert" variant="danger" fade>
      This login-id is invalid, please try again.
    </b-alert>
  </b-container>
</template>

<script>
import sha512 from "js-sha512";
export default {
  name: "Login",
  data: () => ({
    loginClearInterval: null,
    loginText: "",
    showAlert: false,
    loading: false,
  }),
  mounted: function () {
    let self = this;
    window.onkeyup = function (e) {
      self.showAlert = false;
      if (e.key == "Enter") {
        clearInterval(this.loginClearInterval);
        self.tryLogin();
      } else {
        self.loginText += e.key;
        console.log(self.loginText);
        self.setLoginClearInterval();
      }
    };
  },
  beforeDestroy: function () {
    window.onkeyup = null;
    clearInterval(this.loginClearInterval);
  },
  methods: {
    setLoginClearInterval: function () {
      let self = this;
      clearInterval(this.loginClearInterval);
      this.loginClearInterval = setInterval(() => (self.loginText = ""), 2000);
    },
    tryLogin: function () {
      this.loading = true;
      this.axios
        .get(
          "/keys/" + sha512(this.loginText + this.$store.state.config.keySalt)
        )
        .then((resp) => {
          console.log(resp);
          this.$store.commit("login", resp.data);
          return this.$apiCall("GET", "/users/me");
        })
        .then((resp) => {
          this.$store.commit("setUser", {
            name: resp.data.name,
            email: resp.data.email,
          });
        })
        .catch((e) => {
          this.showAlert = true;
          console.log(e);
        })
        .finally(() => {
          this.loading = false;
          this.loginText = "";
        });
    },
  },
};
</script>

<style>
.login-icon {
  font-size: 200px;
}
</style>
