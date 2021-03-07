<template>
  <div class="index">
    <router-view></router-view>
    <mai-tab-bar></mai-tab-bar>
  </div>
</template>

<script>
import MaiTabBar from '../components/common/maiTabBar.vue';
export default {
  components: { MaiTabBar },
  name: "index",
  data() {
    return {};
  },
};
</script>

<style scoped>
</style>