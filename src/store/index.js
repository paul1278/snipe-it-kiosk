import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import actions from "./actions";
import InitState from "./state";

Vue.use(Vuex);
const state = {};

Object.assign(state, InitState);

export default new Vuex.Store({
  state,
  mutations,
  actions,
});
