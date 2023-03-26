<script lang="ts" setup>
import { ref, reactive, toRefs, defineProps, onMounted } from "vue";
import { getFeedbackList } from "../../api/feedback";
import { Search, Edit,Delete } from "@element-plus/icons-vue";

const params = reactive({
  page: 1,
  pageSize: 10,
  keyword: "",
  total: 0,
});
let { page, pageSize, keyword, total } = toRefs(params); //
const data = reactive<{ list: {}[] }>({
  // 可在此定义多个响应式数据属性变量
  list: [],
});
let { list } = toRefs(data); // 解构防止属性响应式丢失

// 获取数据
const getDataList = (
  params = {
    page: page.value,
    pageSize: pageSize.value,
    keyword: keyword.value,
  }
) =>
  getFeedbackList(params).then(
    (res) => ((list.value = res.data), (total.value = res.total))
  );

onMounted(() => getDataList());



// 分页组件左右箭头事件
const arrowClick = (page) => {
  console.log(page);
  page.value = page;
  getDataList();
};

const reset = () => (keyword.value = ""); // 重置
const query = () => getDataList(); // 查询搜索
const edit=()=>{} // 修改
const del=()=>{} // 删除
</script>


<template>
  <div class="feedback">
    <div class="search-form">
      <div class="search-title">
        <el-icon :size="16" color="#1d273b"><Search /></el-icon>
        <span>筛选搜索</span>
      </div>
      <div class="search-input-button">
        <div class="search-input">
          <span>账户：</span>
          <el-input v-model="keyword"></el-input>
        </div>
        <span class="search-buttons">
          <el-button @click="reset">重置</el-button>
          <el-button type="primary" @click="query">查询搜索</el-button>
        </span>
      </div>
    </div>

    <el-table
      :data="list"
      stripe
      style="width: 100%; border-top: 1px solid #ebeef5"
    >
      <el-table-column
        prop="_id"
        label="编号"
        width="180"
        show-overflow-tooltip
        align="center"
      />
      <el-table-column
        prop="email"
        label="账户"
        show-overflow-tooltip
        align="center"
      />
      <el-table-column
        prop="password"
        label="密码"
        show-overflow-tooltip
        align="center"
      />
      <el-table-column
        prop="status"
        label="状态"
        show-overflow-tooltip
        align="center"
      />
      <el-table-column
        prop="createdAt"
        label="创建日期"
        show-overflow-tooltip
        sortable
        align="center"
      />
      <el-table-column
        prop="updatedAt"
        label="更新日期"
        show-overflow-tooltip
        sortable
        align="center"
      />
      <el-table-column label="操作" show-overflow-tooltip align="center">
        <el-button type="primary" size="small" @click="edit">修改</el-button>
        <el-button type="danger" size="small" @click="del">删除</el-button>
      </el-table-column>
    </el-table>
    <el-pagination
      v-show="list.length"
      small
      background
      layout="prev, pager, next"
      :total="total"
      @prev-click="arrowClick"
      @next-click="arrowClick"
      @current-change="arrowClick"
      style="justify-content: center; padding: 20px 0"
    />
  </div>
</template>


<style lang="scss" scoped>
.feedback {
  background-color: white;

  .search-form {
    padding: 30px;
    margin-bottom: 20px;
    .search-title {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      span {
        margin-left: 10px;
        color: #1d273b;
        font-size: 14px;
      }
    }
    .search-input-button {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .search-input {
        display: inherit;
        align-items: center;
        span {
          margin-left: 20px;
          color: #1d273b;
          font-size: 14px;
          white-space: nowrap;
        }
      }
    }
  }
}


::v-deep th .cell {
  color: #1d273b;
  font-size: 14px;
  font-weight: 400;
}
::v-deep td .cell {
  color: #606266;
  font-size: 14px;
}
</style>