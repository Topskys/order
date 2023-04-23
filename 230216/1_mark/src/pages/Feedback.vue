<template>
  <div class="feedback">
    <div class="container slide-left">
      <h1>Feedback</h1>
      <el-form
        ref="form"
        :model="feedback"
        :rules="rules"
        :hide-required-asterisk="true"
        label-width="80px"
        class="form"
      >
        <el-form-item label="Contact：" prop="contact" class="form-item">
          <el-input
            v-model="feedback.contact"
            size="small"
            placeholder="How to contact you"
          ></el-input>
        </el-form-item>
        <el-form-item label="Subject：" prop="subject" class="form-item">
          <el-input
            v-model="feedback.subject"
            size="small"
            placeholder="General Question"
          ></el-input>
        </el-form-item>
        <el-form-item label="Message：" prop="message" class="form-item">
          <el-input
            v-model="feedback.message"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 6 }"
            placeholder="Your can tell us"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <button @click="submit">Send</button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      feedback: {
        contact: "",
        subject: "",
        message: "",
      },
      rules: {},
    };
  },
  mounted() {
    this.rules = { ...this.createRules(this.feedback) };
  },
  methods: {
    // 生成表单统一规则
    createRules(obj) {
      let rules = new Object();
      for (const key in obj) {
        Object.hasOwnProperty.call(obj, key) &&
          (rules[key] = [{ required: true, trigger: "blur" }]);
      }
      return rules;
    },
    // 提交表单
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$http({
            url: "/feedback",
            methods: "post",
            data: this.feedback,
          }).then(({ code, msg }) => {
            this.$message({
              type: code === 200 ? "success" : "error",
              message: msg,
            });
          });
        }
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.feedback {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    width: 50%;
    border: 1px solid #eee;
    border-radius: 4px;
    h1 {
      padding: 30px 50px;
      border-bottom: 1px solid #eee;
    }
    .form {
      padding: 30px 50px;
      .form-item {
        margin-bottom: 20px;
      }
      button {
        padding: 6px 30px;
        border: 1px solid #ccc;
        border-radius: 2px;
        background: white;
        transition: all 0.3s;
        &:hover,
        &:focus {
          background: #f5f5f7;
        }
      }
    }
  }
}
</style>