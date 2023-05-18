// 顾客管理
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
          <el-button type="primary" @click="getPageList()" icon='el-icon-search'>查询</el-button>
          <el-button  @click="resetForm" icon='el-icon-refresh'>重置</el-button>
        </el-form-item>
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
            @click="edit(slot_data.data)"
            type="text"
            style="color: #409eff"
            >编辑</el-button
          >
          <!-- <el-button type="text"  style="color:#909399;">详情</el-button> -->
          <el-button
            @click="del(slot_data.data)"
            type="text"
            style="color: #f56c6c"
            :disabled="slot_data.data.status==='delete'"
            >删除</el-button
          >
        </template>
      </e-table>
    </el-card>

    <!-- Dialog 表单 :rules="f_rules"-->
    <el-dialog title="修改信息" :visible.sync="dialogVisible" append-to-body width="50%">
      <el-form ref="dialog_form" :model="f_field" label-width="80px" inline>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="昵称" required prop="nickName">
              <el-input
                v-model="f_field.nickName"
                placeholder="请输入"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item label="手机号" required prop="phone">
              <el-input
                v-model="f_field.phone"
                type="number"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item label="email">
              <el-input v-model="f_field.email" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="房间">
              <el-input v-model="f_field.room_number" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" required prop="gender">
              <el-select placeholder="请选择" v-model="f_field.gender">
                <el-option label="男" value="男:0"> </el-option>
                <el-option label="女" value="女:1"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="余额">
              <el-input
                v-model="f_field.balance"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item label="积分">
              <el-input
                v-model="f_field.integral"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item label="状态" required prop='status'>
              <el-input
                v-model="f_field.status"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="图片" required prop="avatarUrl">
          <el-upload
            action="http"
            list-type="picture-card"
            :on-remove="handleRemove"
            :file-list="imgList"
            :on-success="handleSuccess"
            :before-upload="beforeUpload"
            :http-request="handlerUpload"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
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
  name: "members",
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
      t_config: {
        // 边框
        border: true,
        // 序号
        // index: true,
        // 列表数据
        tableData: [],
        // 列
        columns: [
          {
            type: "text",
            prop: "nickName",
            label: "昵称",
          },
          {
            type: "image",
            prop: "avatarUrl",
            label: "头像",
            align: "center",
            show_tooltip: false,
          },
          {
            type: "function",
            prop: "gender",
            label: "性别",
            cb: (data) => (data.gender === 1 ? "female" : "male"),
          },
          {
            type: "text",
            prop: "phone",
            label: "手机号",
          },
          {
            type: "function",
            prop: "balance",
            label: "余额",
            cb: (data) => `￥${Number(data.balance).toFixed(2)}`,
          },
          {
            type: "text",
            prop: "integral",
            label: "积分",
          },
          {
            type: "text",
            prop: "discounts",
            label: "优惠劵",
          },
          {
            type: "text",
            prop: "room_number",
            label: "房间",
          },
          {
            type: "text",
            prop: "email",
            label: "邮箱",
          },
          {
            type: "tag",
            prop: "status",
            label: "状态",
            cb: (data) => {
              let tag_type = "default";
              switch (data.status) {
                case "normal":
                  tag_type = "success";
                  break;
                case "delete":
                  tag_type = "danger";
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
            align: "center",
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
        // avatarUrl: "",
        // gender: "",
        // phone: "",
        // email: "",
        // balance: "",
        // integral: "",
        // status: "",
      },

      imgList: [],
    };
  },
  mounted() {
    this.getPageList();
  },
  methods: {
    resetForm(){
      this.form={
        keyword:'',
        page:1,
        pageSize:10,
      }
      this.getPageList()
    },
    // 获取数据列表
    getPageList() {
      this.$http({
        url: "/users",
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
    // 表格编辑按钮事件回调
    edit(data) {
      this.f_field = {
        ...data,
        gender: data.gender === 1 ? "女" : "男",
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
      }).then((res) => {
          this.$http({
            url: "/users",
            method: "DELETE",
            data,
          }).then(({ code, msg }) => {
            this.$message({
              type: code == 200 ? "success" : "error",
              message: msg,
            });
            this.getPageList()
          });
        }).catch((e) => {
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
            url: "/users",
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
.room {
  padding: 20px;
}
</style>