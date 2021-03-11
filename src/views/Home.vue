<template>
  <div class="home">
    <div class="header">
      <div
        class="address_map"
        @click="$router.push({ name: 'address', params: { city: city } })"
      >
        <img src="~assets/img/home/position.svg" alt="" />
        <span>{{ address }}</span>
        <img src="~assets/img/home/dropdown.svg" alt="" />
      </div>
    </div>
    <div class="search_wrap">
      <div class="shop_search">
        <img src="~assets/img/home/Zoom.svg" alt="" />
        <span>搜索商家 商家名称</span>
      </div>
    </div>
    <div id="container">
      <!-- 轮播图 -->
      <swiper>
        <swiper-item v-for="(item, index) in swipeImgs" :key="index">
          <img :src="item" />
        </swiper-item>
      </swiper>
      <!-- 分类 -->
      <mt-swipe :auto="0" class="entries">
        <mt-swipe-item
          v-for="(entry, enindex) in entries"
          :key="enindex"
          class="entry_wrap"
        >
          <div class="foodentry" v-for="(item, index) in entry" :key="index">
            <div class="img_wrap">
              <img :src="item.image" />
            </div>
            <span>{{ item.name }}</span>
          </div>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <!-- 推荐商家 -->
    <div class="shoplist-title">推荐商家</div>
    <!-- 导航 -->
    <filter-view :filterData="filterData"></filter-view>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/content/swiper";
import FilterView from "components/common/FilterView";

import { Swipe, SwipeItem } from "mint-ui";

export default {
  name: "home",
  data() {
    return {
      swipeImgs: [],
      entries: [],
      filterData: null,
    };
  },
  methods: {
    getData() {
      this.$axios("/api/profile/shopping").then((res) => {
        this.swipeImgs = res.data.swipeImgs;
        this.entries = res.data.entries;
      });
      this.$axios("/api/profile/filter").then((res) => {
        this.filterData = res.data;
      });
    },
  },
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
  components: {
    Swiper,
    SwiperItem,
    FilterView
  },
  created() {
    this.getData();
  },
};
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #f1f1f1;
}
.header {
  background-color: #009eef;
  padding: 16px 16px 0 16px;
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
.search_wrap {
  position: sticky;
  top: 0px;
  z-index: 999;
  box-sizing: border-box;
  background-color: #009eef;
  padding: 10px 16px;
}
.search_wrap .shop_search {
  display: flex;
  justify-content: center;
  align-items: center;
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
.entries {
  background: #fff;
  height: 47.2vw;
  text-align: center;
  overflow: hidden;
}
.foodentry {
  width: 20%;
  float: left;
  position: relative;
  margin-top: 2.933333vw;
}
.foodentry .img_wrap {
  position: relative;
  display: inline-block;
  width: 12vw;
  height: 12vw;
}
.img_wrap img {
  width: 100%;
  height: 100%;
}
.foodentry span {
  display: block;
  color: #666;
  font-size: 0.32rem;
}
/* 推荐商家 */
.shoplist-title {
  display: flex;
  align-items: flex;
  justify-content: center;
  height: 9.6vw;
  line-height: 9.6vw;
  font-size: 16px;
  color: #333;
  background: #fff;
}
.shoplist-title:after,
.shoplist-title:before {
  display: block;
  content: "一";
  width: 5.333333vw;
  height: 0.266667vw;
  color: #999;
}
.shoplist-title:before {
  margin-right: 3.466667vw;
}
.shoplist-title:after {
  margin-left: 3.466667vw;
}
</style>