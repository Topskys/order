<template>
  <div class="terminal-container">
    <div class="main-class">
      <!-- 渲染过往的命令行 -->
      <div v-for="item in commandArr" :key="item">
        <div class="command-action">
          <!-- 执行成功或者失败图标切换 -->
          <i
            :class="[
              'el-icon-right',
              'command-action-icon',
              { 'error-icon': item.code !== 0 },
            ]"
          ></i>
          <!-- 过往执行地址和命令行、信息 -->
          <span class="command-action-path">{{ item.path }} $</span>
          <span class="command-action-contenteditable">{{ item.command }}</span>
        </div>
        <div class="output-command">{{ item.commandMsg }}</div>
      </div>
      <!-- 当前输入的命令行 -->
      <div
        class="command-action command-action-editor"
        @mouseup="timeoutFocusInput"
      >
        <i class="el-icon-right command-action-icon"></i>
        <!-- 执行地址 -->
        <span class="command-action-path">{{ path }} &gt;</span>
        <!-- 命令行输入 -->
        <span
          :contenteditable="action ? false : 'plaintext-only'"
          class="command-action-contenteditable"
          @input="onDivInput($event)"
          @keydown="keyFn"
        ></span>
      </div>
      <!-- 当前命令行输出 -->
      <div class="output-command">
        <div v-for="item in commandMsg" :key="item">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script>
const { ipcRenderer } = window.require("electron");
const { spawn } = window.require("child_process");
const path = window.require("path");

export default {
  name: "Terminal",
  data() {
    return {
      path: "", // 命令行目录
      command: "", // 用户输入命令
      handleCommand: "", // 经过处理的用户命令 比如清除首尾空格、添加获取路径的命令
      commandMsg: [], // 当前命令信息
      commandArr: [], // 过往命令行输出保存
      isActive: true, // 终端是否聚焦
      action: false, // 是否正在执行命令
      inputDom: null, // 输入框dom
      addPath: "", // 不同系统 获取路径的命令 mac是pwd window是chdir
    };
  },
  mounted() {
    this.addGetPath();
    this.inputDom = document.querySelector(".command-action-contenteditable");
    this.path = process.cwd(); // 初始化路径
    this.watchFocus();
    ipcRenderer.send("page-ready"); // 告诉主进程页面准备好了
  },
  methods: {
    // 回车执行命令
    keyFn(e) {
      if (e.keyCode == 13) {
        this.actionCommand();
        e.preventDefault();
      }
    },
    // 执行命令
    actionCommand() {
      const command = this.command.trim();
      this.isClear(command);
      if (this.command === "") return;
      this.action = true;
      this.handleCommand = this.cdCommand(command);
      const ls = spawn(this.handleCommand, {
        encoding: "utf-8",
        cwd: this.path, // 执行命令路径
        shell: true, // 使用shell命令
      });
      // 监听命令行执行过程的输出
      ls.stdout.on("data", (data) => {
        const value = data.toString().trim();
        this.commandMsg.push(value);
        console.log(`stdout: ${value}`);
      });
      // 错误或详细状态进度报告 比如 git push、 git clone
      ls.stderr.on("data", (data) => {
        const value = data.toString().trim();
        this.commandMsg.push(`stderr: ${data}`);
        console.log(`stderr: ${data}`);
      });
      // 子进程关闭事件 保存信息 更新状态
      ls.on("close", this.closeCommandAction);
    },
    // 执行完毕 保存信息 更新状态
    closeCommandAction(code) {
      // 保存执行信息
      this.commandArr.push({
        code, // 是否执行成功
        path: this.path, // 执行路径
        command: this.command, // 执行命令
        commandMsg: this.commandMsg.join("\r"), // 执行信息
      });
      // 清空
      this.updatePath(this.handleCommand, code);
      this.commandFinish();
      console.log(
        `子进程退出，退出码 ${code}, 运行${code === 0 ? "成功" : "失败"}`
      );
    },
    // cd命令处理
    cdCommand(command) {
      let pathCommand = "";
      if (this.command.startsWith("cd ")) {
        pathCommand = this.addPath;
      } else if (this.command.indexOf(" cd ") !== -1) {
        pathCommand = this.addPath;
      }
      return command + pathCommand;
      // 目录自动联想...等很多细节功能 可以做但没必要2
    },
    // 清空历史
    isClear(command) {
      if (command === "clear") {
        this.commandArr = [];
        this.commandFinish();
      }
    },
    // 获取不同系统下的路径
    addGetPath() {
      const systemName = getOsInfo();
      if (systemName === "Mac") {
        this.addPath = " && pwd";
      } else if (systemName === "Windows") {
        this.addPath = " && chdir";
      }
    },
    // 命令执行完毕 重置参数
    commandFinish() {
      this.commandMsg = [];
      this.command = "";
      this.inputDom.textContent = "";
      this.action = false;
      // 激活编辑器
      this.$nextTick(() => {
        this.focusInput();
        this.scrollBottom();
      });
    },
    // 判断命令是否添加过addPath
    updatePath(command, code) {
      if (code !== 0) return;
      const isPathChange = command.indexOf(this.addPath) !== -1;
      if (isPathChange) {
        this.path = this.commandMsg[this.commandMsg.length - 1];
      }
    },
    // 保存输入的命令行
    onDivInput(e) {
      this.command = e.target.textContent;
    },
    // 点击div
    timeoutFocusInput() {
      setTimeout(() => {
        this.focusInput();
      }, 200);
    },
    // 聚焦输入
    focusInput() {
      this.inputDom.focus(); //解决ff不获取焦点无法定位问题
      var range = window.getSelection(); //创建range
      range.selectAllChildren(this.inputDom); //range 选择obj下所有子内容
      range.collapseToEnd(); //光标移至最后
      this.inputDom.focus();
    },
    // 滚动到底部
    scrollBottom() {
      let dom = document.querySelector("#app");
      dom.scrollTop = dom.scrollHeight; // 滚动高度
      dom = null;
    },
    // 监听窗口聚焦、失焦
    watchFocus() {
      ipcRenderer.on("win-focus", (event, message) => {
        this.isActive = message;
        if (message) {
          this.focusInput();
        }
      });
    },

    // 获取操作系统信息
    getOsInfo() {
      var userAgent = navigator.userAgent.toLowerCase();
      var name = "Unknown";
      if (userAgent.indexOf("win") > -1) {
        name = "Windows";
      } else if (userAgent.indexOf("iphone") > -1) {
        name = "iPhone";
      } else if (userAgent.indexOf("mac") > -1) {
        name = "Mac";
      } else if (
        userAgent.indexOf("x11") > -1 ||
        userAgent.indexOf("unix") > -1 ||
        userAgent.indexOf("sunname") > -1 ||
        userAgent.indexOf("bsd") > -1
      ) {
        name = "Unix";
      } else if (userAgent.indexOf("linux") > -1) {
        if (userAgent.indexOf("android") > -1) {
          name = "Android";
        } else {
          name = "Linux";
        }
      }
      return name;
    },
  },
};
</script>

<style lang="scss" scoped>

.terminal-container {
  height: 100vh;
  max-height: 100vh;
  overflow: auto;
  overflow-x: hidden;
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: #333;
  z-index:9999;
}
.main-class {
  /* background: #23241e; */
  background-color: #000000;
  color: #929292;
  flex: 1;
  padding: 10px 20px 0 10px;
}
.command-action {
  font-size: 16px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.command-action-icon {
  line-height: 16px;
  display: inline-block;
  /* color: #88e200; */
  color: white;
}
.error-icon {
  color: #ff0066;
}
.command-action-path {
  /* color: #21c5dc; */
  color: white;
  margin: 0 5px 0 8px;
  display: inline-block;
}
.command-action-input {
  border: none;
  outline: none;
  color: #b2b2b2;
  background: #23241e;
}
.command-action-contenteditable {
  border: none;
  outline: none;
  /* background: #23241e; */
  min-width: 100px;
  white-space: pre-wrap;
  color: #b2b2b2;
}
.output-command {
  margin: 10px 10px 10px 0;
  white-space: pre-wrap;
}

.command-action-editor {
  padding: 10px 0 20px 0;
}
</style>