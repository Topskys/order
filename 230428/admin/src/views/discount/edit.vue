<template>
  <div class="user-edit-container">
    <el-dialog
      :title="`${form._id ? '编辑信息' : '新增福利'}`"
      :visible.sync="visible"
      width="50%"
      append-to-body
      :close-on-click-modal="false"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
        size="small"
        style="
          min-width: 500px;
          max-width: 800px;
          margin: 0 auto;
          padding: 0 60px;
        "
      >
        <el-form-item label="标题" prop="title" required>
          <el-input v-model="form.title" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="金额大小" prop="money_size" required>
          <el-input v-model="form.money_size" placeholder="请输入金额大小" />
        </el-form-item>
        <el-form-item label="数量" prop="count" required>
          <el-input v-model="form.count" placeholder="请输入优惠劵数量" />
        </el-form-item>
        <el-form-item label="逾期时间" prop="expire" required>
          <el-input v-model="form.expire" placeholder="请输入逾期时间" />
        </el-form-item>
        <el-form-item label="仅限" prop="limit">
          <el-input v-model="form.limit" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="启用" prop="status">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
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
import eTable from "@/components/common/table";
export default {
  components: {
    eTable,
  },
  props: {
    visible: {
      type: Boolean,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      // Dialog
      title: "编辑信息",
      dialogVisible: true,
      // form
      form: {},
      rules: {},
      visiblePoster: false,
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
    // Dialog取消按钮
    cancel() {
      this.$emit("update:visible", false);
      this.form = {};
    },
    // Dialog确认按钮
    confirm() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const _id = this.form._id || "";
          try {
            const { msg } = await (_id
              ? this.$discount.updateDisc(this.form)
              : this.$discount.createDisc(this.form));
            this.$emit("update:visible", false);
            this.$emit("confirm");
            this.form = {};
            this.$message({
              type: "success",
              message: msg,
            });
          } catch (e) {
            console.error(e.message);
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.head-operation {
  padding: 10px 0 20px;
  /* 清除子元素添加扩展按钮的float 1 */
  overflow: hidden;
  /* 清除子元素添加扩展按钮的float 2 */
  // &::after {
  //   content: "";
  //   display: block;
  //   clear: both;
  // }
}

::v-deep .el-dialog__header {
  border-bottom: 1px solid #e8e8e8;
}
</style>