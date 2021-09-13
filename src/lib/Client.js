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
}

export default {
  install,
};
