<!--
 * @Author: Topskys
 * @Date: 2023-02-27 12:29:23
 * @LastEditTime: 2023-02-27 12:36:48
-->
<template>
  <div class="container"></div>
</template>

<script>
export default {
  name: "Aside",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.container {
    min-width: 200px;
    max-width:360px;
    transform: All 0.3s out-in;
    height: 100vh;
    background: red;
    border-right: 1px solid $border-clr-1;
}
</style>