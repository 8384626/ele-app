<template>
  <div class="login">
    <div class="logo">
      <img src="../assets/img/login/logo.jpg" alt="" />
    </div>
    <input-group
      type="number"
      v-model="phone"
      placeholder="手机号"
      :btnTitle="btnTitle"
      :disabled="disabled"
      :error="errors.phone"
      @btnClick="getVerifyCode"
    ></input-group>
    <!-- 验证码 -->
    <input-group
      type="number"
      v-model="verifyCode"
      placeholder="请输入验证码"
      :error="errors.code"
    ></input-group>
    <div class="login_des">
      <p>
        新用户登录即自动同意 ，表示已同意
        <span> 《用户服务协议》 </span>
      </p>
    </div>
    <!-- 登录按钮 -->
    <div class="login_btn">
      <button :disabled="isClick" @click="handlelogin">登录</button>
    </div>
  </div>
</template>

<script>
import inputGroup from "../components/common/inputGroup.vue";

export default {
  name: "login",
  data() {
    return {
      phone: "",
      verifyCode: "",
      errors: {},
      btnTitle: "获取验证码",
      disabled: false,
    };
  },
  computed: {
    isClick() {
      if (!this.phone || !this.verifyCode) return true;
      return false;
    },
  },
  methods: {
    getVerifyCode() {
      if (this.validatePhone()) {
        // 发送网络请求
        this.validateBtn();
        this.$axios.post('/api/posts/sms_send',{
          phone: this.phone
        }).then(res =>{
          console.log(res);
        })
        // const data ={
        //   receive:this.phone,
        //   templateId:"M09DD535F4"
        // }
        // fetch("http://smssend.shumaidata.com/sms/send",{
        //   method:'POST',
        //   headers:{
        //     "Content-type": "application/json",
        //     Authorization:"APPCODE 63da09d147e348899492a0fb696f8654"
        //   },
        //   body:JSON.stringify(data)
        // })
      }
    },
    validateBtn() {
      let time = 60;
      let timer = setInterval(() => {
        if (time === 0) {
          clearInterval(timer);
          this.btnTitle = "获取验证码";
          this.disabled = false;
        } else {
          this.btnTitle = time + "秒后重试";
          this.disabled = true;
          time -= 1;
        }
      }, 1000);
    },
    validatePhone() {
      const phoneReg = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|17[0-9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
      // 验证手机号码
      if (!this.phone) {
        this.errors = {
          phone: "手机号不能为空",
        };
        console.log(this.phone);

        return false;
      } else if (!phoneReg.test(this.phone)) {
        this.errors = {
          phone: "请填写正确的手机号",
        };
      } else {
        this.errors = {};
        return true;
      }
    },
    handlelogin() {
      // 取消错误提醒
      this.errors = {};
      // 发送请求
      this.$axios
        .post("/api/posts/sms_back", {
          phone: this.phone,
          code: this.verifyCode,
        })
        .then((res) => {
          console.log(res);
          // 检验成功 设置登录状态
          localStorage.setItem("ele_login", res.data.user._id);
          this.$router.push("/");
        })
        .catch((err) => {
          this.errors = {
            code: err.response.data.msg,
          };
        });
    },
  },
  components: {
    inputGroup,
  },
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  background: #fff;
}

.logo {
  text-align: center;
}
.logo img {
  width: 150px;
}
.text_group,
.login_des,
.login_btn {
  margin-top: 20px;
}
.login_des {
  color: #aaa;
  line-height: 22px;
}
.login_des span {
  color: #4d90fe;
}
.login_btn button {
  width: 100%;
  height: 40px;
  background-color: #48ca38;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  border: none;
  outline: none;
}
.login_btn button[disabled] {
  background-color: #8bda81;
}
</style>