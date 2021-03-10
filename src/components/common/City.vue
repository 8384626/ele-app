<template>
  <div class="city">
    <div class="search_wrap">
      <div class="search">
        <img src="~assets/img/address/zoom.svg" alt="" />
        <input type="text" v-model="city_val" placeholder="请输入城市名字" />
      </div>
      <button @click="$router.push({name:'address',params:{city:city}})">取消</button>
    </div>
    <div class="wrapper" v-if="searchList.length == 0">
      <div class="location">
        <location @click="selectCity({name:city})" :address="city"></location>
      </div>
      <scroll class="content" ref="scroll">
        <alphabet
          ref="alphabet"
          :cityInfo="cityInfo"
          :keys="keys"
          @selectCity="selectCity"
        ></alphabet>
      </scroll>
    </div>
    <div class="area_keys" v-if="searchList.length == 0">
      <ul>
        <li>#</li>
        <li
          v-for="(item, index) in keys"
          :key="index"
          @click="selectKey(index)"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="search_list" v-else>
      <div class="search_content">
        <ul>
        <li @click="selectCity(item)" v-for="(item,index) in searchList" :key="index">
          {{item.name}}
        </li>
      </ul>
      </div>
    </div>
  </div>
</template>

<script>
import location from "components/common/location.vue";
import alphabet from "components/content/Alphabet/alphabet.vue";
import Scroll from "components/content/scroll/scroll.vue";

export default {
  name: "city",
  data() {
    return {
      city_val: "",
      cityInfo: null,
      keys: [],
      allCites:[],
      searchList:[]
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
        // 存储所有城市 
        this.keys.forEach(key=>{
          // console.log(key);
          this.cityInfo[key].forEach(city =>{
            this.allCites.push(city)
          })
        })
      });
    },
    selectKey(index) {
      // console.log(index);
      const cityList = this.$refs.alphabet.getDom();
      let el = cityList[index];
      this.$refs.scroll.scrollToElement(el, 250);
    },
    selectCity(city) {
      this.$router.push({ name: "address", params: { city: city.name } });
    },
    searchCity(){
      if(!this.city_val.trim()){
        this.searchList = []
      }else {
        this.searchList = this.allCites.filter(item =>{
          return item.name.indexOf(this.city_val) != -1
        })
      }
    }
  },
  computed: {
    city() {
      return (
        this.$store.getters.location.addressComponent.city ||
        this.$store.getters.location.addressComponent.province
      );
    },
  },
  watch:{
    city_val(){
      this.searchCity()
    }
  },
  components: {
    location,
    alphabet,
    Scroll,
  },
  created() {
    this.getCityInfo();
  }
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
.wrapper {
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
.content {
  position: absolute;
  top: 65px;
  bottom: 0;
  right: 0;
  left: 0;
  height: calc(100vh - 110px);
  overflow: hidden;
  z-index: 100;
}
.area_keys {
  position: fixed;
  right: 0;
  top: 25%;
  color: #aaa;
  font-size: 12px;
  line-height: 1.4;
  text-align: center;
  padding: 0 5px;
  z-index: 10;
}
.search_list{
  position: relative;
  top: 0px;
  left: 0;
  height: calc(100vh - 45px);
  background-color: #eee;
  z-index: 10;
}
.search_content {
  background: #fff;
  padding: 5px 16px;
}
.search_content li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
</style>