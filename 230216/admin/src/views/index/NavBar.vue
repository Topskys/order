<template>
  <nav>
    <div class="nav-logo">
      <a href="/">
        <svg-icon iconClass="mark" class="logo-svg"></svg-icon>
        <span class="logo-text">{{ logoText }}</span>
      </a>
    </div>
    <div class="nav-menu">
      <ul class="menu-list">
        <li v-for="(route, i) in routes" :key="i">
          <router-link :to="route.path" v-if="/^\//.test(route.path)">{{
            route.label
          }}</router-link>
          <a :href="route.path" target="_blank" v-else>{{ route.label }}</a>
        </li>
      </ul>
      <div class="user">
        <router-link to="/login">
          <i class="el-icon-user icon" title="Sign in"></i>
        </router-link>
        <a href="https://github.com/Topskys" target="_blank" title="Github">
          <svg-icon iconClass="github" class="icon"></svg-icon>
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      logoText: "Mark",
      routes: [
        // { label: "Download", path: "/download" },
        { label: "Blog", path: "https://blog.csdn.net/qq_58062502" },
        { label: "Document", path: "https://github.com/Topskys" },
        { label: "Support", path: "https://github.com/Topskys" },
      ],
    };
  },
};
</script>

<style lang='scss' scoped>
@import "@/styles/var.scss";
nav {
  // position: sticky;
  // top: 0;
  // z-index: 1000;
  
  transition: 0.5s;
  height: 63px;
  padding: 0 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  //    opacity: .88;
  transition: 0.3s;
  background: rgba(255, 255, 255, 0.5);
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);

  .nav-logo > a {
    display: flex;
    align-items: center;
    font-size: 1.3125rem;
    white-space: nowrap;
    .logo-svg {
      font-size: 30px;
    }
    .logo-text {
      padding-left: 8px;
    }
  }
  .nav-menu {
    display: flex;
    align-items: center;
    .menu-list {
      padding: 0;
      margin: 0;
      list-style: none;
      display: flex;
      align-items: center;
      a {
        margin: 0 1em;
        font-size: 0.875rem;
        transition: all 0.3s;

        &:hover {
          color: $theme;
          text-decoration: underline;
        }
      }
    }
    .user {
      display: flex;
      align-items: center;

      .icon {
        transition: 0.3s cubic-bezier(0.28, 0.11, 0.32, 1);
        font-size: 1.125rem;
        margin: 0 1em;
        &:last-child {
          margin-right: 0;
        }

        &:hover,
        &:focus {
          transform: scale(0.98);
        }
      }
    }
  }
}
</style>