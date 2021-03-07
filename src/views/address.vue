<template>
  <div class="address">
    <nav-bar class="navBar">
      <template #left>
        <img src="~assets/img/address/left.svg" alt="" />
        <span @click="$router.go(-1)">返回</span>
      </template>
      <template #center>
        <span>选择收货地址</span>
      </template>
    </nav-bar>
    <div class="city_search">
      <div class="search">
        <span class="city">
          {{ city }}
          <img src="~assets/img/address/pulldown.svg" alt="" />
          <span class="ptl">|</span>
          <img src="~assets/img/address/zoom.svg" alt="" />
          <input
          type="text"
          v-model="search_val"
          placeholder="小区/写字楼/学校等"
        />
        </span>
      </div>
      <location :address="address"></location>
    </div>
  </div>
</template>

<script>
import NavBar from "components/content/navbar/NavBar.vue";
import location from "components/common/location.vue";

export default {
  name: "me",
  data() {
    return {
      city: "", // 当前城市
      search_val: "",
    };
  },
  computed:{
    address(){
      return this.$store.getters.location.formattedAddress
    }
  },
  components: {
    NavBar,
    location
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.city = to.params.city;
    });
  },
};
</script>

<style scoped>
.address {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  background-color: #fff;
}

.navBar {
  color: #fff;
  background-color: #009eef;
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
.city_search {
  padding: 10px 20px;
  color: #333;
}
.search {
  height: 40px;
  line-height: 40px;
  border-radius: 10px;
  box-sizing: border-box;
  background-color: #eeeeee;
}
.search .city {
  display: flex;
  align-items: center;
  padding: 0 10px;
}
.city img {
  width: 16px;
  height: 16px;
  margin-left: 5px;
}
.ptl {
  margin-left: 10px;
}
.search input {
  margin-left: 5px;
  background-color: #eee;
  outline: none;
  border: none;
}
</style>