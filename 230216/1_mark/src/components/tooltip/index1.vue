<template>
  <span>
    <slot></slot>
    <div class="tooltip" v-if="show">
      {{ content }}
    </div>
  </span>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      required: true
    },
    placement: {
      type: String,
      default: "top"
    },
    trigger: {
      type: String,
      default: "hover"
    }
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    handleMouseEnter() {
      if (this.trigger === "hover") {
        this.show = true;
        this.setPosition();
      }
    },
    handleMouseLeave() {
      if (this.trigger === "hover") {
        this.show = false;
      }
    },
    handleClick() {
      if (this.trigger === "click") {
        this.show = !this.show;
        this.setPosition();
      }
    },
    setPosition() {
      const tooltipNode = this.$el.querySelector(".tooltip");
      const targetNode = this.$el.querySelector("slot");

      const targetRect = targetNode.getBoundingClientRect();
      const tooltipRect = tooltipNode.getBoundingClientRect();
      const offset = 10;
      const position = {
        left: targetRect.left + targetRect.width / 2 - tooltipRect.width / 2,
        top: 0
      };

      switch (this.placement) {
        case "top":
          position.top = targetRect.top - tooltipRect.height - offset;
          break;
        case "bottom":
          position.top = targetRect.bottom + offset;
          break;
        case "left":
          position.left = targetRect.left - tooltipRect.width - offset;
          position.top = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2;
          break;
        case "right":
          position.left = targetRect.right + offset;
          position.top = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2;
          break;
      }

      tooltipNode.style.left = position.left + "px";
      tooltipNode.style.top = position.top + "px";
    }
  },
  mounted() {
    const targetNode = this.$el.querySelector("slot");

    targetNode.addEventListener("mouseenter", this.handleMouseEnter);
    targetNode.addEventListener("mouseleave", this.handleMouseLeave);

    targetNode.addEventListener("click", this.handleClick);
  },
  beforeDestroy() {
    const targetNode = this.$el.querySelector("slot");

    targetNode.removeEventListener("mouseenter", this.handleMouseEnter);
    targetNode.removeEventListener("mouseleave", this.handleMouseLeave);

    targetNode.removeEventListener("click", this.handleClick);
  }
};
</script>

<style scoped>
.tooltip {
  position: absolute;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  border-radius: 5px;
  padding: 5px;
  font-size: 12px;
  display: none;
}
</style>