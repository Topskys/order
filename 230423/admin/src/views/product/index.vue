<template>
  <!-- 家政人员产品管理 -->
  <div class="product">
    <el-card shadow="never">
      <!-- 表单 -->
      <el-form
        :model="form"
        ref="form"
        @keyup.enter.native="getPageList()"
        inline
      >
        <div class="form-head" style="margin-bottom: 40px">家政服务</div>
        <div class="r-flex">
          <el-form-item label="名称：">
            <el-input
              v-model="form.name"
              placeholder="请输入家政人员的名称"
              prefix-icon="el-icon-search"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="家政类别：">
            <el-select
              v-model="form.select"
              placeholder="请选择家政类别"
              @click.native="getOptions"
            >
              <el-option
                v-for="item in options"
                :key="item._id"
                :label="item.title"
                :value="item.title"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" @click="getPageList()" icon="el-icon-search"
            >查询</el-button
          >
          <el-button @click="resetForm" 
            >重置</el-button
          >
        </div>
      </el-form>
    </el-card>
    <el-card shadow="never" style="margin-top: 10px">
        <el-button
        type="primary"
        @click="addOrEdit()"
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
          <el-button @click="addOrEdit(slot_data.data)" type="text">修改</el-button>
          <el-button
            @click="del(slot_data.data)"
            type="text"
            style="color: #f56c6c"
            >删除</el-button
          >
        </template>
      </e-table>
    </el-card>
    <EditForm :config="editConf" @getData="getPageList"/>
  </div>
</template>

<script>
import { tableConf } from "./pageConf";
import EditForm from './edit.vue'
export default {
  components: {
    "e-table": () => import("@/components/common/table/index.vue"),
    "e-form": () => import("@/components/common/form/index.vue"),
    EditForm
  },
  data() {
    return {
      form: {
        name: "",
        select: "",
        page: 1,
        pageSize: 10,
      },
      // 类别选择框数组
      options: [],
      // 列表配置
      ...tableConf,
      // Dialog 表单
      editConf:{
        services:[],
        dialogVis:false
      }
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
    // 重置按钮
    resetForm(){
      this.form.name= ""
        this.form.select=""
    },
    // 点击类别选择框事件
    async getOptions() {
      this.options =
        (await this.$http({
          url: "/category/wx",
        })).data || [];
    },
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
            url: `/product/${data._id}`,
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
      this.dialogVis = false;
      this.imgList = [];
      this.f_field = {};
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
    // 添加或修改
    addOrEdit(data={}){
        this.editConf = {...data};
      this.editConf.dialogVis = true;
    }


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