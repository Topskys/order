<!--
 * @Author: Topskys
 * @Date: 2023-04-03 22:16:19
 * @LastEditTime: 2023-04-15 22:00:22
-->
<template>
  <ul
    class="context-menu"
    :style="{ left: `${config.offsetLeft}px`, top: `${config.offsetTop}px` }"
    v-show="contextMenuShow"
  >
    <li
      v-for="item in menuList"
      :key="item.id"
      @mousedown.stop
      @click.passive="handleClick(item)"
    >
      <a href="javascript:void(0)">{{ item.label }}</a>
      <span v-if="item.des">{{ item.des }}</span>
    </li>
  </ul>
</template>
 
<script>
export default {
  name: "context-menu",
  data() {
    // 传入watchKeyEvent= false，则不再监听按键点击
    const { menuList = [], watchKeyEvent = true } = this.config || {};
    return {
      menuList,
      watchKeyEvent,
    };
  },
  props: {
    config: Object,
    contextMenuShow: Boolean,
  },
  mounted() {
    const { menuList, watchKeyEvent } = this;

    document.addEventListener("mousedown", this.triggerHide);
    document.addEventListener("mousewheel", this.triggerHide);

    if (watchKeyEvent) {
      document.addEventListener("keydown", ({ keyCode }) => {
        const res = menuList.find((item) => {
          return item.keyCode === keyCode;
        });
        if (res !== undefined && res.emitType) {
          this.$emit(res.emitType);
        }
      });
    }
  },
  destroyed() {
    // 组件销毁时删除监听
    document.removeEventListener("mousedown", this.triggerHide);
    document.removeEventListener("mousewheel", this.triggerHide);
  },
  methods: {
    triggerHide() {
      this.$emit("update:contextMenuShow", false);
    },
    handleClick(item) {
      item.emitType && this.$emit(item.emitType,item);
    },
  },
};
</script>
 
<style lang="scss" scoped>
.context-menu {
  position: fixed;
  border: 1px solid #eee;
  box-shadow: 0 0.5em 1em 0 rgba(0, 0, 0, 0.1);
  border-radius: 1px;
  background: #fff;
  z-index: 1999;
  font-size: 14px;
  display: block;
  min-width: 100px;
  max-width: 150px;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px 10px;
    cursor: pointer;
    white-space: nowrap;
    &:hover {
      // background: #42b983;
      background: #f0f7ff;
      color: #fff;
    }
  }
  a {
    padding-right: 10px;
    height: 25px;
    line-height: 25px;
    display: block;
    // color: #1a1a1a;
    color: #333;
    text-decoration: none;
    white-space: nowrap;
  }
  span {
    font-size: 12px;
    color: gray;
  }
}
</style>
 