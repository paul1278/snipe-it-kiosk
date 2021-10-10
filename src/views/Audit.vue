<template>
  <b-container class="text-center mt-5">
    <b-row>
      <b-col :sm="8">
        <b-table :fields="this.fields" striped :items="this.items">
          <template #cell(asset)="data">
            {{ data.item.manufacturer.name + " " + data.item.model.name }}
          </template>

          <template #cell(state)="data">
            <b-spinner v-if="data.item.state == 0" class="spinner-text" />
            <div v-else>
             <b-icon-check variant="success" class="icon-text" />
              Due: {{ data.item.state.next_audit_date.formatted }}
            </div>
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
  name: "Audit",
  data: () => ({
    showAlert: false,
    alertContent: "",
    loading: false,
    fields: [
      { key: "asset_tag", label: "Tag" },
      { key: "asset", label: "Asset" },
      { key: "serial", label: "Serial" },
      { key: "state", label: "State" },
    ],
    items: [],
  }),
  methods: {
    scan: function (resp) {
      if (resp == "ERROR") {
        this.showAlertAndDismiss("This asset was not found.");
      } else {
        if (
          this.items.find((e) => e.asset_tag == resp.asset_tag) != undefined
        ) {
          this.showAlertAndDismiss("Asset already in list");
        } else {
          let i = this.items.push({ ...resp, state: 0 }) - 1;
          this.$apiCalls()
            .auditAssetByTag(resp)
            .then((payload) => {
              this.items[i].state = payload;
          });
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
