<template>
  <div class="order">
    <el-card shadow="never">
      <!-- 表单 -->
      <el-form
        :model="form"
        ref="form"
        :inline="true"
        @keyup.enter.native="getPageList()"
      >
        <div class="form-head" style="margin-bottom: 40px">订单中心</div>
        <el-form-item label="手机号：">
          <el-input
            v-model="form.keyword"
            placeholder="请输入顾客的手机号"
            prefix-icon="el-icon-search"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" type="primary" @click="getPageList()"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="never" style="margin-top: 20px">
      <!-- 表格 -->
      <e-table
        :config="t_config"
        @currentChange="currentChange"
        @sizeChange="sizeChange"
      >
        <template v-slot:operation="slot_data">
          <el-button
            @click="operation(slot_data.data, 1)"
            type="text"
            style="color: #409eff"
            :disabled="slot_data.data.status !== '已支付'"
            >确认</el-button
          >
          <el-button
            @click="operation(slot_data.data, 2)"
            type="text"
            style="color: #e6a23c"
            :disabled="slot_data.data.status !== '进行中'"
            >完成</el-button
          >
          <el-button
            @click="operation(slot_data.data, 3)"
            type="text"
            style="color: #f56c6c"
            >删除</el-button
          >
        </template>
      </e-table>
    </el-card>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";
import { tableConf } from "./pageConf";
export default {
  components: {
    "e-table": () => import("@/components/common/table/index.vue"),
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
    async getPageList() {
      const {data=[],total=0}=await this.$http({
        url: "/order",
        params: { // like : params:this.form
          ...this.form,
        },
      })
      this.t_config.tableData = data;
        this.t_config.pagination.total = total;
    },
    // 页码变化
    currentChange(data) {
      this.form.page = data;
      // this.getPageList();
    },
    // 单页显示大小变化
    sizeChange(data) {
      this.form.pageSize = data;
      // this.getPageList();
    },
    // 表格操作事件(确认、完成)
    operation(data, which) {
      which === 3
        ? this.del(data)
        : this.$confirm(`请核对顾客信息`, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.$http({
                url: `/order`,
                method: "put",
                data: {
                  ...data,
                  status: which,
                },
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
                message: "已取消",
              });
            });
    },
    // 表格删除按钮
    del(data) {
      this.$confirm(`你确定永久删除该项数据?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http({
            url: `/order/${data._id}`,
            method: "DELETE",
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
            message: "已取消",
          });
        });
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
.order {
  padding: 20px;
}
</style>