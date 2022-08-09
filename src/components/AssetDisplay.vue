<template>
  <div>
    <h2>{{ this.asset.manufacturer.name }} {{ this.asset.model.name }}</h2>
    <b-row class="mt-4" v-if="this.checkState == 0">
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
        <b-alert show variant="info" v-if="this.asset.status_label.status_meta == 'deployed'">
          This asset is deployed to:<br />
          {{ this.asset.assigned_to.name }} ({{ this.asset.assigned_to.type }})
        </b-alert>
        <b-alert show variant="warning" v-else-if="this.asset.status_label.status_meta == 'undeployable'">
          <b-icon-exclamation />This asset can not be deployed<br />
          State: {{ this.asset.status_label.name }}
        </b-alert>
        <b-alert show variant="success" v-else>
          <b-icon-check />This asset can be deployed
        </b-alert>
        <b-form-select class="mb-3" id=" userDropdown" variant="primary" @change="onChange()" v-if="
        this.asset.status_label.status_meta != 'undeployable' &&
        this.asset.status_label.status_meta != 'deployed'" ref="userDown" value-field="value" text-field="text"
          :options="userOptions" v-model="selected">
        </b-form-select>
        <Button variant="primary" shortcut="Enter" @click="() => checkout()" v-if="
          this.asset.status_label.status_meta != 'undeployable' &&
          this.asset.status_label.status_meta != 'deployed'
        ">
          Check-out
        </Button>
        <Button variant="primary" shortcut="Enter" @click="() => checkin()" v-if="
          this.asset.status_label.status_meta != 'undeployable' &&
          this.asset.status_label.status_meta == 'deployed'
        ">
          Check-in
        </Button>
        <Button variant="primary" @click="$router.back()" shortcut="b" class="ml-2">
          Back
        </Button>
      </b-col>
    </b-row>
    <b-row v-if="this.checkState != 0">
      <b-col>
        <b-spinner class="spinner-big mt-4 mb-4" v-if="this.checkState == 1" />
        <div v-if="this.checkState == 2">
          <b-icon-check variant="success" class="icon-big mt-4 mb-4" />
          <h5>Checked out to {{ this.checkedOutName }}</h5>
        </div>
        <div v-if="this.checkState == 3">
          <b-icon-check variant="success" class="icon-big mt-4 mb-4" />
          <h5>
            Checked in
            <span v-if="this.locationOnCheckin">
              , please put it to location: {{ this.locationOnCheckin }}
            </span>
          </h5>
        </div>
        <div v-if="this.checkState == 4">
          <b-icon-exclamation-octagon variant="danger" class="icon-big mt-4 mb-4" />
          <h5>Please put the item back!</h5>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Button from "./Button.vue";

export default {
  components: { Button },
  name: "AssetDisplay",
  data() {
    return {
      checkState: 0, // 0: init, 1: loading, 2: success checkout, 3: success checkin, 4: error;
      locationOnCheckin: null,
      selected: null,
      checkedOutName: null,
      userOptions: [
        { text: 'Please Select an Option', value: null }
      ]
    }
  },
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
  methods: {
    checkout: function () {
      this.checkState = 1;
      this.$apiCalls()
        .checkoutAssetByTag(this.asset.id, this.selected)
        .then(() => {
          this.checkState = 2;
          setTimeout(() => {
            this.$router.push("/scan");
          }, 1000);

          this.getUserName(this.selected);
          return;
        })
        .catch(() => {
          this.checkState = 4;
        });
    },
    checkin: function () {
      this.checkState = 1;
      this.$apiCalls()
        .checkinAssetByTag(this.asset.id)
        .then((resp) => {
          this.locationOnCheckin = resp.data.location ? resp.data.location.name : null;
          this.checkState = 3;
          setTimeout(() => {
            this.$router.push("/scan");
          }, 1000);
          return;
        })
        .catch(() => {
          this.checkState = 4;
        });
    },
    onChange() {
    },
    getUserName(tag){
      this.userOptions.forEach(x => {
        if (x.value == tag)
        {
          this.checkedOutName = x.text;
          /*console.log(x.text); debug*/
        }
      })
    }
  },
  mounted(){

  },

  beforeMount() {
    this.$apiCalls()
      .getAllUsers()
      .then(resp => {
        var data = resp.rows;
        for (var i = 0; i < data.length; i++) {
          /*var respParse = { text: resp.rows[i].id, value: resp.rows[i].name }
          console.log(resp.rows[i].id);
          console.log(respParse.text); debug*/
          this.userOptions.push({ text: resp.rows[i].name, value: resp.rows[i].id });
        }
      });
  }
};
</script>

<style></style>
