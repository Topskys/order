<script lang="ts" setup>
import {ref, onMounted, onUnmounted} from 'vue'
import {useRouter} from 'vue-router'
import {storeToRefs} from "pinia";
import {app} from '../store/app'
import {user} from '../store/user'
import {
    Fold,
    Expand,
    Bell,
    FullScreen,
    BottomLeft,
    ArrowDown,
} from '@element-plus/icons-vue'


const useAppStore = app()
const {isCollapse} = storeToRefs(useAppStore)
const expand = ref<boolean>(false)
const dropdownRef = ref<HTMLElement | null>(null)
const router = useRouter()


onMounted(() => document.addEventListener('click', handler))

onUnmounted(() => document.removeEventListener('click', handler))


const collapse = () => useAppStore.setIsCollapse(); // or isCollapse.value=!isCollapse.value

const dropdown = () => (expand.value = !expand.value)

const handler = (e: MouseEvent) => (dropdownRef.value && !dropdownRef.value.contains(e.target as HTMLElement) && expand.value && (expand.value = false))

const routeHandler = (data: string) => data && router.push(data === '/logout' ? `${data}?backUrl=${router.currentRoute.value.path}` : data);


</script>


<template>
    <header>
        <div class="collapse">
            <el-icon @click="collapse" :size="20" color="#1d273b">
                <Fold v-if="isCollapse"/>
                <Expand v-else/>
            </el-icon>
        </div>
        <div class="user">
            <a href="https://github.com/Topskys/order/tree/main/230216" target="_blank"><svg t="1678025743003" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="4830" width="20" height="20">
                <path d="M64 512c0 195.2 124.8 361.6 300.8 422.4 22.4 6.4 19.2-9.6 19.2-22.4v-76.8c-134.4 16-140.8-73.6-150.4-89.6-19.2-32-60.8-38.4-48-54.4 32-16 64 3.2 99.2 57.6 25.6 38.4 76.8 32 105.6 25.6 6.4-22.4 19.2-44.8 35.2-60.8-144-22.4-201.6-108.8-201.6-211.2 0-48 16-96 48-131.2-22.4-60.8 0-115.2 3.2-121.6 57.6-6.4 118.4 41.6 124.8 44.8 32-9.6 70.4-12.8 112-12.8 41.6 0 80 6.4 112 12.8 12.8-9.6 67.2-48 121.6-44.8 3.2 6.4 25.6 57.6 6.4 118.4 32 38.4 48 83.2 48 131.2 0 102.4-57.6 188.8-201.6 214.4 22.4 22.4 38.4 54.4 38.4 92.8v112c0 9.6 0 19.2 16 19.2C832 876.8 960 710.4 960 512c0-246.4-201.6-448-448-448S64 265.6 64 512z"
                      fill="#1d273b" p-id="4831"></path>
            </svg>
            </a>
            <el-icon :size="21" color="#1d273b" class="icon-bell">
                <Bell/>
            </el-icon>
            <div class="avatar">
                <div class="img"></div>
                <div class="dropdown" @click='dropdown' ref="dropdownRef">
                    <div class="user-info">
                        <p>Topsky</p>
                        <p>Fornt-end Engineer</p>
                    </div>
                    <ul :style="{display:'block'}" class="slide-bottom" v-if="expand">
                        <li @click='routeHandler("/dashboard")'>Dashboard</li>
                        <li @click='routeHandler("/profile")'>Profile</li>
                        <li @click='routeHandler("/feedback")'>Feedback</li>
                        <li @click='user().logout()'>Logout</li>
                    </ul>
                </div>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
header {
  position: sticky;
  top: 0;
  height: 56px;
  line-height: 56px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: .3s;
  border-bottom: 1px solid $border-clr-4 !important;
  background: $bg-2;

  //    background: center/cover no-repeat url("https://images.unsplash.com/photo-1677184915745-03e070e63a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1558&q=80");

  .user {
    display: flex;
    align-items: center;
    user-select: none;

    .icon-bell {
      position: relative;
      margin-left:20px;

      // sup 上角标
      &::after {
        position: absolute;
        top: 0;
        right: 0;
        content: "";
        width: 5px;
        height: 5px;
        border-radius: 5px;
        background: red;
      }
    }

    .avatar {
      display: flex;
      align-items: center;

      .img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        margin: 0 10px 0 20px; // 注意margin重叠，所以不填10px，填20px直接抵消覆盖重叠部分10px或overflow:hidden;避免margin重叠
        background: center/contain no-repeat url("https://thirdwx.qlogo.cn/mmopen/vi_32/OqbjGV9UibfRJj3d4Dia0MCk9Hx6Pr7NgDlibN8JTiaM9e8TSAx6Rynoyhpusl2RBw4kGlEMxOUEZ449bedX6Eicguw/132");
      }

      .dropdown {
        position: relative;
        color: $clr-3;
        transition: .3s;

        .user-info {
          p {
            margin: 0;

            &:first-child {
              color: $clr-3;
              font-size: 14px;
            }

            &:last-child {
              font-size: 12px;
              color: $txt-clr-10;
              margin-top: 4px;
            }
          }
        }

        ul {
          width: 176px;
          padding: 4px 0;
          margin: 0;
          border: 1px solid $border-clr-4;
          border-radius: 3px;
          background-color: $bg-2;
          position: absolute;
          top: 50px;
          right: 0;
          z-index: 996;
          box-shadow: 0 0 5px rgba(0, 0, 0, .12);

          // triangle 三角形
          &::before {
            content: "";
            width: 0;
            height: 0;
            border-top: 10px solid transparent; /* 顶部边框为透明 */
            border-right: 10px solid transparent; /* 右侧边框为透明 */
            border-bottom: 10px solid $bg-2; /* 底部边框为白色 */
            border-left: 10px solid transparent; /* 左侧边框为透明 */

            position: absolute;
            top: -15px;
            left: 50%;
            transform: translateX(-50%);
            pointer-events: none;
            z-index: 999;
          }

          li {
            list-style: none;
            padding: 8px 20px;
            margin: 4px 0;
            color: $clr-3;
            font-size: 14px;
            transition: .3s;

            &:last-child {
              position: relative;

              &::before {
                content: "";
                width: 100%;
                height: 3px;
                border-top: 1px solid $border-clr-4;
                background: $bg-2;
                position: absolute;
                top: 0;
                left: 0;
              }
            }

            &:hover, &:focus {
              background-color: $bg-1;
            }
          }
        }
      }
    }
  }
}
</style>