<!--
 * @Author: Topskys
 * @Date: 2023-02-16 22:28:45
 * @LastEditTime: 2023-04-01 09:56:24
-->
<template>
  <div class="container" @keyup="onKeyUp">
    <Aside></Aside>
    <main>
      <mavon-editor
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
        @save="save"
        @imgAdd="imgAdd"
        @imgDel="imgDel"
        @subfieldToggle="subfieldToggle"
      >
        <!-- <rightMenu ref="rightMenu"/> @contextmenu.prevent.native="openMenu($event)"-->
      </mavon-editor>
      <footer>
        <div class="toggle">
          <div class="collapse" @click="toggleAside">
            <i
              class="el-icon-arrow-left"
              title="关闭侧边栏"
              v-if="isCollapsed"
            ></i>
            <i class="el-icon-arrow-right" title="展开侧边栏" v-else></i>
          </div>
          <div class="toolbar" @click="toggleToolbar">
            <i class="el-icon-arrow-up" title="关闭工具栏" v-if="toolbar"></i>
            <i class="el-icon-arrow-down" title="展开工具栏" v-else></i>
          </div>
        </div>
        <div class="status">
          <div class="isSave status-item">
            <i
              class="el-icon-success"
              v-if="isSave"
              title="已保存"
              style="color: #67c23a"
            ></i>
            <i
              class="el-icon-error"
              v-else
              title="未保存"
              style="color: #f56c6c"
            ></i>
          </div>
          <div class="status-item">
            
          </div>
          <div class="character status-item">
            <span>{{ value.length }}</span>
            <span>字</span>
          </div>
        </div>
      </footer>
    </main>
  </div>
</template>

<script>
// 渲染进程
const { ipcRenderer } = window.require("electron");
const fs = window.require("fs");
const path = window.require("path");
// const Store = window.require("electron-store");

import { mapActions, mapGetters, mapState } from "vuex";
import Aside from "./AsideBar.vue";
import rightMenu from "../components/RightMenu/index.vue";
import File from "../renderer/file";
import notification from "../renderer/notice";
import mavonEditor from "../config/mavonEditor";
// import { copy, paste } from "../renderer/clipboard";
// import rightKey from "../components/rightKey/index.vue";

const { readStream, writeStream, createFile } = new File();
// const store = new Store();

export default {
  name: "Home",
  components: {
    Aside,
    rightMenu,
  },
  data() {
    return {
      /* 编辑的文本数据 */
      value: "",
      /* 选中文本 */
      selection: "",
      /* 编辑区配置 */
      toolbars: { ...mavonEditor },
    };
  },
  computed: {
    ...mapState("app", [
      "isCollapsed",
      "toolbar",
      "autoSave",
      "collapsedKey",
      "toolBarKey",
      "html",
      "lang",
      "fs",
      "subfield",
    ]),
    ...mapState({
      currFile: (state) => state.file?.currFile,
      isSave: (state) => state.file?.isSave,
      globKey: (state) => state.app.globKey,
      upload: (state) => (state.app.upload === "true" ? true : false),
      ishljs: (state) => (state.app.ishljs === "true" ? true : false),
    }),
    ...mapGetters("file", ["getCurrFile"]),
  },
  mounted() {
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
    ipcRenderer.on("saveAs", (e, data) =>
      createFile(data.filePath, this.value)
    );
  },
  unmounted() {},
  watch: {
    value: {
      handler(nv) {
        if (nv === this.value) {
          this.$store.dispatch("file/setIsSave", true);
        } else {
          this.$store.dispatch("file/setIsSave", false);
          // let timer = null;
          // clearTimeout(timer);
          // timer = setTimeout(() => {
          //   this.autoSave &&
          //     this.currFile?.filePath &&
          //     autoSaveFile(this.currFile?.filePath, nv); // writeFile
          // }, 5000);
        }

        // 之久化存储
        // store.set(this.currFile.uuid, nv);
        // console.log(store.get(this.currFile.uuid))
      },
    },
    currFile: {
      handler(nv) {
        this.readFileContent(nv);
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions("file", ["pushFiles", "removeFiles"]),
    // 监听键盘事件
    onKeyUp(e) {
      const collCode = this.collapsedKey.split("+").at(-1).trim().charCodeAt();
      const toolCode = this.toolBarKey.split("+").at(-1).trim().charCodeAt();
      // Ctrl + F 70
      if ((e.ctrlKey || e.metaKey) && e.keyCode === collCode) {
        e.preventDefault();
        this.globKey
          ? this.toggleAside()
          : notification({
              title: "Warning",
              body: "全局快捷键已关闭",
            });
      }
      // Ctrl + T 84
      if ((e.ctrlKey || e.metaKey) && e.keyCode === toolCode) {
        e.preventDefault();
        this.globKey
          ? this.toggleToolbar()
          : notification({
              title: "Warning",
              body: "全局快捷键已关闭",
            });
      }
    },
    // 保存，写入文件
    save() {
      writeStream(this.currFile?.filePath, this.value);
    },
    // 展开或关闭侧边栏
    toggleAside() {
      this.$store.dispatch("app/toggleCollapsed");
    },
    // 展开或关闭编辑区顶部工具栏
    toggleToolbar() {
      this.$store.dispatch("app/toggleToolbar");
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

      this.$http({
        url: "/upload",
        method: "POST",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(({ data }) => {
        $vm.$img2Url(data.url);
      });
    },
    // 删除图片
    imgDel() {},
    openMenu(e) {
      console.log("--", e);
      this.$refs.rightMenu.openMenu(e);
    },
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
      // &.shadow {
      //   border: 1px solid #f2f6fc ;
      // }
    }

    // }
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


