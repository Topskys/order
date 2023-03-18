<script setup lang="ts">
import {ref, toRefs} from 'vue'

let routes = ref([
    {label: "Dashboard", path: "/ashboard"},
    {label: "File", path: "/file"},
    {label: "Picture", path: "/picture"},
    {label: "Document", path: "/document"},
    {label: "Feedback", path: "/feedback"},
    {label: "User", path: "/user"},
    {label: "Personal", path: "/personal"},
])

</script>


<template>
    <nav>
        <router-link :to="route.path" v-for="(route,i) in routes " :key="i">{{ route.label }}</router-link>
    </nav>
</template>

<style lang="scss" scoped>
nav {
  height: 53px;
  padding: 0 10%;
    background-color: $bg-2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #eee;

  a {
    flex: 1;
    //    color: $txt-clr-7;
    text-align: center;
    padding: 1em 2em;
    //    border-right: 1px solid #eee;
    transition: all 0.5s;

    &:first-child {
      //      border-left: 1px solid skyblue;
    }

    &:hover {
      //      color: $clr-2;
      //      transform: scale(1.1);
      text-decoration: underline;
    }
  }
}
</style>