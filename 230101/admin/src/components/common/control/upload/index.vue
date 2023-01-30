<template>
  <div class="e-upload">
    <el-upload
      action="http"
      :on-exceed="onExceed"
      :before-upload="beforeUpload"
      :on-preview="handlePreview"
      :before-remove="beforeRemove"
      :on-remove="handleRemove"
      :show-file-list="config.show_files"
      :http-request="handlerUpload"
      :accept="config.accept"
      :multiple="config.multiple"
      :limit="config.limit || 1"
    >
      <el-button v-if="model === 'button'" type="primary" size="small"
        >点击上传</el-button
      >
      <div
        v-if="model  === 'card'"
        class="upload-wrap"
        style="width:150px;height:150px;"
        :class="{ 'is-round': isRound }"
        :style="[sizeStyle]"
      >
        <img v-if="value" :src="value" width="100%" height="100%" />
        <i v-else class="el-icon-plus"></i>
      </div>
    </el-upload>
  </div>
</template>
<script>
// import { props, mixin } from "../mixin";
import Axios from "axios";
export default {
  name: "e-upload",
  // mixins: [mixin],
  props: {
    // ...props,
    config: {
            type: Object,
            default: () => ({}),
        },
        value: {
            type: [String,Number,Array,Object],
            default: "",
        },
  },
  data() {
    return {
      imageUrl: "",
    };
  },
  computed: {
    // 模式
    model() {
      return this.config?.model;
    },
    // css
    sizeStyle() {
      const width = this.config?.width || "100px";
      const height = this.config?.height || "100px";
      return { width, height };
    },
    isRound() {
      return this.config?.round || false;
    },
  },
  beforeMount() {
    this.imageUrl=this.value;
    console.log('e-upload..config--',this.config)
  },
  methods: {
    // 上传文件
    handlerUpload(data) {
      const { file } = data;
      // form -- 'Content-Type':'multiple/form-data'
      const form = new FormData();
      form.append("file", file);
      // 接口
      const req_data = {...this.config?.request_data,data:form}||{
        url: this.url||this.config.url,
        method: this.method|| this.config.method,
        headers: {
          "Content-Type": "multiple/form-data",
        },
        data: form,
      };
      Axios(req_data).then((res) => {
        const data = res.data.data;
        this.imageUrl = data.url;
      });
    },
    /**
     * 超出选择数量
     */
    onExceed() {
      console.log("超出选择数量");
    },
    /**
     * 上传之前
     */
    beforeUpload(file) {
      console.log("beforeUpload", file);
      // const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < this.config.max_size;

      //   !isJPG && this.$message.error('上传头像图片只能是 JPG 格式!');

      !isLt2M &&
        this.$message.error("请上传小于`${this.config.max_size}`MB!的文件");

      //   return isJPG && isLt2M;
    },
    handleSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    /**
     * 删除之前
     */
    beforeRemove() {
      return new Promise((resolve, reject) => {
        this.$message("是否删除文件", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            resolve();
          })
          .catch(() => {
            reject();
          });
      });
    },
    /**
     * 删除
     */
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    /**
     * 文件预览
     */
    handlePreview(file) {
      console.log(file);
    },
  },
};
</script>

<style lang="scss" scoped>
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