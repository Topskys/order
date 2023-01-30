<template>
  <el-image :src="data[prop]" :fit="config.fit" style="width:100px;"></el-image>
</template>

<script>
export default {
  name: "e-image",
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