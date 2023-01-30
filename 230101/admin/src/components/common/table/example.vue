<template>
  <div>
    <e-table :config="config" :check-list.sync="check_list">
      <template v-slot:operation="slot_data">
        <el-button type="primary" @click="edit(slot_data.data)">编辑</el-button>
        <el-button type="danger">删除</el-button>
      </template>
    </e-table>
  </div>
</template>

<script>
export default {
  components: {
    "e-table": () => import("@/components/common/table/index.vue"),
  },
  data() {
    
    return {
      // table
      config: {
        tableData: [
          {
            date: "2016-05-02",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄",
            img: "https://img2.baidu.com/it/u=3681182487,4085304312&fm=253&fmt=auto&app=138&f=JPG?w=1004&h=500",
          },
          {
            date: "2016-05-04",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1517 弄",
            img: "https://img0.baidu.com/it/u=2286522226,3395276563&fm=253&fmt=auto&app=138&f=PNG?w=500&h=216",
          },
          {
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
            img: "https://img2.baidu.com/it/u=3681182487,4085304312&fm=253&fmt=auto&app=138&f=JPG?w=1004&h=500",
          },
          {
            date: "2016-05-03",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1516 弄",
            img: "https://img0.baidu.com/it/u=2286522226,3395276563&fm=253&fmt=auto&app=138&f=PNG?w=500&h=216",
          },
        ],
        columns: [
          {
            type: "text",
            prop: "date",
            label: "日期",
          },
          {
            type: "text",
            prop: "name",
            label: "姓名",
            sortable: "custom", // 远程排序
            sort_by: "a.c", // 按某属性排序
          },
          {
            type: "image",
            prop: "img",
            label: "图片",
            fit: "contain",
            align: "center",
          },
          {
            type: "function",
            prop: "address",
            label: "URL地址",
            cb: (data) => `<a href="http://localhost:2311">${data.address}</a>`,
            align: "center",
          },
          {
            type: "slot",
            label: "操作",
            prop: "operation",
            slot_name: "operation",
            align: "center",
            // rh:(h,{column,$index})=>{
            //   return (
            //     <div>
            //     <p>操作</p>
            //     <el-input value="input"/>
            //     </div>
            //   )
            // }
          },
        ],
        index: true,
        checkbox: true,
        // format:this.formatData(),
        // 分页
        pagination: {
          show: true,
        },
      },
      check_list: [], // 复选框数据同步使用

      
    };
  },
  watch: {
    // 监听复选框
    check_list: {
      handler(v) {
        console.log("监听复选框-同步方式", v);
      },
    },
  },
  methods: {
    // 数据回调 @onLoad="onLoad"
    onLoad(data) {
      console.log("数据回调--", data);
    },
    // 复选框--子传父方式 @getCheckList="getCheckList"
    getCheckList(data) {
      console.log("复选框--子传父方式--", data);
    },
    // 编辑
    edit(data) {
      console.log("编辑--", data);
    },
    // 格式化数据
    formatData(data = null) {
      console.log("formatData--", data);
      // return data
    },

  },
};
</script>

<style>
</style>