<template>
  <div v-if="filterData" class="filter_wrap">
    <aside class="filter">
      <div
        class="filter-nav"
        v-for="(item, index) in filterData.navTab"
        :key="index"
      >
        <span>{{ item.name }}</span>
        <i v-if="item.icon" :class="'fa fa-' + item.icon"></i>
      </div>
    </aside>
  </div>
</template>

<script>
export default {
  name: "filterView",
  props: {
    filterData: {
      type: Object,
      default: {},
    },
  },
};
</script>

<style scoped>
.filter_wrap {
  background: #fff;
  position: sticky;
  top: 54px;
  z-index: 10;
}
.filter {
  position: relative;
  border-bottom: 1px solid #ddd;
  line-height: 10.4vw;
  z-index: 101;
  height: 10.666667vw;
  display: flex;
  justify-content: space-around;
}
.filter-nav {
  flex: 1;
  text-align: center;
  color: #666;
  font-size: 0.8333rem;
}
.filter-nav i {
  width: 1.6vw;
  height: 0.8vw;
  margin-left: 1.333333vw;
  margin-bottom: 0.533333vw;
  fill: #333;
  will-change: transform;
}
</style>