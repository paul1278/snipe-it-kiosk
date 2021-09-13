<template>
  <b-container class="text-center mt-5">
    <AssetDisplay :asset="this.$route.params.result" />
  </b-container>
</template>

<script>
import AssetDisplay from "../components/AssetDisplay.vue";
export default {
  components: { AssetDisplay },
  name: "ScanResult",
  data: () => ({
    showAlert: false,
    loading: false,
  }),
};
</script>
