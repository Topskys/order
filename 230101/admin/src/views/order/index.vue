<template>
  <div class="room">
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
            placeholder="请输入手机号"
            prefix-icon="el-icon-search"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getPageList()">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="dialog = !dialog"
            >新增</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-printer"
            @click="dialog = !dialog"
            >打印</el-button
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
          <el-button
            @click="operation(slot_data.data, '2')"
            type="text"
            style="color: #409eff"
            :disabled="Number(slot_data.data.status) < 2"
            >入住</el-button
          >
          <el-button
            @click="operation(slot_data.data, '3')"
            type="text"
            style="color: #e6a23c"
            :disabled="Number(slot_data.data.status) < 2"
            >退房</el-button
          >
          <el-button
            @click="operation(slot_data.data, 'delete')"
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
export default {
  name: "order-list",
  components: {
    "e-table": () => import("@/components/common/table/index.vue"),
  },
  data() {
    return {
      form: {
        keyword: "",
        page: 1,
        pageSize: 5,
      },

      // 列表配置
      t_config: {
        // 边框
        border: true,
        // 序号
        // index: true,
        // 选择
        checkbox:true,
        // 列表数据
        tableData: [],
        // 列
        columns: [
          {
            type: "text",
            prop: "nickName",
            label: "顾客",
          },
          {
            type: "text",
            prop: "phone",
            label: "手机号",
          },
          {
            type: "text",
            prop: "room.title",
            label: "标题",
            cb: (data) => data.room.title,
          },
          {
            type: "image",
            prop: "room.poster",
            label: "图片",
            align: "center",
            show_tooltip: false,
            cb: (data) => data.room.poster,
          },
          {
            type: "text",
            prop: "room.room_number",
            label: "房间号",
            cb: (data) => data.room.room_number,
          },
          // {
          //   type: "text",
          //   prop: "number",
          //   label: "间数",
          // },
          {
            type: "function",
            prop: "rentTime",
            label: "预租时间",
            // name: alias
            cb: ({ rentTime: data }) => `${data.startDate}-${data.endDate}`,
          },
          {
            type: "function",
            prop: "origin_price",
            label: "价格",
            cb: (data) => `￥${Number(data.room.origin_price).toFixed(2)}`,
          },
          {
            type: "function",
            prop: "price",
            label: "支付价格",
            cb: (data) => `￥${Number(data.total).toFixed(2)}`,
          },
          {
            type: "text",
            prop: "payType",
            label: "支付方式",
          },
          {
            type: "text",
            prop: "message",
            label: "留言",
          },
          {
            type: "tag",
            prop: "status_text",
            label: "状态",
            cb: (data) => {
              let tag_type = "default";
              switch (data.status) {
                case "0":
                  tag_type = "danger";
                  data.status_text = "未支付";
                  break;
                case "1":
                  data.status_text = "待入住";
                  break;
                case "2":
                  tag_type = "success";
                  data.status_text = "入住中";
                  break;
                case "3":
                  tag_type = "warning";
                  data.status_text = "待评价";
                  break;
                case "4":
                  tag_type = "success";
                  data.status_text = "完成";
                  break;
              }
              return tag_type;
            },
          },
          {
            type: "text",
            prop: "createTime",
            label: "下单时间",
          },
          // {
          //   type: "text",
          //   prop: "updateTime",
          //   label: "更新日期",
          // },
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
          pageSize: 5,
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
        url: "/carts/all",
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
      // this.getPageList();
    },
    // 单页显示大小变化
    sizeChange(data) {
      this.form.pageSize = data;
      // this.getPageList();
    },
    // 表格操作事件(确认、完成)
    operation(data, which) {
      which === "delete"
        ? this.del(data)
        : this.$confirm(`请核对顾客信息`, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
              this.$http({
                url: `/carts`,
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
            url: `/carts/${data._id}`,
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
.room {
  padding: 20px;
}
</style>