<!--
 * @Author: Topskys
 * @Date: 2023-02-27 12:29:23
 * @LastEditTime: 2023-03-02 10:33:38
-->
<template>
  <div class="aside" v-show="asideFold">
    <div class="resizable"></div>
    <div class="line"></div>

    <aside>
      <div class="search">
        <el-input
          v-model="keyword"
          pattern=".*\S.*"
          required
          suffix-icon="el-icon-search"
          size="mini"
          placeholder="请输入"
        ></el-input>
      </div>
      <ul class="files">
        <li class="file-item active" @click="handler">
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
          <span>name4444.md</span>
        </li>
        <li class="file-item" v-for="(x, i) in 20" :key="i">
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
          <span>name4444444</span>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Aside",
  data() {
    return {
      // asideFold:true,
      keyword: "",
    };
  },
  computed: {
    ...mapState({
      asideFold: (state) => state.settings.asideFold || false,
    }),
  },
  watch: {
    asideFold: {
      handler(nv, ov) {
        console.log("----", nv);
      },
      immediate: true,
    },
  },
  methods: {
    handler() {
      console.log("YYUYUI");
    },
  },
};
</script>

<style lang="scss" scoped>
.aside {
  height: 100vh;
  padding: 5px;
  overflow: hidden;
  border-right: 1px solid $border-clr-1;
  position: relative;

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
    &::-webkit-scrollbar {
      width: 200px;
      height: 100vh;
    }

    &:hover + .line,
    &:active + .line {
      opacity: 1;
      border-left: 1px dashed skyblue;
    }
  }

  // 拖拽线
  .line {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    border-left: 1px solid #bbb;
    border-right: 3px solid #eee;
    opacity: 0;
    // background-color: $bg-1;
    transition: all 0.3s;
  }
  // 内容
  aside {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 8px;
    padding-left:10px;
  }

  .files {
    overflow: auto;
    height: calc(100% - 38px);
    margin-top: 5px;
    .file-item {
      display: flex;
      align-items: center;
      padding: 10px 5px;
      border-bottom: 1px solid $border-clr-1;
      border-radius: 4px;
      span {
        flex: 1;
        padding-left: 5px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
.active {
  background-color: $bg-1;
}
</style>