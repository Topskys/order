<!--
 * @Author: Topskys
 * @Date: 2023-02-23 18:23:32
 * @LastEditTime: 2023-02-24 23:33:46
 * @LastEditors: Topskys
 * @Description: 
-->
<template>
  <div class="sign">
    <div class="sign-box">
      <!-- sign in -->
      <div
        class="sign-in"
        v-show="tab === 1"
        :class="tab === 1 ? 'slide-left' : ''"
      >
        <h1>Sign in</h1>
        <p class="description">Welcome to Mark</p>
        <el-form
          ref="login"
          :model="login"
          :rules="rules1"
          :hide-required-asterisk="true"
          label-width="80px"
          label-position="top"
        >
          <el-form-item label="Email" prop="email">
            <el-input
              v-model="login.email"
              type="email"
              prop="email"
            ></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input
              v-model="login.password"
              type="Password"
              showPassword
            ></el-input>
          </el-form-item>
          <el-button type="primary" class="submit" @click="submit"
            >Sign in</el-button
          >
          <div class="tips">
            <span>New to Mark?</span>
            <span class="tips-a" @click="tab = 2">Create account</span>
          </div>
        </el-form>
      </div>
      <!-- sign up -->
      <div
        class="sign-up"
        v-show="tab === 2"
        :class="tab === 2 ? 'slide-left' : ''"
      >
        <h1>Create your Mark Account</h1>
        <p class="description">One account. All Mark services.</p>
        <el-form
          ref="register"
          :model="register"
          :rules="rules2"
          :hide-required-asterisk="true"
          label-width="80px"
          label-position="top"
        >
          <el-form-item label="Email" prop="email">
            <el-input v-model="register.email" type="email"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input
              v-model="register.password"
              type="Password"
              showPassword
            ></el-input>
          </el-form-item>
          <el-form-item label="Repeat password" prop="rePassword">
            <el-input
              v-model="register.rePassword"
              type="Password"
              showPassword
            ></el-input>
          </el-form-item>
          <el-button type="primary" class="submit" @click="create"
            >Create account</el-button
          >
          <div class="tips">
            <span>Already have an account?</span>
            <span class="tips-a" @click="tab = 1">Sign in</span>
          </div>
        </el-form>
        <div class="condition">
          <p>By creating a Mark account, you agree to our</p>
          <a href="https://github.com/Topskys" target="_blank"
            >terms and conditions</a
          >
        </div>
      </div>
      <!-- verify email -->
      <div
        class="verify"
        v-show="tab === 3"
        :class="tab === 3 ? 'slide-left' : ''"
      >
        <h1>Verify your email</h1>
        <p class="description">
          Please enter the verification code, which has been sent to your email.
        </p>
        <el-form
          ref="verification"
          :model="verification"
          :rules="rules3"
          :hide-required-asterisk="true"
          label-width="80px"
          label-position="top"
        >
          <el-form-item label="Verification Code" prop="code">
            <el-input
              v-model="verification.code"
              placeholder="enter the code"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="width: 100%" @click="getCode"
              >Repeat Request Code</el-button
            >
          </el-form-item>
          <el-button type="primary" class="submit" @click="verify"
            >Send Code</el-button
          >
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
const { ipcRenderer } = window.require("electron");

export default {
  name: "Sign",
  data() {
    const validatePassword = (rule, value, callback) =>
      value.length < 8
        ? callback(new Error("Password must contain at least 8 characters"))
        : callback();

    return {
      login: {
        email: "",
        password: "",
      },
      register: {
        email: "",
        password: "",
        rePassword: "",
      },
      verification: {
        code: "",
      },
      tab: 1, // 控制登录、注册、验证的显隐
      redirect: undefined, // 路由重定向
      // 表单验证
      rules1: {
        email: [{ required: true, trigger: "blur" }],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      rules2: {
        email: [{ required: true, trigger: "blur" }],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
        rePassword: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      rules3: {
        code: [{ required: true, trigger: "blur" }],
      },
    };
  },
  methods: {
    // 登录
    submit() {
      this.$refs.login.validate((valid) => {
        if (valid) {
          this.$store
            .dispatch("user/login", this.login)
            .then(() => {
              this.$router.push({ path: this.redirect || "/home" });
            })
            .catch((err) => {
              console.error(err);
              this.$notice({
                title: "Error",
                body: "登录时出现异常",
              });
            });
        } else {
          return false;
        }
      });
    },
    // 注册
    create() {
      this.$notice({
        body: "Hello World",
      });
    },
    // 验证
    verify() {
      this.$http({
        method: "post",
        data: {
          ...this.register,
          ...this.verification,
        },
      })
        .then(({ code, msg }) => {
          ipcRenderer.send("notice", {
            title: code === 200 ? "Success" : "Error",
            body: msg,
          });
        })
        .catch((err) => {
          ipcRenderer.send("notice", {
            title: "Exception",
            body: "获取验证号码异常",
          });
        });
    },
    // 获取验证码
    getCode() {
      this.$http({
        method: "post",
        data: {
          ...this.register,
        },
      })
        .then(({ code, msg }) => {
          ipcRenderer.send("notice", {
            title: code === 200 ? undefined : "Error",
            body: msg,
          });
        })
        .catch((err) => {
          ipcRenderer.send("notice", {
            title: "Exception",
            body: "获取验证码异常",
          });
        });
    },

    // 控制盒子切换与隐藏
    // changeHandler(ele) {
    //   let doms = ["sign-up", "sign-in", "verify"];
    //   doms.forEach((o) => {
    //     let dom = document.querySelector(`.${ele}`);
    //     dom.style.block = "none";
    //     dom.classList.remove("slide-left");
    //     if (ele === o) {
    //       dom.style.display = "block";
    //       dom.classList.add("slide-left");
    //     }
    //   });
    // },
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
};
</script>

<style lang='scss' scoped>
.sign {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .sign-box {
    width: 400px;
    margin: 0 auto;
    // position: relative;
    .sign-in,
    .sign-up,
    .verify {
      padding: 30px 40px;
      border-radius: 10px;
      border: 1px solid #f5f5f5;
      // width: calc(100% - 80px);
      // height: 400px;
      // display: none;
      // position: absolute;
      // top: 50%;
      // left: 50%;
      // transform: translate(-50%, -50%);
    }
    .tips {
      color: #606266;
      font-size: 14px;
      padding: 10px 0;
      text-align: center;
      .tips-a {
        color: #335eea;
        padding-left: 8px;
        text-decoration: underline;
        &:hover {
          text-decoration: none;
          cursor: pointer;
        }
      }
    }

    .condition {
      font-size: 12px;
      color: #706d6b;
      text-align: center;
      p {
        margin: 2px 0;
      }
      a:hover {
        text-decoration: none;
      }
    }
  }
  h1 {
    font-size: 20px;
    font-weight: 700;
  }
  .description {
    color: #706d6b;
    font-size: 14px;
  }
  .submit {
    width: 100%;
    background-color: #335eea;
    color: white;
    font-size: 16px;
    margin-top: 20px;
  }
}

::v-deep .el-input__inner:focus {
  border-color: #335eea;
}

// 样式方式隐藏必填小星星
// ::v-deep
//   .el-form-item.is-required:not(.is-no-asterisk)
//   > .el-form-item__label:before {
//   content: " ";
//   width: 0px;
//   margin-right: 0px;
// }


</style>