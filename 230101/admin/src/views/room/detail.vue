<template>
  <div class="room-detail">
    <el-card shadow="never">
      <div slot="header">修改详情----标题</div>
      <e-form
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
  name: "room-detail",
  components: {
    "e-form": () => import("@/components/common/form/index.vue"),
  },
  data() {
    return {
      // form
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
          url:'http://localhost:3000/upload',
          method:'post',
          show_files:false,
          accept:'.jpg,.zip,.rar,.png',
          multiple:true,
          limit:3,
          max_size:10,
          round:false,
          request_data:{
            url:'http://localhost:3000/upload',
            method:'post',
            data:'',
            headers:{
              "Content-Type": "multiple/form-data",
              "Authorization":'Bearer '+getToken(),
            }
          }
        },
        {
          type: "upload",
          prop: "description",
          label: "图片描述",
          model: "card",
          required: true,
          url:'http://localhost:3000/upload',
          method:'post',
          show_files:false,
          accept:'.jpg,.zip,.rar,.png',
          multiple:true,
          limit:3,
          max_size:10,
          round:false,
          request_data:{
            url:'http://localhost:3000/upload',
            method:'post',
            data:'',
            headers:{
              "Content-Type": "multiple/form-data",
              "Authorization":'Bearer '+getToken(),
            }
          }
        },
      ],
      f_field: {
        slides: [
          // "https://img1.baidu.com/it/u=3668096463,799852184&fm=253&fmt=auto&app=138&f=PNG?w=499&h=232",
          // "https://img0.baidu.com/it/u=2422979282,750047281&fm=253&fmt=auto&app=138&f=JPEG?w=1014&h=500"
        ], // 房间详情轮播图数据
        feature: "", // 特色，文字描述
        description: [], // 图片形式详细描述
      },
      f_buttons: [
        { label: "确定", key: "confirm", type: "primary" },
        { label: "取消", key: "cancel", type: "danger" },
      ],
    };
  },
  methods: {
    // 表单提交
    submitForm() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // reject()
          console.log("OK");
        }, 200);
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.room-detail {
  padding: 20px;
}
</style>