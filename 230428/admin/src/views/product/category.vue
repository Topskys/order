<template>
  <el-dialog
    title="编辑类别"
    :visible.sync="diaVis"
    append-to-body
    :close-on-click-modal="false"
  >
    <!-- <el-button type='primary' icon='el-icon-plus' style="margin-button:20px;float:right;overflow:hidden;" size='mini'>添加</el-button> -->
    <div>
      <el-tag
        :key="`${i + Date.now()}`"
        v-for="(tag, i) in dynamicTags"
        closable
        :disable-transitions="false"
        @close="handleClose(tag, i)"
        :type="tag.type"
      >
        {{ tag.name }}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput"
        >+ New Tag</el-button
      >
    </div>
  </el-dialog>
</template>


<script>
export default {
  props: {
    diaVis: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dynamicTags: ["标签一", "标签二", "标签三"],
      inputVisible: false,
      inputValue: "",
    };
  },
  mounted () {
    this.getCategory()
  },
  methods: {
      // 获取分类数据
    getCategory() {
      this.$http({
        url: "/class",
      }).then((res) => {
        this.dynamicTags = res.data || [];
      });
    },
    setTagType() {
      const arr = ["primary", "info", "success", "warning", "danger"];
      return arr[Math.random() * 5];
    },
    handleClose(tag, index) {
      //   this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      this.dynamicTags.splice(index, 1);
      tag._id &&
        this.$http({
          url: `/class/${tag._id}`,
          method: "delete",
        });
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push({
          //type: this.setTagType(),
          name: inputValue,
        });
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
  },
};
</script>

<style lang='scss' scoped>
.el-tag + .el-tag {
  // margin: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>

