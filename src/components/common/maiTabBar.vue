<template>
  <tabbar class="tabbar">
    <!-- 首页-->
    <tabbaritem path="/home" activeColor="skyblue">
      <template #item-icon>
        <img src="~assets/img/tabbar/home.png" alt="" />
      </template>
      <template #item-icon-active>
        <img src="~assets/img/tabbar/home-active.png" />
      </template>
      <template #item-text>
        <div>首页</div>
      </template>
    </tabbaritem>

    <!-- 购物车 -->
    <tabbaritem path="/order">
      <template #item-icon>
        <img src="~assets/img/tabbar/order.png" alt="" />
      </template>
      <template #item-icon-active>
        <img src="~assets/img/tabbar/order-active.png" alt="" />
      </template>
      <template #item-text>
        <div>订单</div>
      </template>
    </tabbaritem>

    <!-- 我的 -->
    <tabbaritem path="/me">
      <template #item-icon>
        <img src="~assets/img/tabbar/me.png" alt="" />
      </template>
      <template #item-icon-active>
        <img src="~assets/img/tabbar/me-active.png" alt="" />
      </template>
      <template #item-text>
        <div>我的</div>
      </template>
    </tabbaritem>
  </tabbar>
</template>

<script>
import tabbar from "../content/tabbar/tabbar";
import tabbaritem from "../content/tabbar/tabbaritem";
export default {
  components: {
    tabbar,
    tabbaritem,
  },
};
</script>

<style>
.tabbar {
  z-index: 9;
}
</style>