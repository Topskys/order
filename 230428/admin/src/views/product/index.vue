<template>
  <div class="product-container">
    <!-- Search -->
    <el-card shadow="never" class="query-card">
      <div slot="header">
        <div class="query-title r-flex">
          <i class="el-icon-search"></i>
          <span class="ml10">搜索筛选</span>
        </div>
      </div>
      <el-form
        ref="queryForm"
        :model="query"
        label-width="80px"
        inline
        @keyup.enter.native="getList()"
      >
        <div style="width: 400px">
          <el-form-item label="标题">
            <el-input v-model="query.title" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="类别">
            <el-select
              v-model="query.class_name"
              placeholder="请选择"
              @click.native="getCategory"
            >
              <el-option
                :value="item.name"
                v-for="item in categories"
                :key="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="label">
              <el-input v-model="query.model" placeholder="请输入"></el-input>
            </el-form-item> -->
        </div>
        <div style="display: flex; justify-content: space-between">
          <div>
            <el-form-item label="创建时间" style="margin-right: 0 !important">
              <el-date-picker
                v-model="query.startAt"
                type="datetime"
                placeholder="开始时间"
                class="first-data-picker"
              ></el-date-picker>
            </el-form-item>
            <el-form-item style="margin-right: 0 !important"
              >&minus;</el-form-item
            >
            <el-form-item label="">
              <el-date-picker
                v-model="query.endAt"
                type="datetime"
                placeholder="结束时间"
              ></el-date-picker>
            </el-form-item>
          </div>
          <div style="white-space: nowrap">
            <el-button icon="el-icon-refresh" @click="resetQueryFrom"
              >重置
            </el-button>
            <el-button type="primary" icon="el-icon-search" @click="getList()"
              >搜索
            </el-button>
          </div>
        </div>
      </el-form>
    </el-card>
    <!-- Table -->
    <el-card shadow="never" style="margin-top: 15px">
      <div style="margin-bottom: 20px;display:flex;justify-content:space-between;algin-items:center; ">
       <div>
         <el-button type="primary" icon="el-icon-plus" @click="createOrEdit()"
          >新增
        </el-button>
        <el-button icon="el-icon-delete" @click="del()">批量删除 </el-button>
        </div>
          <el-button type="primary" size='small' icon="el-icon-plus" @click="addCate"
          >添加类别
        </el-button>
      </div>
      <e-table
        :config="tableConfig"
        :checkList.sync="checkList"
        @currentChange="currentChange"
        @sizeChange="sizeChange"
      >
        <template v-slot:operation="{ data }">
          <el-button type="text" @click="createOrEdit(data)" size="small"
            >编辑
          </el-button>
          <el-button
            type="text"
            @click="createOrEdit(data)"
            style="color: #e6a23c"
            size="small"
            >详情
          </el-button>
          <el-button
            type="text"
            size="small"
            style="color: #f56c6c"
            @click="del(data)"
            >删除
          </el-button>
        </template>
      </e-table>
    </el-card>
    <!-- Dialog -->
    <dialogEdit :data="dialogData" :dialogVis.sync="dialogVis" @reReqList="getList()"/>
    <!-- Category -->
    <Category :data="categories" :diaVis.sync="dialogVisClass"/>
  </div>
</template>

<script>
import eTable from "@/components/common/table";
import dialogEdit from "./edit.vue";
import tableConfig from "./tableConfig.js";
import Category from "./category.vue";
export default {
  components: {
    eTable,
    dialogEdit,
     Category,
  },
  data() {
    return {
      // Search
      query: {
        page: 1,
        pageSize: 5,
        title: "",
        class_name: "",
        startAt: "",
        endAt: "",
      },
      categories: [],
      // Table
      tableConfig: { ...tableConfig },
      checkList: [],
      // Dialog
      dialogVis: false,
      dialogData: {},
      // class dialog
      dialogVisClass:false,  
    };
  },
  mounted() {
    this.getList();
  },
  watch: {
    checkList(value) {
      console.log(value);
    },
  },
  methods: {
    // 获取产品信息数据列表
    async getList() {
      const res = await this.$product.getProductList(this.query);
      this.tableConfig.tableData = res?.data || [];
      this.tableConfig.pagination.total = res?.total;
      if (res.data && !res.data.length) {
        const page = this.tableConfig.pagination.page;
        this.tableConfig.pagination.page = page > 1 ? page : page - 1;
      }
    },
     // 获取分类数据
    getCategory() {
      this.$http({
        url: "/class",
      }).then((res) => {
        this.categories = res.data || [];
      });
    },
    // 添加
    addCate(){
      this.dialogVisClass=true
    },
    // 重置按钮
    resetQueryFrom() {
      this.query = {
        page: 1,
        pageSize: 10,
        name: "",
        selection: "",
      };
      this.getList();
    },
    // 新增或表格修改按钮
    createOrEdit(data = {}) {
      this.dialogData = { ...data };
      this.dialogVis = true;
      this.activeName = "first";
    },
    // 批量删除及单项删除按钮
    del(data) {
      let delArr = new Array(0);
      data
        ? delArr.push(data._id)
        : (delArr = this.checkList.map((item) => item?._id && item._id));
      this.$confirm(`确定删除?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delArr.forEach(async (_id) => await this.$product.delProduct(_id));
          this.getList();
        })
        .catch((err) => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    currentChange(e) {
      this.query.page = e;
      this.getList();
    },
    sizeChange(e) {
      this.query.pageSize = e;
      this.getList();
    },
  },
};
</script>

<style>
</style>