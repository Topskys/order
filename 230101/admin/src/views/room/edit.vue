<template>
  <el-dialog
    title="编辑"
    :visible.sync="config.dialogVisible"
    width="50%"
    :before-close="handleClose"
  >
    <!-- 表单 -->
    <e-form
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
          :multiple="false"
          :limit="1"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </template>
    </e-form>
  </el-dialog>
</template>

<script>
export default {
  name: "room-edit",
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    "e-form": () => import("@/components/common/form/index.vue"),
  },
  data() {
    return {
        imgList:[],
      // form
      f_field: this.config.room,
      f_items: [
        {
          type: "input",
          prop: "title",
          label: "标题",
          placeholder: "请输入",
          required: true,
          rules: [{ required: true, message: "必填", trigger: "blur" }],
        },
        {
          type: "input",
          prop: "room_number",
          label: "房间号",
          placeholder: "请输入",
          required: true,
          rules: [{ required: true, message: "必填", trigger: "blur" }],
        },
        {
          type: "input",
          prop: "price",
          label: "价格",
          placeholder: "请输入",
          required: true,
          rules: [{ required: true, message: "必填", trigger: "blur" }],
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
          rules: [{ required: true, message: "必填", trigger: "blur" }],
        },
        {
          type: "select",
          prop: "status",
          label: "状态",
          placeholder: "请选择",
          required: true,
          props: {
            label: "label",
            value: "value", // 与下面options项对应，默认可选
          },
          options: [
            {
              label: "normal",
              value: "normal",
            },
            {
              label: "delete",
              value: "delete",
            },
            {
              label: "live",
              value: "live",
            },
          ],
          multiple: false, // 多选
        },
        {
          type: "slot",
          slot_name: "upload",
          prop: "poster",
          label: "图片",
          required: true,
        },
      ],

      f_buttons: [
        { label: "取消", key: "cancel", type: "danger",cb:()=>{
          this.config.dialogVisible=false
        } },
        { label: "提交", key: "confirm", type: "primary",cb:()=>{
          this.config.dialogVisible=false,
          this.$emit('submit' )
        }  },
      ],
    };
  },
  watch: {
    'config':{
      handler(n){
        this.f_field={...n.room}
      },
      deep:true,
      immediate:true,
    }
  },
  methods: {
    // 表单提交
    submitForm() {
      return new Promise((resolve, reject) => {
        return this.$http({
          url: `/rooms/${this.f_field._id}`,
          method: "put",
          data: this.f_field,
        });
      });
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
        this.f_field.poster = data.url;
      });
    },
    // 弹窗关闭之前清除数据
    handleClose(done) {
      this.config.dialogVisible=false;
      this.f_field = {};
    },
  },
};
</script>

<style lang='scss' scoped>
.room-add {
  padding: 20px;
}
</style>