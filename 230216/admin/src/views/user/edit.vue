<!--
 * @Author: Topskys
 * @Date: 2023-03-29 16:57:07
 * @LastEditTime: 2023-04-09 13:11:56
-->
<template>
  <div class="edit-container">
    <el-dialog
      :title="`${form._id ? '编辑' : '新增'}`"
      :visible.sync="dialogVisible"
      width="50%"
      append-to-body
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="账号" prop="username" required>
          <el-input
            v-model="form.username"
            :disabled="form._id ? true : false"
            placeholder="请输入邮箱"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password" required>
          <el-input
            v-model="form.password"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>
        <el-form-item label="手机" prop="phone" required>
          <el-input v-model="form.phone" placeholder="请输入手机号码" />
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="form.nickname" placeholder="请输入昵称" />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-input v-model="form.gender" placeholder="请输入性别" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel" size="small">取 消</el-button>
        <el-button type="primary" @click="confirm" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      // form
      form: {},
      rules: {},
    };
  },
  watch: {
    data: {
      handler(newValue) {
        this.form = { ...newValue };
      },
    },
  },
  methods: {
    cancel() {
      this.resetData();
    },
    confirm() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const { code, msg } = await (this.form._id
            ? this.$user.edit(this.form)
            : this.$user.create(this.form));
          this.$message({
            type: code == 200 ? "success" : "error",
            message: msg,
          });
          this.resetData();
          this.$emit("getList")
        }
      });
    },
    resetData() {
      this.$emit("update:dialogVisible", false);
      this.form = {};
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__header {
  border-bottom: 1px solid #e8e8e8;
}
</style>