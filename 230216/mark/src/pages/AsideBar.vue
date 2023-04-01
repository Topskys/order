<!--
 * @Author: Topskys
 * @Date: 2023-02-27 12:29:23
 * @LastEditTime: 2023-03-27 23:34:59
-->
<template>
  <div
    class="collapse"
    :class="{ 'slide-right': isCollapsed }"
    :style="{ Width: isCollapsed && '160px' }"
  >
    <div class="resizable" v-show="isCollapsed"></div>
    <div class="line"></div>

    <aside>
      <div class="search">
        <span v-show="!showInput">文件</span>
        <input
          type="text"
          v-model="keyword"
          placeholder="Search..."
          pattern=".*\S.*"
          ref="searchInput"
          :class="{ showInput: showInput }"
          @blur="showInput = false"
        />
        <i class="el-icon-search" @click="searchClick"></i>
      </div>
      <ul v-if="files.length">
        <li
          v-for="file in fileList"
          :key="file.uuid"
          :class="{ active: file.uuid === activeId }"
          :title="file.name"
        >
          <svg
            t="1678678807322"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4584"
            width="18"
            height="18"
          >
            <path
              d="M576 742.4H324.267c-12.8 0-21.334 8.533-21.334 21.333s8.534 21.334 21.334 21.334H576c12.8 0 21.333-8.534 21.333-21.334S584.533 742.4 576 742.4zM699.733 576H324.267c-12.8 0-21.334 8.533-21.334 21.333 0 12.8 8.534 21.334 21.334 21.334h375.466c12.8 0 21.334-8.534 21.334-21.334 0-12.8-8.534-21.333-21.334-21.333zM324.267 281.6h102.4c12.8 0 21.333-8.533 21.333-21.333 0-12.8-8.533-21.334-21.333-21.334h-102.4c-12.8 0-21.334 8.534-21.334 21.334 0 12.8 8.534 21.333 21.334 21.333zM678.4 55.467H221.867c-46.934 0-85.334 38.4-85.334 85.333v750.933c0 46.934 38.4 85.334 85.334 85.334H806.4c46.933 0 85.333-38.4 85.333-85.334V281.6L678.4 55.467z m166.4 832c0 21.333-17.067 42.666-42.667 42.666H221.867c-21.334 0-42.667-17.066-42.667-42.666V136.533c0-21.333 17.067-42.666 42.667-42.666h375.466v209.066c0 21.334 17.067 42.667 42.667 42.667h209.067v541.867zM635.733 302.933V93.867h21.334L844.8 302.933H635.733z m-332.8 123.734c0 12.8 8.534 21.333 21.334 21.333h375.466c12.8 0 21.334-8.533 21.334-21.333 0-12.8-8.534-21.334-21.334-21.334H324.267c-12.8 4.267-21.334 12.8-21.334 21.334z"
              p-id="4585"
              fill="#4b4b4b"
            ></path>
          </svg>
          <span @click="setCurrFile(file)">{{ file.name }}</span>
          <i
            class="el-icon-close"
            @click="removeFiles(file)"
            title="移除文件"
          ></i>
        </li>
      </ul>
      <footer>
        <i class="el-icon-plus" @click="newFile" data-title="新建文件"></i>
        <span
          class="el-icon-user-solid"
          @click="logout"
          :title="username"
          v-if="token && username"
          style="color: #67c23a"
        ></span>
        <i class="el-icon-user" @click="sign" data-title="登录" v-else></i>
      </footer>
      <Sign :dialogVisible.sync="dialogVisible" />
    </aside>
    <!-- <rightMenu ref="rightMenu"/>  @contextmenu.prevent.native="openMenu($event)"-->
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ETooltip from "../components/tooltip/index.vue";
import Sign from "../components/sign/index.vue";
import rightMenu from "../components/RightMenu/index.vue";
import file from "../store/modules/file";
const { ipcRenderer } = window.require("electron");

export default {
  name: "AsideBar",
  components: {
    ETooltip,
    Sign,
    rightMenu,
  },
  data() {
    return {
      keyword: "",
      showInput: false,
      fileList: [],
      dialogVisible: false,
    };
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
        this.fileList = nv.trim()
          ? this.files.filter((file) => file.name.indexOf(nv) > -1 && file)
          : this.files;
      },
    },
  },
  methods: {
    ...mapActions("file", ["setCurrFile", "removeFiles"]),
    ...mapActions("user", ["setVisiable", "logout"]),
    // 修改当前文件
    updateCurrFile() {},
    // 新建文件的加号
    newFile: () => ipcRenderer.send("new"),
    // 登录注册窗口
    sign() {
      // if (!this.token || this.userInfo == {}) {
      //   ipcRenderer.send("sign", true);
      // }
      this.dialogVisible = !this.dialogVisible;
    },
    searchClick() {
      this.showInput = !this.showInput;
      if (this.showInput) {
        this.$refs.searchInput && this.$refs.searchInput.focus();
      }
    },
    openMenu(e) {
      console.log("--", e);
      this.$refs.rightMenu.openMenu(e);
    },
  },
};
</script>

<style lang="scss" scoped>
.collapse {
  height: 100vh;
  padding-top: 5px;
  overflow: hidden;
  position: relative;
  // transition: all 300ms ease-in-out;

  // 拖拽盒子
  .resizable {
    // width: 200px;
    // height: inherit;
    // 盒子大小可变
    resize: horizontal;
    cursor: ew-resize;
    overflow: scroll;
    opacity: 0;
    // transform: scaleY(100);
    min-width: 160px;
    max-width: 500px;
    pointer-events: none;
    // transition: 0.3s;

    &::-webkit-scrollbar {
      width: 200px;
      height: 100vh;
    }
    &:hover + .line,
    &:active + .line {
      opacity: 1;
      // border-right: 3px dashed skyblue;
    }
  }

  // 拖拽线
  .line {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    border-right: 1px solid $border-clr-1;
    background-color: $bg-1;
    transition: border-right 0.3s 0.2s;
  }

  // 内容
  aside {
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
      height: 35px;
      line-height: 35px;
      border-bottom: 1px solid #eee;
      font-size: 14px;
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
        margin: none;
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

    ul {
      flex: 1;
      padding: 5px 0;
      overflow: auto;
      height: calc(100% - 58px);
      user-select: none;
      li {
        list-style: none;
        display: flex;
        align-items: center;
        padding: 5px 10px;
        margin: 5px 0;
        // border-bottom: 1px solid $border-clr-1;
        border-radius: 4px;
        transition: 0.3s;
        position: relative;
        font-size: $fs14;

        span {
          flex: 1;
          padding-left: 5px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          color:#1d273b;
        }
        .el-icon-close {
          position: absolute;
          top: 50%;
          right: 5px;
          transform: translateY(-50%);
          opacity: 0;
          transition: 0.3s;
          padding: 2px;
          border-radius: 100%;
          &:hover {
            background-color: #ccc;
          }
        }

        &:hover,
        &:focus {
          background-color: $bg-1;
          .el-icon-close {
            opacity: 1;
          }
        }
      }
    }
    footer {
      color: $text-clr-6;
      font-size: $fs14;
      height: 30px;
      line-height: 30px;
      padding-left: 5px;
      border-top: 1px solid $border-clr-1;
      display: flex;
      justify-content: space-between;
      align-items: center;
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

ul::-webkit-scrollbar {
  width: 0px;
  height: 0px;
  // background-color: rgba(0, 0, 0, 0);
  // opacity: 0;
}
</style>