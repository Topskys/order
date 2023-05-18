<template>
  <div class="personal">
    <el-card shadow="never">
      <div slot="header">个人信息</div>
      <el-row :gutter="10" style="padding: 2%">
        <el-col :span="8">
          <div
            style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            "
          >
            <img
              :src="f_field.avatarUrl||'http://127.0.0.1:3000/uploads/1675506985747.png'||'https://thirdwx.qlogo.cn/mmopen/vi_32/OqbjGV9UibfRJj3d4Dia0MCk9Hx6Pr7NgDlibN8JTiaM9e8TSAx6Rynoyhpusl2RBw4kGlEMxOUEZ449bedX6Eicguw/132'"
              alt="404"
              style="
                display: block-inline;
                width: 100px;
                height: 100px;
                border-radius: 50%;
                margin: 50px 0;
              "
            />
            <el-upload
              action="http"
              accept=".jpg,.png"
              :http-request="handlerUpload"
              :show-file-list="false"
            >
              <el-button size="small" type="info">更换头像</el-button>
            </el-upload>
            <div style="padding: 50px 0; color: #646566">
              上次登录：<span>{{
                f_field.last ? `${f_field.last}` : f_field.current
              }}</span>
            </div>
          </div>
        </el-col>
        <el-col :span="12" style="text-align: left">
          <el-form ref="form" :model="f_field" label-width="80px">
            <el-form-item label="账户" required prop="username">
              <el-input
                v-model="f_field.username"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <!-- <el-form-item label="密码" required prop="password">
              <el-input
                v-model="f_field.password"
                type="password"
                placeholder="请输入"
                show-password
              ></el-input>
            </el-form-item> -->
            <el-form-item label="手机号" required prop="phone">
              <el-input
                type="number"
                v-model="f_field.phone"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item label="email" prop="email">
              <el-input
                type="email"
                v-model="f_field.email"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item label="类型" required prop="type">
              <el-select v-model="f_field.type" placeholder="请选择">
                <el-option label="normal" value="normal">normal</el-option>
                <el-option label="admin" value="admin">admin</el-option>
                <el-option label="super admin" value="super admin"
                  >super admin</el-option
                >
              </el-select>
            </el-form-item>
            <el-form-item label="状态" required prop="status">
              <el-input
                v-model="f_field.status"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div style="text-align: center; margin: 30px">
        <el-button @click="cancel" type="default">重 置</el-button>
        <el-button @click="save" type="primary">保 存</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getInfo } from "@/api/user.js";

export default {
  data() {
    return {
      f_field: {
        // username: "",
        // password: "",
        // avatarUrl:"",
        // phone: "",
        // email: "",
        // gender: "",
        // type: "",
        // status: "",
      },
    };
  },
  async beforeMount() {
    // 获取管理员信息
    const { data } = await getInfo();
    this.f_field = { ...data, password: "1234567890" }; // 显示假的密码，隐藏password
  },
  methods: {
    // 上传头像
    handlerUpload(data) {
      const { file } = data;
      const form = new FormData();
      form.append("file", file);

      this.$http({
        url:"upload",
        method: "POST",
        data:form
      }).then(({data}) => {
        this.f_field.avatarUrl=data.url ;
      });
    },
    // 提交表单
    save() {
      if(this.f_field.password=="jjjjjjjj") return this.$message({
        type: "warning",
        message:"password is more simpler, retry"
      })
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.$http({
            url: "/admins",
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
            this.getAdminInfo();
          });
        } else {
          this.$message("表单验证错误");
        }
      });
    },
    // 重置
    cancel() {
      this.$refs.form.resetFields();
    },
  },
};
</script>

<style lang='scss' scoped>
.personal {
  padding: 20px;
}
</style>