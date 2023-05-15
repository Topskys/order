<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
    <el-row :gutter="30">
      <el-col :span="12">
        <el-row :gutter="10"
          ><el-col :span="12"
            ><el-card shadow="never">
              <div class="c-content">
                <div class="card-left">
                  <svg-icon icon-class="occupancy" class-name="occupancy" />
                </div>
                <div class="card-right">
                  <div class="card-title">入住率</div>
                  <countTo
                    :startVal="startVal"
                    :endVal="ev1"
                    :duration="3000"
                  ></countTo
                  >%
                </div>
              </div>
            </el-card></el-col
          >
          <el-col :span="12"
            ><el-card shadow="never">
              <div class="c-content">
                <div class="card-left">
                  <svg-icon icon-class="money" class-name="money" />
                </div>
                <div class="card-right">
                  <div class="card-title">日充值</div>
                  <countTo
                    :startVal="startVal"
                    :endVal="ev2"
                    :duration="3000"
                  ></countTo>
                </div>
              </div> </el-card
          ></el-col>
        </el-row>
        <el-row :gutter="10" style="margin-top: 10px"
          ><el-col :span="12"
            ><el-card shadow="never">
              <div class="c-content">
                <div class="card-left">
                  <svg-icon icon-class="comment" class-name="comment" />
                </div>
                <div class="card-right">
                  <div class="card-title">好评率</div>
                  <countTo
                    :startVal="startVal"
                    :endVal="ev3"
                    :duration="3000"
                  ></countTo
                  >%
                </div>
              </div>
            </el-card></el-col
          >
          <el-col :span="12"
            ><el-card shadow="never">
              <div class="c-content">
                <div class="card-left">
                  <svg-icon icon-class="peoples" class-name="peoples" />
                </div>
                <div class="card-right">
                  <div class="card-title">访问量</div>
                  <countTo
                    :startVal="startVal"
                    :endVal="ev4"
                    :duration="3000"
                  ></countTo>
                </div>
              </div> </el-card
          ></el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <div class="hot-sale">
          <hot-sale :hot="chart.hot"></hot-sale>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top: 30px">
      <el-card shadow="never">
        <lineX></lineX>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import countTo from "vue-count-to";
import lineX from "./echarts/line.vue";
import hotSale from "./hot-sale.vue";

export default {
  name: "Dashboard",
  components: { countTo, lineX, hotSale },
  data() {
    return {
      startVal: 0,
      endVal: 23,
      ev1: 0,
      ev2: 0,
      ev3: 0,
      ev4: 0,
      chart: {
        // occupancy: 0, // 住房率
        // charge: 0, // 日充值
        // comment: 0, // 好评率
        // visitor: 0, // 访问量
        // hot: [], // 畅销产品
        // sale: [], // 月销售额
      },
      // hot: [1,2,3,4,5,6], // 畅销产品
      // sale: [], // 月销售额
    };
  },
  computed: {
    ...mapGetters(["name"]),
  },
  created() {
    this.getChartData();
  },
  methods: {
    // 获取数据面板数据
    getChartData() {
      this.$http({
        url: "/dashboard",
      }).then((res) => {
        this.chart = res.data;
        this.ev1 = this.chart.occupancy * 100;
        this.ev2 = this.chart.charge;
        this.ev3 = this.chart.comment * 100;
        this.ev4 = this.chart.visitor;
        // this.hot=this.chart.hot;
      });
    },
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
.occupancy {
  fill: #34bfa3;
}

.money {
  fill: #f4516c;
}
.comment {
  fill: #36a3f7;
}
.peoples {
  fill: #40c9c6;
}

.c-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .card-left {
    font-size: 60px;
  }
  .card-right {
    font-size: 20px;
    font-weight: bold;
    .card-title {
      margin-bottom: 10px;
      font-size: 16px;
      font-weight: 300;
    }
  }
}

.hot-sale {
  ::v-deep .el-table td,
  .el-table th {
    padding: 11px 0;
  }
}
</style>
