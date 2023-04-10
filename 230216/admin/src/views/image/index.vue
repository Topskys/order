<template>
  <div class="image-warp">
    <!-- <el-card shadow="never">
      
    </el-card> -->
    <!-- <button >del</button> -->
    <span class="image-item" v-for="item in images" :key="item">
      <img :src="item" alt="" />
      <i class="el-icon-delete" @click="del(item)"></i>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [],
      query: {
        page: 1,
        pageSize: 10,
      },
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.$image.getAll(this.query).then(({ data }) => {
        this.images = data || [];
      });
    },
    del(data = "http://localhost:3000/uploads/mnv��10.0.jpg") {
      if (data) {
        const arr = data.split("/") || [];
        this.$image.del({ file:arr.at(-1) }).then((code, msg) => {
          this.$message({
            type: "success",
            message: msg||"Success",
          });
          this.getList()
        });
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.image-warp {
  display: flex; /* 使用 Flexbox 布局 */
  flex-wrap: wrap; /* 允许元素换行 */
  justify-content: center; /* 水平居中对齐 */
  //align-items: center; /* 垂直居中对齐 */
  .image-item {
    width:25%;
    margin: 10px; /* 设置外边距 */
    position: relative;
    img {
      max-width: 100%; /* 图片宽度不超过容器宽度 */
      height: auto; /* 图片高度自适应 */
      display: block; 
    }
    i {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 18px;
      color: #335eea;
      padding: 5px;
      border-radius: 50%;
      display: none;
      transition: all 0.3s;
      // &:hover,&:focus {}
    }
    &:hover {
      i {
        display: block;
        cursor: pointer;
        background-color: rgba(255, 255, 255, 0.7);
      }
    }
  }
}
</style>