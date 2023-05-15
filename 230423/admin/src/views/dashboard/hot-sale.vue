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
  props: {
    hot:{
      type: Array,
      default:()=>([])
    }
  },
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
  created () {
    !this.hot.length && this.fetchData();
  },
  methods: {
    fetchData() {
      this.$http({
        url: "/dashboard",
      }).then((res) => {
        const data = res.data;
        this.list = data.hot.slice(0,4).sort((a, b) => (a.sale > b.sale ? a : b))
      });
    },
  },
};
</script>
