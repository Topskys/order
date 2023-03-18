<script lang="ts" setup>
import {ref, onMounted, watch} from 'vue'
import {useRouter, onBeforeRouteUpdate} from 'vue-router';
import {storeToRefs} from "pinia";
import {app} from '../store/app'
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'
import SvgIcon from "../components/svgIcon/index.vue";


const store = app()
const {isCollapse} = storeToRefs(store)

const routes = <Result>ref([{}])

interface Result {
    path: string,
    label: string,
    icon: Function
}

// 自动化导入组件，生成导航路由数组
const autoImport = (arr: [],): Result[] => {
    let list = <Result>[]
    const files = import.meta.glob('../views/**/*.vue')
    const keys = Object.keys(files).map(key => key.split("/").at(-2))
    keys.filter(key => {
        if (!arr.includes(key)) {
            list.push({
                label: key,
                path: `/${key}`,
                icon: key
            })
        }
    })
    return list
}

const router = useRouter()
let currPath = ref(`${router.currentRoute.value.path}`);

onMounted(() => {
    routes.value = autoImport(["home", "login"])
})

watch(() => router.currentRoute.value.path, (nv, ov) => {
    currPath.value = nv
}, {immediate: true})
</script>

<template>

    <aside :style="{width:(isCollapse?'224px':'64px')}">
        <div class="logo">
            <svg t="1678016817634" class="icon" viewBox="0 0 1028 1024"
                 version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="4494" width="20" height="20">
                <path d="M1018.319924 112.117535q4.093748 9.210934 6.652341 21.492179t2.558593 25.585928-5.117186 26.609365-16.374994 25.585928q-12.281245 12.281245-22.003898 21.492179t-16.886712 16.374994q-8.187497 8.187497-15.351557 14.32812l-191.382739-191.382739q12.281245-11.257808 29.167958-27.121083t28.144521-25.074209q14.32812-11.257808 29.679676-15.863275t30.191395-4.093748 28.656239 4.605467 24.050772 9.210934q21.492179 11.257808 47.589826 39.402329t40.425766 58.847634zM221.062416 611.554845q6.140623-6.140623 28.656239-29.167958t56.289041-56.80076l74.710909-74.710909 82.898406-82.898406 220.038979-220.038979 191.382739 192.406177-220.038979 220.038979-81.874969 82.898406q-40.937484 39.914047-73.687472 73.175753t-54.242167 54.753885-25.585928 24.562491q-10.234371 9.210934-23.539054 19.445305t-27.632802 16.374994q-14.32812 7.16406-41.960921 17.398431t-57.824197 19.957024-57.312478 16.886712-40.425766 9.210934q-27.632802 3.070311-36.843736-8.187497t-5.117186-37.867173q2.046874-14.32812 9.722653-41.449203t16.374994-56.289041 16.886712-53.730448 13.304682-33.773425q6.140623-14.32812 13.816401-26.097646t22.003898-26.097646z"
                      p-id="4495" fill="#ffffff"></path>
            </svg>
            <span v-show="isCollapse">Mark</span>
        </div>
        <menu class="menu-vertical">
            <div class="menu-item" v-for="route in routes" :class="{active:route.path===currPath}">
                <router-link :to="route.path" v-if="/^\//.test(route.path)" :key="route.path">
                    <svg-icon :name="route.icon"></svg-icon>
                    <span v-show="isCollapse">{{ route.label }}</span>
                </router-link>
                <a :href="route.path" v-else :key="route.path">
                    <svg-icon :name="route.icon"></svg-icon>
                    <span v-show="isCollapse">{{ route.label }}</span>
                </a>
            </div>
        </menu>
    </aside>
</template>


<style lang="scss" scoped>
aside {
  max-width: 224px;
  height: 100vh;
  border-right: 1px solid #ccc;
  background-color: $bg-5;
  transition: width .3s;

  .logo {
    height: 56px;
    line-height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      color: $txt-clr-7;
      font-size: 1.25rem;
      letter-spacing: 1px;
      padding-left: 10px;
    }
  }

  .menu-vertical {
    width: inherit;
    height: calc(100vh - 53px);
    overflow-y: scroll;
    padding-left: 0;
    margin: 0;
    //    padding-right: 5px;
    font-size: 14px;
    color: $txt-clr-9;
    user-select: none;
    transition: 0.3s;

    .menu-item {
      border-radius: 4px;
      color: inherit;
      overflow: hidden;
      transition: 0.3s;

      &:hover, &:active {
        background-color: $bg-6; // #206bc4
      }


      a {
        display: flex;
        align-items: center;
        padding: 0 20px;
        height: 53px;
        line-height: 53px;
        white-space: nowrap;
        text-decoration: none;
        transition: 0.3s;
        color: inherit;

        span {
          padding-left: 10px;
          color: inherit;
          white-space: nowrap;
          flex: 1;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }
}

.active {
  color: $txt-clr-7 !important;
  background-color: $bg-6; // #206bc4
}
</style>
