<template>
  <div class="login-container">
    <div class="login-wrapper">
      <div class="wrapper-left">
        <a href="#">
          <img :src="logo" alt="logo" v-if="logo" />
          <span>{{ logoText }}</span>
        </a>
      </div>
      <div class="wrapper-right">
        <el-form ref="form" :model="form" :rules="rules" class="login-form">
          <div class="title">
            <h3>欢迎登录</h3>
            <span class="title-en">welcome to login</span>
          </div>
          <el-form-item prop="username">
            <el-input
              placeholder="请输入用户名"
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
          <div class="tips">
            <span
              >忘记密码？<a
                href="javascript:void(0);"
                :title="!contact || `请联系:${contact}`"
                >联系</a
              ></span
            >
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CryptoJS from "crypto-js";
export default {
  name: "login",
  data() {
    // 验证规则函数
    const validPassword = (rule, value, callback) =>
      value.length < 6
        ? callback(new Error("The password can not be less than 6 digits"))
        : callback();
    return {
      form: {
        username: "admin",
        password: "123456",
      },
      rules: {
        username: [
          {
            required: true,
            trigger: "blur",
            message: "Please enter the correct username",
          },
        ],
        password: [
          { required: true, trigger: "blur", validator: validPassword },
        ],
      },
      redirect: undefined,
      loading: false, // 登录按钮加载效果
    };
  },
  computed: {
    ...mapState("settings", ["logo", "logoText", "contact"]),
  },
  methods: {
    // 登录
    login() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          try {
            const data = {
              username: this.form.username,
              password: CryptoJS.MD5(this.form.password).toString(),
            };
            const res = await this.$store.dispatch("user/login", data);
            if(res.token){
              this.$message({
                type:res.code===200?'success':'error',
                message:res.msg
              })
this.$router.push({
  path: this.redirect || "/"
});
            }
            this.loading = false;
          } catch (err) {
            this.loading = false;
          }
        } else {
          this.loading = false;
          return false;
        }
      });
    },
  },
};
</script>

<style lang='scss' scoped>
/* https://demo.mineadmin.com/assets/login_picture-10605a3f.svg */
@import "~@/styles/colors.scss";
.login-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  user-select: none;

  background: center center/ cover no-repeat url("~@/assets/bg_login.jpg");
  // background: center center/ cover no-repeat url("~@/assets/BingWallpaper.jpg");
  // background-color: rgb(99, 99, 116);
  position: relative;
  .login-wrapper {
    min-width: 850px;
    max-width: 950px;
    height: 490px;
    overflow: hidden;
    background-color: $bg-login-left;
    border: 1px solid #eee;
    border-radius: 0.3125rem;
    box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.2);
    display: flex;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .wrapper-left {
      flex: 1;
      padding: 1.25rem;
      background: center 60px / contain no-repeat
        url("~@/assets/login_picture.svg");
      a {
        display: flex;
        align-items: center;
        img {
          width: 36px;
          height: 36px;
        }
        span {
          font-size: 18px;
          padding: 10px;
          // -webkit-box-reflect: below -0.7em -webkit-linear-gradient(
          //     top,
          //     transparent,
          //     transparent 50%,
          //     rgba(0, 0, 0, 0.2)
          //   );
        }
      }
    }
    .wrapper-right {
      flex: 1;
      padding: 1.25rem;
      background-color: white;
      border-top-right-radius: 0.625rem;
      border-bottom-right-radius: 0.625rem;
      .login-form {
        padding: 30px;
        .title {
          margin-bottom: 50px;
          overflow: hidden;
          h3 {
            text-align: center;
            letter-spacing: 2px;
            font-size: 18.72px;
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
        .tips {
          color: #606266;
          font-size: 13px;
          text-align: center;
          padding: 10px 0;
          a {
            color: #0066cc;
            transition: textDecoration 0.3s;
            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
}
::v-deep el-input.is-active .el-input__inner,
::v-deep .el-input__inner:focus {
  border-color: $theme;
}
::v-deep .el-button {
  background-color: $theme;
  outline: none;
}
::v-deep .el-button:hover,
::v-deep .el-button:focus {
  border-color: $border-btn-clr-hover;
  background-color: $bg-button-hover;
  outline: none;
}
/* 水平抖动 */
.shake {
  animation: shake 800ms ease-in-out;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(+2px, 0, 0);
  }

  30%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(+4px, 0, 0);
  }

  50% {
    transform: translate3d(-4px, 0, 0);
  }
}
</style>