<!--
 * @Author: Topskys
 * @Date: 2023-02-16 22:28:45
 * @LastEditTime: 2023-02-27 12:38:13
 * @LastEditors: Please set LastEditors
 * @Description: 
-->
<template>
  <div class="container">
    <Aside></Aside>
    <mavon-editor v-model="value" :toolbarsFlag="showToolbar" @save="save" />
  </div>
</template>

<script>
// 渲染进程
const { ipcRenderer } = window.require("electron");
const fs = window.require("fs");
const path = window.require("path");
import { mapState } from "vuex";
// import rightKey from '../renderer/rightKey'
import Aside from "./aside.vue";
export default {
  name: "Home",
  data() {
    return {
      value: "",
      showToolbar: false, // 显示工具栏
      asideBar: true, // 侧边栏
    };
  },
  components: {
    Aside,
  },
  computed: {
    ...mapState({
      tb: (state) => state.showToolbar,
    }),
  },
  watch: {
    value: {
      handler(newValue) {
        // console.log(newValue);
      },
    },
  },
  mounted() {
    // 主动接收主进程发送的数据
    ipcRenderer.on("open", (e, data) => this.readFile(data));

    // 接收主进程展开或关闭工具栏信息
    ipcRenderer.on(
      "spread",
      (e, data) => (this.showToolbar = data || !this.showToolbar)
    );

    ipcRenderer.on("save-m", () => this.writeFile(this.value));
  },
  methods: {
    // 保存
    save() {
      this.writeFile(this.value);
    },
    // 读取文件，使用流读取文件内容
    readFile(data) {
      const readStream = fs.createReadStream(data.filePaths[0]);

      readStream.setEncoding("utf8");

      readStream.on("data", (chunk) => (this.value = chunk));

      readStream.on("error", (err) => console.error(err));
    },
    // 写入文件
    writeFile(data, filePath = `${new Date().getTime()}.md`) {
      filePath = /\.md$/.test(filePath) ? filePath : `${filePath}.md`;

      const writeStream = fs.createWriteStream(filePath);

      writeStream.write(data, "utf8");

      writeStream.end();

      // 处理流结束事件
      writeStream.on("finish", () =>
        ipcRenderer.send("save", { title: undefined, content: "保存成功" })
      );

      // 处理流错误事件
      writeStream.on("error", (err) => console.error("数据写入失败。", err));
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  .v-note-wrapper {
    flex: 1;
    box-shadow: none !important;
    min-height: 100vh;
    // &.shadow {
    //   border: 1px solid #f2f6fc ;
    // }
  }
}
</style>