<template>
  <b-container class="text-center mt-5">
    <h1>Systemchecks</h1>
    <b-alert show variant="info">
      <b-spinner class="spinner-text" />
      Doing checks
    </b-alert>
    <b-row class="mt-1"> </b-row>
  </b-container>
</template>

<script>
export default {
  components: {},
  name: "Check",
  data: () => ({
    loading: true,
  }),
  mounted: function () {
    let checks = [this.checkAPIConnection];
    checks.forEach((c) => {
      c();
    });
  },
  methods: {
    checkAPIConnection: function () {
      this.axios.get(this.$store.state.config.apiUrl + "/../../", {
        headers: {
          Accept: "text/html",
        },
      });
    },
  },
};
</script>

<style></style>
