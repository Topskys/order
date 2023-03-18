<template>
  <div :class="svgClass"
       :style="svgStyle"
       v-html="svgIcon"></div>
</template>

<script>


export default {
  name: 'SvgIcon',
  props: {
    icon: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    },
    style: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    svgIcon() {
      return this.icon ? require(`@/assets/icons/${this.icon}.svg`) : '';
    },
    svgClass() {
      const classes = ['svg-icon'];
      if (this.className) {
        classes.push(this.className)
      }
      return classes.join(' ')
    },
    svgStyle() {
      return this.style;
    }
  }
}
</script>

<style scoped>
.svg-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1em;
  height: 1em;
  fill: currentColor;
  stroke: none;
}
</style>