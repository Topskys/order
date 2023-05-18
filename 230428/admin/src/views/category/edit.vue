<template>
  <div class="user-edit-container">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      width="50%"
      append-to-body
      :close-on-click-modal="false"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        style="
          min-width: 500px;
          max-width: 800px;
          margin: 0 auto;
          padding: 0 60px;
        "
      >
        <el-form-item label="类别名称" prop="name" required>
          <el-input v-model="form.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="海报" v-show="!form._id">
          <div class="form-upload">
            <el-upload
              action="http"
              list-type="picture-card"
              :http-request="handlerUpload"
              :limit="1"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </div>
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
      title: "编辑信息",
      dialogVisible: true,
      // form
      form: {},
      rules: {},
    };
  },
  watch: {
    data: {
      handler(newValue) {
        this.form = { ...newValue };
        this.title = this.form._id ? "编辑类别" : "新增类别";
      },
    },
  },
  methods: {
    // 上传图片描述
    async handlerUpload(data) {
      const { url } = await this.uploadFile(data.file);
      this.form.poster=url;
    },
    // 上传
    uploadFile(file) {
      const form = new FormData();
      form.append("file", file);
      return this.$http({
        url: "/upload",
        method: "post",
        data: form,
      });
    },
    // Dialog取消按钮
    cancel() {
      this.$emit("update:visible", false);
    },
    // Dialog确认按钮
    confirm() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const _id = this.form._id || "";
          try {
            const { msg } = await (_id
              ? this.$http({
                  url: `/class/${_id}`,
                  method: "put",
                  data: {
                    ...this.form,
                  },
                })
              : this.$http({
                  url: "/class",
                  method: "post",
                  data: {
                    ...this.form,
                  },
                }));
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