<script lang="ts" setup>
const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
]

</script>


<template>
    <div class="feedback">
        <el-table :data="tableData" stripe style="width: 100%;">
            <el-table-column prop="date" label="Date" width="180"/>
            <el-table-column prop="name" label="Name" width="180"/>
            <el-table-column prop="address" label="Address"/>
            <el-table-column prop="address" label="Address"/>
            <el-table-column prop="address" label="Address"/>
        </el-table>
        <el-pagination
                small
                background
                layout="prev, pager, next"
                :total="50"
        style="margin: 20px auto"
        />
    </div>

</template>


<style lang="scss" scoped>
.feedback {
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>