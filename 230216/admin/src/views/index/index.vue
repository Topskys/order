<!--
 * @Author: Topskys
 * @Date: 2023-04-08 13:33:15
 * @LastEditTime: 2023-04-08 16:03:00
-->
<template>
  <div class="index-container">
    <NavBar></NavBar>
    <Main></Main>
    <footer>
      <span class="copyright"
        >Copyright © 2023 Mark Inc. All rights reserved.</span
      >
    </footer>
  </div>
</template>

<script>
import NavBar from "./NavBar.vue";
import Main from "./Main.vue";
export default {
  components: {
    NavBar,
    Main,
  },
};
</script>

<style lang='scss' scoped>
.index-container {
  position: relative;
  footer {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    padding: 20px 0;
    text-align: center;

    .copyright {
      color: #6e6e73;
      font-size: 0.75rem;
    }
  }
}
</style>