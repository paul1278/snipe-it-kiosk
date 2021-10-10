<template>
  <b-container class="text-center mt-5">
    <KeyboardReader
      @read="(resp) => scan(resp)"
      @startReading="$emit('startScan')"
    />
  </b-container>
</template>

<script>
import KeyboardReader from "@/components/KeyboardReader.vue";
export default {
  name: "Scanner",
  components: { KeyboardReader },
  methods: {
    scan: function (resp) {
      this.$emit("loading", true);
      this.$apiCalls()
        .getAssetByTag(resp)
        .then((resp) => {
          this.$emit("loading", false);
          this.$emit("scan", resp);
        })
        .catch(() => {
          this.$emit("loading", false);
          this.$emit("scan", "ERROR");
        });
    },
  },
};
</script>

<style></style>
