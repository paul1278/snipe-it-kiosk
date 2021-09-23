<template>
  <b-btn
    v-bind="$attrs"
    @click="
      (e) => (this.href ? this.$router.push(this.href) : this.$emit('click', e))
    "
  >
    <slot />
    <span v-if="this.shortcut"> [{{ this.shortcut }}]</span>
    <Shortcut
      v-if="this.shortcut != null"
      :shortcut="this.shortcut"
      :href="this.href"
      @click="(e) => this.$emit('click', e)"
    />
  </b-btn>
</template>

<script>
import Shortcut from "./Shortcut.vue";
export default {
  name: "Button",
  components: { Shortcut },
  props: {
    href: {
      type: String,
      default: null,
    },
    shortcut: {
      type: String,
      default: null,
    },
  },
};
</script>

<style></style>
