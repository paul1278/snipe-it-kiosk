<template>
  <b-container class="text-center mt-5">
    <h1>Please login</h1>
    <b-icon-person-badge class="login-icon mt-4 mb-4" v-if="!this.loading" />
    <b-spinner class="spinner-big mt-4 mb-4" v-else />
    <b-alert :show="this.showAlert" variant="danger" fade>
      This login-id is invalid, please try again.
    </b-alert>
    <KeyboardReader @read="(resp) => tryLogin(resp)" />
  </b-container>
</template>

<script>
import sha512 from "js-sha512";
import KeyboardReader from "@/components/KeyboardReader.vue";
export default {
  components: { KeyboardReader },
  name: "Login",
  data: () => ({
    showAlert: false,
    loading: false,
  }),
  methods: {
    tryLogin: function (resp) {
      this.loading = true;
      this.axios
        .get("/keys/" + sha512(resp + this.$store.state.config.keySalt))
        .then((resp) => {
          console.log(resp);
          this.$store.commit("login", resp.data);
          return this.$apiCall("GET", "/users/me");
        })
        .then((resp) => {
          this.$store.commit("setUser", {
            name: resp.data.name,
            email: resp.data.email,
            id: resp.data.id,
            superuser: resp.data.permissions.superuser == 1,
          });
          window.location = "#/";
        })
        .catch((e) => {
          this.showAlert = true;
          console.log(e);
        })
        .finally(() => {
          this.loading = false;
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
