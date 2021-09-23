<template>
  <div>
    <h2>{{ this.asset.manufacturer.name }} {{ this.asset.model.name }}</h2>
    <b-row class="mt-4">
      <b-col>
        <b-table :items="items">
          <template #head(icon)="">
            <span></span>
          </template>
          <template #cell(icon)="data">
            <b-icon :icon="data.value" />
          </template>
        </b-table>
        <img :src="this.asset.image" v-if="this.asset.image" />
      </b-col>
      <b-col>
        <b-alert
          show
          variant="info"
          v-if="this.asset.status_label.status_meta == 'deployed'"
        >
          This asset is deployed to:<br />
          {{ this.asset.assigned_to.name }} ({{ this.asset.assigned_to.type }})
        </b-alert>
        <b-alert
          show
          variant="warning"
          v-else-if="this.asset.status_label.status_meta == 'undeployable'"
        >
          <b-icon-exclamation />This asset can not be deployed<br />
          State: {{ this.asset.status_label.name }}
        </b-alert>
        <b-alert show variant="success" v-else>
          <b-icon-check />This asset can be deployed
        </b-alert>
        <b-button
          variant="primary"
          v-if="this.asset.status_label.status_meta != 'undeployable'"
        >
          Check-out to me
        </b-button>
        <b-button variant="primary" href="#/scan"> Back </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "AssetDisplay",
  computed: {
    items: function () {
      let a = [
        { icon: "hdd", name: "Model number", value: this.asset.model_number },
        { icon: "key", name: "Serial number", value: this.asset.serial },
        {
          icon: "map",
          name: "Location",
          value: this.asset.location ? this.asset.location.name : "-",
        },
      ];
      Object.keys(this.asset.custom_fields).forEach((i) => {
        a.push({
          icon: "",
          name: i,
          value: this.asset.custom_fields[i].value,
        });
      });
      return a;
    },
  },
  props: {
    asset: {
      required: true,
      type: Object,
    },
  },
};
</script>

<style></style>
