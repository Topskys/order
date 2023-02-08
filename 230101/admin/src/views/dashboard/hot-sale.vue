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
  props: ['hot'],
  filters: {
    statusFilter(status) {
      const statusMap = {
        normal: "success",
        delete: "danger",
        live: "warning",
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
          sale: Math.floor(Math.random() * (500 - 1) + 1),
          status: "success",
        },
        {
          title: Date.now() + "",
          price: 699,
          sale: Math.floor(Math.random() * (500 - 1) + 1),
          status: "pending",
        },
        {
          title: Date.now() + "",
          price: 699,
          sale: Math.floor(Math.random() * (500 - 1) + 1),
          status: "success",
        },
        {
          title: Date.now() + "",
          price: 699,
          sale: Math.floor(Math.random() * (500 - 1) + 1),
          status: "pending",
        },
      ],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      // this.list = this.list.sort((a, b) => (a > b ? a : b));
      // this.list = this.hot.sort((a, b) => (a.sale > b.sale ? a : b));
      console.log(this.hot);
      this.list = this.hot.slice(0,4)
    },
  },
};
</script>
