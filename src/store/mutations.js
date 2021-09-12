export default {
  loadConfig: function (state, config) {
    state.config = config;
  },
  login: function (state, apiKey) {
    state.apiKey = apiKey;
  },
  setUser(state, user) {
    state.loggedIn = true;
    state.user = user;
  },
  logout: function (state) {
    state.loggedIn = false;
    state.user = null;
    state.apiKey = null;
  },
};
