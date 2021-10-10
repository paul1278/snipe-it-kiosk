<template>
  <b-navbar type="dark" variant="primary">
    <b-navbar-brand class="pl-2">
      {{ this.$store.state.config.pageTitle }}
    </b-navbar-brand>
  </b-navbar>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style></style>
