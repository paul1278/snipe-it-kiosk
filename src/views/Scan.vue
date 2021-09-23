<template>
  <b-container class="text-center mt-5">
    <h1>Please scan</h1>
    <b-icon-upc-scan class="icon-big mt-4 mb-4" v-if="!this.loading" />
    <b-spinner class="spinner-big mt-4 mb-4" v-else />
    <b-alert :show="this.showAlert" variant="danger" fade>
      This asset was not found.
    </b-alert>
    <div class="mt-5">
      <Button variant="primary" href="/" shortcut="b">Back</Button>
    </div>
    <Scanner
      @scan="this.scan"
      @startScan="showAlert = false"
      @loading="(l) => (this.loading = l)"
    />
  </b-container>
</template>

<script>
import Button from "../components/Button.vue";
import Scanner from "../components/Scanner.vue";
export default {
  components: { Button, Scanner },
  name: "Scan",
  data: () => ({
    showAlert: false,
    loading: false,
  }),
  methods: {
    scan: function (resp) {
      if (resp == "ERROR") {
        this.showAlert = true;
      } else {
        this.$router.push({
          name: "ScanResult",
          params: {
            result: resp,
          },
        });
      }
    },
  },
};
</script>
