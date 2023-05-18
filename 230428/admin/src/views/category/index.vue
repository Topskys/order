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
        inline
        @keyup.enter.native="getList()"
      >
        <el-form-item label="类别名称：">
          <el-input
            v-model="query.name"
            placeholder="请输入类别名称"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="getList()"
            >搜索</el-button
          >
          <el-button type="primary" icon="el-icon-plus" @click="addOrEdit()"
            >新增</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <!-- Table -->
    <el-card shadow="never" style="margin-top: 15px">
      <e-table
        :config="tableConfig"
        :checkList.sync="checkList"
      >
        <template v-slot:operation="{ data }">
          <el-button
            type="text"
            @click="addOrEdit(data)"
            size="small"
            icon="el-icon-edit"
            >编辑</el-button
          >
          <el-button
            type="text"
            size="small"
            icon="el-icon-delete"
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
        name: "",
        page:1,
        pageSize:10,
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
      const res = await this.$http({
        url: "/class",
        params: {
          ...this.query,
        },
      });
      this.tableConfig.tableData = res?.data || [];
    },
    // 重置按钮
    resetQueryFrom() {
      this.query = {
        page: 1,
        pageSize: 10,
      };
      this.getList();
    },
    // 新增或表格修改按钮
    async addOrEdit(data = {}) {
      this.dialogForm = { ...data };
      this.dialogVisible = true;
    },
    // 批量删除及单项删除按钮
    del(data) {
      let delArr = new Array(0);
      data
        ? delArr.push(data._id)
        : (delArr = this.checkList.map((item) => item?._id && item._id));
      this.$confirm(`确定删除?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delArr.forEach(
            async (_id) =>
              await this.$http({
                url: `/class/${_id}`,
                method: "delete",
              })
          );
          this.getList();
        })
        .catch((err) => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  watch: {
    query: {
      handler(newVal) {
        this.getList();
      },
      deep: true,
    },
  },
};
</script>

<style>
</style>