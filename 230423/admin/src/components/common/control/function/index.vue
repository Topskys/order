<template>
  <div v-html="config.cb && config.cb(data)">function</div>
</template>

<script>
export default {
  name: "e-function",
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
};
</script>

<style>
</style>