<!--
 * @Author: Topskys
 * @Date: 2023-03-08 10:51:28
 * @LastEditTime: 2023-03-10 16:21:28
-->
<template>
  <span class="tooltip">
    <span class="content">{{ content }}</span>
    <slot />
  </span>
</template>

<script>
export default {
  name: "e-tooltip",
  props: {
    content: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang='scss' scoped>
.tooltip {
  position: relative;
  &:focus,
  &:hover {
    .content {
      // visibility: visible;
      // display: block;
      opacity: 1;
      transition: all 300ms ease-in-out 1s;
    }
  }

  .content {
    position: absolute;
    // top: -35px;
    // left: 10px;
    // top: -45px;
    // left: 20px;
    // transform: translateX(-20px);
    color: $text-clr-8;
    font-size: $fs14;
    max-width: 120px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    text-align: center;
    padding: 0px 12px;
    border: 1px solid $border-clr-2;
    border-radius: 2px;
    z-index: 999;
    background-color: $bg-1;
    // visibility: hidden;
    // display: none;
    opacity: 0;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.8);
    transition: all 300ms ease-in-out;
  }
}
</style>