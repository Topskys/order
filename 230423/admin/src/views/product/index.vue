<template>
  <!-- 产品管理 -->
  <div class="product">
    <el-card shadow="never">
      <!-- 表单 -->
      <el-form
        :model="form"
        ref="form"
        @keyup.enter.native="getPageList()"
        inline
      >
        <div class="form-head" style="margin-bottom: 40px">产品中心</div>
        <div class="r-flex">
          <el-form-item label="标题：">
            <el-input
              v-model="form.title"
              placeholder="请输入标题"
              prefix-icon="el-icon-search"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="类别：">
            <el-select
              v-model="form.select"
              placeholder="请选择"
              @click.native="getOptions"
            >
              <el-option
                v-for="item in options"
                :key="item._id"
                :label="item.title"
                :value="`${item.title}:${item._id}`"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" @click="getPageList()" icon="el-icon-search"
            >查询</el-button
          >
        </div>
      </el-form>
    </el-card>
    <el-card shadow="never" style="margin-top: 10px">
      <el-button
        type="primary"
        @click="getPageList()"
        icon="el-icon-plus"
        style="margin-bottom: 20px"
        >添加</el-button
      >
      <!-- 表格 -->
      <e-table
        :config="t_config"
        @currentChange="currentChange"
        @sizeChange="sizeChange"
      >
        <template v-slot:operation="slot_data">
          <el-button @click="edit(slot_data.data)" type="text">编辑</el-button>
          <el-button @click="check(slot_data.data)" type="text">服务</el-button>
          <!-- <el-button type="text"  style="color:#909399;">详情</el-button> -->
          <el-button
            @click="del(slot_data.data)"
            type="text"
            style="color: #f56c6c"
            :disabled="slot_data.data.status === 'delete'"
            >删除</el-button
          >
        </template>
      </e-table>
    </el-card>

    <!-- Dialog 表单 :rules="f_rules"-->

    <!-- 查看服务详情 -->
    <!-- <el-dialog
      title="修改信息"
      :visible.sync="dialogVisible"
      append-to-body
      width="50%"
    >
      <el-table :data="data" style="width: 100%">
        <el-table-column prop="prop" label="label" width="width">
        </el-table-column>
      </el-table>
    </el-dialog> -->
  </div>
</template>

<script>
import { tableConf } from "./pageConf";
export default {
  components: {
    "e-table": () => import("@/components/common/table/index.vue"),
    "e-form": () => import("@/components/common/form/index.vue"),
  },
  data() {
    return {
      form: {
        title: "",
        select: "",
        page: 1,
        pageSize: 10,
      },
      // 类别选择框数组
      options: [],
      // 列表配置
      ...tableConf,
      // Dialog 表单

      imgList: [],
      // Dialog 表格
    };
  },
  mounted() {
    this.getPageList();
  },
  methods: {
    // 获取数据列表
    getPageList() {
      this.$http({
        url: "/product",
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
    // 点击类别选择框事件
    async getOptions() {
      this.options =
        (await this.$http({
          url: "/category",
        })).data || [];
    },
    // 表格编辑按钮事件回调
    edit(data) {
      this.f_field = {...data};
      this.dialogVisible = true;
    },
    // 服务按钮事件
    check(data) {},
    /**
     * 表格删除按钮
     */
    del(data) {
      this.$confirm(`你确定删除项数据?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then((res) => {
          this.$http({
            url: "/product",
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
      this.imgList = [];
      this.f_field = {};
    },
    handleRemove(file, fileList) {
      // file删除的那张图，剩下的照片墙fileList
      // 含name和url等服务器不需要的字段
      this.imgList = fileList;
      this.f_field.avatarUrl = "";
    },
    handleSuccess(response, file, fileList) {
      // 收集刚上传的图片
      this.imgList = fileList;
      this.f_field.avatarUrl = response.data;
    },
    /**
     * 上传之前
     */
    beforeUpload(file) {
      // console.log("beforeUpload", file);
    },
    // 上传文件
    handlerUpload(data) {
      const form = new FormData(); // "Content-Type": "multipart/form-data"
      form.append("file", data.file); // file(key):value

      this.$http({
        url: "/upload",
        method: "post",
        data: form,
      }).then(({ data }) => {
        this.f_field.avatarUrl = data.url;
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
            url: "/product",
            method: "put",
            data: {
              ...this.f_field,
              gender: this.f_field.gender.slice(":")[1],
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
      this.imgList = [];
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
.product {
  padding: 20px;
}
</style>