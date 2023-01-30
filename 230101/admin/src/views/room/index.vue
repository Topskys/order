<template>
  <div class="room">
    <el-card shadow="never">
      <!-- 表单 -->
      <el-form
        :model="form"
        ref="form"
        :inline="true"
        @keyup.enter.native="getPageList()"
        style="margin-top: 20px"
      >
        <el-form-item label="选择:">
          <el-select v-model="form.keyword" placeholder="请选择">
            <el-option
              v-for="(item, i) in selections"
              :key="item.value"
              :label="item.label"
              :value="`${item.value}:${i}`"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="dialog = !dialog"
            >新增</el-button
          >
        </el-form-item>
      </el-form>

      <!-- 表格 -->
      <e-table
        :config="t_config"
        @currentChange="currentChange"
        @sizeChange="sizeChange"
      >
        <template v-slot:operation="slot_data">
          <el-button
            @click="edit(slot_data.data)"
            type="text"
            style="color:#409eff;"
          >编辑</el-button>
          <!-- <el-button type="text"  style="color:#909399;">详情</el-button> -->
          <el-button type="text" style="color:#f56c6c;">删除</el-button>
        </template>
      </e-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "room",
  components: {
    "e-table": () => import("@/components/common/table/index.vue"),
  },
  data() {
    return {
      form: {
        keyword: "",
        page: 1,
        pageSize: 5,
      },
      dialog: false,
      selections: [
        {
          label: "全部",
          value: "全部",
        },
        {
          label: "大床",
          value: "大床",
        },
        {
          label: "单床",
          value: "单床",
        },
        {
          label: "双床",
          value: "双床",
        },
        {
          label: "三床",
          value: "三床",
        },
        {
          label: "圆床",
          value: "圆床",
        },
        {
          label: "单人床",
          value: "单人床",
        },
        {
          label: "双人床",
          value: "双人床",
        },
      ],

      // 列表配置
      t_config: {
        // 边框
        border: true,
        // 序号
        // index: true,
        // 列表数据
        tableData: [],
        // 列
        columns: [
          {
            type: "text",
            prop: "title",
            label: "标题",
          },
          {
            type: "image",
            prop: "poster",
            label: "图片",
            align: "center",
            show_tooltip: false,
          },
          {
            type: "text",
            prop: "room_number",
            label: "房间号",
          },
          {
            type: "function",
            prop: "origin_price",
            label: "原价",
            cb: (data) => `￥${Number(data.origin_price).toFixed(2)}`,
          },
          {
            type: "function",
            prop: "price",
            label: "价格",
            cb: (data) => `￥${Number(data.price).toFixed(2)}`,
          },
          {
            type: "text",
            prop: "description",
            label: "描述",
          },
          {
            type: "text",
            prop: "sale",
            label: "销量",
          },
          {
            type: "tag",
            prop: "status",
            label: "状态",
            cb: (data) => {
              let tag_type = "defualt";
              switch (data.status) {
                case "normal":
                  tag_type = "success";
                  break;
                case "delete":
                  tag_type = "danger";
                  break;
                case "live":
                  tag_type = "warning";
                  break;
              }
              return tag_type;
            },
          },
          {
            type: "text",
            prop: "updateTime",
            label: "更新日期",
          },
          {
            type: "slot",
            label: "操作",
            prop: "operation",
            slot_name: "operation",
            align: "center",
          },
        ],
        // 分页
        pagination: {
          show: true,
          align: "center",
          page: 1,
          pageSize: 5,
          total: 0,
        },
      },

      // 列
      column: {
        loading: false,
        columns: [
          {
            text: true,
            prop: "id",
            label: "可以排序",
            width: "",
            align: "center",
            editRow: undefined,
            sortable: true, //开启排序
          },
          {
            text: true,
            prop: "date",
            label: "时间",
            width: "",
            align: "center",
            sortable: false,
          },
          {
            // text: true,
            editRow: true,
            prop: "name",
            label: "点击可编辑",
            width: "",
            align: "center",
            sortable: false,
          },
          {
            img: true,
            prop: "img",
            label: "图片",
            width: "300",
            align: "center",
            sortable: false,
          },
          {
            ownDefined: true,
            prop: "address",
            label: "自定义返回内容",
            width: "",
            align: "center",
            sortable: false,
            ownDefinedReturn: (row, $index) => {
              return row.address;
            },
          },

          {
            operation: true,
            label: "操作",
            width: "180",
            align: "center",
            sortable: false,
            operations: [
              {
                type: "text",
                size: "",
                label: "编辑",
                icon: "",
                color: "red",
                isShow: (row, $index) => {
                  return true;
                },
              },
              {
                type: "text",
                label: "删除",
                icon: "",
                size: "",
                color: "blue",
                isShow: (row, $index) => {
                  return true;
                },
              },
              {
                type: "text",
                label: "查看",
                icon: "",
                size: "",
                color: "",
                isShow: (row, $index) => {
                  return true;
                },
              },
            ],
          },
        ],
      },
      // 分页
      pagination: {
        show: true,
        align: "center",
        page: 1,
        pageSize: 10,
        total: 0,
      },
    };
  },
  mounted() {
    this.getDataList();
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.$http({
        url: "/rooms",
        params: {
          ...this.form,
          keyword: this.form.keyword.includes("全部")
            ? ""
            : this.form.keyword?.slice(":")[0],
        },
      }).then((res) => {
        this.t_config.tableData = res.data;
        this.t_config.pagination.total = res.total;
      });
    },
    // 页码变化
    currentChange(data) {
      this.form.page = data;
      // this.getDataList();
    },
    // 单页显示大小变化
    sizeChange(data) {
      this.form.pageSize = data;
      // this.getDataList();
    },
    // 表格编辑按钮时间回调
    edit(data) {},
  },
  watch: {
    form: {
      handler(newVal, oldVal) {
        this.getDataList();
      },
      deep: true, // 深度监听，监听属性
    },
  },
};
</script>

<style lang='scss' scoped>
.room {
  padding: 20px;
}
</style>