<template>
  <div class="send-warp">
    <el-card shadow="never" style="width: 60%; padding: 15px 20px">
      <h1 style="margin: 0 0 80px 50px">Mark 用户反馈</h1>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="120px"
        style="width: 100%"
        :hide-required-asterisk="true"
      >
        <el-form-item label="反馈类型：" prop="subject" required>
          <el-radio-group v-model="form.subject">
            <el-radio label="界面视觉" value="界面视觉"></el-radio>
            <el-radio label="功能" value="功能"></el-radio>
            <el-radio label="出错" value="出错"></el-radio>
            <el-radio label="其它" value="其它"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="联系方式：" prop="contact" required>
          <el-input v-model="form.contact" placeholder="请输入联系方式" />
        </el-form-item>
        <el-form-item label="反馈内容：" prop="content" required>
          <el-input
            type="textarea"
            v-model="form.content"
            :rows="6"
            placeholder="请输入..."
            maxlength="250"
            show-word-limit
          />
        </el-form-item>
        <!-- <el-form-item label="上传截图：" prop="photo" required>
        <input type="file" @change="onChange" />
      </el-form-item> -->
        <el-form-item>
          <div style="display: flex; align-items: center; margin-top: 30px">
            <el-button
              @click="onSubmit"
              size="small"
              style="
                background-color: #0066cc;
                color: white;
                margin-right: 50px;
              "
              >提交反馈</el-button
            >
            <el-button
              @click="onClose"
              size="small"
              style="background-color: #0066cc; color: white"
              >关闭页面</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        subject: "",
        content: "",
        contact: "",
        // photo: "",
      },
      rules: {},
    };
  },
  methods: {
    onChange() {},
    onSubmit() {
      this.$refs.form.validate((valid) => {
        valid &&
          this.$feedback.create(this.form).then(({ code, msg }) => {
            this.$message({
              type: code == 200 ? "success" : "error",
              message: msg,
            });
            setTimeout(() => {
              history.back();
            }, 3000);
          });
      });
    },
    onClose() {
      alert("暂未提交反馈，确定离开？");
      //  close()
      history.back();
    },
  },
};
</script>

<style lang='scss' scoped>
.send-warp {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f4f5f5;
}
</style>