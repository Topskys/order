<template>
  <div class="login-warp">
    <el-form ref="form" :model="form" :rules="rules" class="login-form">
      <div class="title">
        <h3>家政服务后台管理系统</h3>
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
      <el-button
        @click="login"
        type="primary"
        :loading="loading"
        style="width: 100%; margin-top: 50px"
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
        ? callback(new Error("Please enter the correct username"))
        : callback();

    const validatePassword = (rule, value, callback) =>
      value.length < 6
        ? callback(new Error("The password can not be less than 6 digits"))
        : callback();

    return {
      // 收集表单数据
      form: {
        username: "",
        password: "",
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
          this.$store
            .dispatch("user/login", this.form)
            .then((res) => {
              this.$message({
                type: res.code == 200 ? "success" : "error",
                message: res.msg,
              });
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-warp {
  width: 100vw;
  height: 100vh;
  background-color: rgb(99, 99, 116);
  //  background: no-repeat center/cover
  //    url("https://img1.baidu.com/it/u=1346652016,2731272568&fm=253&fmt=auto&app=138&f=JPEG?w=591&h=320");

  .login-form {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    max-width: 500px;
    padding: 30px 50px 50px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.8);
    .title {
      margin-bottom: 50px;
      overflow: hidden;
      h3 {
        text-align: center;
        letter-spacing: 2px;
      }
    }
    .form-item {
      margin: 20px 0;
      border-radius: 4px;
      background-color: white;
    }
  }
}
</style>



