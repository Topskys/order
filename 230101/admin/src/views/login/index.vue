<template>
  <!-- <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>

      <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: any</span>
      </div>

    </el-form>
  </div> -->
  <div class="login-container">
    <h1 class="logo">XXX大酒店</h1>
    <el-form ref="form" :model="form" :rules="rules" class="login-form">
      <div class="title">
        <h3>欢迎登录</h3>
        <span class="title-en">welcome to login</span>
      </div>
      <el-form-item prop="username">
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-user"
          v-model="form.username"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          placeholder="请输入内容"
          prefix-icon="el-icon-lock"
          show-password
          v-model="form.password"
        >
        </el-input>
      </el-form-item>
      <div class="form-check">
        <el-checkbox v-model="checked">记住密码</el-checkbox>
        <el-tooltip effect="dark" content="请咨询 86599697" placement="bottom">
          <span>忘记密码</span>
        </el-tooltip>
      </div>
      <el-button @click="login" type="primary" :loading="loading" style="width: 100%; margin-top: 50px"
        >登 录</el-button
      >
    </el-form>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";

export default {
  name: "Login",
  data() {
    // 验证规则函数
    const validateUsername = (rule, value, callback) =>
      !validUsername(value)
        ? callback(new Error("Please enter the correct user name"))
        : callback();

    const validatePassword = (rule, value, callback) =>
      value.length < 6
        ? callback(new Error("The password can not be less than 6 digits"))
        : callback();

    return {
      // 收集表单数据
      form: {
        username: "admin",
        password: "123456",
      },
      // 记住密码
      checked: false,
      // 登录按钮加载效果
      loading: false,
      // 表单验证
      rules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      // 路由重定向
      redirect: undefined,
    };
  },
  watch: {
    // 监听路由重定向
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    // 登录
    login() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store.dispatch("user/login", this.form).then(() => {
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
            }).catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 记住密码
    remember(){}
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  width: 100vw;
  height: 100vh;
  // background-color: rgb(99, 99, 116);
  background: no-repeat center/cover
    url("https://img1.baidu.com/it/u=1346652016,2731272568&fm=253&fmt=auto&app=138&f=JPEG?w=591&h=320");

  .logo {
    position: fixed;
    top: 10px;
    left: 50px;
    color: white;
    letter-spacing: 5px;
  }

  .login-form {
    position: fixed;
    top: 50%;
    right: 10%;
    transform: translate(10%, -50%);
    width: 350px;
    max-width: 500px;
    // height: 500px;
    padding: 30px;
    border: 1px solid #ccc;
    border-radius: 10px;
    // backdrop-filter: blur(5px);
    background-color: rgba(255, 255, 255, 0.8);
    .title {
      margin-bottom: 50px;
      overflow: hidden;
      h3 {
        text-align: center;
        letter-spacing: 2px;
      }
      .title-en {
        display: flex;
        justify-content: center;
        align-items: center;
        // opacity: .5;
        color: rgb(117, 116, 116);
      }
      .title-en::before {
        content: "";
        width: 15px;
        height: 1px;
        background-color: rgb(117, 116, 116);
        margin-right: 8px;
      }
      .title-en::after {
        content: "";
        width: 15px;
        height: 1px;
        background-color: rgb(117, 116, 116);
        margin-left: 8px;
      }
    }
    .form-item {
      margin: 20px 0;
      border-radius: 4px;
      background-color: white;
    }
    .form-check {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #606266;
      font-size: 14px;
    }
  }
}
</style>



