<template>
  <div class="room-add">
    <el-card shadow="never" v-if="add">
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
      <template v-slot:upload>
        <el-upload
            action="http"
            list-type="picture-card"
            :on-remove="handleRemove"
            :file-list="imgList"
            :on-success="handleSuccess"
            :http-request="handlerUpload"
            :multiple='false'
            :limit="1"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
      </template>
      </e-form>
    </el-card>
    <el-card shadow="never" v-else>
      <div slot="header">新增详情</div>
      <e-form
        :items="d_items"
        :field="d_field"
        :buttons="d_buttons"
        :before-submit="submitForm"
      >
      </e-form>
    </el-card>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth';


export default {
  name: "room-add",
  components: {
    "e-table": () => import("@/components/common/table/index.vue"),
    "e-form": () => import("@/components/common/form/index.vue"),
  },
  data() {

    return {
      add:true,
      showTable: false,
      // 
      imgList:[],
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
          type: "slot",
          slot_name: "upload",
          prop: "poster",
          label: "图片",
          required: true,
        },
      ],
      f_field: {
        // title: "",
        // price: "",
        // origin_price: "",
        // description: "",
        // poster:"",
      },
      f_buttons: [
        { label: "取消", key: "cancel", type: "danger" },
        { label: "下一步", key: "next", type: "primary",cb:(data)=>(this.add=false) },
      ],
      d_items: [
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
          prop: "description1",
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
      d_field: {
        slides: [], // 房间详情轮播图数据
        feature: "", // 特色，文字描述
        description: [], // 图片形式详细描述
      },
      d_buttons: [
        {
          label: "上一步",
          key: "cancel",
          type: "danger",
          cb: (data) => (this.add=true),
        },
        { label: "确定", key: "confirm", type: "primary" },
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

    handleClose() {
      this.dialogVisible = false;
      this.imgList = [];
      this.f_field = {};
    },
    handleRemove(file, fileList) {
      // file删除的那张图，剩下的照片墙fileList
      // 含name和url等服务器不需要的字段
      this.imgList = fileList;
      this.f_field.poster = "";
    },
    handleSuccess(response, file, fileList) {
      // 收集刚上传的图片
      this.imgList = fileList;
      this.f_field.poster = response.data;
    },
    // 上传文件
    handlerUpload(data) {
      const form = new FormData(); // "Content-Type": "multipart/form-data"
      form.append("file", data.file); // file(key):value

      this.$http({
        url: "/upload",
        method: "post",
        data: form,
      }).then(({ data }) => {
        this.f_field.poster= data.url;
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