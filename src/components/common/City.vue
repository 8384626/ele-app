<template>
  <div class="city">
    <div class="search_wrap">
      <div class="search">
        <img src="~assets/img/address/zoom.svg" alt="" />
        <input type="text" v-model="city_val" placeholder="请输入城市名字" />
      </div>
      <button @click="$router.go(-1)">取消</button>
    </div>
    <div class="wrapper">
      <div class="location">
        <location :address="city"></location>
      </div>
      <scroll class="content">
        <alphabet :cityInfo="cityInfo" :keys="keys"></alphabet>
      </scroll>
    </div>
  </div>
</template>

<script>
import location from "components/common/location.vue";
import alphabet from "components/content/Alphabet/alphabet.vue";
import Scroll from 'components/content/scroll/scroll.vue';

export default {
  name: "city",
  data() {
    return {
      city_val: "",
      cityInfo: null,
      keys: [],
    };
  },
  methods: {
    getCityInfo() {
      this.$axios("/api/posts/cities").then((res) => {
        // console.log(res.data);
        this.cityInfo = res.data;
        // 处理key 计算key
        this.keys = Object.keys(res.data);
        this.keys.pop();
        this.keys.sort();
      });
    },
  },
  computed: {
    city() {
      return (
        this.$store.getters.location.addressComponent.city ||
        this.$store.getters.location.addressComponent.province
      );
    },
  },
  components: {
    location,
    alphabet,
    Scroll,
  },
  created() {
    this.getCityInfo();
  },
};
</script>

<style scoped>
.city {
  height: 100vh;
  overflow: auto;
  box-sizing: border-box;
  background-color: #eee;
  z-index: 10;
}
.search_wrap {
  display: flex;
  justify-content: space-between;
  height: 45px;
  width: 100%;
  padding: 3px 16px;
  background: #fff;
  box-sizing: border-box;
}
.search {
  display: flex;
  align-items: center;
  padding: 0 16px;
  width: 85%;
  line-height: 40px;
  border-radius: 10px;
  box-sizing: border-box;
  background-color: #eee;
}
.search img {
  width: 20px;
  height: 20px;
}
.search input {
  background: #eee;
  width: 300px;
  outline: none;
  border: none;
  margin-left: 5px;
}
.search_wrap button {
  outline: none;
  border: none;
  color: #009eef;
  background-color: #fff;
}
.wrapper{
  position: relative;
  background-color: #eee;
  z-index: 10;
}
.location {
  background-color: #fff;
  padding: 8px 16px;
  height: 65px;
  box-sizing: border-box;
}
.content{
  position: absolute;
  top: 65px;
  bottom: 0;
  right: 0;
  left: 0;
  height: calc(100vh - 110px);
  overflow: hidden;
  z-index: 100;
}
</style>