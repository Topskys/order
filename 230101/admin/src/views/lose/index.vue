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
        <el-form-item label="标题：">
          <el-input
            v-model="form.keyword"
            placeholder="请输入标题"
            prefix-icon="el-icon-search"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getPageList()">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus" @click="addOrEdit"
            >新增</el-button
          >
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
            @click="addOrEdit(slot_data.data)"
            type="primary"
            size="small"
            :disabled="slot_data.data.status === 'received'"
            >编辑</el-button
          >
          <el-button @click="receive(slot_data.data)" type="danger" size="small"
           :disabled="slot_data.data.status==='received'" 
            >领取</el-button
          >
        </template>
      </e-table>
    </el-card>

    <!-- Dialog 表单"-->
    <el-dialog
      :title="`${f_field._id ? '修改' : '新增'}`"
      :visible.sync="dialogVisible"
      append-to-body
      width="50%"
    >
      <el-form ref="dialog_form" :model="f_field" label-width="80px">
        <el-form-item label="标题" required prop="title">
          <el-input v-model="f_field.title" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="描述" required prop="description">
          <el-input
            type="textarea"
            rows="3"
            v-model="f_field.description"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="领取地址" required prop="address">
          <el-input v-model="f_field.address" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="联系人" required prop="finder">
          <el-input v-model="f_field.finder" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="电话" required prop="phone">
          <el-input
            v-model="f_field.phone"
            type="number"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="图片" required prop="poster">
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
            prop: "title",
            label: "标题",
            show_tooltip:false,
          },
          {
            type: "image",
            prop: "poster",
            label: "图片",
            align: "center",
            show_tooltip: false,
          },
          {
            type: "text",
            prop: "description",
            label: "描述",
            show_tooltip:false,
          },
          {
            type: "text",
            prop: "createTime",
            label: "上报时间",
            show_tooltip:false,
          },
          {
            type: "function",
            prop: "address",
            label: "领取地址",
            cb: (data) =>
              `<a href='https://www.amap.com/search?query=${data.address}&city=350100'  target='_blank' ><i class='el-icon-location'></i>${data.address}</a>`,
          show_tooltip:false,
          },
          {
            type: "text",
            prop: "finder",
            label: "联系人",
            show_tooltip:false,
          },
          {
            type: "text",
            prop: "phone",
            label: "电话",
            show_tooltip:false,
          },
          {
            type: "text",
            prop: "receiver",
            label: "领取人电话", // 领取人联系电话
            show_tooltip:false,
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
            label: "领取时间",
            show_tooltip:false,
          },
          {
            type: "slot",
            label: "操作",
            prop: "operation",
            slot_name: "operation",
            show_tooltip:false,
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
        // title: "",
        // poster: "",
        // description: "",
        // address: "",
        // finder: "",
        // phone: "",
      },
      imgList: [],
    };
  },
  mounted() {
    this.getPageList();
  },
  methods: {
    // 获取数据列表
    getPageList() {
      this.$http({
        url: "/loses",
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
    // 新增按钮或表格编辑按钮
    addOrEdit(data) {
      this.f_field = { ...data }; // 不展开data将会影响dialog表单和table
      this.dialogVisible = true;
    },
    // 表格领取按钮
    receive(data) {
      this.$prompt("请输入联系电话领取失物", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern:
          /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/,
        inputErrorMessage: "号码格式不正确",
      })
        .then(({ value }) => {
          this.$http({
            url: `/loses/${data._id}`,
            method: "post",
            data: {
              receiver: value.trim(),
            },
          }).then(({ code, msg }) => {
            this.$message({
              type: code == 200 ? "success" : "error",
              message: msg,
            });
            code === 200 && this.getPageList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    handleClose() {
      this.dialogVisible = false;
      this.imgList = [];
      this.$refs.dialog_form.resetFields();
    },
    handleRemove(file, fileList) {
      // file删除的那张图，剩下的照片墙fileList
      // 含name和url等服务器不需要的字段
      this.imgList = fileList;
      this.f_field.poster = "";
    },
    handleSuccess(response, file, fileList) {
      // 收集刚上传的图片
      this.imgList = fileList;
      // this.f_field.poster = response.data;
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
        this.f_field.poster = data.url;
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
            url: "/loses",
            method: "post",
            data: {
              ...this.f_field,
              isTrusted:undefined,
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