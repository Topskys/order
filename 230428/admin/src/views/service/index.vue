<template>
  <div class="chat-container">
    <el-card shadow="always" class="query-card">
      <div slot="header">
        <div class="query-title r-flex">
          <i class='icon el-icon-service'/>
          <span class="ml10">用户咨询</span>
        </div>
      </div>
      <div class='content-warp '>
        <ul class='user-list'>
          <li v-for="item in services" :key="item.user_id" class='r-flex user-item'>
            <img :src="item.poster" class='user-avatar'/>
            <span class='user-nickName'>{{item.nickName}}</span>
          </li>
        </ul>
        <div class='chat-content'>
          <div class='input-warp'>
            <el-input />
          </div>
        </div>
      </div>
      </el-card>
  </div>
</template>

<script>

export default {
  data() {
    return {
      services:[]
    }
  },
  mounted() {
    this.getList();
  },
  watch: {
    
  },
  methods: {
    // 获取企业列表信息
    async getList() {
      const {data,total} = await this.$service.getAll(this.query);
      this.services = data||[];
    },
    // 重置按钮
    resetQueryFrom() {
      this.query = {
        page: 1,
        pageSize: 10,
        keyword: "",
      };
      this.getList();
    },
    
    // 批量删除及单项删除按钮
    del(data) {
      this.$confirm(`确定删除该项数据?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.$service.del(data._id);
          this.getList();
        })
        .catch((err) => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    currentChange(e) {
      this.query.page = e;
      this.getList();
    },
    sizeChange(e) {
      this.query.pageSize = e;
      this.getList();
    },
  },
};
</script>

<style lang='scss' scoped>
.chat-container{
  .content-warp {
    display:flex;
    .user-list{
      width:200px;
      padding:0;
      .user-item{
        margin:10px 0;
      }
      .user-avatar{
        display:block;
        width:36px;
        height:36px;
        border-radius:4px;
        margin-right:10px;
      }
      .user-nickName{
        width:120px;
        // text-overflow:
        white-space:nowarp;
      }
    }
    .chat-content{
      flex:1;
      background:#f5f5f7;
    }
  }
}
</style>