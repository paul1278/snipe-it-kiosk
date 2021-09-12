<template>
  <div id="app">
    <Navbar />
    <div v-if="this.ready">
      <router-view v-if="this.$store.state.loggedIn" />
      <Login v-else />
    </div>
    <div v-else class="text-center">
      <b-spinner v-if="!this.showAlert" class="spinner-big mt-4 mb-4" />
      <h1 v-if="!this.showAlert">Loading system...</h1>
      <b-icon-exclamation-circle-fill
        v-if="this.showAlert"
        class="icon-big d-inline-block mt-4"
      />
      <br />
      <b-alert
        :show="this.showAlert"
        variant="danger"
        fade
        class="d-inline-block mt-5"
      >
        Cannot load your systems configuration or it is corrupted!
      </b-alert>
    </div>
  </div>
</template>

<script>
import Login from "@/views/Login";
import Navbar from "@/components/Navbar";

export default {
  components: { Login, Navbar },
  data: () => ({
    showAlert: false,
    ready: false,
  }),
  beforeMount: function () {
    this.axios
      .get("/config.json")
      .then((resp) => {
        this.$store.commit("loadConfig", resp.data);
        this.ready = true;
      })
      .catch((e) => {
        console.error(e);
        this.showAlert = true;
      });
  },
};
</script>

<style lang="scss">
.spinner-big {
  width: 200px !important;
  height: 200px !important;
}
.icon-big {
  font-size: 100px;
}
</style>
