<!--
 * @Author: Topskys
 * @Date: 2023-02-27 12:29:23
 * @LastEditTime: 2023-04-16 22:04:23
-->
<template>
  <aside
    v-show="isCollapsed"
    class="asideBar"
    :class="{ 'slide-right': isCollapsed }"
  >
    <div class="resizable"></div>
    <div class="line"></div>
    <div class="aside-content">
      <div class="search">
        <span v-show="!showInput">本地</span>
        <input
          type="text"
          v-model="keyword"
          placeholder="Search..."
          pattern=".*\S.*"
          ref="searchInput"
          :class="{ showInput: showInput }"
          @blur="onBlur"
        />
        <i class="el-icon-search" @click="searchClick"></i>
      </div>
      <el-tree
        ref="tree"
        :data="fileTree"
        :props="defaultProps"
        :highlight-current="true"
        icon-class="el-icon-arrow-right"
        @node-click="handleNodeClick"
        :filter-node-method="filterNode"
        @node-contextmenu="handleContextMenu"
        class="fileTree"
        v-if="fileTree.length>0"
      ></el-tree>
      <ul v-else>
        <li
          v-for="file in fileList"
          :key="file.uuid"
          :class="{ active: file.uuid === activeId }"
          :title="file.name"
          @contextmenu.prevent="onContextMenu"
        >
          <svg-icon icon="document" />
          <span @click="setCurrFile(file)">{{ file.name }}</span>
          <i
            class="el-icon-close"
            @click="removeFiles(file)"
            title="移除文件"
          ></i>
        </li>
      </ul>
      <context-menu
        :context-menu-show.sync="contextShow"
        :config="contextConfig"
        @newFile="onNewFile"
        @newFolder="onNewFolder"
        @rename="onRename"
        @delete="onDelete"
      >
      </context-menu>
    </div>
  </aside>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ETooltip from "@/components/tooltip/index.vue";
import Sign from "@/components/Sign/index.vue";
import contextMenu from "@/components/ContextMenu/index.vue";
import file from "../store/modules/file";
import { createFileTree } from "@/renderer/createFileTree.js";

const { ipcRenderer } = window.require("electron");

export default {
  name: "AsideBar",
  components: {
    ETooltip,
    Sign,
    contextMenu,
  },
  data() {
    return {
      keyword: "",
      showInput: false,
      fileList: [],
      dialogVisible: false,
      contextShow: false,
      contextConfig: {
        // 右键点击距左位置
        offsetLeft: 0,
        // 右键点击距上位置
        offsetTop: 0,
        // menuList: [
        //   // 无需按键监听可以不传keyCode
        // ],
      },

      fileTree: [],
      defaultProps: {
        children: "children",
        label: "label",
        id: "id",
        type: "type",
        filePath: "filePath",
      },
    };
  },
  mounted() {
    // 打开文件夹
    ipcRenderer.on("openDir", (e, dir) => dir && this.getFileTree(dir));
  },
  computed: {
    ...mapState({
      isCollapsed: (state) => state.app.isCollapsed,
      files: function (state) {
        this.fileList = state.file.files;
        return state.file.files;
      },
      activeId: (state) => state.file.activeId,
      username: (state) => state.user.userInfo?.username || "",
      token: (state) => state.user.token || "",
    }),
  },
  watch: {
    // 监听关键词的变化，进行模糊搜索
    keyword: {
      handler(nv) {
        //                this.fileList = nv.trim()
        //                    ? this.files.filter((file) => file.name.indexOf(nv) > -1 && file)
        //                    : this.files;

        this.$refs.tree.filter(nv);
      },
    },
  },
  methods: {
    ...mapActions("file", ["setCurrFile", "removeFiles"]),
    ...mapActions("user", ["setVisiable", "logout"]),
    onBlur() {
      this.showInput = false;
      this.keyword = "";
    },
    getFileTree(dir) {
      dir && createFileTree(dir).then((res) => (this.fileTree = res || []));
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleNodeClick(data) {
      // console.log(data);
      data.filePath && data.type === "file" && this.$emit("fileData", data);
    },
    // 修改当前文件
    updateCurrFile() {},
    // 新建文件的加号
    newFile: () => ipcRenderer.send("new"),
    // 登录注册窗口
    sign() {
      this.dialogVisible = !this.dialogVisible;
    },
    searchClick() {
      this.showInput = !this.showInput;
      if (this.showInput) {
        this.$refs.searchInput && this.$refs.searchInput.focus();
      }
    },
    onContextMenu({ clientX, clientY }) {
      Object.assign(this, {
        contextConfig: {
          offsetLeft: clientX,
          offsetTop: clientY,
        },
        contextShow: true,
      });
    },
    // 右键菜单项处理事件
    onNewFile(item) {},
    onNewFolder(item) {},
    onRename(item) {},
    onDelete(item) {},
    handleContextMenu(e, data, node, el) {
      let menuList = [
        {
          label: "New File",
          id: 1,
          des: "N",
          keyCode: 77,
          emitType: "newFile",
        },
        {
          label: "New Folder",
          id: 2,
          des: "F",
          keyCode: 70,
          emitType: "newFolder",
        },
        { label: "Rename", id: 3, des: "R", keyCode: 82, emitType: "rename" },
        { label: "Delete", id: 4, des: "D", keyCode: 68, emitType: "delete" },
      ];
      if (node.data.type.indexOf("file") !== -1) {
        this.contextConfig.menuList = menuList.slice(2);
      } else {
        this.contextConfig.menuList = menuList;
      }
      console.log(this.contextConfig.menuList);

      this.onContextMenu(e);
    },
  },
};
</script>

<style lang="scss" scoped>
.asideBar {
  height: 100vh;
  //   overflow: hidden;
  position: relative;
  z-index: 1699;
  /* 拖拽盒子 */
  .resizable {
    min-width: 170px;
    max-width: 500px;
    height: 16px;
    transform: scaleY(100);
    /* 盒子大小可变 */
    resize: horizontal;
    cursor: ew-resize;
    overflow: scroll;
    opacity: 0;
    pointer-events: none;

    // &::-webkit-scrollbar {
    //   width: 200px;
    //   height: 100vh;
    // }
    &:hover + .line,
    &:active + .line {
      opacity: 1;
    }
  }

  // 拖拽线
  .line {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 4px;
    pointer-events: none;
    background-color: transparent;
    border-right: 1px solid $border-clr-1;
    // background-color: $bg-1;
    transition: 0.3s;
  }

  // 内容
  .aside-content {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 4px;
    height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .search {
      padding: 5px 6px 5px 10px;
      position: relative;
      width: 100%;
      height: 35px;
      line-height: 35px;
      border-bottom: 1px solid #eee;
      font-size: 14px;
      overflow: hidden;

      span {
        position: absolute;
        top: 50%;
        left: 12px;
        transform: translate(0, -50%);
        font-size: 12px;
      }

      input {
        width: 0;
        height: 0;
        border: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        /*去掉input默认样式*/
        -webkit-appearance: none;
        -moz-appearance: none;
        font-size: 1em;
        color: #6a6f77;
        /*去掉input轮廓*/
        outline: 0;
        transition: 0.2s;
        background: transparent;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
      }

      input::-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        font-size: $fs14;
      }

      input::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        font-size: $fs14;
      }

      input::-webkit-input-placeholder {
        font-size: $fs14;
      }

      input[type="text"]:focus {
        border-color: #bbb;
      }

      .el-icon-search {
        position: absolute;
        top: 50%;
        right: 6px;
        transform: translateY(-50%);
        color: $text-clr-2;
      }

      .showInput {
        display: inline-block;
        width: calc(100% - 6px);
        height: 25px;
        padding: 2px 10px;
        border: 1px solid #c8cccf;
        border-color: $border-clr-1;
        border-radius: 4px;
      }
    }

    // ul {
    //   flex: 1;
    //   padding: 5px 0;
    //   overflow: auto;
    //   height: calc(100% - 58px);
    //   user-select: none;
    //   li {
    //     list-style: none;
    //     display: flex;
    //     align-items: center;
    //     padding: 5px 10px;
    //     margin: 5px 0;
    //     // border-bottom: 1px solid $border-clr-1;
    //     border-radius: 4px;
    //     transition: 0.3s;
    //     position: relative;
    //     font-size: $fs14;
    //     cursor: pointer;

    //     span {
    //       flex: 1;
    //       padding-left: 5px;
    //       overflow: hidden;
    //       white-space: nowrap;
    //       text-overflow: ellipsis;
    //       color: #1d273b;
    //     }
    //     .el-icon-close {
    //       position: absolute;
    //       top: 50%;
    //       right: 5px;
    //       transform: translateY(-50%);
    //       opacity: 0;
    //       transition: 0.3s;
    //       padding: 2px;
    //       border-radius: 100%;
    //       &:hover {
    //         background-color: #ccc;
    //       }
    //     }

    //     &:hover,
    //     &:focus {
    //       background-color: $bg-1;
    //       .el-icon-close {
    //         opacity: 1;
    //       }
    //     }
    //   }
    // }
    footer {
      color: $text-clr-6;
      font-size: $fs14;
      width: 100%;
      height: 30px;
      line-height: 30px;
      padding-left: 5px;
      border-top: 1px solid $border-clr-1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: absolute;
      left: 0;
      bottom: 0;

      i {
        padding: 5px 8px;
        border-radius: 3px;
        transition: 0.3s;
        cursor: pointer;
        position: relative;

        &:hover {
          background-color: $bg-1;
        }
      }

      i:hover:after {
        position: absolute;
        top: -35px;
        left: 0;
        // z-index: 1000;
        content: attr(data-title);
        //在这里设内置好title出现的位容置就好了
        color: $text-clr-8;
        font-size: $fs12;
        border: 1px solid $border-clr-3;
        border-radius: 2px;
        background-color: white;
        white-space: nowrap;
        padding: 5px 10px;
      }
    }
  }
}

.active {
  background-color: $bg-1;
  position: relative;
  transition: 0.3s;

  &::before {
    content: "";
    width: 3px;
    height: 28px;
    background-color: #1d273b; // #6a6f77;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
    position: absolute;
    top: 0px;
    left: 0px;
  }
}

// ul::-webkit-scrollbar {
//   width: 0px;
//   height: 0px;
//   // background-color: rgba(0, 0, 0, 0);
//   // opacity: 0;
// }

.fileTree {
  width: 100%;
  height: 100%;
  color: #333; //$text-clr-6;
  overflow: auto;
  ::v-deep .el-icon-arrow-right {
    color: #333;
    font-size: 14px;
  }
  ::v-deep .el-tree-node__expand-icon.is-leaf {
    color: transparent !important;
  }
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: rgba(0, 0, 0, 0);
  }

  &::-webkit-scrollbar-track {
    border-radius: 6px;
    background-color: rgba(0, 0, 0, 0);
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    // background-color: #ddd;
    background-color: #f5f5f7;
  }

  &::-webkit-scrollbar-thumb:hover {
    // background-color: #c7c7c7;
    background-color: #eee;
  }
}
</style>