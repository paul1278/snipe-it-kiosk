<template>
  <div>
    <Button variant="primary" shortcut="o" @click="() => (show = !show)">
      Check-out to other
    </Button>
    <b-modal v-model="show" title="Check-out to other user">
      <template slot="modal-footer">
        <Button variant="primary" shortcut="Esc" @click="() => (show = !show)">
          Close
        </Button>
      </template>
      <b-row>
        <b-col
          class="av"
          sm="6"
          v-for="(user, i) in this.users"
          :key="i"
          @click="$emit('user', user)"
        >
          <b-avatar
            variant="primary"
            :text="
              (() => {
                let parts = user.name.split(' ');
                let last = parts[parts.length - 1][0];
                return (
                  parts.length > 1 ? `${parts[0][0]}${last || ''}` : parts[0][0]
                ).toUpperCase();
              })()
            "
          />
          <br />
          {{ user.name }}</b-col
        >
      </b-row>
    </b-modal>
  </div>
</template>

<script>
import Button from "./Button.vue";
export default {
  name: "UserSelector",
  components: { Button },
  data: () => ({
    users: [],
    show: false,
  }),
  mounted: function () {
    this.$apiCalls()
      .getAllUsers()
      .then((resp) => {
        this.users = resp.rows;
      });
  },
};
</script>

<style>
.av {
  text-align: center;
  border: solid grey 1px;
  padding: 10px;
}
</style>
