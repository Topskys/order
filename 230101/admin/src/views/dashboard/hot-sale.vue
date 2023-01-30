<template>
  <el-table :data="list" style="width: 100%">
    <el-table-column label="畅销产品" show-overflow-tooltip>
      <template slot-scope="scope">
        {{ scope.row.title | orderNoFilter }}
      </template>
    </el-table-column>
    <el-table-column label="Price" align="center" show-overflow-tooltip>
      <template slot-scope="scope"> ¥{{ scope.row.price }} </template>
    </el-table-column>
    <el-table-column label="Sale" align="center" show-overflow-tooltip>
      <template slot-scope="scope">
        {{ scope.row.sale }}
      </template>
    </el-table-column>
    <el-table-column label="Status" align="center" show-overflow-tooltip>
      <template slot-scope="{ row }">
        <el-tag :type="row.status | statusFilter" size="mini">
          {{ row.status }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
// import { transactionList } from '@/api/remote-search'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: "success",
        pending: "danger",
      };
      return statusMap[status];
    },
    orderNoFilter(str) {
      return str.substring(0, 30);
    },
  },
  data() {
    return {
      list: [
        {
          title: `${Date.now()}`,
          price: 699,
          sale: Math.floor(Math.random( )*(500-1)+1),
          status: "success",
        },
        {
          title: Date.now() + "",
          price: 699,
          sale: Math.floor(Math.random( )*(500-1)+1),
          status: "pending",
        },
        {
          title: Date.now() + "",
          price: 699,
          sale: Math.floor(Math.random( )*(500-1)+1),
          status: "success",
        },
        {
          title: Date.now() + "",
          price: 699,
          sale: Math.floor(Math.random( )*(500-1)+1),
          status: "pending",
        },
      ],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.list = this.list.sort((a, b) => (a > b ? a : b));
    },
  },
};
</script>
