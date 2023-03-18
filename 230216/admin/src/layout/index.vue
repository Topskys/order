<script lang="ts" setup>
import {watch} from 'vue'
import {useRouter, onBeforeRouteUpdate} from 'vue-router';
import Header from "./Header.vue";
import AsideBar from './AsideBar.vue'

const router = useRouter()
let currPath = ref("");

watch(() => router.currentRoute.value.path, (nv, ov) => (currPath.value = nv), {immediate: true})

</script>


<template>
    <div class="layout">
        <AsideBar></AsideBar>
        <div class="container">
            <Header></Header>
            <main>
                <!--                <Transition name="slide-fade">-->
                <!--                    <router-view :key="currPath"/>-->
                <!--                </Transition>-->
                <router-view v-slot="{ Component }">
                    <transition name="slide-fade">
                        <component :is="Component"/>
                    </transition>
                </router-view>
            </main>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.layout {
  display: flex;
  height: 100vh;

  AsideBar {
    width: 200px;
    max-width: 200px;
  }

  .container {
    flex: 1;
    height: 100vh;
    overflow: hidden;
    background-color: $bg-7;

    main {
      padding: 15px;
      height: calc(100vh - 56px);
      z-index: -1;
      //      background-color: green;
    }
  }
}


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