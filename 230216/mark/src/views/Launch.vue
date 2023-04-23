<!--
 * @Author: Topskys
 * @Date: 2023-02-17 17:38:40
 * @LastEditTime: 2023-04-10 20:44:16
-->
<template>
  <div class="launch">
    <svg-icon icon="mark" style="font-size:50px;"></svg-icon>
    <span>Mark Editor</span>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "launch",
};
</script>

<style lang='scss' scoped>
.launch {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  span {
    padding-top: 10px;
  }
}
</style>