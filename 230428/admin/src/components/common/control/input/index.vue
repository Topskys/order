<template>
  <el-input
    v-model="val"
    @input="inputEnter"
    placeholder="请输入"
    :size="config.size"
    :disabled="config.disabled"
  ></el-input>
</template>

<script>
export default {
  name: "e-name",
  props: {
    value: {
      type: [String, Number],
      default: "",
    },
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      val: "",
    };
  },
  watch: {
    value: {
      handler(newVal) {
        this.val = newVal;
      },
      immediate: true,
    },
  },
  methods: {
    inputEnter() {
      // 动态组件 :value.sync="field[item.prop]" ，
      // .sync：可以将子组件的数据同步到父组件，
      // 以实现组件分离form数据效验问题
      this.$emit("update:value", this.val); // 数据同步，更新父组件数据（field[item.prop]）
      // or
      // this.$emit("updateValue",this.val); // 子传父
    },
  },
};
</script>

<style>
</style>