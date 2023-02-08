<template>
  <el-image :src="config.cb?config.cb(data):data[prop]" :fit="config.fit" :style="[sizeStyle]"></el-image>
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
  computed: {
    sizeStyle(){
      const width = this.config?.width || "50px";
      const height = this.config?.height || "50px";
      const borderRadius = this.config?.borderRadius||"4px"
      return { width, height,borderRadius };
    }
  }
}
</script>

<style>

</style>