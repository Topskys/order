<!--<template>-->

<!--    <div class="expand-body">-->
<!--      <el-form ref="expandFormRef" model="form">-->
<!--        <el-table :data="form.tableData" style="width: 100%">-->
<!--          <el-table-column #default="scope" label="序号" prop="index" width="80">-->
<!--            <el-form-item>-->
<!--              <span>  {{ scope.row.index }} </span>-->
<!--            </el-form-item>-->
<!--          </el-table-column>-->
<!--          <el-table-column prop="title" label="标题">-->
<!--            <template #default="scope">-->
<!--              <el-form-item :prop="'tableData.' + scope.$index + '.title'"-->
<!--                            :rules="[{required: true, message: '请输入标题', trigger: 'blur'}]"-->
<!--              >-->
<!--                <el-input v-model="scope.row.title"></el-input>-->
<!--              </el-form-item>-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--          <el-table-column prop="document" label="PDF">-->
<!--            <template #default="scope">-->
<!--              <el-form-item :prop="'tableData.' + scope.$index + '.document'"-->
<!--                            :rules="[{required: true, message: '上传PDF详情文件', trigger: 'blur'}]"-->
<!--              >-->

<!--              </el-form-item>-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--        </el-table>-->
<!--      </el-form>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      form: {-->
<!--        tableData: [-->
<!--          { index: 1, title: '1', icon: '111', document: 'url1' },-->
<!--          { index: 2, title: '2', icon: '222', document: 'url2' }-->
<!--        ]-->
<!--      },-->
<!--      fileList: [{-->
<!--        name: 'food.jpeg',-->
<!--        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'-->
<!--      },-->
<!--        {-->
<!--          name: 'food2.jpeg',-->
<!--          url: 'https://fuss10.elemecdn.com/3/63/4,e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'-->
<!--        }]-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    onSuccess(a, b) {-->
<!--      console.log(a, b)-->
<!--    },-->
<!--    itemValue(item, row) {-->
<!--      if (!row[item.columnProp]) {-->
<!--        this.$set(row, item.columnProp, '')-->
<!--      }-->
<!--      return row[item.columnProp]-->
<!--    },-->
<!--    addRow() {-->
<!--      const newRow = {}-->
<!--      this.formItems.forEach(item => {-->
<!--        newRow[item.columnProp] = ''-->
<!--      })-->
<!--      this.tableData.push(newRow)-->
<!--    },-->
<!--    beforeUpload(file) {-->
<!--      const isJPGOrPNG = file.type === 'image/jpeg' || file.type === 'image/png'-->
<!--      const isLt500K = file.size / 1024 < 500-->
<!--      if (!isJPGOrPNG) {-->
<!--        this.$message.error('上传头像图片只能是 JPG/PNG 格式!')-->
<!--      }-->
<!--      if (!isLt500K) {-->
<!--        this.$message.error('上传头像图片大小不能超过 500KB!')-->
<!--      }-->
<!--      return isJPGOrPNG && isLt500K-->
<!--    },-->
<!--    handleFileSuccess(response, file, fileList) {-->
<!--      const currentRow = this.tableData[this.tableData.length - 1]-->
<!--      currentRow.fileUrl = response.url-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style>-->
<!--</style>-->


<template>
  <div class="expand">
    <div class="head-operation">
      <el-button
        type="primary"
        size="small"
        icon="el-icon-plus"
        style="float: right"
        @click="add()"
      >添加扩展
      </el-button>
    </div>
    <el-form ref="form" :model="form" size="small">
      <el-table ref="table" :data="form.tableData" size="small">
        <el-table-column type="index" label="序号" align="center" width="80"/>
        <el-table-column prop="title" label="标题" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-form-item :prop=" 'tableData.' + scope.$index + '.title' "
                          :rules="[{ required: true, message: '标题不能为空', trigger: 'blur' }]" style="height: 100%;"
            >
              <el-input v-model="scope.row.title" :disabled="!scope.row.showSave"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="icon" label="图标" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-form-item :prop=" 'tableData.' + scope.$index + '.icon' "
                          :rules="[{ required: true, message: '图标不能为空', trigger: 'blur' }]"
            >
              <el-select v-model="scope.row.icon" @click.nactive="getIcons" :disabled="!scope.row.showSave">
                <el-option :value="item.value" v-for="item in icons" :key="item.value"></el-option>
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="PDF" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-form-item style="overflow: hidden;">
              <!--              <el-upload-->
              <!--                action="http://localhost:3000/upload"-->
              <!--                :on-success="onSuccess"-->
              <!--                :file-list="fileList"-->
              <!--              >-->
              <!--                <el-button size="small" >上传</el-button>-->
              <!--              </el-upload>-->
              <a :href="scope.row.document" v-if="scope.row.document">{{ scope.row.document }}</a>
              <input type="file" @change="onCahnge($event,scope)" accept=".pdf" v-else style="color:#aaa !important;font-size: 14px;"/>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <span style="display:flex;align-items: center;justify-content: center;">
              <el-button type="primary" size="small" @click="save(scope.row,scope.$index)" v-if="scope.row.showSave"
              >保存</el-button>
              <el-button type="danger" size="small" @click="del(scope.row,scope.$index)">删除</el-button>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      icons: [],
      form: {
        tableData: [
          { title: '1', icon: '2', document: '', showSave: false }
        ]
      },
      currentRow: '',
      currentFile: ''
    }
  },
  watch: {
    data(newValue) {
      const arr = [...newValue]
      this.form.tableData = [...(arr.map(item => {
        this.$set(item, 'showSave', false)
      }))]
    }
  },
  methods: {
    // 添加扩展按钮
    add() {
      this.form.tableData.push({
        title: '',
        icon: '',
        document: '',
        showSave: true
      })
    },
    // 保存按钮
    async save(row) {
      this.uploadFile(row)
      if (this.currentFile) {
        const { msg } = await this.$product.addExpand(row)
        this.$message({
          type: 'success',
          message: msg
        })
        row.showSave = true
      } else {
        this.$message({
          type: 'warning',
          message: '未选择PDF文件'
        })
      }
    },
    // 删除按钮
    async del(row, index) {
      this.form.tableData.splice(index, 1)
      row.id && await this.$product.delExpand(row.id)
    },
    onCahnge(e, scope) {
      scope.row.showSave = true
      this.currentRow = scope
      this.currentFile = e.target.files[0]
    },
    uploadFile(row) {
      const formData = new FormData()
      formData.append('file', this.currentFile)
      this.$upload.uploadFile(formData).then(res => {
        row.document = res.url
      })
    },
    // 请求图标数组
    getIcons() {
      this.$product.getIcons().then(res => {
        this.icons = res.data || []
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.head-operation {
  padding: 10px 0 20px;
  /* 清除子元素添加扩展按钮的float 1 */
  overflow: hidden;
  /* 清除子元素添加扩展按钮的float 2 */
  // &::after {
  //   content: "";
  //   display: block;
  //   clear: both;
  // }
}

::v-deep.el-table thead, ::v-deep .el-table th {
  color: #262626;
  font-weight: 400;
  background: #f7fbff;
}

::v-deep.el-form-item {
  margin-bottom: 0px;
}

a {
  color: #0066cc;
  transition: .3s ease-in-out;

  &:hover {
    text-decoration: underline;
  }
}
</style>

