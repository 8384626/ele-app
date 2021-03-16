<template>
  <div class="myAddress">
    <nav-bar class="navBar">
      <template #left>
        <img src="~assets/img/address/left.svg" alt="" />
        <span @click="$router.push('/home')">返回</span>
      </template>
      <template #center>
        <span>我的地址</span>
      </template>
    </nav-bar>
    <div class="addressview-bottom" @click="addAddress">
      <i class="fa fa-plus-circle"></i>
      <span>新增收货地址</span>
    </div>
  </div>
</template>

<script>
import NavBar from "components/content/navbar/NavBar.vue";

export default {
name:'myAddress',
methods:{
  addAddress(){
    this.$router.push("/addAddress")
  }
},
components:{
  NavBar
}
}
</script>

<style scoped>
.myAddress{
  position: relative;
  height: 100%;
  background-color: #f1f1f1;
  z-index: 101;
  padding-top: 45px;
  
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
.addressview-bottom {
  position: fixed;
  height: 13.866667vw;
  bottom: 0;
  width: 100%;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 0.266667vw solid #ddd;
  color: #3190e8;
  font-size: 1rem;
}
</style>