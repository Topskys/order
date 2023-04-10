<template>
  <footer class="footer">
    <div class="status-warp">
      <div class="left-status">
        <div class="status-item" @click="toggleAside">
          <i
            :class="`el-icon-arrow-${isCollapsed ? 'left' : 'right'}`"
            :title="`${isCollapsed ? '关闭' : '展开'}侧边栏`"
          ></i>
        </div>
        <div class="status-item" @click="toggleToolbar">
          <i
            :class="`el-icon-arrow-${toolbar ? 'up' : 'down'}`"
            :title="`${toolbar ? '关闭' : '展开'}工具栏`"
          ></i>
        </div>
        <div class="status-item">
          <span
            class="el-icon-user-solid"
            @click="logout"
            :title="username"
            v-if="token && username"
            style="color: #67c23a"
          ></span>
          <i class="el-icon-user" @click="sign" title="登录" v-else></i>
        </div>
        <div class="status-item" title='上传' @click="upload">
          <svg-icon icon="upload"></svg-icon>
        </div>
        <div class="status-item">
          <span style="font-size: 12px" @click="startTerminal()" title='终端'>Terminal</span>
        </div>
      </div>
      <div class="right-status">
        <div class="status-item"></div>
        <div class="status-item">
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
        <div class="status-item" style="width: 80px; text-align: right">
          <span>{{ length }}</span
          >&nbsp;&nbsp;<span style="font-size: 12px">字符</span>
        </div>
      </div>
    </div>
    <Sign :dialogVisible.sync="showSignDialog" />
  </footer>
</template>

<script>
// 渲染进程
const { ipcRenderer } = window.require("electron");
import File from "@/renderer/file.js";
const { readStream, writeStream, createFile, openDirectoryPicker } = new File();
// import {openDirPicker} from "@/components/JsTree/formatData.js";
// vuex
import { mapState, mapActions } from "vuex";
// 组件
import Sign from "@/components/Sign/index.vue";
export default {
  props: {
    length: {
      type: Number | String,
      default: 0,
    },
  },
  data() {
    return {
      showSignDialog: false,
      isSave: true,
    };
  },
  components: {
    Sign,
  },
  computed: {
    ...mapState({
      isCollapsed: (state) => state.app.isCollapsed,
      toolbar: (state) => state.app.toolbar,
      username: (state) => state.user.userInfo?.username || "",
      token: (state) => state.user.token || "",
    }),
  },
  methods: {
    ...mapActions("user", ["setVisible", "logout"]),
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
    sign() {
      // if (!this.token || this.userInfo == {}) {
      //   ipcRenderer.send("sign", true);
      // }
      this.showSignDialog = !this.showSignDialog;
    },
    // 启动终端
    startTerminal: () => ipcRenderer.send("start-terminal"),
    // 上传
    upload(){
      openDirPicker()
    }
  },
};
</script>

<style lang="scss" scoped>
.footer {
  width: 100vw;
  height: 30px;
  border-top: 1px solid $border-clr-1;
  color: $text-clr-6;
  font-size: $fs12;
  user-select: none;
  z-index: 1999;
  .status-warp {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left-status,
    .right-status {
      display: flex;
      align-items: center;
    }
    // .left-status .status-item,.right-status

    .status-item {
      font-size: $fs14;
      padding: 2px 5px;
      margin: 0 5px;
      border-radius: 4px;
      transition: 0.3s 0.1s;
      &:hover {
        background-color: $bg-1;
        i {
          transform: scale(0.9);
          cursor: pointer;
        }
      }
    }
  }
}
</style>