<template>
  <div>{{ data[prop] }}</div>
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