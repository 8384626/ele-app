<template>
  <div class="Rating-gray">
    <i v-for="(item,index) in itemClass" :key="index" class="fa" :class="item"></i>
  </div>
</template>

<script>
const LENGTH = 5;
const CLS_ON = "fa-star";
const CLS_HALF = "fa-star-half-empty";
const CLS_OFF = "fa-star-o";
export default {
  name: "Rating",
  props:{
    rating:{
      type:Number,
      default:0
    }
  },
  computed:{
    itemClass(){
      let result = [];
      // 对分数进行处理,向下取0.5的倍数
      let score = Math.floor(this.rating * 2) / 2;
      // 控制半星
      let hasDecimal = score % 1 !==0;
      // 全星
      let integer=Math.floor(score)
      // 全星放入到数组中
      for(let i= 0;i<integer;i++){
        result.push(CLS_ON)
      }
      // 半星
      if(hasDecimal){
        result.push(CLS_HALF)
      }
      // 补齐
      while(result.length < LENGTH){
        result.push(CLS_OFF)
      }
      return result
    }
  }
};
</script>

<style scoped>
.Rating-gray {
  margin-right: 1.066667vw;
  color: #ffbe00;
  display: inline-block;
}
</style>