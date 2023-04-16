<!--
 * @Author: Topskys
 * @Date: 2023-02-16 22:28:45
 * @LastEditTime: 2023-04-16 21:04:26
-->
<template>
  <div id="app" >
    <transition mode="out-in">
      <router-view :key="key" />
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
const { ipcRenderer } = window.require("electron");
import File from "./renderer/file.js";

export default {
  name: "App",
  computed: {
    key() {
      return this.$route.path;
    },
    ...mapState({
      userInfo: (state) => state.user.userInfo || {},
    }),
  },
  mounted() {
    // this.checkUpdate();

    // 监听路由导航
    ipcRenderer.on(
      "navigation",
      (e, data) =>
        this.$route.path.split("/")[1] !== data &&
        (data === "back" ? this.$router.back() : this.$router.push(`/${data}`))
    );

    ipcRenderer.on(
      "new",
      (e, data) => data.filePath && new File().createFile(data.filePath)
    );
  },
  methods: {
    // 检查应用更新
    checkUpdate() {
      ipcRenderer.send("dialog-message", {
        type: "info",
        title: "应用更新",
        message: "下载最新版本应用",
        buttons: ["Cancel", "Confirm"],
      });

      this.$http({
        url: "/update",
        method: "GET",
      }).then((data, msg) => {
        ipcRenderer.send("dialog-message", {
          title: "应用更新",
          content: "下载最新版本",
        });
      });
    },
  },
  watch: {
    $route: {
      handler(n) {
        // console.log("--", this.$route.path.split("/")[1], location);
      },
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
