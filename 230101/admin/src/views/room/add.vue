<template>
  <div class="room-add">
    <el-card shadow="never">
      <div slot="header">新增房间</div>
      <!-- xlsx导入数据 -->
      <e-table v-if="showTable" :config="t_config"></e-table>
      <!-- 表单 -->
      <e-form
        v-else
        :items="f_items"
        :field="f_field"
        :buttons="f_buttons"
        :before-submit="submitForm"
      >
      </e-form>
    </el-card>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth';


export default {
  name: "room",
  components: {
    "e-table": () => import("@/components/common/table/index.vue"),
    "e-form": () => import("@/components/common/form/index.vue"),
  },
  data() {
    const vName = (rule, value, cb) => (value ? cb() : cb(new Error("请输入")));

    return {
      showTable: false,
      // table
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
        ],
      },
      // form
      f_items: [
        {
          type: "input",
          prop: "title",
          label: "标题",
          placeholder: "请输入",
          required: true,
          // message: "必填",
          rules: [
            { required: true,message: "必填", trigger: "blur" }
          ],
        },
        {
          type: "input",
          prop: "price",
          label: "价格",
          placeholder: "请输入",
          required: true,
          rules: [
            { required: true,message: "必填", trigger: "blur" }
          ],
        },
        {
          type: "input",
          prop: "origin_price",
          label: "原价",
          placeholder: "请输入",
        },
        {
          type: "input",
          prop: "description",
          label: "描述",
          placeholder: "请输入",
          required: true,
          rules: [
            { required: true,message: "必填", trigger: "blur" }
          ],
        },
        {
          type: "upload",
          prop: "poster",
          label: "图片",
          model: "card",
          required: true,
          url:'http://localhost:3000/upload',
          method:'post',
          show_files:false,
          accept:'.jpg,.zip,.rar,.png',
          multiple:false,
          limit:1,
          max_size:10,
          round:false,
          request_data:{
            url:'http://localhost:3000/upload',
            method:'post',
            data:'',
            headers:{
              "Content-Type": "multiple/form-data",
              "Authorization":getToken(),
            }
          }
        },
      ],
      f_field: {
        title: "",
        price: "",
        origin_price: "",
        description: "",
        // poster:"",
        poster: "https://img0.baidu.com/it/u=1169262494,2179885545&fm=253&fmt=auto&app=138&f=JPEG?w=658&h=372",
      },
      f_buttons: [
        { label: "确定", key: "confirm", type: "primary" },
        { label: "取消", key: "cancel", type: "danger" },
        { label: "下一步", key: "next", type: "primary",cb:(data)=>{console.log("next",data)} },
      ],
    };
  },
  methods: {
    // 表单提交
    submitForm() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // reject()
          console.log("OK",this.f_field);
        }, 200);
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.room-add {
  padding: 20px;
}
</style>