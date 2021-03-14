<template>
  <div class="shopcart">
    <div class="bottomNav-cartfooter" :class="{'bottomNav-carticon-empty':isEmpty}">
      <span class="bottomNav-carticon">
        <i class="fa fa-cart-plus"></i>
      </span>
      <div class="bottomNav-cartInfo">
        <p class="bottomNav-carttotal">
          <span v-if="isEmpty">未选购商品</span>
          <span v-else>￥0</span>
        </p>
        <p class="bottomNav-cartdelivery">
          另需配送费{{ shopInfo.rst.float_delivery_fee }}元
        </p>
      </div>
      <button class="submit-btn">
        <span v-if="isEmpty"
          >￥{{ shopInfo.rst.float_minimum_order_amount }}元起送</span
        >
        <span v-else>去结算</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "shopCart",
  props: {
    shopInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    isEmpty() {
      let empty = true;
      return empty;
    },
  },
};
</script>

<style scoped>
.bottomNav-cartfooter {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  padding-left: 21.066667vw;
  background-color: rgba(61, 61, 63, 0.9);
  height: 12.8vw;
  z-index: 1000;
}
.bottomNav-carticon {
  position: absolute;
  left: 3.2vw;
  bottom: 2vw;
  width: 13.333333vw;
  height: 13.333333vw;
  box-sizing: border-box;
  border-radius: 100%;
  background-color: #3190e8;
  border: 1.333333vw solid #444;
  box-shadow: 0 -0.8vw 0.533333vw 0 rgba(0, 0, 0, 0.1);
}
.bottomNav-carticon > i {
  position: absolute;
  top: 7px;
  right: 0;
  bottom: 0;
  left: 7px;
  color: #fff;
  font-size: 1.6rem;
}
.bottomNav-cartInfo {
  flex: 1;
}
.bottomNav-carttotal {
  font-size: 0.8rem;
  line-height: normal;
  color: #fff;
}
.bottomNav-cartdelivery {
  color: #999;
  font-size: 0.6rem;
}
.submit-btn {
  height: 100%;
  width: 28vw;
  background-color: #38ca73;
  color: #fff;
  text-align: center;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 12.8vw;
  border: none;
  outline: none;
}
.bottomNav-carticon-empty > span {
  background-image: radial-gradient(circle, #363636 6.266667vw, #444 0);
}
.bottomNav-carticon-empty > span > i {
  color: #606065 !important;
}
.bottomNav-carticon-empty .bottomNav-carttotal > span {
  color: #999;
}
.bottomNav-carticon-empty .submit-btn {
  background-color: #535356 !important;
}

</style>