<template>
<!-- 处理留言页面 -->
  <div class="evaluate">
    <el-card shadow="never" style="margin-bottom: 10px">
      <!-- 表单 -->
      <el-form
        :model="form"
        ref="form"
        :inline="true"
        @keyup.enter.native="getPageList()"
      >
        <div class="form-head" style="margin-bottom: 40px">顾客留言</div>
        <el-form-item label="留言类型：">
          <el-input
            v-model="form.kind"
            placeholder="请输入留言类型"
            prefix-icon="el-icon-search"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="联系方式：">
          <el-input
            v-model="form.contact_type"
            placeholder="请输入联系方式"
            prefix-icon="el-icon-search"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getPageList()" icon="el-icon-search"
            >查询</el-button
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
            @click="del(slot_data.data)"
            type="danger"
            size='mini'
            >删除</el-button
          >
        </template>
      </e-table>
    </el-card>
  </div>
</template>

<script>
import {tableConf} from './pageConf.js'
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
      ...tableConf
      }
  },
  mounted() {
    this.getPageList();
  },
  methods: {
    // 获取数据列表
    getPageList() {
      this.$http({
        url: "/contact",
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
            url: `/contact/${data._id}`,
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
.evaluate {
  padding: 20px;
}
</style>