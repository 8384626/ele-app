<template>
  <div class="address">
    <nav-bar class="navBar">
      <template #left>
        <img src="~assets/img/address/left.svg" alt="" />
        <span @click="$router.push('/home')">返回</span>
      </template>
      <template #center>
        <span>选择收货地址</span>
      </template>
    </nav-bar>
    <div class="city_search">
      <div class="search">
        <span class="city">
          <span @click="$router.push('/city')">
            {{ city }}
            <img src="~assets/img/address/pulldown.svg" alt="" />
            <span class="ptl">|</span>
          </span>
          <img src="~assets/img/address/zoom.svg" alt="" />
          <input
            type="text"
            v-model="search_val"
            placeholder="小区/写字楼/学校"
          />
        </span>
      </div>
      <location @click="selectAddress" :address="address"></location>
    </div>
    <div class="tips">
      <div class="tips_list" v-for="(item, index) in TipList" :key="index">
        <li @click="selectAddress(item)">
          <h4>{{ item.name }}</h4>
          <p>{{ item.district }}{{ item.address }}</p>
        </li>
      </div>
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
      TipList: [],
    };
  },
  methods: {
    searchPlace() {
      const self = this;
      AMap.plugin("AMap.Autocomplete", function () {
        // 实例化Autocomplete
        var autoOptions = {
          //city 限定城市，默认全国
          city: self.city,
        };
        var autoComplete = new AMap.Autocomplete(autoOptions);
        autoComplete.search(self.search_val, function (status, result) {
          // 搜索成功时，result即是对应的匹配数据
          self.TipList = result.tips;
        });
      });
    },
    selectAddress(item) {
      // 设置地址
      if (item) {
        this.$store.dispatch(
          "setAddress",
          item.district + item.address + item.name
        );
      }else{
        this.$store.dispatch("setAddress",this.address)
      }
      this.$router.push("/home");
    },
  },
  computed: {
    address() {
      return this.$store.getters.location.formattedAddress;
    },
  },
  watch: {
    search_val() {
      this.searchPlace();
    },
  },
  components: {
    NavBar,
    location,
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if(to.params.city === '成都市'){
        vm.city = to.params.city.slice(0,2);
      }else if(to.params.city.length >=7){
        vm.city = to.params.city.slice(0,6);
      }else{
        vm.city = to.params.city;
      }
    });
  },
};
</script>

<style scoped>
.address {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  background-color: #fff;
  padding-top: 45px;
  z-index: 10;
}

.navBar {
  position: fixed;
  top: 0;
  width: 100%;
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
  width: 40%;
  margin-left: 5px;
  background-color: #eee;
  outline: none;
  border: none;
}
.tips {
  overflow: scroll;
  margin-top: 16px;
  background: #fff;
}
.tips li {
  list-style: none;
  border-top: 1px solid #eee;
  padding: 8px 16px;
  color: #aaa;
}
.tips li h4 {
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}
</style>