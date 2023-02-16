<template>
  <div class="room">
    <el-card shadow="never">
      <!-- 表单 -->
      <el-form
        :model="form"
        ref="form"
        :inline="true"
        @keyup.enter.native="getPageList()"
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
          <router-link :to="{ path: '/room/add' }">
            <el-button type="primary" icon="el-icon-plus">新增</el-button>
          </router-link>
        </el-form-item>
        <!-- <el-form-item>
          <el-button type="primary" icon="el-icon-document">导入</el-button>
        </el-form-item> -->
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
            style="color: #409eff"
            >编辑</el-button
          >
          <el-button
            @click="detail(slot_data.data)"
            type="text"
            style="color: #909399"
            >详情</el-button
          >
          <el-button
            @click="del(slot_data.data)"
            type="text"
            style="color: #f56c6c"
            >删除</el-button
          >
        </template>
      </e-table>
    </el-card>
    <!-- 编辑表单 -->
    <edit :config="config" @submit="getPageList"></edit>
    <!-- dialog表单 -->
    <el-dialog
      :title="`房间详情-${f_field.title}`"
      :visible.sync="dialogVisible"
      append-to-body
      width="50%"
    >
      <e-form
        :items="f_items"
        :field="f_field"
        :buttons="f_buttons"
        :before-submit="submitForm"
      >
      </e-form>
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";
export default {
  name: "room",
  components: {
    "e-table": () => import("@/components/common/table/index.vue"),
    "e-form": () => import("@/components/common/form/index.vue"),
    "edit": () => import("./edit.vue"),
  },
  data() {
    return {
      form: {
        keyword: "",
        page: 1,
        pageSize: 10,
      },
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
              let tag_type = "default";
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
          pageSize: 10,
          total: 0,
        },
      },

      // dialog 表单
      dialogVisible: false,
      f_items: [
        {
          type: "input",
          prop: "feature",
          label: "特色",
          placeholder: "请输入",
          required: true,
        },
        {
          type: "upload",
          prop: "slides",
          label: "详情轮播",
          model: "card",
          required: true,
          url: "http://localhost:3000/upload",
          method: "post",
          show_files: false,
          accept: ".jpg,.zip,.rar,.png",
          multiple: true,
          limit: 3,
          max_size: 10,
          round: false,
          request_data: {
            url: "http://localhost:3000/upload",
            method: "post",
            data: "",
            headers: {
              "Content-Type": "multiple/form-data",
              Authorization: "Bearer " + getToken(),
            },
          },
        },
        {
          type: "upload",
          prop: "explain",
          label: "图片描述",
          model: "card",
          required: true,
          url: "http://localhost:3000/upload",
          method: "post",
          show_files: false,
          accept: ".jpg,.zip,.rar,.png",
          multiple: true,
          limit: 3,
          max_size: 10,
          round: false,
          request_data: {
            url: "http://localhost:3000/upload",
            method: "post",
            data: "",
            headers: {
              "Content-Type": "multiple/form-data",
              Authorization: "Bearer " + getToken(),
            },
          },
        },
      ],
      f_field: {
        slides: [
          // "https://img1.baidu.com/it/u=3668096463,799852184&fm=253&fmt=auto&app=138&f=PNG?w=499&h=232",
          // "https://img0.baidu.com/it/u=2422979282,750047281&fm=253&fmt=auto&app=138&f=JPEG?w=1014&h=500"
        ], // 房间详情轮播图数据
        feature: "", // 特色，文字描述
        explain: [], // 图片形式详细描述
      },
      f_buttons: [
        {
          label: "取消",
          key: "cancel",
          type: "danger",
          cb: (data) => {
            this.dialogVisible = false;
          },
        },
        { label: "确定", key: "confirm", type: "primary" },
      ],
      // 编辑表单配置
      config: {
        dialogVisible: false,
        room: {},
      },
    };
  },
  mounted() {
    this.getPageList();
  },
  methods: {
    // 获取数据列表
    getPageList() {
      this.$http({
        url: "/rooms/all",
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
      // this.getPageList();
    },
    // 单页显示大小变化
    sizeChange(data) {
      this.form.pageSize = data;
      // this.getPageList();
    },
    // 表格编辑按钮时间回调
    edit(data) {
      this.config = {
        dialogVisible: true,
        room:{...data},
      };
    },
    /**
     * 表格详情按钮
     */
    detail(data) {
      const { title } = data;
      this.$http({
        url: `detail/${data._id}`,
        method: "GET",
      }).then(({ code, msg, data }) => {
        this.f_field = { ...data, title };
        code === 200 && (this.dialogVisible = true);
      });
    },
    /**
     * 表格删除按钮
     */
    del(data) {
      this.$confirm(`你确定删除项数据?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http({
            url: `/rooms/del/${data._id}`,
            method: "DELETE",
          }).then(({ code, msg }) => {
            this.$message({
              type: code == 200 ? "success" : "error",
              message: msg,
            });
            this.getPageList();
          });
        })
        .catch((e) => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 表单提交
    submitForm() {
      return this.$http({
        url: "/detail/addOrUpdate",
        method: "POST",
        data: {
          ...this.f_field,
        },
      });
      // .then(({ code, msg}) => {
      //   this.$message({
      //     type: code === 200 ? "success" : "error",
      //     message: msg,
      //   });
      // });
    },
  },
  watch: {
    form: {
      handler(newVal, oldVal) {
        this.getPageList();
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