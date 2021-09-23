<template>
  <KeyboardReader
    @read="(resp) => read(resp)"
    :match="new RegExp('^' + this.shortcut + '$')"
  />
</template>

<script>
import KeyboardReader from "@/components/KeyboardReader.vue";
export default {
  name: "Shortcut",
  components: { KeyboardReader },
  props: {
    shortcut: {
      type: String,
      default: null,
    },
    href: {
      type: String,
      default: null,
    },
  },
  methods: {
    read: function (resp) {
      if (this.href != null) {
        this.$router.push(this.href);
      } else {
        this.$emit("click", resp);
      }
    },
  },
};
</script>

<style></style>
