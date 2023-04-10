<!--
 * @Author: Topskys
 * @Date: 2023-02-23 18:23:32
 * @LastEditTime: 2023-04-07 19:38:41
-->
<template>
  <div class="sign">
    <el-dialog
      :visible.sync="dialogVisible"
      append-to-body
      :close-on-click-modal="false"
      width="360px"
      :before-close="beforeClose"
    >
      <div class="login-wrap">
        <div class="login-head">
          <h1>Sign In</h1>
          <p class="welcome">Welcome to Mark</p>
        </div>
        <el-form
          ref="login"
          :model="login"
          :rules="rules"
          :hide-required-asterisk="true"
          label-width="80px"
          label-position="top"
          class="login-body"
        >
          <el-form-item label="Username" prop="username">
            <el-input
              v-model="login.username"
              type="username"
              prop="username"
            ></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input
              v-model="login.password"
              type="Password"
              showPassword
            ></el-input>
          </el-form-item>
          <el-button
            type="primary"
            class="submit"
            @click="submit"
            :class="{ shake: shake }"
            >Sign in</el-button
          >
        </el-form>
        <footer>
          <span>New to Mark?&nbsp;</span
          ><span @click="create">Create account</span>
        </footer>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const { ipcRenderer } = window.require("electron");

export default {
  name: "Sign",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const validatePassword = (rule, value, callback) =>
      value.length < 8
        ? callback(new Error("Password must contain at least 8 characters"))
        : callback();
    return {
      login: {
        username: "3122562904@qq.com",
        password: "12345678",
      },
      redirect: "", // 路由重定向
      shake: false,
      // 表单验证
      rules: {
        username: [{ required: true, trigger: "blur" }],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
    };
  },
  methods: {
    // 登录
    submit() {
      const shake = () => {
        this.shake = true;
        setTimeout(() => {
          this.shake = false;
        }, 800);
      };
      this.$refs.login.validate(async (valid) => {
        if (valid) {
          try {
            await this.$store.dispatch("user/login", this.login);
            await this.$store.dispatch("user/getInfo");
            const currRoute = this.$route.fullPath;
            if (!currRoute.indexOf("/home") != -1 && this.redirect != "/home") {
              this.redirect && this.$router.push({ path: this.redirect });
            }
            this.$emit("update:dialogVisible", false);
          } catch (e) {
            this.$message({
              type: "info",
              message: "登录时出现异常",
            });
            shake();
          }
        } else {
          shake();
        }
      });
    },
    // 使用浏览器打开网站注册账号
    create() {
      ipcRenderer.send("register", "http://localhost:5173/#/login?tab=2");
    },
    beforeClose() {
      // this.dialogVisible=false
      this.$emit("update:dialogVisible", false);
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
.login-wrap {
  min-width: 260px;
  max-width: 360px;
  margin: 0 auto;
  padding: 0 10px;
  overflow: hidden;
  border-radius: 10px;
  // border: 1px solid #f5f5f5;
  /* class="slide-left" */
  .login-head {
    h1 {
      color: $title;
      font-size: 20px;
      font-weight: 700;
    }

    .welcome {
      display: block;
      color: $text-clr-6;
      font-size: 14px;
      padding: 8px 0 15px 0;
    }
  }
  .login-body {
    margin: 10px 0;
    overflow: hidden;
    .submit {
      width: 100%;
      background-color: $bg-button;
      font-size: 1rem;
      padding: 12px 20px;
      margin-top: 50px;
      overflow: hidden;
      &:hover,
      &:focus {
        background-color: $bg-button-hover;
      }
    }
  }
  footer {
    color: $text-clr-6;
    font-size: 14px;
    padding-top: 10px;
    text-align: center;
    span:last-child {
      color: $link;
      text-decoration: underline;
      transition: hover 0.3s;
      &:hover {
        text-decoration: none;
        cursor: pointer;
      }
    }
  }
}

::v-deep .el-input__inner:focus {
  border-color: $border-input;
}

::v-deep .el-button {
  span {
    color: white !important;
  }
}

::v-deep .el-form--label-top .el-form-item__label {
  padding: 0;
}

::v-deep .el-dialog__headerbtn:focus .el-dialog__close,
::v-deep .el-dialog__headerbtn:hover .el-dialog__close {
  color: red !important;
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