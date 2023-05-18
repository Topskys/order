<template>
  <div class="echart" ref="dom"></div>
</template>

<script>
import * as echarts from "echarts";
import resize from "@/layout/mixin/ResizeHandler.js";
import { mapState, mapGetters } from "vuex";

export default {
  name: "ECharts-Line",
  data() {
    return {
      echart: null,
      elistener: null,
      dataX: null,
    };
  },
  computed: {
    ...mapGetters(["sidebar"]),
  },
  mounted() {
    this.getData();
    this.initEChart();
    //   监听浏览器窗口变化，重新绘制图表
    this.elistener = window.addEventListener("resize", () => {
      this.echart.resize();
    });
  },
  beforeDestroy() {
    // 销毁事件监听
    this.elistener = null;
  },
  methods: {
    // 初始化并配置折线图
    initEChart() {
      this.echart = echarts.init(this.$refs.dom);
      const dateList = this.dataX.map((x) => x[0]);
      const valueList = this.dataX.map((x) => x[1]);
      this.echart.setOption({
        title: {
          text: "月销售额",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: dateList,
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            // // 设置分割线虚线效果
            // splitLine:{
            //   show:true,
            //   lineStyle: {
            //     type: "dashed",
            //     color: "#013a3f"
            //   }
            // },
            //  interval: 100, //默认会根据数据自动分割，因为此处要现实的数据在0-200之间，设为100则只显示两条分割线
          },
        ],
        series: [
          // {
          //   // name: "月销售额",
          //   type: "bar",
          //   barWidth: "60%",
          //   data: valueList,
          //   // data: [10, 52, 200, 334, 390, 330, 220, 100, 190, 124, 33, 134],
          // },
          {
            type: "line",
            // 去掉折线上的小圆点
            // showSymbol: false,
            // 设置折线颜色和粗细
            lineStyle:{
              width:2,
              color:"#44e2f0"
            },
            // 设置面积区域为渐变效果
            areaStyle:{
              color:echarts.graphic.LinearGradient(0,1,0,0,[
                {
                  offset:0.4,
                  color:"#fff" // 010c17
                },
                {
                  offset:1,
                  color:"#44e2f0"
                }
              ])
            },
            data: valueList,
            // color: "#67c23a"
          },
        ],
      });
      //   监听浏览器窗口变化，重新绘制图表
      // window.addEventListener("resize", () => {
      //   this.echart.resize();
      // });
    },
    // 生产数据
    getData() {
      const a = (min = 1, max = 500) =>
        Math.floor(Math.random() * (max - min) + min);
      let d = new Date();
      let [y, arr1] = [d.getFullYear(), []];
      for (let i = 1; i < 13; i++) {
        i < 10 && (i = `0${i}`);
        arr1.push([`${y}-${i}`, a()]);
      }
      this.dataX = arr1;
    },
  },
  watch: {
    // 监听sidebar展开或闭合，调整echarts尺寸.
    // 侧边栏操作时有个transition:all 0.2s.
    "sidebar.opened": function () {
      setTimeout(() => {
        this.echart.resize();
      }, 200);
    },
  },
};
</script>

<style lang="scss" scoped>
.echart {
  width: 100%;
  height: 500px;
}

@media screen and(min-width:1000px) {
  .echart {
    height: calc(100vh - 450px);
    min-height: 300px;
  }
}
@media screen and(max-width:1200px) {
  .echart {
    height: 300px;
  }
}
</style>