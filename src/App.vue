<template>
  <div id="app">
    <Navbar />
    <div v-if="this.ready">
      <router-view />
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
import Navbar from "@/components/Navbar";

export default {
  components: { Navbar },
  data: () => ({
    showAlert: false,
    ready: false,
  }),
  beforeMount: function () {
    this.axios
      .get("/config.json")
      .then((resp) => {
        if (typeof resp.data != "object") {
          throw new Error("Cannot parse as JSON!");
        }
        this.$store.commit("loadConfig", resp.data);
        document.title = "Kiosk :: " + resp.data.pageTitle;
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
.spinner-text {
  width: 17px !important;
  height: 17px !important;
  margin-right: 8px;
}
.spinner-big {
  width: 200px !important;
  height: 200px !important;
}
.icon-big {
  font-size: 100px;
}
.icon-text {
  font-size: 17px;
}
</style>
