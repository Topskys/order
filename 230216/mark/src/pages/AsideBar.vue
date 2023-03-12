<!--
 * @Author: Topskys
 * @Date: 2023-02-27 12:29:23
 * @LastEditTime: 2023-03-12 21:02:28
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
        <el-input
          v-model="keyword"
          pattern=".*\S.*"
          auto-focus="false"
          required
          suffix-icon="el-icon-search"
          size="mini"
          placeholder="请输入"
        ></el-input>
      </div>
      <ul v-if="files.length">
        <li
          v-for="file in files"
          :key="file.uuid"
          @click="checkFile(file)"
          :class="{ active: file.uuid === activeId }"
        >
          <svg
            t="1677678710485"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4475"
            width="20"
            height="20"
          >
            <path
              d="M347.221333 85.333333h329.173334C813.525333 85.333333 895.616 168.576 896 307.626667v408.746666C896 855.466667 814.250667 938.666667 676.778667 938.666667h-121.856a31.146667 31.146667 0 0 1-27.477334-31.104 31.146667 31.146667 0 0 1 27.477334-31.061334h121.472c104.789333 0 157.568-53.888 157.568-160.128V307.626667c0-106.24-52.778667-160.128-157.568-160.128H347.221333c-104.789333 0-157.909333 53.888-157.909333 160.128v408.746666c0 106.24 53.12 160.128 157.866667 160.128a31.146667 31.146667 0 0 1 27.477333 31.104 31.146667 31.146667 0 0 1-27.434667 31.061334C210.133333 938.666667 128 855.424 128 716.373333V307.626667C128 168.234667 210.133333 85.333333 347.221333 85.333333z m10.752 277.290667h117.034667a31.146667 31.146667 0 0 0 27.477333-31.104 31.146667 31.146667 0 0 0-27.434666-31.061333H357.973333a31.146667 31.146667 0 0 0-27.434666 31.061333 31.146667 31.146667 0 0 0 27.434666 31.104z m307.285334 180.48h-307.626667A31.146667 31.146667 0 0 1 330.154667 512a31.146667 31.146667 0 0 1 27.477333-31.104h307.626667a30.72 30.72 0 0 1 29.525333 14.506667 31.658667 31.658667 0 0 1 0 33.194666 30.72 30.72 0 0 1-29.525333 14.506667z m0 180.48h-307.626667a30.72 30.72 0 0 1-30.464-30.933333c0-17.066667 13.653333-30.890667 30.464-30.890667h307.626667a30.72 30.72 0 0 1 30.464 30.890667c0 17.066667-13.653333 30.890667-30.464 30.890666z"
              fill="#4b4b4b"
              p-id="4476"
            ></path>
          </svg>
          <span>{{ file.name }}</span>
        </li>
      </ul>
      <footer>
        <!-- <e-tooltip content="新建文件"> -->
        <i class="el-icon-plus" @click="newFile"></i>
        <!-- </e-tooltip> -->
      </footer>
    </aside>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ETooltip from "../components/tooltip/index.vue";
const { ipcRenderer } = window.require("electron");

export default {
  name: "AsideBar",
  components: {
    ETooltip,
  },
  data() {
    return {
      keyword: "",
      activeId: "",
    };
  },
  computed: {
    ...mapState({
      isCollapsed: (state) => state.app.isCollapsed,
      files: function (state) {
        const files = state.file.files;
        !this.activeId && files.length && (this.activeId = files[0]?.uuid);
        return files;
      },
    }),
  },
  watch: {
    files: {
      handler(nv) {
        console.log("asideBar--", nv);
      },
    },
  },
  methods: {
    ...mapActions("file", ["setCurrFile"]),

    // 点击文件进行查阅
    checkFile(file) {
      this.activeId = file.uuid;
      this.setCurrFile(file);
    },

    // 新建文件的加号
    newFile: () => ipcRenderer.send("new"),
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
      border-right: 3px dashed skyblue;
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
    transition: border-right .3s .3s;
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
        border-bottom: 1px solid $border-clr-1;
        border-radius: 4px;
        transition: 0.3s;
        span {
          flex: 1;
          padding-left: 5px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        &:hover,
        &:focus {
          background-color: $bg-1;
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
      i {
        padding: 5px 8px;
        border-radius: 3px;
        transition: 0.3s;
        cursor: pointer;
        &:hover {
          background-color: $bg-1;
        }
      }
    }
  }
}

.active {
  background-color: $bg-1;
}

ul::-webkit-scrollbar {
  width: 0px;
  height: 0px;
  // background-color: rgba(0, 0, 0, 0);
  // opacity: 0;
}
// ul:hover {
//   ul::-webkit-scrollbar {
//     width: 5px;
//     height: 5px;
//     opacity: 1;
//   }
// }
</style>