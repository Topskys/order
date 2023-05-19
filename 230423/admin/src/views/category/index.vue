<template>
  <div class="category">
    <el-card shadow="never" style="margin-bottom: 10px">
      <!-- 表单 -->
      <el-form
        :model="form"
        ref="form"
        :inline="true"
        @keyup.enter.native="getPageList()"
      >
        <div class="form-head" style="margin-bottom: 40px">类别列表</div>
        <el-form-item label="标题：">
          <el-input
            v-model="form.keyword"
            placeholder="请输入标题"
            prefix-icon="el-icon-search"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getPageList()" icon="el-icon-search"
            >搜索</el-button
          >
          <el-button
        type="primary"
        @click="addOrEdit"
        icon="el-icon-plus"
        >添加</el-button
      >
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="never">
      <!-- 表格 -->
      <e-table
        :config="t_config"
        @currentChange="currentChange"
        @sizeChange="sizeChange"
      >
        <template v-slot:operation="slot_data">
          <el-button
            @click="edit(slot_data.data)"
            type="primary"
            size='mini'
            >修改</el-button
          >
          <el-button
            @click="del(slot_data.data)"
            type="danger"
            size='mini'
            >删除</el-button
          >
        </template>
      </e-table>
    </el-card>

    <!-- Dialog 表单 :rules="f_rules"-->
    <el-dialog
      :title="`${f_field._id ? '修改类别' : '添加类别'}`"
      :visible.sync="dialogVisible"
      append-to-body
      width="50%"
    >
      <el-form
        ref="dialog_form"
        :model="f_field"
        label-width="100px"
        style="margin: 0 auto; max-width: 700px"
      >
        <el-form-item label="类别名称" required prop="title">
          <el-input v-model="f_field.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="海报" v-show="!f_field._id">
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
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {tableConf} from './pageConf' 
export default {
  components: {
    "e-table": () => import("@/components/common/table/index.vue"),
    "e-form": () => import("@/components/common/form/index.vue"),
  },
  data() {
    return {
      form: {
        keyword: "",
        page: 1,
        pageSize: 10,
      },
      // 列表配置
     ...tableConf,
    };
  },
  mounted() {
    this.getPageList();
  },
  methods: {
    // 获取数据列表
    getPageList() {
      this.$http({
        url: "/category",
        params: {
          ...this.form,
        },
      }).then((res) => {
        this.t_config.tableData = res.data;
        this.t_config.pagination.total = res.total;
      });
    },
    // 页码变化
    currentChange(data) {
      this.form.page = data;
    },
    // 单页显示大小变化
    sizeChange(data) {
      this.form.pageSize = data;
    },
    // 新增或编辑按钮事件回调
    addOrEdit(data) {
      this.f_field = {
        ...data,
      };
      this.dialogVisible = true;
    },
    // 表格编辑按钮事件回调
    edit(data) {
      this.f_field = {
        ...data,
      };
      this.dialogVisible = true;
    },
    /**
     * 表格删除按钮
     */
    del(data) {
      this.$confirm(`你确定删除该项数据?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then((res) => {
          this.$http({
            url: `/category/${data._id}`,
            method: "DELETE",
            data,
          }).then(({ code, msg }) => {
            this.$message({
              type: code == 200 ? "success" : "error",
              message: msg,
            });
            this.getPageList();
          });
        })
        .catch((e) => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleClose() {
      this.dialogVisible = false;
      this.f_field = {};
    },
    handleRemove(file, fileList) {
      this.f_field.poster = "";
    },
    // 上传文件
    handlerUpload(data) {
      const form = new FormData(); 
      form.append("file", data.file); 
      this.$http({
        url: "/upload",
        method: "post",
        data: form,
      }).then(({ url }) => {
        this.f_field.poster = url;
      });
    },
    /**
     * Dialog表单确定按钮
     * 提交更数据
     */
    confirm() {
      this.$refs.dialog_form.validate(async (valid) => {
        if (valid) {
          this.$http({
            url: this.f_field._id?`/category/${this.f_field._id}`:'/category',
            method: this.f_field._id?'put':"post",
            data: {
              ...this.f_field,
            },
          }).then(({ code, msg }) => {
            this.$message({
              type: code === 200 ? "success" : "error",
              message: msg,
            });
            this.getPageList();
          });
        } else {
          this.$message("表单验证错误");
        }
      });
      this.dialogVisible = false;
    },
    /**
     * Dialog表单取消按钮
     */
    cancel() {
      this.dialogVisible = false;
      this.f_field = {};
    },
  },
  watch: {
    form: {
      handler(newVal, oldVal) {
        this.getPageList();
      },
      deep: true, // 深度监听，监听属性
    },
  },
};
</script>

<style lang='scss' scoped>
.category {
  padding: 20px;
}
</style>