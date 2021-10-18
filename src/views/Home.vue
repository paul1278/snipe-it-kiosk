<template>
  <b-container class="text-center mt-5">
    <h1>Hello {{ this.$store.state.user.name }}!</h1>
    <b-row class="mt-1">
      <b-col
        class="mt-4"
        sm="4"
        v-for="(np, i) in this.realNavigation"
        :key="i"
      >
        <a
          class="text-decoration-none"
          style="color: inherit"
          :href="np.href"
          :onclick="np.onclick"
        >
          <b-card
            :title="
              np.title + ' [' + (np.shortcut || np.title[0].toLowerCase()) + ']'
            "
          >
            <b-card-text>
              <b-icon :icon="np.icon" class="icon-big" />
            </b-card-text>
          </b-card>
        </a>
      </b-col>
    </b-row>
    <Shortcut shortcut="c" href="/scan" />
    <Shortcut shortcut="a" href="/audit" />
    <Shortcut shortcut="u" href="/user" />
    <Shortcut
      shortcut="g"
      href="/generator"
      v-if="this.$store.state.user.superuser"
    />
    <Shortcut shortcut="l" href="/logout" />
  </b-container>
</template>

<script>
import Shortcut from "../components/Shortcut.vue";

export default {
  components: { Shortcut },
  name: "Home",
  data: () => ({
    navigation: [
      { title: "Check in / out", href: "#/scan", icon: "upc-scan" },
      { title: "Audit", href: "#/audit", icon: "search" },
      { title: "User", href: "#/user", icon: "person-badge" },
      {
        title: "Credentials-Generator",
        href: "#/generator",
        icon: "person-badge",
        superuser: true,
        shortcut: "g",
      },
      { title: "Logout", href: "#/logout", icon: "box-arrow-left" },
    ],
  }),
  computed: {
    realNavigation: function () {
      return this.navigation.filter((n) =>
        n.superuser == true ? this.$store.state.user.superuser : true
      );
    },
  },
  mounted: function () {},
  methods: {},
};
</script>

<style></style>
