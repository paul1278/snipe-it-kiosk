<template>
  <b-container class="text-center mt-5">
    <h1>Logging out...</h1>
    <b-spinner class="spinner-big mt-4 mb-4" />
  </b-container>
</template>

<script>
export default {
  name: "Logout",
  mounted: function () {
    this.$store.commit("logout");
    window.location = "#/";
  },
};
</script>
