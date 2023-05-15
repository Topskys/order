<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar" v-if="avatar" />
          <img src="../../assets/avatar.png" v-else class="user-avatar" />
          <div class="nickname-warp">
            <div class="nickname" v-if="name">{{ name }}</div>
            <div title="退出登录">
              <svg-icon
                iconClass="logout"
                className="logout"
                @click="logout"
              ></svg-icon>
            </div>
          </div>
        </div>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";

export default {
  components: {
    Breadcrumb,
    Hamburger,
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "name"]),
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    logout() {
      this.$confirm(`您确定要退出?`, "提示", {
        confirmButtonText: "退出",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async (res) => {
        await this.$store.dispatch("user/logout");
        this.$router.push(`/login?redirect=${this.$route.fullPath}`);
      })
      // .catch(res=>{
      //   this.$message({
      //     message: "已取消"
      //   }) 
      // });
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        position: relative;
        display: flex;
        align-items: center;

        .user-avatar {
          cursor: pointer;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          margin-right: 10px;
        }
        .nickname-warp {
          display: flex;
          align-items: center;
          .nickname {
            margin-right: 10px;
          }
          .logout:hover {
            color: red;
            cursor: pointer;
          }
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
