<!--
 * @Author: Topskys
 * @Date: 2023-02-17 17:44:34
 * @LastEditTime: 2023-02-27 12:25:21
 * @LastEditors: Please set LastEditors
 * @Description: 
-->
<template>
  <div class="container">
    <div class="setting slide-left">
      <div class="setting-item">
        <div class="title">自动保存</div>
        <el-switch
          v-model="setting.autoSave"
          active-color="#335eea"
        ></el-switch>
      </div>

      <div class="setting-item">
        <div class="title">上传至云端</div>
        <div class="right">
          <el-select v-model="setting.upload" size="small">
            <el-option label="是" value="是"> </el-option>
            <el-option label="否" value="否"> </el-option>
            <!-- <el-option label="是" :value="`是:${true}`"> </el-option>
            <el-option label="否"  :value="`否:${false}`"> </el-option> -->
          </el-select>
        </div>
      </div>

      <div class="setting-item">
        <div class="title">自动保存</div>
        <el-switch
          v-model="setting.autoSave"
          active-color="#335eea"
        ></el-switch>
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

      <div class="keys">
        <p>快捷键</p>
        <div class="setting-item" style="padding-bottom: 30px">
          <div class="title">启用全局快捷键</div>
          <el-switch
            v-model="setting.key.use"
            active-color="#335eea"
          ></el-switch>
        </div>
        <!-- <div class="key-title"><span>功能</span><span>快捷键</span></div> -->
        <div class="setting-item">
          <div class="title">展开编辑工具栏</div>
          <div>
            <el-input
              v-model="setting.key.keys[0]"
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
              v-model="setting.key.keys[1]"
              placeholder="请输入"
              size="small"
              maxlength="8"
            ></el-input>
          </div>
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
export default {
  name: "Setting",
  data() {
    return {
      setting: {
        autoSave: true,
        upload: "是",
        theme: "Light",
        key: {
          use: true,
          keys: [
            "Alt + F",
            "Alt + T"
          ]
        },
      },
    };
  },
  mounted() {
    // 使用RSA对数据进行加密
  },
};
</script>

<style lang="scss" scoped>
.container {
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