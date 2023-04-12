<!--
 * @Author: Topskys
 * @Date: 2023-02-16 22:28:45
 * @LastEditTime: 2023-04-12 22:11:24
-->
<template>
  <div class="container">
    <AsideBar></AsideBar>
    <main>
      <VueMavonEditor
        ref="mdr"
        v-model="value"
        :toolbars="toolbars"
        :boxShadow="false"
        :toolbarsFlag="toolbar"
        :shortCut="globKey"
        :subfield="subfield"
        :html="html"
        :ishljs="ishljs"
        :language="lang"
        :fontSize="`${fs}px`"
        :code_style="code_style"
        @save="save"
        @imgAdd="imgAdd"
        @imgDel="imgDel"
        @subfieldToggle="subfieldToggle"
        :external-link="externalLink"
      >
      </VueMavonEditor>
      <FooterStatus :length="value.length"></FooterStatus>
    </main>
  </div>
</template>



<script>
// 渲染进程
const { ipcRenderer } = window.require("electron");
const fs = window.require("fs");
const path = window.require("path");
import File from "../renderer/file";
// import notification from "../renderer/notice";

// Vuex
import { mapActions, mapGetters, mapState } from "vuex";
// 组件
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import FooterStatus from "@/components/Footer/index.vue";
import AsideBar from "./AsideBar1.vue";
// import Terminal from "../components/Terminal/index.vue";
// config
import homeState from "@/config/homeMapState.js";
import mavonEditorConfig from "@/config/mavonEditor";
// 实例化
const { readStream, writeStream, createFile, openDirectoryPicker } = new File();

export default {
  name: "Home",
  components: {
    VueMavonEditor: mavonEditor,
    AsideBar,
    // Terminal,
    FooterStatus,
  },
  data() {
    return {
      /* 编辑的文本数据 */
      value: "",
      /* 选中文本 */
      selection: "",
      /* 编辑区配置 */
      toolbars: { ...mavonEditorConfig },
      /* Terminal */
      drawer: true,
      direction: "btt",
      cmd: "",
      ps: "",
      code_style: "",
      externalLink: {
        markdown_css: () => "/md/markdown/github-markdown.min.css",
        hljs_js: () => "/md/highlightjs/highlight.min.js",
        hljs_css: (css) => "/md/highlightjs/styles/" + css + ".min.css",
        hljs_lang: (lang) => "/md/highlightjs/languages/" + lang + ".min.js",
        katex_css: () => "/md/katex/katex.min.css",
        katex_js: () => "/md/katex/katex.min.js",
      },
    };
  },
  computed: {
    ...homeState.app,
    ...homeState.mixins,
    ...mapGetters("file", ["getCurrFile"]),
  },
  mounted() {
    this.code_style = "solarized-dark";
    // 打开文件并修改当前文件
    ipcRenderer.on("openFile", (e, filePath) => {
      filePath &&
        this.pushFiles({
          filePath,
          curr: true,
        });
    });
    // 文件保存按钮
    ipcRenderer.on("saveFile", () => this.save());
    // 主菜单栏另存为
    ipcRenderer.on("saveAs", (e, data) => {
      return createFile(data.filePath, this.value);
    });
  },
  methods: {
    ...mapActions("file", ["pushFiles", "removeFiles"]),
    ...mapActions("app", ["toggleCollapsed", "toggleToolbar"]),

    // 监听键盘事件
    onKeyUp(e) {
      const tip = () => {
        notification({
          title: "Warning",
          body: "全局快捷键已关闭",
        });
      };
      console.log(
        this.collapsedKey.split("+").at(-1).trim(),
        this.toolBarKey.split("+")
      );
      const colCode = this.collapsedKey.split("+").at(-1).trim().charCodeAt();
      const tolCode = this.toolBarKey.split("+").at(-1).trim().charCodeAt();

      // Ctrl + F 70
      if ((e.ctrlKey || e.metaKey) && e.keyCode === colCode) {
        e.preventDefault();
        this.globKey ? this.toggleCollapsed() : tip();
      }
      // Ctrl + T 84
      if ((e.ctrlKey || e.metaKey) && e.keyCode === tolCode) {
        e.preventDefault();
        this.globKey ? this.toggleToolbar() : tip();
      }
    },
    // 保存，写入文件
    save() {
      writeStream(this.currFile?.filePath, this.value);
    },
    // 单双栏
    subfieldToggle() {
      this.$store.dispatch("app/toggleSubfield");
    },
    // 读取文件内容
    readFileContent(file) {
      readStream(file.filePath)
        .then((res) => {
          this.value = res.toString(); // Buffer 》》 string
        })
        .catch((err) => {
          this.removeFiles(file);
          this.$message({
            type: "info",
            message: "文件读取失败",
          });
        });
    },
    // 上传图片
    imgAdd(e, $file) {
      let formData = new FormData();
      formData.append("file", $file);

      // this.$http({
      //   url: "/upload",
      //   method: "POST",
      //   data: formData,
      //   headers: { "Content-Type": "multipart/form-data" },
      // }).then(({ data }) => {
      //   $vm.$img2Url(data.url);
      // });
    },
    // 删除图片
    imgDel() {},
    openMenu(e) {
      console.log("--", e);
      // this.$refs.rightMenu.openMenu(e);
    },
    // 读取文件夹
    openDirectory() {},
  },
  watch: {
    value: {
      handler(nv) {
        if (nv === this.value) {
          this.$store.dispatch("file/setIsSave", true);
        } else {
          this.$store.dispatch("file/setIsSave", false);
        }
      },
    },
    // currFile: {
    //   handler(nv) {
    //     this.readFileContent(nv);
    //   },
    //   immediate: true,
    // },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  overflow: hidden;
  main {
    flex: 1;
    overflow: hidden;
    .v-note-wrapper {
      position: relative;
      box-shadow: none !important;
      width: inherit;
      max-width: 100vw;
      height: calc(100vh - 30px);
      overflow: hidden;
      border: none;
    }

    footer {
      height: 30px;
      width: inherit;
      // overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid $border-clr-1;
      color: $text-clr-6;
      font-size: $fs12;
      padding-left: 4px;
      user-select: none;

      .toggle {
        display: flex;
        align-items: center;

        .collapse,
        .toolbar {
          font-size: $fs14;
          i {
            padding: 5px 8px;
            border-radius: 3px;
            transition: 0.3s;
            &:hover {
              background-color: $bg-1;
            }
          }
        }
      }

      .status {
        display: flex;
        align-items: center;
        .status-item {
          padding: 0 10px;
          &:first-child {
            padding: 0px;
          }
        }
        .character {
          padding-right: 25px;
          span {
            &:first-child {
              padding-right: 5px;
            }
          }
        }
      }
    }
  }
}
</style>


