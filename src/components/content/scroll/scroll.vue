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
    refresh() {
      // console.log("1111");
      this.scroll && this.scroll.refresh();
    },
  },
  mounted() {
    // 创建BScroll实例
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      observeDOM: true,
      observeImage:true,
      probeType:this.probeType
    });
    this.scroll.refresh()
    this.$emit('BScrollData', this.scroll);
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", position => {
        this.$emit("scrollPostion", position);
      });
    }
  }
};
</script>
<style scoped>
.wrapper {
  overflow: hidden;
}
</style>
