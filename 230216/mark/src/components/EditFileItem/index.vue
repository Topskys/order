<template>
  <div class="edit-file-item">
    <el-dialog
        title=""
        :visible.sync="dialogVisible"
        width="width"
        :before-close="dialogBeforeClose">
        <div></div>
        <div slot="footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>