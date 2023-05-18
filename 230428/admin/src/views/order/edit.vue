<template>
  <div class="user-edit-container">
    <el-dialog
      title="派遣维修员"
      :visible.sync="visible"
      width="500px"
      append-to-body
      :close-on-click-modal="false"
    >
      <el-form
        ref="form"
        :model="form"
      >
        <el-form-item label="">
          <el-select
            v-model="form.worker"
            placeholder="请选择"
            @click.native="getStaff"
            style="width:100%"
          >
            <el-option
              v-for="item in options"
              :key="item._id"
              :label="item.name"
              :value="`${item.name}:${item._id.toString()}`"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel" >取 消</el-button>
        <el-button type="primary" @click="confirm"
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
      dialogVisible: true,
      // form
      form: {},
      rules: {},
      // 列表项
      options:[]
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
    // 获取维系员工数组
    async getStaff() {
      const { data = [] } = await this.$staff.getList();
      this.options= data;
    },
    // Dialog取消按钮
    cancel() {
      this.$emit("update:visible", false);
    },
    // Dialog确认按钮
    confirm() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            const { msg } = await this.$order.update({
              _id:this.form._id,
              worker:this.form.worker
            });
            this.$emit("update:visible", false);
            this.$emit("confirm");
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