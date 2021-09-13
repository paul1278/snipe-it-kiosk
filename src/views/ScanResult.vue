<template>
  <b-container class="text-center mt-5">
    <AssetDisplay :asset="this.$route.params.result" />
    <KeyboardReader :match="/^Backspace/" @read="$router.back()" />
  </b-container>
</template>

<script>
import AssetDisplay from "../components/AssetDisplay.vue";
import KeyboardReader from "../components/KeyboardReader.vue";
export default {
  components: { AssetDisplay, KeyboardReader },
  name: "ScanResult",
  data: () => ({
    showAlert: false,
    loading: false,
  }),
  beforeMount: function () {
    if (this.$route.params.result == null) {
      window.location = "#/scan";
    }
  },
};
</script>
