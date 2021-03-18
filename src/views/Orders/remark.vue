<template>
  <div class="remark">
    <nav-bar class="navBar">
      <template #left>
        <img src="~assets/img/address/left.svg" alt="" />
        <span @click="$router.go(-1)">返回</span>
      </template>
      <template #center>
        <span>订单备注</span>
      </template>
    </nav-bar>
    <!-- 订单备注内容 -->
    <div class="view-body">
      <section>
        <textarea
          placeholder="填写对骑手小哥或者餐厅备注的信息"
          v-model="text"
          maxlength="100"
        ></textarea>
        <div class="switch">
          <span
            v-for="(item, index) in radioItem"
            :key="index"
            class="switch-item item-line"
            @click="radioSelect(index)"
            :class="{'selected':item.select}"
            >{{ item.name }}</span
          >
        </div>
        <div class="switch" v-for="(item,index) in switchItem" :key="index">
          <span class="switch-item" @click="item.select = !item.select" :class="{'selected':item.select}">{{item.name}}</span>
        </div>
      </section>
      <button class="btn-submit" @click="submitClick">确定</button>
    </div>
  </div>
</template>

<script>
import NavBar from "components/content/navbar/NavBar.vue";

export default {
  name: "remark",
  data() {
    return {
      radioItem: [
        { select: false, name: "不要辣" },
        { select: false, name: "微辣辣" },
        { select: false, name: "麻辣辣" },
      ],
      switchItem: [
        { select: false, name: "不要香菜" },
        { select: false, name: "不要葱" },
        { select: false, name: "多点葱" },
        { select: false, name: "多点醋" },
      ],
      text: "",
    };
  },
  methods: {
    radioSelect(index) {
      this.radioItem.forEach(item =>{
        item.select = false
      })
      this.radioItem[index].select = true
    },
    submitClick(){
      let selectItems = ""
      this.radioItem.forEach(element =>{
        if(element.select){
          selectItems +=element.name + ","
        }
      })
      this.switchItem.forEach(element =>{
        if(element.select){
          selectItems +=element.name + ","
        }
      })
      selectItems += this.text
      // 存储
      this.$store.dispatch('setRemarkInfo', {
        tableware: this.$store.getters.remarkInfo.tableware,
        remark: selectItems
      });
      this.$router.go(-1)
    }
  },
  components: {
    NavBar,
  },
};
</script>

<style scoped>
.remark {
  position: relative;
  height: calc(100vh - 44px);
  background-color: #f1f1f1;
  z-index: 101;
  padding-top: 44px;
}
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
.view-body {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  font-size: 0.8rem;
  color: #333;
}
.view-body section {
  margin-top: 2.133333vw;
  padding: 4.266667vw;
  background-color: #fff;
  margin-bottom: 2.133333vw;
}
.view-body section textarea {
  width: 100%;
  height: 29.866667vw;
  margin-bottom: 4.266667vw;
  padding: 4.266667vw;
  border: 1px solid #ccc;
  border-radius: 0.666667vw;
  background-color: #f9f9f9;
  color: #666;
  resize: none;
  box-sizing: border-box;
  outline: none;
}
.switch {
  display: inline-block;
  margin: 0 2.666667vw 2.666667vw 0;
  border: 1px solid #ddd;
  overflow: hidden;
  border-radius: 1.066667vw;
}
.switch-item {
  display: inline-block;
  padding: 0 2.133333vw;
  height: 8vw;
  line-height: 8vw;
  text-align: center;
  color: #666;
}
.item-line::after {
  content: " ";
  display: inline-block;
  height: 4vw;
  width: 1px;
  background: #ddd;
  line-height: 8vw;
  vertical-align: middle;
  left: 2.266667vw;
  position: relative;
}
.btn-submit {
  border:none;
  display: block;
  padding: 3.466667vw 0;
  color: #fff;
  background-color: #00e067;
  border-radius: 0.533333vw;
  opacity: 0.98;
  width: 92vw;
  margin: 3.133333vw auto 0;
  font-size: 1rem;
  outline: none;
}

/* 选中样式 */
.switch-item.selected {
  background: #0186ff;
  color: #fff;
  position: relative;
}
</style>