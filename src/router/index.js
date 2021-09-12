import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import Logout from "@/views/Logout";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
