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
  props: {
    match: {
      type: RegExp,
      default: null,
    }
  },
  mounted: function () {
    let self = this;
    window.onkeyup = function (e) {
      self.showAlert = false;
      self.$emit("startReading");
      if (e.key == "Enter") {
        clearInterval(self.clearInterval);
        self.$emit("read", self.text);
        self.text = "";
      } else {
        self.text += e.key;
        if (self.match != null) {
          if (!self.text.match(self.match)) {
            console.log("Clearing");
            self.text = "";
          } else {
            self.$emit("read", self.text);
          }
          clearInterval(self.clearInterval);
        }
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
