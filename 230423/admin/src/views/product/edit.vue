<template>
  <el-dialog
    :title="`${form._id ? '修改' : '新增'}`"
    :visible.sync="form.dialogVis"
    append-to-body
    width="60%"
    :before-close="handleClose"
  >
    <!-- <div class="form-head" style="margin-bottom: 40px">家政服务</div> -->
    <!-- 表单 -->
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-position="right"
      label-width="100px"
      style="max-width: 800px; margin: 0 auto"
    >
      <div class="r-flex">
        <el-form-item label="家政人员" prop="employee_name" required>
          <el-select
            v-model="form.employee_name"
            placeholder="请选择家政人员"
            @click.native="getEmpOption"
            style="width: 700px"
          >
            <el-option
              v-for="item in emps"
              :key="item._id"
              :label="item.name"
              :value="`${item.name}:${item._id}`"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="家政类别" prop="cate_title" required>
          <el-select
            v-model="form.cate_title"
            placeholder="请选择家政类别"
            @click.native="getCateOption"
            style="width: 700px"
          >
            <el-option
              v-for="item in cates"
              :key="item._id"
              :label="item.title"
              :value="`${item.title}:${item._id}`"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="服务描述">
          <el-input
            type="textarea"
            v-model="form.description"
            placeholder="请输入服务描述"
          ></el-input>
        </el-form-item>
        <el-form-item label="海报" required prop="poster" v-show="!form._id">
          <div class="form-upload">
            <el-upload
              action="http"
              list-type="picture-card"
              :on-remove="handleRemove"
              :http-request="handlerUpload"
              :limit="1"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="添加服务" v-show="form._id">
          <div class="expand">
            <div class="head-operation">
              <el-button
                type="primary"
                size="small"
                icon="el-icon-plus"
                style="float: right"
                @click="add()"
                >添加服务
              </el-button>
            </div>
            <el-table ref="table" :data="form.services">
              <el-table-column prop="title" label="服务" align="center">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'services.' + scope.$index + '.title'"
                    :rules="[
                      {
                        required: true,
                        message: '服务内容不能为空',
                        trigger: 'blur',
                      },
                    ]"
                    style="height: 100%"
                  >
                    <el-input
                      :disabled="scope.row.showSave"
                      v-model="scope.row.title"
                      size="small"
                    ></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="price" label="价格(元)" align="center">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'titles.' + scope.$index + '.price'"
                    :rules="[
                      {
                        required: true,
                        message: '价格不能为空',
                        trigger: 'blur',
                      },
                    ]"
                    style="height: 100%"
                  >
                    <el-input
                      type="number"
                      size="small"
                      v-model="scope.row.price"
                      :disabled="scope.row.showSave"
                    ></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <span
                    style="
                      display: flex;
                      align-items: center;
                      justify-content: center;
                    "
                  >
                    <el-button
                      type="primary"
                      size="small"
                      @click="itemSave(scope.row, scope.$index)"
                      :disabled="scope.row.showSave"
                      :v-show="!scope.row.showSave"
                      >保存</el-button
                    >
                    <el-button
                      type="danger"
                      size="small"
                      @click="del(scope.row, scope.$index)"
                      >删除</el-button
                    >
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSave">提交保存</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
      default: () => ({
        dialogVis: false,
      }),
    },
  },
  data() {
    return {
      // form
      form: {
        dialogVis: false,
        services: [],
      },
      rules: {},
      //
      emps: [],
      cates: [],
      // 上条服务是否已保存
      prevIsSave: true,
    };
  },
  watch: {
    config: {
      handler(nv) {
        this.form = { ...nv };
      },
      immediate: true,
    },
  },
  mounted () {
    if(this.form._id){
      this.form.services.map(item=>{
        this.$set(item,'showSave',true)
        return item;
      })
    }
  },
  methods: {
    getEmpOption() {
      this.$http({
        url: "/employee/wx",
      }).then((res) => {
        this.emps = res.data;
      });
    },
    getCateOption() {
      this.$http({
        url: "/category/wx",
      }).then((res) => {
        this.cates = res.data;
      });
    },
    // 保存服务项
    itemSave(row, index) {
      // this.form.services.map((item) => {
      //   if (!item.showSave) {
      //     this.prevIsSave = false;
      //   }else{
      //     this.prevIsSave = true;
      //   }
      // });
      if (this.prevIsSave) {
        this.$http({
          url: `/product/service/${this.form._id}`,
          method: "put",
          data: {
            ...this.form,
            service: { ...row,showSave:undefined },
          },
        }).then((res) => {
          row.showSave = true;
          this.prevIsSave = true;
          this.$message({
            type: res.code == 200 ? "success" : "error",
            message: res.msg,
          });
        });
      } else {
        this.$message({
          type: "error",
          message: "请先保存上一条服务",
        });
      }
    },
    // 弹窗关闭之前
    handleClose(){
      this.form.dialogVis=false,
      this.$emit("getData")
    },
    // 提交保存按钮(修改或添加)
    onSave() {
      this.$http({
        url: this.form._id ? `/product/${this.form._id}` : "/product",
        method: this.form._id ? "put" : "post",
        data: {
          ...this.form,
        },
      }).then((res) => {
        this.$message({
          type: res.code == 200 ? "success" : "error",
          message: res.msg,
        });
      });
    },
    handleRemove(file, fileList) {
      this.form.poster = "";
    },
    // 上传文件
    handlerUpload(data) {
      const form = new FormData();
      form.append("file", data.file);
      this.$http({
        url: "/upload",
        method: "post",
        data: form,
      }).then(({ url }) => {
        this.form.poster = url;
      });
    },
    // 重置按钮
    resetForm() {
      this.form = {
        services: [],
      };
    },
    // 添加服务按钮
    add() {
      if (!this.form._id) {
        this.$set(this.form, "services", []);
      }
      this.form.services.push({
        title: "",
        price: "",
        showSave: false,
      });
    },
    // 删除按钮
    async del(row, index) {
      this.prevIsSave = true;
      this.form.services.splice(index, 1);
      if (row.title && this.form._id) {
        const { code, msg } = await this.$http({
          url: `/product/${this.form._id}`,
          method: "put",
          data: {
            ...this.form,
          },
        });
        this.$message({
          type: code == 200 ? "success" : "warning",
          message: msg,
        });
      }
    },
  },
};
</script>

// <style lang='scss' scoped>
// .addOrEdit {
//   padding: 20px;
// }
//
</style>