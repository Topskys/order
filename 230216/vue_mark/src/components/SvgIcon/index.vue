<!--
 * @Author: Topskys
 * @Date: 2023-04-02 21:59:27
 * @LastEditTime: 2023-04-02 22:19:15
-->
<template>
  <svg
    class="svg-icon"
    :style="{
      fontSize: size + 'px',
      width: width + 'px',
      height: height + 'px',
      color: color,
    }"
  >
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: "svgIcon",
  props: {
    icon: {
      //svg图标名称
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "rgba(0,0,0,0.65)",
    },
    size: {
      //svg尺寸
      type: [Number, String],
    },
    width: {
      //svg宽度
      type: [Number, String],
    },
    height: {
      //svg高度
      type: [Number, String],
    },
  },
  data() {
    return {};
  },
  computed: {
    iconName() {
      return `#icon-${this.icon}`;
    },
  },
};
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.2em;
  fill: currentColor;
  overflow: hidden;
}
</style>
