<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <countTo :startVal="startVal" :endVal="endVal" :duration="3000"></countTo>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import countTo from "vue-count-to";
export default {
  name: "Dashboard",
  components: { countTo },
  data() {
    return {
      startVal: 0,
      endVal: 2023,
    };
  },
  computed: {
    ...mapGetters(["name"]),
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
