<template>
  <div class="addAddress">
    <nav-bar class="navBar">
      <template #left>
        <img src="~assets/img/address/left.svg" alt="" />
        <span @click="$router.push('/home')">返回</span>
      </template>
      <template #center>
        <span>添加地址</span>
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
        ></form-block>
        <form-block label="电话" placeholder="手机号码"></form-block>
        <form-block
          label="地址"
          placeholder="小区/写字楼/学校"
          icon="angle-right"
        ></form-block>
        <form-block
          label="门牌号"
          placeholder="详细地址"
          icon="edit"
          textarea="textarea"
        ></form-block>
        <div class="formblock">
          <div class="label-wrap">标签</div>
          <tab-tag
            :tags="tags"
            :selectTag="addressInfo.tag"
            @checkTag="checkTag"
          ></tab-tag>
        </div>
      </div>
    </div>
    <!-- 搜索地址 -->
    <address-search :showSearch="showSearch"></address-search>
  </div>
</template>

<script>
import NavBar from "components/content/navbar/NavBar.vue";
import FormBlock from "components/common/Orders/formBlock.vue";
import tabTag from "components/common/Orders/tabTag.vue";
import addressSearch from "components/common/Orders/addressSearch.vue"

export default {
  name: "addAddress",
  data() {
    return {
      tags: ["家", "学校", "公司"],
      sexs: ["先生", "女士"],
      addressInfo: {
        tag: "",
        sex: "",
      },
      showSearch:true
    };
  },
  methods: {
    checkTag(item) {
      this.addressInfo.tag = item;
    },
    checkSex(item) {
      this.addressInfo.sex = item;
    },
  },
  components: {
    NavBar,
    FormBlock,
    tabTag,
    addressSearch
  },
};
</script>

<style scoped>
.addAddress {
  position: relative;
  height: 100%;
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
</style>