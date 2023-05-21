<template>
  <div class="edit-container">
    <el-dialog
      :title="`${form._id ? '编辑' : '新增'}`"
      :visible.sync="dialogVis"
      width="70%"
      append-to-body
      :close-on-click-modal="false"
    >
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first">
          <el-form
            ref="form"
            :model="form"
            :rules="formRules"
            label-width="80px"
            style="min-width: 500px; max-width: 800px; margin: 0 auto"
          >
            <el-form-item label="标题" prop="title" required>
              <el-input v-model="form.title" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="描述" prop="description" required>
              <el-input
                type="textarea"
                v-model="form.description"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item label="海报" prop="poster" required>
              <a :href="form.poster" v-if="form.poster">{{ form.poster }}</a>
              <input
                type="file"
                @change="onChange($event, form)"
                accept=".png,.jpg,.webapp"
                v-else
                style="color: #aaa !important; font-size: 14px"
              />
            </el-form-item>
            <el-form-item label="类别" prop="class_name">
              <div class="r-flex">
<el-select v-model="form.class_name" placeholder="请选择" @click.native="getCategory">
                <el-option
                  v-for="item in categories"
                  :key="item._id"
                  :label="item.name"
                  :value="`${item.name}:${item._id}`"
                >
                </el-option>
              </el-select>
              <!-- <el-button @click='addCate' type='primary' icon='el-icon-plus' style="margin-left:10px;" size='mini'>添加</el-button> -->
              </div>
            </el-form-item>
            <el-form-item label="在售" prop="status">
              <el-switch v-model="form.status" />
            </el-form-item>
            <el-form-item label="图文" v-show="!form._id">
              <div class="form-upload">
                <el-upload
                  action="http"
                  list-type="picture-card"
                  :on-remove="handleRemove"
                  :on-success="handleSuccess"
                  :http-request="handlerUpload"
                  multiple
                  :limit="3"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
              </div>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="服务信息" name="second">
          <Expand :data="form.selections" :product_id="form._id" />
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel" size="small">取 消</el-button>
        <el-button type="primary" @click="confirm" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import eTable from "@/components/common/table";
import Expand from "./edit-expand.vue";


export default {
  components: {
    eTable,
    Expand,
   
  },
  props: {
    dialogVis: {
      type: Boolean,
      default:false,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      // Tabs
      activeName: "first",
      // form form
      form: {
        poster: "",
        images: [],
        selections: [],
      },
      formRules: {},
      // expand
      expandData: [],
      // 分类数据
      categories: [],
    };
  },
  watch: {
    data: {
      handler(newValue) {
        if (newValue._id) {
          this.form = { ...newValue };
        }
      },
    },
  },
  methods: {
    handleClick(tab, event) {
      this.activeName = tab.name;
      if (this.activeName == "second" && this.form._id) {
        this.$product.getService(this.form._id).then(({ data }) => {
          this.expandData = data || [];
        });
      }
    },
    cancel() {
      this.resetData();
    },
    async confirm() {
      if (this.activeName === "first") {
        const { code, msg } = await this.$product.addOrEditProduct(this.form);
        this.$message({
          type: code == 200 ? "success" : "error",
          message: msg,
        });
      }
      this.activeName == "second" && this.resetData();
    },
    resetData() {
      // this.$emit("update:dialogVis", false);
      this.dialogVis=false
      this.$emit("reReqList");
      this.activeName = "first";
      this.form={}
    },
    // 图片上传
    handleRemove(file, fileList) {
      // file删除的那张图，剩下的照片墙fileList
      // 含name和url等服务器不需要的字段
      this.form.images = fileList;
    },
    handleSuccess(response, file, fileList) {
      // console.log("response--", file, fileList);
      // this.form.images = fileList;
    },
    // 上传海报
    async onChange(e, form) {
      const { url } = await this.uploadFile(e.target.files[0]);
      form.poster = url;
    },
    // 上传图片描述
    async handlerUpload(data) {
      const { url } = await this.uploadFile(data.file);
      this.form.images.push(url);
    },
    // 上传
    uploadFile(file) {
      const form = new FormData();
      form.append("file", file);
      return this.$http({
        url: "/upload",
        method: "post",
        data: form,
      });
    },
    // 获取分类数据
    getCategory() {
      this.$http({
        url: "/class",
      }).then((res) => {
        this.categories = res.data || [];
      });
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__header {
  border-bottom: 1px solid #e8e8e8;
}

.form-upload {
  display: flex;
  .images {
    display: flex;
    .image-item {
      margin-right: 10px;
      position: relative;
      .el-icon-delete {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: none;
        color: white;
        font-size: 16px;
      }
      &:hover {
        .el-icon-delete {
          display: block;
          // color: #409eff;
        }
      }
    }

    img {
      border-radius: 6px;
    }
  }
}
.upload-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  &:hover {
    border-color: #409eff;
  }
}
.is-round {
  border-radius: 50%;
}
</style>