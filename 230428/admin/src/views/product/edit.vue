<!--
 * @Author: Topskys
 * @Date: 2023-03-29 16:57:07
 * @LastEditTime: 2023-04-06 17:19:46
-->
<template>
  <div class="edit-container">
    <el-dialog
      :title="`${baseInfo._id ? '编辑' : '新增'}`"
      :visible.sync="dailogVisible"
      width="70%"
      append-to-body
      :close-on-click-modal="false"
    >
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first">
          <el-form
            ref="baseInfo"
            :model="baseInfo"
            :rules="baseInfoRules"
            label-width="80px"
            style="min-width: 500px; max-width: 800px; margin: 0 auto"
          >
            <el-form-item label="产品名称" prop="name" required>
              <el-input v-model="baseInfo.name" placeholder="请输入"/>
            </el-form-item>
            <el-form-item label="产品编号" prop="id" required>
              <el-input v-model="baseInfo.id" placeholder="请输入"/>
            </el-form-item>
            <el-form-item label="工作温度" prop="temperature" required>
              <el-input v-model="baseInfo.temperature" placeholder="请输入"/>
            </el-form-item>
            <el-form-item label="工作湿度" prop="humidity" required>
              <el-input v-model="baseInfo.humidity" placeholder="请输入"/>
            </el-form-item>
            <el-form-item label="喷印速度" prop="speed" required>
              <el-input v-model="baseInfo.speed" placeholder="请输入"/>
            </el-form-item>
            <el-form-item label="状态" prop="status" >
              <el-switch v-model="baseInfo.status" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="扩展信息" name="second">
          <Expand :data="expandData" :productId="baseInfo._id"/>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel" size="small">取 消</el-button>
        <el-button type="primary" @click="confirm" size="small"
        >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import eTable from '@/components/common/table'
import Expand from './edit-expand.vue'

export default {
  name: '',
  components: {
    eTable,
    Expand
  },
  props: {
    dailogVisible: {
      type: Boolean
    },
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      // Tabs
      activeName: 'first',
      // baseInfo form
      baseInfo: {},
      baseInfoRules: {},
      // expand
      expandData: []
    }
  },
  watch: {
    data: {
      handler(newValue) {
        this.baseInfo = { ...newValue }
      },
    }
  },
  methods: {
    handleClick(tab, event) {
      this.activeName = tab.name
      if(this.activeName=='second' && this.baseInfo._id){
        this.$product.getExpand(this.baseInfo._id).then(({data})=>{
          this.expandData=data||[]
        })
      }
    },
    // 添加扩展按钮
    expand() {
      const arr = this.tableConfig.tableData
      if (arr.length >= 4) {
        this.$message({
          type: 'warning',
          message: '客官，最多只能添加4条'
        })
      } else {
        this.tableConfig.tableData.push({
          _id: crypto.randomUUID(),
          title: '',
          icon: '',
          document_url: ''
        })
      }
    },
    // 扩展信息列表项删除按钮
    remove(data) {
      const arr = this.tableConfig.tableData
      this.tableConfig.tableData = arr.filter(
        (item) => item._id !== data._id && item
      )
    },
    // 保存扩展信息
    async saveExpand(data) {
      await this.$product.addOrEditExpand(this.expand)
    },
    cancel() {
      this.resetData()
    },
    async confirm() {
      if(this.activeName === 'first'){
        const res=await this.$product.addOrEditProduct(this.baseInfo)
        this.baseInfo._id && this.resetData()
        this.baseInfo={...this.baseInfo,_id:res._id}
        this.$message({
          type:res.code==200?'success':'error',
          message:res.msg
        })
      }
      this.activeName=='second' && this.resetData()
    },
    resetData() {
      this.$emit('update:dailogVisible', false)
      this.$emit('reReqList')
      this.activeName = 'first'
//      this.baseInfo = {}
//      this.baseInfoRules = {}
      // this.tableConfig = {};
    }
  }
}
</script>

<style lang="scss" scoped>


::v-deep .el-dialog__header {
  border-bottom: 1px solid #e8e8e8;
}
</style>