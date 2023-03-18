<template>
  <div>{{ config.cb ? config.cb(data) : data[prop] }}</div>
</template>

<script>
export default {
  name: "e-text",
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