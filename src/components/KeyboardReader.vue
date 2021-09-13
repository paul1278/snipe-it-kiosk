<template>
  <span></span>
</template>

<script>
export default {
  name: "KeyboardReader",
  data: () => ({
    clearInterval: null,
    text: "",
  }),
  mounted: function () {
    let self = this;
    window.onkeyup = function (e) {
      self.showAlert = false;
      if (e.key == "Enter") {
        clearInterval(self.clearInterval);
        self.$emit("read", self.text);
        self.text = "";
      } else {
        self.text += e.key;
        console.log(self.text);
        self.setClearInterval();
      }
    };
  },
  beforeDestroy: function () {
    window.onkeyup = null;
    clearInterval(this.clearInterval);
  },
  methods: {
    setClearInterval: function () {
      let self = this;
      clearInterval(this.clearInterval);
      this.clearInterval = setInterval(() => (self.text = ""), 2000);
    },
  },
};
</script>

<style lang="scss" scoped></style>
