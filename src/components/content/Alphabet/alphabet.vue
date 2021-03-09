<template>
  <div class="alphabet" v-if="cityInfo">
    <div class="scroll_wrap">
      <!-- 热门城市 -->
      <div class="hot_wrap">
        <div class="title"><span>热门城市</span></div>
        <ul class="hot_city">
          <li v-for="(item, index) in cityInfo.hotCities" :key="index">
            {{ item.name }}
          </li>
        </ul>
      </div>
      <!-- 所有城市 -->
      <div class="city_wrap">
        <div class="city_content" v-for="(item, index) in keys" :key="index">
          <div class="title">
            {{ item }}
          </div>
          <ul>
            <li v-for="(city, index) in cityInfo[item]" :key="index">
              {{ city.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "alphabet",
  props: {
    cityInfo: {
      type: Object,
      default() {
        return {};
      },
    },
    keys: {
      type: Array,
      default() {
        return [];
      },
    },
  }
};
</script>

<style scoped>
.alphabet{
  background-color: #fff;
  overflow: hidden;
}
.scroll_wrap {
  background: #fff;
  overflow: auto;
}
.title {
  color: #aaa;
  padding: 15px 0;
}
.hot_city {
  padding: 0 18px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.hot_city li {
  width: 30%;
  background: #f1f1f1;
  margin: 0 10px 10px 0;
  text-align: center;
  padding: 10px;
  box-sizing: border-box;
}
.city_content li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
</style>