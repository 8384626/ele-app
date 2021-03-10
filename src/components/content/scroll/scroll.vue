<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  name: "scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  methods:{
    scrollToElement(op, time = 1000) {
      this.scroll && this.scroll.scrollToElement(op, time);
    },
  },
  mounted() {
    // 创建BScroll实例
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      observeDOM: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });
  }
};
</script>
<style scoped>
.wrapper {
  overflow: hidden;
}
</style>
