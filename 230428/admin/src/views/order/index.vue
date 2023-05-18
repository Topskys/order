<template>
  <div class="user-container">
    <!-- Search -->
    <el-card shadow="never" class="query-card">
      <div slot="header">
        <div class="query-title r-flex">
          <i class="el-icon-search"></i>
          <span class="ml10">搜索筛选</span>
        </div>
      </div>
      <el-form
        ref="queryForm"
        :model="query"
        label-width="80px"
        inline
        @keyup.enter.native="getList()"
      >
        <el-row>
          <el-col :md="20" :sm="16" :xs="16">
            <el-form-item label="顾客：">
              <el-input
                v-model="query.name"
                placeholder="请输入昵称"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="手机：">
              <el-input
                v-model="query.phone"
                placeholder="请输入手机号"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col
            :md="4"
            :sm="8"
            :xs="8"
            style="display: flex; align-items: center"
          >
            <el-button icon="el-icon-refresh" @click="resetQueryFrom"
              >重置</el-button
            >
            <el-button type="primary" icon="el-icon-search" @click="getList()"
              >搜索</el-button
            >
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- Table -->
    <el-card shadow="never" style="margin-top: 15px">
      <div style="margin-bottom: 20px">
        <el-button icon="el-icon-delete" @click="del()">批量删除</el-button>
      </div>
      <e-table
        :config="tableConfig"
        :checkList.sync="checkList"
        @currentChange="currentChange"
        @sizeChange="sizeChange"
      >
        <template v-slot:operation="{ data }">
          <el-button
            type="text"
            size="small"
            style="color: #e6a23c"
            :disabled="!data.status.includes('待上门')"
            v-show="data.status.includes('待上门')"
            @click="setWorker(data)"
            >派遣</el-button
          >
          <el-button
            type="text"
            @click="onSerSuccess(data)"
            :disabled="!data.status.includes('待上门')"
            :v-show="data.status.includes('待评价')"
            size="small"
            >完成</el-button
          >
          <el-button
            type="text"
            size="small"
            style="color: #f56c6c"
            @click="del(data)"
            >删除</el-button
          >
        </template>
      </e-table>
    </el-card>
    <dialog-edit
      :visible.sync="dialogVisible"
      :data="dialogForm"
      @confirm="getList()"
    ></dialog-edit>
  </div>
</template>

<script>
import eTable from "@/components/common/table";
import dialogEdit from "./edit.vue";
import { pageConf } from "./config";
export default {
  components: {
    eTable,
    dialogEdit,
  },
  data() {
    return {
      // Search
      query: {
        page: 1,
        pageSize: 5,
        name: "",
        phone: "",
      },
      // Table
      ...pageConf,
      checkList: [],
      // Dialog
      dialogVisible: false,
      dialogForm: {},
    };
  },
  mounted() {
    this.getList();
  },
  watch: {
    query: {
      handler() {},
    },
    checkList(value) {
      console.log(value);
    },
  },
  methods: {
    // 获取数据列表
    async getList() {
      const res = await this.$order.getAll(this.query);
      this.tableConfig.tableData = res?.data || [];
      this.tableConfig.pagination.total = res?.total;
      if (res.data && !res.data.length) {
        const page = this.tableConfig.pagination.page;
        this.tableConfig.pagination.page = page > 1 ? page : page - 1;
      }
    },
    // 重置按钮
    resetQueryFrom() {
      this.query = {};
      this.getList();
    },
    // 新增或表格修改按钮
    async setWorker(data = {}) {
      this.dialogForm = { ...data };
      this.dialogVisible = true;
    },
    // 订单完成
    async onSerSuccess(data) {
      const { msg, code } = await this.$order.serviceOver(data);
      this.getList()
      this.$message({
        type: code == 200 ? "success" : "error",
        message: msg,
      });
    },
    // 批量删除及单项删除按钮
    del(data) {
      let delArr = new Array(0);
      data
        ? delArr.push(data._id)
        : (delArr = this.checkList.map((item) => item?._id && item._id));
      this.$confirm(`当前订单状态为${data.status}，确定删除?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delArr.forEach(async (_id) => await this.$order.del(_id));
          this.getList();
        })
        .catch((err) => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    currentChange(e) {
      this.query.page = e;
      this.getList();
    },
    sizeChange(e) {
      this.query.pageSize = e;
      this.getList();
    },
  },
};
</script>

<style>
</style>