<template>
  <div class="addAddress">
    <nav-bar class="navBar">
      <template #left>
        <img src="~assets/img/address/left.svg" alt="" />
        <span @click="$router.push('/me')">返回</span>
      </template>
      <template #center>
        <span>{{ title }}</span>
      </template>
    </nav-bar>
    <div class="viewbody">
      <div class="content">
        <form-block
          label="联系人"
          placeholder="姓名"
          :tags="sexs"
          @checkSex="checkSex"
          :sex="addressInfo.sex"
          v-model="addressInfo.name"
        ></form-block>
        <form-block
          label="电话"
          placeholder="手机号码"
          v-model="addressInfo.phone"
        ></form-block>
        <form-block
          label="地址"
          placeholder="小区/写字楼/学校"
          icon="angle-right"
          @click="showSearch = true"
          v-model="addressInfo.address"
        ></form-block>
        <form-block
          label="门牌号"
          placeholder="详细地址"
          icon="edit"
          textarea="textarea"
          v-model="addressInfo.bottom"
        ></form-block>
        <div class="formblock">
          <div class="label-wrap">标签</div>
          <tab-tag
            :tags="tags"
            :selectTag="addressInfo.tag"
            :borderNoshow="true"
            @checkTag="checkTag"
          ></tab-tag>
        </div>
      </div>
      <!-- 确定按钮 -->
      <div class="form-button-wrap">
        <div class="form-button" @click="handleSave">确定</div>
      </div>
    </div>
    <!-- 搜索地址 -->
    <address-search
      @close="showSearch = false"
      :showSearch="showSearch"
      :addressInfo="addressInfo"
    ></address-search>
  </div>
</template>

<script>
import NavBar from "components/content/navbar/NavBar.vue";
import FormBlock from "components/common/Orders/formBlock.vue";
import tabTag from "components/common/Orders/tabTag.vue";
import addressSearch from "components/common/Orders/addressSearch.vue";

import { Toast } from "mint-ui";

export default {
  name: "addAddress",
  data() {
    return {
      title: "",
      tags: ["家", "学校", "公司"],
      sexs: ["先生", "女士"],
      addressInfo: {},
      showSearch: false,
    };
  },
  methods: {
    checkTag(item) {
      this.addressInfo.tag = item;
    },
    checkSex(item) {
      this.addressInfo.sex = item;
    },
    handleSave() {
      if (!this.addressInfo.name) {
        this.showMassege("请输入联系人");
        return;
      }

      if (!this.addressInfo.phone) {
        this.showMassege("请输入手机号码");
        return;
      }

      if (!this.addressInfo.bottom) {
        this.showMassege("请输入详细地址");
        return;
      }
      // 存储数据
      if (this.title == "添加地址") {
        this.addAddress();
      } else {
        this.editAddress();
      }
    },
    showMassege(msg) {
      Toast({
        message: msg,
        position: "bottom",
        duration: 2000,
      });
    },
    addAddress() {
      const userId = localStorage.getItem("ele_login");
      this.$axios
        .post(`/api/user/add_address/${userId}`, this.addressInfo)
        .then((res) => {
          if(!this.$store.getters.userInfo){
            this.$store.dispatch('setUserInfo', this.addressInfo);
          }
          this.$router.push('myAddress')
        });
    },
    editAddress() {
      const userId = localStorage.getItem("ele_login");
      const itemId = this.addressInfo._id;
      this.$axios
        .post(`/api/user/edit_address/${userId}/${itemId}`, this.addressInfo)
        .then((res) => {
          this.$router.push("/myAddress")
        });
    },
  },
  components: {
    NavBar,
    FormBlock,
    tabTag,
    addressSearch,
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.addressInfo = to.params.addressInfo;
      vm.title = to.params.title;
    });
  },
};
</script>

<style scoped>
.addAddress {
  position: relative;
  height: 100vh;
  background-color: #f1f1f1;
  z-index: 101;
  padding-top: 44px;
  box-sizing: border-box;
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
.viewbody {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  background-color: #f5f5f5;
}
.content {
  padding-left: 4vw;
  background: #fff;
  font-size: 0.94rem;
}

.formblock {
  background-color: #fff;
  border-bottom: 1px solid #eee;
  display: flex;
}
.formblock .label-wrap {
  flex-basis: 17.333333vw;
  padding: 3.733333vw 0;
  line-height: 4.8vw;
  color: #333;
  font-weight: 700;
}
/* 确定按钮 */
.form-button-wrap {
  padding: 5.333333vw 4vw;
  display: flex;
}
.form-button-wrap .form-button {
  background: #00d762;
  text-align: center;
  border-radius: 0.533333vw;
  flex: 1;
  font-size: 1.1rem;
  line-height: 5.066667vw;
  color: #fff;
  padding: 3.333333vw 0;
  border: none;
  font-weight: 500;
}
</style>