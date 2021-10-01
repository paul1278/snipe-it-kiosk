import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import Home from "@/views/Home";
import Login from "@/views/Login";
import Logout from "@/views/Logout";
import Scan from "@/views/Scan";
import ScanResult from "@/views/ScanResult";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/scan",
    name: "Scan",
    component: Scan,
  },
  {
    path: "/scanresult",
    name: "ScanResult",
    component: ScanResult,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      requiresAuthentication: false,
    },
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

router.beforeEach((to, from, next) => {
  let requiresAuthentication =
    to.meta.requiresAuthentication != null
      ? to.meta.requiresAuthentication
      : true;

  if (!store.state.loggedIn && requiresAuthentication) {
    next("/login");
    return;
  }
  next();
});

export default router;
