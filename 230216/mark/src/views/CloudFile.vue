<!--
 * @Author: Topskys
 * @Date: 2023-04-22 10:25:38
 * @LastEditTime: 2023-04-22 14:25:46
-->
<template>
  <div class="cloud-file">
    <el-table :data="cloudFiles" style="width: 100%" size="small">
      <el-table-column prop="filename" label="Filename">
        <template slot-scope="scope">
          <svg-icon icon="document" /> <span>{{ scope.row.filename }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="size" label="Size" width="120" align="center" />
      <el-table-column
        prop="updatedAt"
        label="UpdateTime"
        width="120"
        align="center"
      />
      <el-table-column label="Operation" width="120" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="download(scope.row)"
            style="color:#0066cc">下载文件</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getCloudFile } from "@/api/user";
export default {
  data() {
    return {
      cloudFiles: [
        { filename: "Hello.md", size: "10.61kB", updatedAt: "4/22 14:07:02" },
      ],
    };
  },
  mounted() {
    // this.getUserFiles()
  },
  methods: {
    getUserFiles() {
      getCloudFile().then((res) => {
        this.cloudFiles = res || [];
      });
    },
    download(row) {},
  },
};
</script>

<style lang='scss' scoped>
.cloud-file {
  max-width: 800px;
  min-width: 400px;
  margin: 0 auto;
  font-size: 14px;
  color: #1d273b;
}
::v-deep.el-table thead,
::v-deep .el-table th {
  color: #262626;
  font-weight: 400;
  background: #f7fbff;
}
</style>