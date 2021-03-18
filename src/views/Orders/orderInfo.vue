<template>
  <div class="orderInfo">
    <nav-bar class="navBar">
      <template #left>
        <img src="~assets/img/address/left.svg" alt="" />
        <span @click="$router.go(-1)">返回</span>
      </template>
      <template #center>
        <span>订单详情</span>
      </template>
    </nav-bar>
    <div class="view-body" v-if="orderDetail">
      <div class="status-head">
        <div class="status-text">订单已经送达</div>
        <div class="status-title">感谢您对lastcode的信任,期待再次服务</div>
      </div>
      <div class="restaurant-card">
        <!-- 点餐信息 -->
        <cart-group
          v-if="orderDetail.orderInfo"
          :orderInfo="orderDetail.orderInfo"
          :totalPrice="orderDetail.totalPrice"
        ></cart-group>
      </div>
      <!-- 配送信息 -->
      <div class="detail-card">
        <div class="title">配送信息</div>
        <ul class="card-list">
          <li class="list-item">
            <span>送达时间:</span>
            <div>{{orderDetail.date}}</div>
          </li>
          <li class="list-item">
            <span>送货地址:</span>
            <div class="content">
              <span>{{orderDetail.userInfo.name}}{{orderDetail.userInfo.sex}}</span>
              <span>{{orderDetail.userInfo.phone}}</span>
              <span>{{orderDetail.userInfo.address}}{{orderDetail.userInfo.bottom}}</span>
            </div>
          </li>
        </ul>
      </div>

      <!-- 订单信息 -->
      <div class="detail-card">
        <div class="title">订单信息</div>
        <ul class="card-list">
          <li class="list-item">
            <span>订单号:</span>
            {{orderDetail._id}}
          </li>
          <li class="list-item">
            <span>支付方式:</span>
            在线支付
          </li>
          <li class="list-item">
            <span>下单时间:</span>
            {{orderDetail.date}}
          </li>
          <li class="list-item" v-if="orderDetail.remarkInfo">
            <span>订单备注:</span>
            <span class="remark">{{orderDetail.remarkInfo.remark}} {{orderDetail.remarkInfo.tableware}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "components/content/navbar/NavBar.vue";

import cartGroup from "components/common/Orders/cartGroup.vue";

export default {
  name: "orderinfo",
  data() {
    return {
      orderDetail: null,
    };
  },
  components: {
    NavBar,
    cartGroup,
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.orderDetail = to.params;
      // console.log(vm.orderDetail);
    });
  },
};
</script>

<style scoped>
.orderInfo {
  position: relative;
  height: calc(100vh - 44px);
  background-color: #f1f1f1;
  z-index: 101;
  padding-top: 44px;
}
.navBar {
  position: fixed;
  top: 0;
  width: 100%;
  color: #fff;
  background-color: #009eef;
  z-index: 11;
}
.left {
  display: flex;
  align-items: center;
}
.left img {
  width: 22px;
  height: 22px;
  transform: translateY(20%);
}

.view-body {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.status-head {
  margin: 2.666667vw;
  box-shadow: 0 0.133333vw 0.266667vw 0 rgba(0, 0, 0, 0.05);
  background-color: #fff;
  padding: 0 3.2vw 5.333333vw;
}
.status-head .status-text {
  margin: 0 auto 4.266667vw;
  color: #333;
  font-size: 1.5rem;
  text-align: left;
  padding: 4.266667vw 0;
  border-bottom: 0.133333vw solid #ddd;
}
.status-head .status-title {
  font-size: 1rem;
  color: #333;
  margin-bottom: 1.866667vw;
}

.restaurant-card {
  margin: 2.666667vw;
  box-shadow: 0 0.133333vw 0.266667vw 0 rgba(0, 0, 0, 0.05);
  background-color: #fff;
  padding: 0 3.2vw 5.333333vw;
}
/* 配送和订单 */
.detail-card {
  margin: 2.666667vw;
  box-shadow: 0 0.133333vw 0.266667vw 0 rgba(0, 0, 0, 0.05);
  background-color: #fff;
  padding: 0 3.2vw 5.333333vw;
}

.status-head .status-text {
  margin: 0 auto 4.266667vw;
  color: #333;
  font-size: 1.5rem;
  text-align: left;
  padding: 4.266667vw 0;
  border-bottom: 0.133333vw solid #ddd;
}
.status-head .status-title {
  font-size: 1rem;
  color: #333;
  margin-bottom: 1.866667vw;
}
.title {
  font-size: 1rem;
  color: #333;
  border-bottom: 1px solid #eee;
  line-height: 10.4vw;
}
.list-item {
  color: #6e6e6e;
  border-bottom: 1px solid #f2f2f2;
  display: flex;
  align-items: baseline;
  line-height: 4.8vw;
  font-size: 0.88rem;
  padding: 3.2vw 8vw 2.666667vw 0;
}
.list-item .content {
  line-height: 1.5em;
  padding-bottom: 2.666667vw;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.list-item span:first-child {
  flex: none;
}
.remark {
  text-overflow: ellipsis;
  overflow: hidden;
  flex-grow: 1;
  white-space: nowrap;
}

</style>