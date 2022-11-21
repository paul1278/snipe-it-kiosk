import axios from "axios";

function install(Vue) {
  Vue.prototype.$apiCall = function (method, path, data) {
    return axios({
      method,
      url: this.$store.state.config.apiUrl + path,
      data,
      headers: {
        Authorization: "Bearer " + this.$store.state.apiKey,
      },
    }).then((resp) => {
      if (resp.data.status != null) {
        if (resp.data.status == "error") {
          throw new Error(resp);
        }
      }
      return resp;
    });
  };
  Vue.prototype.$apiCalls = function () {
    let self = this;
    return {
      getAssetByTag: function (tag) {
        return self.$apiCall("GET", "/hardware/bytag/" + tag).then((resp) => {
          resp.data.status_label.__deployable = true;
          if (
            resp.data.status_label.status_meta == "deployed" ||
            resp.data.status_label.status_meta == "undeployable"
          ) {
            resp.data.status_label.__deployable = false;
          }
          return resp.data;
        });
      },
      checkoutAssetByTag: function (tag, userID) {
        return self
          .$apiCall("POST", "/hardware/" + tag + "/checkout", {
            checkout_to_type: "user",
            assigned_user: userID,
          })
          .then((resp) => {
            if (resp.data.status == "success") {
              return true;
            }
            throw new Error(resp);
          });
      },
      checkinAssetByTag: function (tag) {
        return self
          .$apiCall("POST", "/hardware/" + tag + "/checkin")
          .then((resp) => {
            if (resp.data.status == "success") {
              return this.getAssetByTag(tag);
            }
            throw new Error(resp);
          });
      },
      auditAssetByTag: function (tag) {
        return self
          .$apiCall("POST", "/hardware/audit", {
            asset_tag: tag,
          })
          .then((resp) => {
            if (resp.data.status == "success") {
              return resp.data.payload;
            }
            throw new Error(resp);
          });
      },
      getAllUsers: function () {
        return self.$apiCall("GET", "/users").then((resp) => {
          if (resp.data.total != null) {
            return resp.data;
          }
          throw new Error(resp);
        });
      },
    };
  };
}

export default {
  install,
};
