<!--
 * @Author: Topskys
 * @Date: 2023-02-16 22:28:45
 * @LastEditTime: 2023-02-25 23:19:09
 * @LastEditors: Please set LastEditors
 * @Description: 
-->
<template>
  <div id="app">
    <!-- name="fade-transform"  -->
    <transition mode="out-in">
      <router-view :key="key" />
    </transition>
  </div>
</template>

<script>
const { ipcRenderer } = window.require("electron");

export default {
  name: "App",
  computed: {
    key() {
      return this.$route.path;
    },
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
}

html,
body {
  margin: 0;
  padding: 0;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: rgba(0, 0, 0, 0);
}

::-webkit-scrollbar-track {
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0);
}

::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background-color: #ddd;
}

::-webkit-scrollbar-thumb:hover {
  // background-color: #c7c7c7;
  background-color: #aaa;
}

a,
article,
aside,
audio,
blockquote,
body,
canvas,
caption,
cite,
dd,
details,
div,
dl,
dt,
embed,
fieldset,
figcaption,
figure,
footer,
form,
h1,
h2,
h3,
h4,
h5,
h6,
header,
hgroup,
html,
iframe,
img,
label,
legend,
li,
mark,
menu,
nav,
object,
ol,
output,
p,
ruby,
section,
span,
sub,
summary,
sup,
table,
tbody,
td,
tfoot,
th,
thead,
time,
tr,
ul,
video {
  border: 0;
  font: inherit;
//   margin: 0;
//   padding: 0;
//   font-weight: 400;
//   vertical-align: baseline;
}
</style>
