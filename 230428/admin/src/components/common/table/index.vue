<template>
  <div class="e-table">
    <!-- 表格 -->
    <el-table
      :data="config.tableData"
      ref="table"
      :check-list="check_list"
      @selection-change="selectionChange"
      @sort-change="sortChange"
      :border="config.border"
      :stripe="config.stripe"
      style="width: 100%"
    >
      <el-table-column
        v-if="config.checkbox"
        type="selection"
        width="50"
      ></el-table-column>
      <el-table-column
        v-if="config.index"
        type="index"
        label="序号"
        align="center"
        width="100"
        show-overflow-tooltip
      >
      </el-table-column>

      <template v-for="col in config.columns">
        <el-table-column
          :key="col.prop"
          :prop="col.prop"
          :label="col.label"
          :width="col.width"
          :align="col.align || 'center'"
          :sortable="col.sortable || false"
          :sort-by="col.sort_by"
          :render-header="col.rh"
          :show-overflow-tooltip="
            JSON.stringify(col.show_tooltip) === undefined
              ? true
              : col.show_tooltip
          "
        >
          <template slot-scope="scope">
            <slot
              v-if="col.type === 'slot'"
              :name="col.slot_name"
              :data="scope.row"
            ></slot>
            <component
              v-else
              :data="scope.row"
              :config="col"
              :prop="col.prop"
              :value.sync="config.columns[col.prop]"
              :is="
                !col.type
                  ? 'e-text'
                  : col.type === 'text'
                  ? 'e-text'
                  : `e-${col.type}`
              "
            />
          </template>
        </el-table-column>
      </template>
    </el-table>
    <el-pagination
      v-if="config.pagination.show"
      :layout="`${config.pagination.align=='right'?'prev,pager,next,sizes,total':'total,sizes,prev,pager,next'}`"
      @current-change="currentChange"
      @size-change="sizeChange"
      :current-page.sync="config.pagination.page"
      :page-sizes="[5, 10, 15, 20, 25, 30]"
      :page-size="config.pagination.pageSize || 10"
      :total="config.pagination.total || 0"
      :align="config.pagination.align || 'center'"
      background
      style="padding-top: 15px"
    >
    </el-pagination>
  </div>
</template>

<script>
import axios from "axios";

/**
 * require.context(dir,sub,extension)
 * @description: 自动化装配组件
 * @param {String} directory 读取目录
 * @param {Boolean} subdirectories 是否读取目录下的子文件
 * @param {String} extension 读取的文件，可选正则表达
 * @param {String} alias 读取文件别名
 */
const files = require.context(
  "@/components/common/control",
  true,
  /\index.vue$/
);
const [path, modules, alias] = [require("path"), {}, "e-"];

files
  .keys()
  .forEach(
    (key) => (modules[`${alias}${key.split("/")[1]}`] = files(key).default)
  );

export default {
  name: "e-table",
  components: modules,
  props: {
    config: {
      type: Object,
      default: {
        tableData: {
          type: Array,
          default: () => [],
        },
        columns: {
          type: Array,
          default: () => [],
        },
        onLoad: Boolean, // 数据回调
        index: Boolean, // 序号
        checkbox: Boolean, // 复选框
        format: Function, // 数据格式化
        stripe: Boolean, // 斑马条纹
        // 请求参数
        req: {
          type: Object,
          default: () => {},
        },
        // 分页
        pagination: {
          show: true,
        },
      },
    },
    check_list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  beforeMounted() {
    // this.getTableList();
  },
  methods: {
    // 请求列表数据
    getTableList() {
      // 如果请求参数为空，则停止获取数据
      if (JSON.stringify(this.config.req) === "{}") return;

      axios(this.config.req).then((res) => {
        let req = res.data.data;
        // 数据格式化
        if (this.config.format && typeof this.config.format === "function") {
          req = this.config.format(res.data.data);
        }
        this.config.tableData = res.data.data;
        // 回调数据
        this.config.onLoad && this.$emit("onLoad", res.data.data);
      });
    },
    // 复选框
    selectionChange(val) {
      // 数据同步 or 子传父
      this.$emit("update:checkList", val); // .sync数据同步
      //   this.$emit("getCheckList", val); // 子传父
    },
    // 远程排序
    sortChange({ column, prop, order }) {
      console.log("e-table远程排序-", column, prop, order);
    },
    // 页码变化
    currentChange(e) {
      this.$emit("currentChange", e);
    },
    // 条数变化
    sizeChange(e) {
      this.$emit("sizeChange", e);
    },
  },
};
</script>

<style style='scss' scoped>
::v-deep.el-table thead,::v-deep .el-table th {
  color: #262626;
  font-weight: 400;
  background: #f7fbff;
}

</style>