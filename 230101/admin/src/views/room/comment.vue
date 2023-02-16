<template>
  <div class="comment-list">
    <el-card shadow="never">
      <!-- 表单 -->
      <el-form
        :model="form"
        ref="form"
        :inline="true"
        @keyup.enter.native="getPageList()"
      >
        <el-form-item>
          <el-input
            v-model="form.keyword"
            placeholder="请输入评论内容"
            prefix-icon="el-icon-search"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="getPageList()"
            >查询</el-button
          >
        </el-form-item>
      </el-form>

      <!-- 表格 -->
      <e-table
        :config="t_config"
        @currentChange="currentChange"
        @sizeChange="sizeChange"
      >
        <template v-slot:operation="slot_data">
          <el-button @click="del(slot_data.data)" type="danger" size="mini"
            >删除</el-button
          >
        </template>
      </e-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "comment-list",
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
      t_config: {
        // 边框
        border: true,
        // 序号
        index: true,
        // 选择
        checkbox: true,
        // 列表数据
        tableData: [],
        // 列
        columns: [
          {
            type: "text",
            prop: "room_number",
            label: "房间号",
          },
          {
            type: "text",
            prop: "nickName",
            label: "用户",
          },
          {
            type: "text",
            prop: "content",
            label: "评论",
          },
          {
            type: "tag",
            prop: "satisfaction",
            label: "是否好评",
            cb: (data) => {
              let tag_type = "default";
              switch (data.satisfaction) {
                case true:
                  tag_type = "success";
                  break;
                case false:
                  tag_type = "info";
                  break;
              }
              return tag_type;
            },
          },
          {
            type: "text",
            prop: "createTime",
            label: "评论时间",
          },
          {
            type: "text",
            prop: "updateTime",
            label: "更新日期",
          },
          {
            type: "slot",
            label: "操作",
            prop: "operation",
            slot_name: "operation",
            align: "center",
            // show_tooltip: false,
          },
        ],
        // 分页
        pagination: {
          show: true,
          align: "center",
          page: 1,
          pageSize: 10,
          total: 0,
        },
      },
    };
  },
  mounted() {
    this.getPageList();
  },
  methods: {
    // 获取数据列表
    getPageList() {
      this.$http({
        url: "/comments",
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
    // 表格删除按钮
    del(data) {
      this.$confirm(`你确定永久删除该项数据?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http({
            url: `/comments/${data._id}`,
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
.comment-list {
  padding: 20px;
}
</style>