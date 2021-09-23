<template>
  <span></span>
</template>

<script>
export default {
  name: "KeyboardReader",
  data: () => ({
    clearInterval: null,
    text: "",
    index: -1,
    instance: null,
  }),
  props: {
    match: {
      type: RegExp,
      default: null,
    },
  },
  mounted: function () {
    let self = this;
    if (window.onkeyup == null) {
      window.onkeyuphandlers = [];
      window.onkeyup = function (e) {
        Object.values(window.onkeyuphandlers).forEach((h) => h(e));
      };
    }
    this.instance = function (e) {
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
            self.text = "";
          }
          clearInterval(self.clearInterval);
        }
        console.log(self.text);
        self.setClearInterval();
      }
    };
    this.index = window.onkeyuphandlers.push(this.instance) - 1;
  },
  beforeDestroy: function () {
    console.log(
      "Destroying",
      this.match,
      this.index,
      window.onkeyuphandlers.indexOf(this.instance)
    );
    window.onkeyuphandlers.splice(
      window.onkeyuphandlers.indexOf(this.instance),
      1
    );
    if (window.onkeyuphandlers.length == 0) {
      window.onkeyup = null;
    }
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
