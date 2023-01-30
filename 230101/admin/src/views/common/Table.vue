<template>
  <div class="common-table">
    <!-- 表格 -->
    <el-table
      :data="tableData"
      v-loading="column.loading"
      @row-click="rowClick"
      size='mini'
      border
      style="width: 100%;"
    >
      <el-table-column
        v-for="(c, ci) in column.columns"
        :key="ci"
        :prop="c.prop"
        :label="c.label"
        :width="c.width"
        :align="c.align || 'center'"
        :sortable="c.sortable"
        :index="c.ci"
        show-overflow-tooltip
      >
        <template scope="{row,$index}">
          <!-- 默认文本展示 -->
          <span v-if="c.text">{{ row[c.prop] }}</span>
          <!-- 图片展示 -->
          <!-- <el-popover
            v-if="c.img"
            placement="top"
            trigger="hover"
            width="200"
            popper-class="popper"
          >
            <img :src="row[c.prop]" />
          </el-popover> -->
          <img v-if="c.img" :src="row[c.prop]" />
          <!-- 可编辑input，仅在text默认展示类型才可编辑 && c.text-->
          <el-input
            v-focus
            v-if="c.editRow"
            v-model="row[c.prop]"
            size="mini"
            @blur="editInputBlur(row, $index, c.prop, ci)"
          ></el-input>
          <!-- 操作按钮 -->
          <span v-if="c.operation">
            <el-button
              v-for="(o, oi) in c.operations"
              :key="oi"
              @click="operation(row, $index, oi)"
              :type="o.type || 'primary'"
              :icon="o.icon"
              :size="c.size || 'small'"
              :style="{ color: o.color }"
              >{{ o.label }}</el-button
            >
          </span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      v-if="pagination.show"
      layout="prev,pager,next"
      @current-change="currentChange"
      @size-change="sizeChange"
      :current-page.sync="pagination.page"
      :page-size="pagination.pageSize || 10"
      :total="pagination.total || 0"
      :align="pagination.align || 'center'"
      background
      style="padding: 10px 0"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  directives: {
			// 自定义指令,用于可编辑input自动获取焦点
			focus: {
				inserted: function(e) {
					e.querySelector('input').focus()
				}
			}
		},
  props: {
    tableData: {
      type: Array,
      required: true,
    },
    column: {
      type: Object,
      required: true,
    },
    pagination: {
      type: Object,
      required: true,
    },
  },
  methods: {
    // 点击行
    rowClick(e) {
      // console.log(e);
    },
    // 可编辑input失去焦点
    editInputBlur(row, $index, prop, i){
      console.log(row, $index, prop, i)
				// this.$emit('editInputBlur', row, $index, prop, columIndex);
    },
    // 操作
    operation(row, $index, i) {
      console.log(row, $index, i);
      // this.$emit("operation", row,$index,i)
    },
    // 页码变化
    currentChange(e) {
      console.log(e);
      // this.$emit("currentChange", e)
    },
    // 条数变化
    sizeChange(e) {
      console.log(e);
      // this.$emit("sizeChange", e)
    },
  },
};
</script>

<style lang="scss" scoped>
.el-button {
  margin: 0 6px;
}

::v-deep.el-input__inner {
  // border: none;
  background-color: #f5f5f5 !important;
}

::v-deep.el-image__inner {
  height: 50px;
}

// switch左边文字颜色
::v-deep.el-switch__label--left {
  color: #606266;
}

img {
  height: 50px;
}

.page_div {
  padding: 15px 0;
}
</style>