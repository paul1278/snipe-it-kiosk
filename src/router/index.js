import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
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
    path: "/logout",
    name: "Logout",
    component: Logout,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
