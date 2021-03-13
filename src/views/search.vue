<template>
  <div class="search">
    <nav-bar class="navBar">
      <template #left>
        <img src="~assets/img/address/left.svg" alt="" />
        <span @click="$router.push('/home')">返回</span>
      </template>
      <template #center>
        <span>搜索</span>
      </template>
    </nav-bar>
    <div class="search_header">
      <form class="search_wrap">
        <i class="fa fa-search"></i>
        <input type="text" v-model="key_word" placeholder="输入商家/商品信息" />
        <button @click.prevent="searchHandle">搜索</button>
      </form>
    </div>
    <div class="shop" v-if="result && !showShop">
      <div class="empty_wrap" v-if="empty">
        <img
          src="https://fuss10.elemecdn.com/d/60/70008646170d1f654e926a2aaa3afpng.png"
        />
        <div class="empty_txt">
          <h4>附近没有搜索结果</h4>
          <span>换个关键词试试吧</span>
        </div>
      </div>
      <div v-else>
        <search-index
          @click="shopItemClick"
          :data="result.restaurants"
        ></search-index>
        <search-index
          @click="shopItemClick"
          :data="result.words"
        ></search-index>
      </div>
    </div>
    <div class="container" v-if="showShop">
      <filter-view :filterData="filterData" :isSearchStyle="true" @updata="updata" class="filter-v"></filter-view>
      <div
        class="shoplist"
        v-infinite-scroll="loadMore"
        :infinite-scroll-disabled="loading"
      >
        <index-shop
          v-for="(item, index) in restaurants"
          :key="index"
          :restaurant="item.restaurant"
        ></index-shop>
      </div>
    </div>
  </div>
</template>

<script>
import searchIndex from "../components/common/searchIndex";
import FilterView from "../components/common/FilterView";
import indexShop from "../components/common/indexShop";

import NavBar from "components/content/navbar/NavBar.vue";

import { InfiniteScroll } from "mint-ui";

export default {
  name: "search",
  data() {
    return {
      key_word: "",
      result: null,
      empty: false,
      showShop: false,
      filterData: null,
      restaurants: [],
      page: 0,
      size: 7,
      loading: false,
      data: null,
    };
  },
  methods: {
    async keyWordChange() {
      let res = null;
      this.page = 0;
      this.empty = false;
      this.showShop = false;
      this.restaurants = [];
      if (this.key_word.trim()) {
        res = await this.$axios(
          `/api/profile/typeahead/${this.key_word.trim()}`
        );
        this.result = res.data;
        if (
          !(
            this.result &&
            (this.result.restaurants.length > 0 || this.result.words.length > 0)
          )
        ) {
          this.empty = true;
        }
      }
    },
    async searchHandle() {
      if (!this.key_word) return;
      this.keyWordChange();
    },
    shopItemClick() {
      this.page = 0;
      this.restaurants = [];
      this.showShop = true;
    },
    updata(condation) {
      this.data = condation;
      this.shopItemClick();
    },
    loadMore() {
      this.page++;
      this.$axios
        .post(`/api/profile/restaurants/${this.page}/${this.size}`, this.data)
        .then((res) => {
          if (res.data.length > 0) {
            res.data.forEach((item) => {
              this.restaurants.push(item);
            });
          } else {
            this.loading = true;
          }
        });
    },
  },
  // watch: {
  //   key_word() {
  //     this.empty = false;
  //     this.showShop = false;
  //     this.keyWordChange();
  //   },
  // },
  components: {
    searchIndex,
    FilterView,
    indexShop,
    NavBar,
  },
  created() {
    this.$axios("/api/profile/filter").then((res) => {
      this.filterData = res.data;
    });
  },
};
</script>

<style scoped>
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

.search {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.search_header {
  margin-top: 45px;
  background: #fff;
  padding: 0 4.266667vw;
}
.search_header .search_wrap {
  padding: 2.933333vw 2.933333vw 2.933333vw 0;
  display: flex;
  align-items: center;
  position: relative;
}
.search_wrap .fa-search {
  width: 2.933333vw;
  height: 2.933333vw;
  color: #888;
  position: absolute;
  top: 4.6666666vw;
  left: 2.933333vw;
}
.search_wrap input {
  flex-grow: 1;
  border-radius: 0.266667vw;
  background-color: #f8f8f8;
  padding: 1.733333vw 4vw 1.733333vw 8.8vw;
  color: #666;
  outline: none;
  border: none;
}
.search_wrap button {
  outline: none;
  border: none;
  color: #333;
  font-size: 0.426667rem;
  background: #fff;
  font-weight: 700;
  margin-left: 2.933333vw;
  font-size: 14px;
}
.shop {
  width: 100%;
  height: calc(100% - 95px);
  overflow: auto;
}
.filter-v{
  top: 44px im !important;
}
.empty_wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #fff;
  display: flex;
  justify-content: center;
}
.empty_wrap img {
  width: 35vw;
  height: 35vw;
}
.empty_txt h4 {
  color: #666;
  font-size: 1rem;
  margin: 12vw 0 2vw 0;
}
.empty_txt span {
  color: #999;
  font-size: 0.8rem;
}
</style>