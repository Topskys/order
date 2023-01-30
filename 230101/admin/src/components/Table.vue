<template>
    <div class="common-table">
        <el-table :data="tableData" stripe>
            <el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
            <el-table-column v-for="item in tableLabel" :key="item.prop" :label="item.label" show-overflow-tooltip
                align="center">
                <!-- :width="item.width?item.width:125" -->
                <template slot-scope="scope">
                    <!-- <span style="margin-left:10px;">{{scope.row[item.prop]}}</span> -->
                    <span>{{scope.row[item.prop]}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" min-width="180" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope)">编辑</el-button>
                    <el-button size="mini" @click="handleDelete(scope)" type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="pagination" layout="prev,pager,next" :total="config.total"
            :current-page.sync="config.page" @current-change="changePage" :page-size="10" background align="center"
            style="padding:10px 0">
        </el-pagination>
    </div>
</template>

<script>
export default {
    name: "CommonTable",
    props: {
        tableData: Array,
        tableLabel: Array,
        config: Object,
    },
    data() {
        return {}
    },
    methods: {
        handleEdit({ row }) {
            this.$emit('edit', row)
        },
        handleDelete({ row, $index }) {
            this.$emit('del', row, $index)
        },
        changePage(page) {
            this.$emit('changePage', page)
        },
    }
}
</script>

<style lang="scss" scoped>
.common-table {
    height: calc(100% - 63px);
    background-color: #fff;
    // position: relative;
    // .pagination {
    //     position: absolute;
    //     bottom: 0;
    //     right: 20px;
    // }
}
</style>
