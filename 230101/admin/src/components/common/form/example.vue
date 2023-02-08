<template>
  <div >
    <e-form
      :items="f_items"
      :field="f_field"
      :buttons="f_buttons"
      :before-submit="submitForm"
    >
    <template v-slot:classroom>
      <e-select :config="s_slot_config">
        <template v-slot:select="slot_data">
          <div style="font-size:30px">
            {{slot_data.data.name}}
          </div>
        </template>
      </e-select>
    </template>
    </e-form>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth';
export default {
  components: {
    "e-form": () => import("@/components/common/form/index.vue"),
    "e-select": () => import("@/components/common/control/select/index.vue"),
  },
  data() {
    const vName = (rule, value, cb) => (value ? cb() : cb(new Error("请输入")));

    return {
      // form
      f_items: [
        {
          type: "input",
          prop: "name",
          label: "姓名",
          placeholder: "请输入",
          required: true,
          // message: "必填",
          rules: [
            { min: 3, max: 10, message: "请输入3~10个字符", trigger: "blur" },
            { validator: vName, trigger: "blur" },
          ],
        },
        {
          type: "select",
          prop: "gender",
          label: "性别",
          placeholder: "请选择",
          required: true,
          // props:{
          //   label: "label",value:'value',// 与下面options项对应，默认可选
          // },
          options: [
            {
              label: "男",
              value: "男:0",
            },
            {
              label: "女",
              value: "女:1",
            },
          ],
        },
        // {
        //   type: "select",
        //   prop: "classroom",
        //   label: "教室",
        //   placeholder: "请选择",
        //   required: true,
        //   props:{
        //     label: "name",
        //   },
        //   fetch_search:true, // 远程搜索
        //   init_request:true, // 初始化请求，进去就立即发送请求获取options
        //   keyword:'', // 搜索关键字
        //   url:"/api/classname",
        //   method:"GET",
        //   multiple:false, // 多选
        // },
        {
          type: "slot", // slot_select 需要 引入e-select组件和复制该项配置给config
          slot_name: "classroom",
          prop: "classroom",
          label: "教室",
          required: true,
        },
        {
          type: "input",
          value_type: "phone",
          prop: "phone",
          label: "手机号",
          placeholder: "请输入",
          required: true,
          rules: [
            { min: 1, max: 11, message: "请输入11个字符", trigger: "blur" },
          ],
        },
        // {
        //   type: "upload",
        //   prop: "poster",
        //   label: "图片描述",
        //   model: "card",
        //   required: true,
        //   url:'http://localhost:3000/upload',
        //   method:'post',
        //   show_files:false,
        //   accept:'.jpg,.zip,.rar,.png',
        //   multiple:true,
        //   limit:3,
        //   max_size:10,
        //   round:false,
        //   request_data:{
        //     url:'http://localhost:3000/upload',
        //     method:'post',
        //     data:'',
        //     headers:{
        //       "Content-Type": "multiple/form-data",
        //       "Authorization":'Bearer '+getToken(),
        //     }
        //   }
        // },
      ],
      f_field: {
        name: "",
        gender: "",
        phone: "",
        classroom: "",
        // poster
      },
      f_buttons: [
        { label: "确定", key: "confirm", type: "primary" },
        { label: "取消", key: "cancel", type: "danger" },
        {
          label: "下一步",
          key: "next",
          type: "primary",
          cb: (data) => console.log("下一步", data),
        },
      ],
      // slot_select
      s_slot_config:{
          props:{
            label: 'name',
            value:'id'
          },
          fetch_search:true, // 远程搜索
          init_request:true, // 初始化请求，进去就立即发送请求获取options
          keyword:'', // 搜索关键字
          url:'/api/classname',
          method:'get',
          multiple:false, // 多选
          cb:(data)=>{
            console.log("slot_select_cb--",data)
            // 数据回调赋值f_field.classroom，解决数据效验问题
            this.cr_value()
          }
        }
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
    cr_value(data){
      this.f_field.classroom=data
    }
  },
};
</script>

<style>
</style>