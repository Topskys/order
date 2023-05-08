<template>
  <div class="e-tag">
    <el-tag :type="config.cb && config.cb(data)||'success'">{{data[prop]}}</el-tag>
  </div>
</template>

<script>
export default {
name: "e-tag",
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    config: {
      type: Object,
      default: () => ({}),
    },
    prop: {
      type: String,
      default: "",
    },
  },
}
</script>

<style>

</style>