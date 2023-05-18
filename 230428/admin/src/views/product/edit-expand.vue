<template>
  <div class="expand">
    <div class="head-operation">
      <el-button
        type="primary"
        size="small"
        icon="el-icon-plus"
        style="float: right"
        @click="add()"
        >添加服务
      </el-button>
    </div>
    <el-form ref="form" :model="form" size="small">
      <el-table ref="table" :data="form.tableData">
        <el-table-column type="index" label="序号" align="center" width="80" />
        <el-table-column
          prop="service"
          label="服务"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.service'"
              :rules="[
                {
                  required: true,
                  message: '服务内容不能为空',
                  trigger: 'blur',
                },
              ]"
              style="height: 100%"
            >
              <el-input
                v-model="scope.row.service"
                :disabled="!scope.row.showSave"
              ></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          prop="price"
          label="定价(元)"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.price'"
              :rules="[
                { required: true, message: '价格不能为空', trigger: 'blur' },
              ]"
              style="height: 100%"
            >
              <el-input
                type="number"
                v-model="scope.row.price"
                :disabled="!scope.row.showSave"
              ></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <span
              style="
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              <el-button
                type="primary"
                size="small"
                @click="onSave(scope.row, scope.$index)"
                v-if="scope.row.showSave"
                >保存</el-button
              >
              <el-button
                type="danger"
                size="small"
                @click="del(scope.row, scope.$index)"
                >删除</el-button
              >
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
      default: () => [],
    },
    product_id: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      icons: [],
      form: {
        tableData: [
          // {service:'',price:'',showSave:true}
        ],
      },
    };
  },
  watch: {
    data: {
      handler(newValue) {
        console.log('ser---',newValue);
        const arr = [...newValue];
        this.form.tableData = [
          ...arr.map((item) => {
            this.$set(item, "showSave", false);
            return item;
          }),
        ];
      },
    },
  },
  methods: {
    // 添加扩展按钮
    add() {
      let prevIsSave = true;
      const arr = this.form.tableData || [];
      const obj = {
        service: "",
        price: "",
        showSave: true,
      };
      const showWarn = (msg) => {
        this.$message({
          type: "warning",
          message: msg,
        });
      };

      arr.forEach((item) => item.showSave && (prevIsSave = false));
      if (!prevIsSave) {
        showWarn("请先保存上条记录");
        return;
      }
      arr.length >= 8
        ? showWarn("客官，最多只能添加8条")
        : this.form.tableData.push(obj);
    },
    // 保存按钮
    async onSave(row) {
      if (row.service && row.price) {
        const { msg } = await this.$product.addService({
          product_id: this.product_id,
          ...row,
        });
        this.$message({
          type: "success",
          message: msg,
        });
        row.showSave = false;
      } else {
        this.$message({
          type: "warning",
          message: "请填写完整",
        });
      }
    },
    // 删除按钮
    async del(row, index) {
      this.form.tableData.splice(index, 1);
      if (row.service && row.price) {
      const { code, msg } = await this.$product.delService({product_id:this.product_id,index,...row});
            this.$message({
              type: code == 200 ? "success" : "warning",
              message: msg,
            });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.head-operation {
  padding: 10px 0 20px;
  /* 清除子元素添加扩展按钮的float 1 */
  overflow: hidden;
}

::v-deep.el-table thead,
::v-deep .el-table th {
  color: #262626;
  font-weight: 400;
  background: #f7fbff;
}

::v-deep.el-form-item {
  margin-bottom: 0px;
}

a {
  color: #0066cc;
  transition: 0.3s ease-in-out;

  &:hover {
    text-decoration: underline;
  }
}
</style>

