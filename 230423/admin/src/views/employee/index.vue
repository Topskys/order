// 服务人员管理
<template>
  <div class="employee">
    <el-card shadow="never" style="margin-bottom: 10px">
      <!-- 表单 -->
      <el-form
        :model="form"
        ref="form"
        :inline="true"
        @keyup.enter.native="getPageList()"
      >
        <div class="form-head" style="margin-bottom: 40px">查找搜索</div>
        <el-form-item label="名称：">
          <el-input
            v-model="form.name"
            placeholder="请输入名称"
            prefix-icon="el-icon-search"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input
            v-model="form.phone"
            placeholder="请输入手机号"
            prefix-icon="el-icon-search"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getPageList()" icon="el-icon-search"
            >搜索</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="never">
      <el-button
        type="primary"
        @click="addOrEdit"
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
            >删除</el-button
          >
        </template>
      </e-table>
    </el-card>

    <!-- Dialog 表单 :rules="f_rules"-->
    <el-dialog
      :title="`${f_field._id ? '修改信息' : '新增服务人员'}`"
      :visible.sync="dialogVisible"
      append-to-body
      width="60%"
    >
      <el-form
        ref="dialog_form"
        :model="f_field"
        label-width="80px"
        style="margin: 0 auto; max-width: 700px"
      >
        <el-form-item label="名称" required prop="name">
          <el-input v-model="f_field.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="工号" required prop="id">
          <el-input
            v-model="f_field.id"
            type="number"
            placeholder="请输入工号"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" required prop="gender">
          <el-select placeholder="请选择" v-model="f_field.gender">
            <el-option label="男" value="男"> </el-option>
            <el-option label="女" value="女"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" required prop="age">
          <el-input v-model="f_field.age" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item label="手机号" required prop="phone">
          <el-input
            v-model="f_field.phone"
            type="number"
            placeholder="请输入手机号码"
          ></el-input>
        </el-form-item>
        <el-form-item label="地址" required prop="address">
          <el-input
            v-model="f_field.address"
            placeholder="请输入地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="类别" required prop="category">
          <el-select placeholder="请选择" v-model="f_field.category">
            <el-option value="清洁"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作经验" required prop="experience">
          <el-input
            v-model="f_field.experience"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="技能" required prop="skill">
          <el-input
            type="textarea"
            v-model="f_field.skill"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="f_field.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
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
  name: "employees",
  components: {
    "e-table": () => import("@/components/common/table/index.vue"),
    "e-form": () => import("@/components/common/form/index.vue"),
  },
  data() {
    return {
      form: {
        name: "",
        phone: "",
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
            prop: "name",
            label: "名称",
          },
          {
            type: "text",
            prop: "gender",
            label: "性别",
          },
          {
            type: "text",
            prop: "phone",
            label: "手机号",
          },
          {
            type: "text",
            prop: "age",
            label: "年龄",
          },
          {
            type: "text",
            prop: "category",
            label: "家政类型",
          },
          {
            type: "text",
            prop: "address",
            label: "地址",
          },
          {
            type: "text",
            prop: "experience",
            label: "工作经验",
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
            type: "function",
            prop: "updatedAt",
            label: "更新日期",
            cb:({updatedAt})=>{
              const d=new Date(updatedAt).toGMTString();
              return new Date(d).toLocaleString().replace(/\//g,'-')
            }
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
      f_field: {},
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
        url: "/employee",
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
    // 新增或编辑按钮事件回调
    addOrEdit(data) {
      this.f_field = {
        ...data,
      };
      this.dialogVisible = true;
    },
    // 表格编辑按钮事件回调
    edit(data) {
      this.f_field = {
        ...data,
      };
      this.dialogVisible = true;
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
            url: `/employee/${data._id}`,
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
            url: this.f_field._id?`/employee/${this.f_field._id}`:'/employee',
            method: this.f_field._id?'put':"post",
            data: {
              ...this.f_field,
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
.employee {
  padding: 20px;
}
</style>