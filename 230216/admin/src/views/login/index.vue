<template>
  <div class="login-container">
    <el-form
      v-if="tab == 1"
      ref="login"
      :model="login"
      class="form-warp slide-left"
      size="large"
      label-width="120px"
      label-position="top"
      hide-required-asterisk
    >
      <div class="welcome">
        <div class="title">Sign in</div>
        <p class="description">Welcome Back</p>
      </div>
      <el-form-item
        label="Username"
        prop="username"
        required
        :rules="[{ require: true, trigger: 'blur', validator: validUsername }]"
      >
        <el-input
          v-model="login.username"
          placeholder="Please enter your username"
        />
      </el-form-item>
      <el-form-item
        label="Password"
        prop="password"
        required
        :rules="[
          {
            require: true,
            min: 6,
            message: 'Password must contain at least 6 characters',
            trigger: 'blur',
          },
        ]"
      >
        <el-input
          v-model="login.password"
          placeholder="Please enter your password"
          show-password
        />
      </el-form-item>
      <el-form-item>
        <el-button
          ref="btn"
          type="primary"
          @click="onSubmit"
          class="form-btn"
          :class="{ shake }"
          :loading="loading"
        >Sign in
        </el-button>
      </el-form-item>
      <footer>
        <span> New to Mark?&nbsp;</span>
        <a href="javascript:void(0)" @click.prevent="tab = 2">Create account</a>
      </footer>
    </el-form>
    <el-form
      v-else="tab == 2"
      ref="register"
      :model="register"
      class="form-warp slide-left"
      size="large"
      label-width="120px"
      label-position="top"
      hide-required-asterisk
    >
      <div class="welcome">
        <div class="title">Sign up</div>
        <p class="description">One account all servers</p>
      </div>
      <el-form-item
        label="Username"
        prop="username"
        required
        :rules="[
          {
            require: true,
            trigger: 'blur',
            validator: validUsername,
          },
        ]"
      >
        <el-input
          v-model="register.username"
          placeholder="Please enter your username"
        />
      </el-form-item>
      <el-form-item
        label="Password"
        prop="password"
        required
        :rules="[
          {
            require: true,
            min: 6,
            message: 'Password must contain at least 6 characters',
            trigger: 'blur',
          },
        ]"
      >
        <el-input
          v-model="register.password"
          placeholder="Please enter your password"
          show-password
        />
      </el-form-item>
      <el-form-item
        label="Verify"
        prop="code"
        required
        :rules="[
          {
            require: true,
            min: 4,
            max: 4,
            message: 'Password must contain at 4 characters',
            trigger: 'blur',
          },
        ]"
      >
        <div style="display: flex; align-items: center">
          <el-input
            v-model="register.code"
            placeholder="Please enter your code"
            style="width: 255.87px"
          />
          <el-button type="primary" style="margin-left: 20px" @click="onCode"
          >Code
          </el-button
          >
        </div>
      </el-form-item>
      <el-form-item>
        <el-button
          ref="btn"
          type="primary"
          @click="onCreate"
          class="form-btn"
          :class="{ shake }"
        >Sign up
        </el-button>
      </el-form-item>
      <footer>
        <span>Already have an account?&nbsp;</span>
        <a href="javascript:void(0)" @click.prevent="tab = 1">Sign in</a>
      </footer>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      tab: 1,
      shake: false,
      login: {
        username: 'mr.llb@proton.me',
        password: '123456'
      },
      register: {
        username: 'mr.llb@proton.me',
        password: '123456',
        code: ''
      },
      loading: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect || ''
        this.tab = route.query.tab || 1
      },
      immediate: true
    }
  },
  methods: {
    validUsername: (rule, value, callback) => {
      const reg =
        /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
      callback(
        !reg.test(value)
          ? new Error('Please enter the correct Username')
          : undefined
      )
    },
    onSubmit() {
      this.$refs.login.validate(async(valid) => {
        if (valid) {
          this.loading = true
          try {
            const { code, msg } = await this.$store.dispatch('user/login', this.login)
            this.$router.push({ path: this.redirect || '/dashboard' })
            this.loading = false
            this.$message({
              type: code == 200 ? 'success' : 'error',
              message: msg
            })
          } catch (error) {
            this.loading = false
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    onCode() {
      const username = this.register.username.trim()
      if (username) {
        this.$user.getCode({ username }).then(({ code, msg }) => {
          this.$message({
            type: code == 200 ? 'success' : 'error',
            message: msg
          })
        })
      } else {
        this.$message({
          type: 'warning',
          message: 请填写邮箱账号
        })
      }
    },
    onCreate() {
      this.$refs.register.validate((valid) => {
        if (valid) {
          this.$user.register(this.register).then(({ code, msg }) => {
            this.tab = 1
            this.$message({
              type: code == 200 ? 'success' : 'error',
              message: msg
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/var.scss";

.login-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: $bg-1;

  .form-warp {
    width: 430px;
    padding: 40px;
    border-radius: 1em;
    border: 1px solid $border-clr-2;
    background: rgba(255, 255, 255, 0.7);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);

    .welcome {
      margin-bottom: 30px;

      .title {
        color: #000;
        font-size: 1.875rem;
        font-weight: 600;
        letter-spacing: 1px;
      }

      .description {
        color: $grey;
        font-size: $fs14;
      }
    }

    .form-btn {
      width: 100%;
      margin-top: 30px;
      letter-spacing: 1px;
      background-color: $bg-4;
      transition: 0.3s;

      &:hover,
      &:focus {
        background-color: $bg-button-hover;
        transform: scale(0.98);
      }
    }

    footer {
      text-align: center;

      span {
        color: $grey;
        font-size: $fs13;
      }

      a {
        color: $a-color;
        font-size: $fs13;
        text-decoration: underline;
        transition: text-decoration 0.2s ease-in-out;

        &:hover {
          text-decoration: none;
        }
      }
    }
  }
}

::v-deep .el-form-item {
  margin-bottom: 12px;
}

::v-deep .el-input__inner:focus {
  border-color: #335eea !important;
}

::v-deep .el-form--label-top .el-form-item__label {
  padding-bottom: 0;
}
</style>

