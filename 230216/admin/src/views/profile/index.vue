<!--
 * @Author: Topskys
 * @Date: 2023-03-06 11:34:53
 * @LastEditTime: 2023-03-18 21:43:38
-->
<script lang='ts' setup>
import { ref, reactive, toRefs, defineProps } from "vue";

// 效验规则
const validPwd = (
  rule: unknown,
  value: string | number | undefined,
  cb: (msg?: string) => void
) => {
  if (!value) {
    cb("密码不能为空");
  } else {
    cb();
  }
};

// data
const data = reactive({
  // 可在此定义多个响应式数据属性变量
  form: {
    username: "",
    password: "",
  },
  rules: {
    username: [{ required: true, trigger: "blur" }],
    password: [{ validator: validPwd, trigger: "blur" }],
  },
});
let { form, rules } = toRefs(data); // 解构防止属性响应式丢失
</script>


<template>
  <div class="profile">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item prop="username" label="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>


<style lang='scss' scoped>
</style>