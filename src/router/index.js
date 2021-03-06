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
      {
        path: "/myAddress",
        name: "myAddress",
        component: () => import("../views/Orders/myAddress.vue"),
      },
      {
        path: "/addAddress",
        name: "addAddress",
        component: () => import("../views/Orders/addAddress.vue"),
      },
      {
        path: "/settlement",
        name: "settlement",
        component: () => import("../views/Orders/settleMent.vue"),
      },
      {
        path: "/remark",
        name: "remark",
        component: () => import("../views/Orders/remark.vue"),
      },
      {
        path: "/pay",
        name: "pay",
        component: () => import("../views/Orders/pay.vue"),
      },
      {
        path: "/orderInfo",
        name: "orderInfo",
        component: () => import("../views/Orders/orderInfo.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login.vue"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("../views/search.vue"),
  },
  {
    path: "/shop",
    redirect:"goods",
    component: () => import("../views/shops/shop.vue"),
    children:[
      {
        path: "/goods",
        name: "goods",
        component: () => import("../views/shops/goods.vue"),
      },
      {
        path: "/comments",
        name: "comments",
        component: () => import("../views/shops/comments.vue"),
      },
      {
        path: "/seller",
        name: "seller",
        component: () => import("../views/shops/seller.vue"),
      },
    ],
  },
];


const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  linkActiveClass:"active",
  routes,
});

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.ele_login ? true : false;
  if (to.path == '/login') {
    next();
  } else {
    // ????????????????????????
    isLogin ? next() : next('/login');
  }
});


export default router;
