<!--
 * @Author: Topskys
 * @Date: 2023-02-17 17:44:34
 * @LastEditTime: 2023-03-14 12:59:18
-->
<template>
  <div class="setting">
    <div class="setting slide-left">
      <div class="setting-item">
        <div class="title">自动保存</div>
        <el-switch
          v-model="setting.autoSave"
          active-color="#335eea"
        ></el-switch>
      </div>
      <div class="setting-item">
        <div class="title">编辑区语言</div>
        <div class="right">
          <el-select v-model="setting.lang" size="small">
            <el-option :value="lan" v-for="(lan, i) in langs" :key="i">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="setting-item">
        <div class="title">上传至云端</div>
        <div class="right">
          <el-select v-model="setting.upload" size="small">
            <el-option value="true"> </el-option>
            <el-option value="false"> </el-option>
          </el-select>
        </div>
      </div>
      <div class="setting-item">
        <div class="title">自动上传</div>
        <el-switch
          v-model="setting.autoUpload"
          active-color="#335eea"
        ></el-switch>
      </div>
      <div class="keys">
        <p>个性化</p>
        <div class="setting-item">
          <div class="title">字体大小</div>
          <div>
            <el-input
              v-model="setting.fs"
              placeholder="请输入"
              size="small"
              maxlength="3"
            ></el-input>
          </div>
        </div>
        <div class="setting-item">
          <div class="title">代码高亮</div>
          <div class="right">
            <el-select v-model="setting.ishljs" size="small">
              <el-option value="true"> </el-option>
              <el-option value="false"> </el-option>
            </el-select>
          </div>
        </div>
        <div class="setting-item">
          <div class="title">主题</div>
          <div class="right">
            <el-select v-model="setting.theme" size="small">
              <el-option value="Light"> </el-option>
              <el-option value="Dark"> </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="keys">
        <p>快捷键</p>
        <div class="setting-item">
          <div class="title">启用全局快捷键</div>
          <el-switch
            v-model="setting.globKey"
            active-color="#335eea"
          ></el-switch>
        </div>
        <div class="setting-item">
          <div class="title">展开编辑工具栏</div>
          <div>
            <el-input
              v-model="setting.toolBarKey"
              placeholder="请输入"
              size="small"
              maxlength="8"
            ></el-input>
          </div>
        </div>
        <div class="setting-item">
          <div class="title">展开侧边栏</div>
          <div>
            <el-input
              v-model="setting.collapsedKey"
              placeholder="请输入"
              size="small"
              maxlength="8"
            ></el-input>
          </div>
        </div>
      </div>
      <div class="keys">
        <p>安全模式</p>
        <div class="setting-item">
          <div class="title">过滤html</div>
          <el-switch v-model="setting.html" active-color="#335eea"></el-switch>
        </div>
      </div>
      <center style="margin: 50px">
        <span>MADE BY TOPSKY</span>
        <p>v0.1.0</p>
      </center>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Setting",
  data() {
    return {
      setting: {
        autoSave: true,
        upload: true,
        autoUpload: true,
        theme: "Light",
        globKey: true,
        collapsedKey: "Ctrl + F",
        toolBarKey: "Ctrl + T",
        ishljs: false,
        lang: "zh-CN",
        html: false,
        fs: 14,
      },
      langs: ["zh-CN", "zh-TW", "en", "fr", "pt-BR", "ru", "de", "ja"],
    };
  },
  computed: {
    ...mapState("app", [
      "autoSave",
      "upload",
      "autoUpload",
      "theme",
      "globKey",
      "collapsedKey",
      "toolBarKey",
      "ishljs",
      "lang",
      "html",
      "fs",
    ]),
  },
  watch: {
    setting: {
      handler(nv) {
        nv && this.$store.dispatch("app/toggleSetting", this.setting);
      },
      deep: true,
    },
    autoSave: {
      handler(nv) {
        this.setting.autoSave = nv;
      },
      immediate: true,
    },
    upload: {
      handler(nv) {
        this.setting.upload = nv;
      },
      immediate: true,
    },
    autoUpload: {
      handler(nv) {
        this.setting.autoUpload = nv;
      },
      immediate: true,
    },
    theme: {
      handler(nv) {
        this.setting.theme = nv;
      },
      immediate: true,
    },
    globKey: {
      handler(nv) {
        this.setting.globKey = nv;
      },
      immediate: true,
    },
    collapsedKey: {
      handler(nv) {
        this.setting.collapsedKey = nv;
      },
      immediate: true,
    },
    toolBarKey: {
      handler(nv) {
        this.setting.toolBarKey = nv;
      },
      immediate: true,
    },
    lang: {
      handler(nv) {
        this.setting.lang = nv;
      },
      immediate: true,
    },
    fs: {
      handler(nv) {
        this.setting.fs = nv;
      },
      immediate: true,
    },
    ishljs: {
      handler(nv) {
        this.setting.ishljs = nv;
      },
      immediate: true,
    },
    html: {
      handler(nv) {
        this.setting.html = nv;
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.setting {
  max-width: 700px;
  margin: 0 auto;

  // height: 100vh;
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  // align-items: center;
  font-size: $fs14;
  color: $text-clr-4;
  .setting {
    .setting-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 0;
      // margin-bottom: 10px;
      // border: 1px solid $border-clr-2;
      border-radius: 10px;
    }
    .keys {
      p {
        font-size: $fs16;
        color: $text-clr-5;
        &::after {
          content: "";
          width: 100%;
          height: 1px;
          background-color: $bg-1;
          display: inline-block;
        }
      }
      .key-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}

::v-deep .el-input__inner {
  // border: none;
  border-color: $border-clr-2;
  color: $text-clr-5;
  font-weight: bold;
  text-align: center;
  background-color: $bg-2;
}
::v-deep .el-select .el-input__inner:focus {
  border-color: $clr-1;
}
::v-deep.el-select-dropdown__item {
  text-align: center;
}

::v-deep.el-select-dropdown__item.selected {
  color: $clr-1;
}
</style>


<style lang="scss">
// 修改下拉框箭头位置，style不可为 scoped
.el-popper[x-placement^="bottom"] .popper__arrow {
  left: 50% !important;
  transform: translateX(-50%) !important;
}
</style>