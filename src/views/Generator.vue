<template>
  <b-container class="text-center mt-5">
    <h1>Credentails-Generator</h1>
    <div v-if="this.keyResult == null">
      <h2>Please scan a badge</h2>
      <b-icon-person-badge class="login-icon mt-4 mb-4" />
    </div>
    <div show variant="success" v-else>
      Please create a file inside the keys-folder named:
      {{ this.keyResult }}<br />
      Inside this file, place the API-key connected to the user.
    </div>
    <div class="mt-5">
      <Button
        v-if="this.$store.state.loggedIn"
        variant="primary"
        href="/"
        shortcut="b"
        >Back</Button
      >
      <Button v-else variant="primary" href="/" shortcut="l">Login</Button>
    </div>
    <KeyboardReader @read="this.scan" />
  </b-container>
</template>

<script>
import sha512 from "js-sha512";
import Button from "../components/Button.vue";
import KeyboardReader from "@/components/KeyboardReader.vue";
export default {
  components: { Button, KeyboardReader },
  name: "Generator",
  data: () => ({
    showAlert: false,
    keyResult: null,
    loading: false,
  }),
  methods: {
    scan: function (resp) {
      if (resp == "ERROR") {
        this.showAlert = true;
      } else {
        this.keyResult = sha512(resp + this.$store.state.config.keySalt);
      }
    },
  },
};
</script>
