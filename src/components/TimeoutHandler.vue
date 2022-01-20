<template>
  <KeyboardReader @read="(resp) => read(resp)" :match="new RegExp('.+')" />
</template>

<script>
import KeyboardReader from "@/components/KeyboardReader.vue";
export default {
  name: "TimeoutHandler",
  components: { KeyboardReader },
  props: {
    timeout: {
      type: Number,
      default: 5000,
    },
  },
  methods: {
    read: function () {
      this.setTimer();
    },
    setTimer: function () {
      if (this.timeoutInstance) {
        clearTimeout(this.timeoutInstance);
        this.timeoutInstance = null;
      }
      this.timeoutInstance = setTimeout(this.logout, this.timeout);
    },
    logout: function () {
      this.timeoutInstance = null;
      this.$router.go(); // not so nice, because page reloads, but will look for alternative
      this.$store.commit("logout");
    },
  },
  mounted: function () {
    this.setTimer();
  },
  beforeDestroy: function () {
    if (this.timeoutInstance) {
      clearTimeout(this.timeoutInstance);
      this.timeoutInstance = null;
    }
  },
};
</script>

<style></style>
