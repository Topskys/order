<template>
  <div class="e-upload">
    <div class="images" v-if="images.length > 0">
      <div
        class="image-item"
        v-for="(item, i) in images"
        :key="`${item}-${Math.random() * 1000}}`"
      >
        <el-popover placement="left" title="" trigger="hover" width="300">
          <img v-if="item" :src="item" width="100%" />
          <img
            slot="reference"
            :src="item"
            style="height: 150px; width: 150px"
          />
        </el-popover>
        <i class="el-icon-delete" @click="removeImage(i)"></i>
      </div>
    </div>
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
        v-if="model === 'card'"
        class="upload-wrap"
        :class="{ 'is-round': isRound }"
        :style="[sizeStyle]"
      >
        <!-- <img v-else  v-if="imageUrl" :src="imageUrl" width="100%" height="100%" /> -->
        <i class="el-icon-plus"></i>
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
      type: [String, Number, Array, Object],
      default: "",
    },
  },
  data() {
    return {
      imageUrl: null,
      images: this.value, // 避免直接修改props,
    };
  },
  computed: {
    // 模式
    model() {
      return this.config?.model;
    },
    // css
    sizeStyle() {
      const width = this.config?.width || "150px";
      const height = this.config?.height || "150px";
      return { width, height };
    },
    isRound() {
      return this.config?.round || false;
    },
  },
  methods: {
    // 上传文件
    handlerUpload(data) {
      const { file } = data;
      // form -- 'Content-Type':'multiple/form-data'
      const form = new FormData();
      form.append("file", file);
      // 接口
      const req_data = { ...this.config?.request_data, data: form } || {
        url: this.url || this.config.url,
        method: this.method || this.config.method,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: form,
      };

      Axios(req_data).then((res) => {
        const data = res.data.data;
        this.images.push(data.url)
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
      // console.log("beforeUpload", file);
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
    removeImage(data) {
      console.log(data)
      this.images = this.images.filter((x, i) => i !== data && x);
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
.e-upload {
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