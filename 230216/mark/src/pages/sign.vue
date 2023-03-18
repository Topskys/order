<!--
 * @Author: Topskys
 * @Date: 2023-02-23 18:23:32
 * @LastEditTime: 2023-03-13 14:17:08
 * @LastEditors: Please set LastEditors
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
          <el-form-item label="Verification" prop="code">
            <div class="form-code">
              <el-input v-model="register.code"></el-input>
              <el-button type="primary" class="verify-btn" @click="getCode"
                >Code</el-button
              >
            </div>
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
    </div>
  </div>
</template>

<script>
const { ipcRenderer } = window.require("electron");
import { debounce } from "../utils";

export default {
  name: "Sign",
  data() {
    const validatePassword = (rule, value, callback) =>
      value.length < 8
        ? callback(new Error("Password must contain at least 8 characters"))
        : callback();

    return {
      login: {
        email: "3122562904@qq.com",
        password: "12345678",
      },
      register: {
        email: "3122562904@qq.com",
        password: "12345678",
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
      this.$refs.register.validate((v) => {
        if (v) {
          this.$http({
            url: "/users/register",
            method: "post",
            data: {
              ...this.register,
            },
          })
            .then(({ code, msg }) => {
              this.$message({
                type: code === 200 ? "success" : "error",
                message: msg,
              });
            })
            .catch((err) => {
              this.$message({
                type: code === 200 ? "success" : "error",
                message: err || "注册时出现异常",
              });
            });
        }
      });
    },
    // 获取验证码
    getCode() {
      this.$http({
        url: "/users/code",
        method: "post",
        data: {
          email: this.register.email,
        },
      }).then(({ code, msg }) => {
        this.$message({
          type: code === 200 ? "success" : "error",
          message: msg,
        });
      });
    },
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

    .sign-up {
      .form-code {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .verify-btn {
          padding: 12px 20px;
          height: 100%;
          margin-left: 20px;
          background: $bg-3;
        }
      }
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
    padding: 10px 0;
  }
  .submit {
    width: 100%;
    background-color: #335eea;
    font-size: 1rem;
    padding: 12px 20px;
    margin-top: 50px;
    overflow: hidden;
  }
}

::v-deep .el-input__inner:focus {
  border-color: #335eea;
}

::v-deep .el-button {
  span {
    color: white !important;
  }
}

::v-deep .el-form--label-top .el-form-item__label {
  padding: 0;
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