<template>
  <b-container class="mt-5">
    <h1>Logged in as {{ this.$store.state.user.name }}</h1>
    E-Mail: {{ this.$store.state.user.email }}<br />
    User-ID: {{ this.$store.state.user.id }}
    <div class="mt-5">
      <Button variant="primary" href="/" shortcut="b">Back</Button>
    </div>
  </b-container>
</template>

<script>
import Button from "../components/Button.vue";
export default {
  name: "User",
  components: { Button },
};
</script>
