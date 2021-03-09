import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home",
    component: () => import("../views/index.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("../views/home.vue"),
      },
      {
        path: "/me",
        name: "me",
        component: () => import("../views/me.vue"),
      },
      {
        path: "/order",
        name: "order",
        component: () => import("../views/order.vue"),
      },
      {
        path: "/address",
        name: "address",
        component: () => import("../views/address.vue"),
      },
      {
        path: "/city",
        name: "city",
        component: () => import("components/common/City.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
