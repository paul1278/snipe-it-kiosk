<template>
  <b-container class="text-center mt-5">
    <b-row>
      <b-col :sm="8">
        <b-table :fields="this.fields" striped :items="this.items">
          <template #cell(asset)="data">
            {{ data.item.manufacturer.name + " " + data.item.model.name }}
          </template>

          <template #cell(location)="data">
            {{ data.item.location ? data.item.location.name : "-" }}
          </template>

          <template #cell(type)="data">
            {{ data.item.status_label.__deployable ? "Check-Out" : "Check-In" }}
          </template>

          <template #cell(state)="">
            Pending
          </template>
        </b-table>
      </b-col>
      <b-col :sm="4">
        <h1 v-if="!this.loading">Please scan</h1>
        <b-icon-upc-scan class="icon-big mt-4 mb-4" v-if="!this.loading" />
        <b-spinner class="spinner-big mt-4 mb-4" v-else />
        <b-alert :show="this.showAlert" variant="danger" fade>
          {{ this.alertContent }}
        </b-alert>
      </b-col>
    </b-row>
    <div class="mt-5">
      <Button variant="primary" href="/" shortcut="b">Back</Button>
    </div>
    <Scanner
      @scan="this.scan"
      @startScan="showAlert = false"
      @loading="(l) => (this.loading = l)"
    />
  </b-container>
</template>

<script>
import Button from "../components/Button.vue";
import Scanner from "../components/Scanner.vue";
export default {
  components: { Button, Scanner },
  name: "CheckInOut",
  data: () => ({
    showAlert: false,
    alertContent: "",
    loading: false,
    fields: [
      { key: "asset_tag", label: "Tag" },
      { key: "asset", label: "Asset" },
      { key: "serial", label: "Serial" },
      { key: "location", label: "Location" },
      { key: "type", label: "Type" },
      { key: "state", label: "State" },
    ],
    items: [],
  }),
  methods: {
    scan: function (resp) {
      if (resp == "ERROR") {
        this.showAlertAndDismiss("This asset was not found.");
      } else {
        if (resp.status_label.status_type == "undeployable") {
          this.showAlertAndDismiss(
            "This asset cannot be checked out! State: " + resp.status_label.name
          );
        } else if (
          this.items.find((e) => e.asset_tag == resp.asset_tag) != undefined
        ) {
          this.showAlertAndDismiss("Asset already in list");
        } else {
          this.items.push(resp);
        }
      }
    },
    showAlertAndDismiss: function (c) {
      this.alertContent = c;
      this.showAlert = true;
      let self = this;
      setTimeout(() => (self.showAlert = false), 2000);
    },
  },
};
</script>
