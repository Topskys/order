<template>
  <div class="product-container">
    <!-- Search -->
    <el-card shadow="never" class="query-card">
      <div slot="header">
        <div class="query-title r-flex" style="font-size:14px;">
          <i class="el-icon-search"></i>
          <span style="margin-left:10px;">搜索筛选</span>
        </div>
      </div>
      <el-form
        ref="queryForm"
        :model="query"
        label-width="80px"
        inline
        @keyup.enter.native="getList()"
      >
        <el-row>
          <el-col :md="20" :sm="16" :xs="16">
            <el-form-item label="文档名称">
              <el-input v-model="query.filename" clearable placeholder="请输入文档名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="4" :sm="8" :xs="8">
            <el-button icon="el-icon-refresh" @click="resetQueryFrom"
            >重置
            </el-button
            >
            <el-button type="primary" icon="el-icon-search" @click="getList()"
            >搜索
            </el-button
            >
          </el-col>
        </el-row>
        <el-form-item label="创建时间" style="margin-right: 0 !important">
          <el-date-picker
            v-model="query.startAt"
            type="datetime"
            placeholder="开始时间"
            class="first-data-picker"
          ></el-date-picker>
        </el-form-item>
        <el-form-item style="margin-right: 0 !important">&minus;</el-form-item>
        <el-form-item label="">
          <el-date-picker
            v-model="query.endAt"
            type="datetime"
            placeholder="结束时间"
          ></el-date-picker>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- Table -->
    <el-card shadow="never" style="margin-top: 15px">
      <div style="margin-bottom: 20px">
        <el-button size="small" icon="el-icon-delete" @click="del()"
        >批量删除
        </el-button
        >
      </div>
      <e-table
        :config="tableConfig"
        :checkList.sync="checkList"
        @currentChange="currentChange"
        @sizeChange="sizeChange"
      >
        <template v-slot:operation="{ data }">
          <el-button
            type="text"
            @click="createOrEdit(data)"
            size="small"
            icon="el-icon-arrow-down"
          >下载
          </el-button
          >
          <el-button
            type="text"
            size="small"
            icon="el-icon-delete"
            style="color: #f56c6c"
            @click="del(data)"
          >删除
          </el-button
          >
        </template>
      </e-table>
    </el-card>
    <!-- Dialog -->
    <dialogEdit :data="dialogData" :dailogVisible.sync="dialogVisible"/>
  </div>
</template>

<script>
import eTable from '@/components/common/table'
import dialogEdit from './edit.vue'
import tableConfig from './tableConfig.js'

export default {
  name: 'Document',
  components: {
    eTable,
    dialogEdit
  },
  data() {
    return {
      // Search
      query: {
        page: 1,
        pageSize: 10,
        filename: '',
        startAt:'',
        endAt:'',
      },
      // Table
      tableConfig: { ...tableConfig },
      checkList: [],
      // Dialog
      dialogVisible: false,
      dialogData: {}
    }
  },
  mounted() {
    this.getList()
  },
  watch: {
    query: {
      handler() {
      }
    },
    checkList(value) {
      console.log(value)
    }
  },
  methods: {
    // 获取产品信息数据列表
    async getList() {
      const res = await this.$document.getAll(this.query)
      this.tableConfig.tableData = res?.data || []
      this.tableConfig.pagination.total = res?.total
      if (res.data && !res.data.length) {
        const page = this.tableConfig.pagination.page
        this.tableConfig.pagination.page = page > 1 ? page : page - 1
      }
    },
    // 重置按钮
    resetQueryFrom() {
      this.query = {
        page: 1,
        pageSize: 10,
        filename: '',
        startAt:'',
        endAt:'',
      }
      this.getList()
    },
    // 新增或表格修改按钮
    createOrEdit(data = {}) {
      this.dialogData = { ...data }
      this.dialogVisible = true
      this.activeName = 'first'
    },
    // 批量删除及单项删除按钮
    del(data) {
      let delArr = new Array(0)
      data
        ? delArr.push(data._id)
        : (delArr = this.checkList.map((item) => item?._id && item._id))
      this.$confirm(`确定删除?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delArr.forEach(async(_id) => await this.$document.del(_id))
          this.getList()
        })
        .catch((err) => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    currentChange(e) {
      this.query.page = e
      this.getList()
    },
    sizeChange(e) {
      this.query.pageSize = e
      this.getList()
    }
  }
}
</script>

<style>
</style>