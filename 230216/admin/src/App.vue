<script setup lang="ts">
import {ref,watch} from "vue";
import {useRouter,onBeforeRouteUpdate} from 'vue-router';

// 获取当前路由
// window.location.pathname
const router=useRouter()
let currPath = ref("");

watch(() => router.currentRoute.value.path, (nv, ov) => {
    currPath.value = nv
}, {immediate: true})

</script>


<template>
    <!--    <Transition name="slide-fade" >-->
    <!--        <router-view :key="currPath"/>-->
    <!--    </Transition>-->
    <router-view v-slot="{ Component }">
        <transition name="slide-fade" >
            <component :is="Component"/>
        </transition>
    </router-view>
</template>


<style scoped>
/*
  进入和离开动画可以使用不同
  持续时间和速度曲线。
*/
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}


</style>
