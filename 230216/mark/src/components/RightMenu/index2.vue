<template>
  <ul class="rightKey" ref="rightKey" >
    <li v-for="(m, i) in menus" :key="i" @click="clickMenu(m, i)">
      <span class="label">{{ m.label }}</span>
      <span class="key">{{ m.key }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: "rightKey",
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
  mounted() {
    this.rightKey();

    // 监听点击事件
    document.addEventListener("click", (e)=>this.handler(e));
  },
  unMouted() {
    document.removeEventListener("click",  (e)=>this.handler(e));
  },
  methods: {
    handler(e){
      this.$nextTick(()=>{
        const rk = this.$refs.rightKey;
      console.log(rk)
      rk.style.display === "block" && (rk.style.display = "none");
      })
    },
    clickMenu(m, i) {
      this.$emit("menuItemHandler", { label: m, id: i });
    },
    rightKey() {
      const dom = this.$refs.rightKey;

      document.documentElement.oncontextmenu = function (e) {
        e.preventDefault();

        // 兼容Event对象
        e = e || window.event;

        // 设置菜单坐标。如果鼠标的位置+菜单的宽度>网页的宽度，那么就改为右边定位。
        var [mx, my, rmw] = [e.clientX, e.clientY, parseInt(dom.style.width)];
        var pageWidth = document.documentElement.clientWidth;
        console.log(mx, my, rmw, pageWidth);

        // if (mx + rmw < pageWidth) {
        dom.style.top = my + "px";
        dom.style.left = `${mx}px`;
        // } else {
        //   dom.style.top = my + "px";
        //   dom.style.right = `${mx}px`;
        // }

        dom.style.display = "block";

        // 阻止默认的右键菜单显示
        // return false
      };
    },
  },
};
</script>

<style lang='scss' scoped>
.rightKey {
  position: absolute;
  top: 0;
    display: none;
  z-index: 999;
  border: 1px solid darkgray;
  border-radius: 4px;
  box-shadow: 0 0 20px 5px rgba(255, 255, 255, 0.5);
  background: white;
  padding: 10px 0;
  margin: 0;
  li {
    width: 130px;
    font-size: 14px;
    list-style: none;
    padding: 5px 15px;
    border-bottom: 1px solid #eee;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .key {
      color: $text-clr-6;
      font-size: $fs12;
    }
    &:last-child {
      border: none;
    }
    &:hover,
    &:focus {
      background-color: #f5f5f7;
    }
  }
}
</style>