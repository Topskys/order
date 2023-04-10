<template>
  <el-select
    v-model="val"
    @change="handlerChange"
    :multiple="multiple"
    :collapse-tags="multiple"
    :remote="fetchSearch"
    :filterable="fetchSearch"
    :remote-method="keywordRequest"
  >
    <el-option
      v-for="option in config.options"
      :key="option.label"
      :label="option.label"
      :value="option.value"
      placeholder="请输入关键词"
    >
      <slot name="select" :data="option"></slot>
    </el-option>
  </el-select>
</template>

<script>
import Axios from "axios";

export default {
  name: "e-select",
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
    value: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      val: "",
      option: [],
      //   默认值
      props: {
        label: "label",
        value: "value",
      },
    };
  },
  computed: {
    url() {
      return this.config?.url;
    },
    initRequest() {
      return this.config?.init_request;
    },
    method() {
      return this.config?.method || "GET";
    },
    fetchSearch() {
      return this.config?.fetch_search;
    },
    keyword() {
      return this.config?.keyword || "keyword";
    },
    multiple() {
      return this.config?.multiple || false;
    },
  },
  watch: {
    config: {
      handler(newVal) {
        this.initOptions();
        this.initProps();
      },
      immediate: true,
    },
    value: {
      handler(newVal) {
        this.val = newVal;
      },
      immediate: true,
    },
  },
  methods: {
    handlerChange(v) {
      // 动态组件 :value.sync="field[item.prop]" ，
      // .sync：可以将子组件的数据同步到父组件，
      // 以实现组件分离form数据效验问题
      this.$emit("update:value", v); // 数据同步，更新父组件数据（field[item.prop]）
      // or
      // this.$emit("updateValue",this.val); // 子传父
      this.config.cb && this.config.cb(v);
    },
    /**
     * 初始化下拉数据选项
     */
    initOptions() {
      const url = this.config.url;

      if (url) {
        this.fetchOptions();
        return false;
      }

      const option = this.config.options;
      if (option && Array.isArray(option) && option.length > 0) {
        this.option = option;
      }
    },
    /**
     * 异步请求options
     */
    fetchOptions() {
      this.initRequest && this.getOptions();
    },
    /**
     * 关键字异步请求
     */
    keywordRequest(query) {
      query && this.fetchSearch && this.getOptions(query);
    },
    /**
     * 获取options列表
     */
    getOptions(query) {
      const request_data = {
        url: this.url,
        method: this.method,
      };

      // post or get
      if (request_data.method.toLowerCase() === "get") {
        request_data.params = query ? { [this.keyword]: query } : {};
      }
      if (request_data.method.toLowerCase() === "post") {
        request_data.data = query ? { [this.keyword]: query } : {};
      }

      Axios(request_data).then((res) => {
        this.option = res.data.data;
      });
    },

    /**
     * 初始化label和value
     */
    initProps() {
      const option = this.config.props;
      const keys = Object.keys(this.props); // 获取默认值得key

      // 判断是否是json对象
      if (
        option &&
        Object.prototype.toString.call(option) === "[object Object]"
      ) {
        for (const key in option) {
          if (keys.includes(key)) {
            this.props[key] = option[key];
          }
        }
      }
    },
  },
};
</script>

<style>
</style>