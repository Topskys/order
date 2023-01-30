<template>
  <div >
    <e-form
      :items="f_items"
      :field="f_field"
      :buttons="f_buttons"
      :before-submit="submitForm"
    ></e-form>
  </div>
</template>

<script>
export default {
  components: {
    "e-form": () => import("@/components/common/form/index.vue"),
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
          selections: [
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
      ],
      f_field: {
        name: "",
        gender: "",
        phone: "",
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
    };
  },
  methods: {

    // 表单提交
    submitForm() {
      return new Promise((resolve,reject) => {
        setTimeout(()=>{
          // reject()
          console.log("OK")
        },200)
      })
    },
  },
};
</script>

<style>
</style>