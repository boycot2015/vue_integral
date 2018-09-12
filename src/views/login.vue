<template>
  <div class='login-container'>
    <div class="header">
      <img src="../../src/assets/logo.png" alt="" height="200">
    </div>
    <form>
      <van-cell-group v-if="!loginByPhone">
        <van-field v-model="user.account" clearable icon="question" left-icon="contact" :error="isCount" @blur="checkCount" @focus="initStatus" placeholder="请输入用户名" @click-icon="$toast('请输入账号')" />
        <van-field v-model="user.password" type="password" :error="isPwd" @blur="checkPwd" @focus="initStatus" left-icon="password-not-view" placeholder="请输入密码" />
      </van-cell-group>
      <van-cell-group v-else>
        <van-field v-model="user.phone" clearable icon="question" @blur="checkPhone" @focus="initStatus" left-icon="phone" type="number" @input="limitLen" placeholder="请输入手机号码" :error="isPhone" @click-icon="$toast('请输入11位手机号码')" />
        <van-field v-model="sms" center clearable @blur="checkCode" @focus="initStatus" label="短信验证码" :error="isCode" placeholder="请输入短信验证码">
          <van-button slot="button" size="small" type="primary">发送验证码</van-button>
        </van-field>
      </van-cell-group>
      <van-button size="large" class="submit" @click="submit($event)" type="danger">登录</van-button>
    </form>
    <p class="changeWays" @click="changeLoginWay">{{!loginByPhone?'手机号登录':'账号密码登录'}}</p>
  </div>
</template>
<style lang='scss' >
.login-container {
  background: #fff;
  height: 100%;
  img {
    transform: scale(0.5);
  }
}
form {
  .submit {
    margin-top: 20px;
    width: 90%;
    box-sizing: border-box;
  }
  .van-cell__left-icon {
    margin-right: 20px;
  }
}
.changeWays {
  margin-top: 30px;
  font-size: 14px;
}
</style>
<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      user: {},
      loginByPhone: false,
      sms: "",
      isPhone: false,
      isPwd: false,
      isCode: false,
      isCount: false
    };
  },
  created() {
    this.user = {
      phone: "",
      password: "",
      account: "",
      token: "222"
    };
    // this.$http
    //   .post("/user/login",{})
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(res => {
    //     console.log("err");
    //   });
  },
  methods: {
    changeLoginWay() {
      this.loginByPhone = !this.loginByPhone;
      this.initStatus();
    },
    submit(e) {
      e.preventDefault();
      var formData = this.user;
      this.checkPhone();
      this.checkPwd();
      this.checkCount();
      this.checkCode();
      if (!this.loginByPhone) {
        if (!formData.account) {
          this.$toast("账号不能为空");
          return;
        }
        if (!formData.password) {
          this.$toast("账号或密码错误！");
          return;
        }
        this.$toast.loading({
          duration: 0,
          message: "登录中..."
        });
        this.$store
          .dispatch("login", formData)
          .then(res => {
            console.log(res);
            if(res.code==200){
              this.$toast.loading().clear();
              this.$toast(res.message);
              this.$router.push({ path: "/" });
            }else {
              this.$toast(res.data);
            }
            // this.$toast.success("登录成功");
            // this.$router.push({ path: "/" });
          })
          .catch(err => {
            console.log(err);
            this.$toast.fail(err);
          });
      } else {
        var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!reg.test(formData.phone)) {
          this.$toast("手机号格式不正确！");
          return;
        }
        this.$toast("验证码错误！");
      }
    },
    initStatus() {
      this.isPhone = false;
      this.isPwd = false;
      this.isCode = false;
      this.isCount = false;
    },
    checkPhone() {
      var phone = this.user.phone;
      var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!reg.test(phone) && this.loginByPhone) {
        this.isPhone = true;
        return false;
      }
      return true;
    },
    limitLen() {
      var phone = this.user.phone;
      var len = phone.length;
      this.user.phone = len > 11 ? phone.slice(0, 11) : phone;
    },
    checkPwd() {
      var password = this.user.password;
      if (!password) {
        this.isPwd = true;
        return false;
      }
      return true;
    },
    checkCount() {
      var account = this.user.account;
      if (!account) {
        this.isCount = true;
        return false;
      }
      return true;
    },
    checkCode() {
      var code = this.sms;
      if (!code) {
        this.isCode = true;
        return false;
      }
      return true;
    }
  }
};
</script>