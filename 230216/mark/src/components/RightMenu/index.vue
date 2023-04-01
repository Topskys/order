<template>
  <ul
    class="right-menu"
    :style="{ left: left + 'px', top: top + 'px' }"
    v-show="visible"
  >
    <li v-for="(m, i) in menus" :key="i" @click="clickMenu(m, i)">
      <span class="label">{{ m.label }}</span>
      <span class="key">{{ m.key }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: "RightMenu",
  props: {
    menus: {
      type: Array,
      default: () => [
        { label: "Undo", key: "Ctrl + Z " },
        { label: "Redo", key: "Ctrl + Y " },
        { label: "Cut", key: "Ctrl + X " },
        { label: "Copy", key: "Ctrl + C " },
        { label: "Paste", key: "Ctrl + V " },
        // {label:"Delete",key:"Ctrl + D "},
        // {label:"Select All",key:"Ctrl + A "},
      ],
    },
  },
  data() {
    return {
      /* 右键菜单 */
      visible: false,
      top: 0,
      left: 0,
    };
  },
  watch: {
    visible(newValue) {
      if (newValue) {
        document.body.addEventListener("click", this.closeMenu);
      } else {
        document.body.removeEventListener("click", this.closeMenu);
      }
    },
  },
  methods: {
    clickMenu(m, i) {
      this.$emit("menuItemHandler", { label: m, id: i });
    },
    openMenu(e) {
      let [x, y] = [e.pageX, e.pageY];
      this.top = y;
      this.left = x;
      this.visible = true;
    },
    closeMenu() {
      this.visible = false;
    },
  },
};
</script>

<style lang='scss' scoped>
.right-menu {
  //   position: absolute;
  background: blue;
  z-index: 3000;
  margin: 0;
  // background: #fff;
  position: fixed; //关键样式设置固定定位
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
}
</style>