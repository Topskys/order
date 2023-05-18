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
      <div style='margin:5px 0 30px;'>查找搜索</div>
        <el-form-item label="手机号：">
          <el-input
            v-model="form.keyword"
            placeholder="请输入手机号"
            prefix-icon="el-icon-search"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="getPageList()">查询</el-button>
        <el-button icon="el-icon-refresh" @click="resetForm">重置</el-button></el-form-item>
      </el-form>
      </el-card>
<el-card shadow="never" style='margin-top:20px;'>
      <!-- 表格 -->
      <e-table
        :config="t_config"
        @currentChange="currentChange"
        @sizeChange="sizeChange"
      >
        <template v-slot:operation="slot_data">
          <el-button
            @click="operation(slot_data.data, 'confirm')"
            type="text"
            size="mini"
            :disabled="slot_data.data.status!=='clear'" 
            >确认</el-button
          >
          <el-button
            @click="operation(slot_data.data, 'update')"
            type="text"
            size="mini"
            >编辑</el-button
          >
          <el-button
            @click="operation(slot_data.data, 'success')"
            type="text"
            size="mini"
            :disabled="slot_data.data.status!=='clearing'" 
            >完成</el-button
          >
        </template>
      </e-table>
    </el-card>

    <!-- Dialog 表单"-->
    <el-dialog
      title="修改"
      :visible.sync="dialogVisible"
      append-to-body
      width="50%"
    >
      <el-form ref="dialog_form" :model="f_field" label-width="80px">
        <el-form-item label="顾客" required prop="nickName">
          <el-input v-model="f_field.nickName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="手机号" required prop="phone">
          <el-input
            type="number"
            v-model="f_field.phone"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="房间号" required prop="room_number">
          <el-input v-model="f_field.room_number" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="预约" required prop="order">
          <el-input v-model="f_field.order" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="状态" required prop="status">
          <el-select v-model="f_field.status" placeholder="请选择">
            <el-option label="normal" value="normal">normal</el-option>
            <el-option label="clear" value="clear">clear</el-option>
            <el-option label="clearing" value="clearing">clearing</el-option>
            <el-option label="cleared" value="cleared">cleared</el-option>
          </el-select>
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
export default {
  name: "clear-list",
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
            prop: "room_number",
            label: "房间号",
          },
          {
            type: "text",
            prop: "order",
            label: "预约",
          },
          // {
          //   type: "text",
          //   prop: "message",
          //   label: "留言",
          // },
          {
            type: "tag",
            prop: "status",
            label: "状态",
            cb: (data) => {
              let tag_type = "default";
              switch (data.status) {
                case "clear":
                  tag_type = "danger";
                  break;
                case "clearing":
                  tag_type = "warning";
                  break;
                case "cleared":
                  tag_type = "success";
                  break;
              }
              return tag_type;
            },
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
            show_tooltip: false,
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

      // Dialog 表单
      dialogVisible: false,
      f_field: {
        // nickName: "",
        // phone: "",
        // room_number: "",
        // order: "",
        // status: "",
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
        url: "/service",
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
    resetForm() {
      this.form.keyword = "";
      this.getPageList()
    },
    // 表格操作事件(确认、编辑、完成)
    operation(data, which) {
      which === "update"
        ? this.edit(data)
        : this.$confirm(`将对${data.room_number}房间进行清洁`, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.$http({
                url: `/service/${data._id}`,
                method: "put",
                data: {
                  ...data,
                  status: which==='confirm'?'clearing':'cleared',
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
    // 表格编辑按钮
    edit(data) {
      this.f_field = { ...data }; // 不展开data将会影响dialog表单和table
      this.dialogVisible = true;
    },
    // Dialog表单确定按钮，提交更数据
    confirm() {
      this.$refs.dialog_form.validate(async (valid) => {
        if (valid) {
          this.$http({
            url: `/service/${this.f_field._id}`,
            method: "put",
            data: {
              ...this.f_field,
              // isTrusted:undefined,
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
    // Dialog表单取消按钮
    cancel() {
      this.dialogVisible = false;
      this.$refs.dialog_form.resetFields();
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