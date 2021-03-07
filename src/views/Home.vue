<template>
  <div class="home">
    <div class="header">
      <div
        class="address_map"
        @click="
          $router.push({name: 'address',params: {city: city}})
        "
      >
        <img src="~assets/img/home/position.svg" alt="" />
        <span>{{ address }}</span>
        <img src="~assets/img/home/dropdown.svg" alt="" />
      </div>
      <div class="shop_search">
        <img src="~assets/img/home/Zoom.svg" alt="" />
        <span>搜索商家 商家名称</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  computed: {
    address() {
      return this.$store.getters.address;
    },
    city() {
      return (
        this.$store.getters.location.addressComponent.city ||
        this.$store.getters.location.addressComponent.province
      );
    },
  },
};
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.header {
  background-color: #009eef;
  padding: 16px;
}
.header .address_map {
  display: flex;
  align-items: center;
  color: #fff;
  font-weight: bold;
}
.address_map img {
  margin: 0 3px;
  width: 22px;
  height: 22px;
}
.address_map span {
  display: inline-block;
  width: 80%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 16px;
}
.header .shop_search {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  background-color: #fff;
  padding: 10px 0;
  border-radius: 4px;
  color: #aaa;
}
.shop_search img {
  margin: 0 3px;
  width: 22px;
  height: 22px;
}
</style>