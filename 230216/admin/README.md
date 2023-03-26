# Vue 3 + TypeScript + Vite + Pinia

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue
3 `<script setup>` SFCs, check out
the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (
  and disable
  Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for
type checking. In editors, we
need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented
a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more
performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## 运行时打开浏览器

配置--host，项目运行时打开浏览器

```json
"scripts": {
"dev": "vite --host",
},
```

## 创建 vite + vue2 项目

1.先按照vite+vue3创建项目
2.修改package.json

```json
{
  "dependencies": {
    "vue": "^2.0.0"
  }
}
```

3.配置vite-plugin-vue2
安装

```bash
# 安装
npm install vite-plugin-vue2 -D
```

配置

```ts
// vite.config.ts
import {createVuePlugin} from 'vite-plugin-vue2'

export default {
    plugins: [
        createVuePlugin(/* option */)
    ]
}
```

4.修改router和@

```ts
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes.js'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'hash', // 'history',
    base: "/",
    routes
})

export default router
```

将“@”修改为传统的引入方式“../src/*”

5.运行

```bash
# 安装依赖
npm install
# vue-template-compiler
npm i vue-template-compiler -S
# 运行
npm run dev
```

运行过程会报错，缺少一些部件，逐步安装再运行即可

# admin

2023年3月2日12:43:35

## 技术选型

Vite + Vue3 + TypeScript

## 运行项目

```bash
npm install && npm run dev
```

## 项目进度

### 项目初始化及模块封装
> 2023年3月2日12:43:35
初始化web后台管理，使用 Vite + Vue3 + TypeScript 搭建前端后台管理项目。初始化项目结构、编写路由模块（自动化生成路由数组）、封装http网络请求axios模块。

> 2023年3月3日10:18:08
useUserStore模块，完成Pinia的用户jwt和信息的持久化存储。

> 2023年3月4日23:33:11
问题：store中使用Pinia定义的user，无法在src/utils/http.ts中使用。
ReferenceError: Cannot access 'user' before initialization at http.ts:7:36
原因：原来是将const store=user()放在http.ts内函数外调用了，不能直接在文件空白处执行user()，需要http.ts中的函数调用user()。
解决：将user()在service.interceptors.request.use(config => {}内调用。
```ts
service.interceptors.request.use(config => {
    // pinia user 放在该函数外边会报错：未初始化
    const {getToken} = storeToRefs(user())
    getToken.value && (config.headers['Authorization'] = `Bearer ${getToken.value}`)
    return config
}, err => {
    showMsg(err)
    Promise.reject(err)
})
```


### Pinia

Pinia大致总结:

1. 支持选项式api和组合式api写法
2. pinia没有mutations，只有:state、getters、actions
3. pinia分模块不需要modules （之前vuex分模块需要modules)
4. TypeScript支持很好
5. 自动化代码拆分
6. pinia体积更小（性能更好)
7. 数据可以直接修改


在*.vue中引入使用
```
import {ref, reactive} from "vue";
import {FormInstance} from "element-plus";
import {storeToRefs} from 'pinia'
import {user} from '../../store/user.ts'


const router = useRouter()

// 解构Pinia数据或getters/actions函数
let {token, userInfo} = storeToRefs(user());

const updateStore = () => {
    token.value = "token"
    info.value = "{}"
    // or 批量修改
    store.$patch(state => {
        state.token = "--------------T"
        state.info = "--------------{}"
    })
}
```

模块划分，直接在./store下新建新文件即可。

Pinia持久化：
1、直接用localStorage
2、使用插件npm i -S pinia-plugin-persist

```js
// 配置
actions:{}，
persist:{
    enabled:true,
    // 不写默认session
        strategies:[
        {
            key: "user", // 默认id
            storage: localStorage,
            paths:["userInfo"],// 按需存储
        }
   ]
}
```

### 首页按需加载组件
```html
<div ref='target'>
    <asyncComponent v-if='targetIsVisible'></asyncComponent>
</div>
```
```ts
import {useIntersectionObserver} from '@vueuse/core';

const target = ref(null);
const targetIsVisible = ref(false);

const asyncComponent=defineAsyncComponent(()=>import("../views/**/*.vue"));

const {stop} = useIntersectionObserver(target, ([{isIntersecting}]) => isIntersecting && (targetIsVisible.value = isIntersecting)// methods
```


### 配置svg图标
> 2023年3月16日17:10:25
```bash
npm i vite-plugin-svg-icons -D
```
```ts
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons'

export default defineConfig({
    plugins: [
    //...
    // svg-icon
    createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',

        /**
        * 自定义插入位置
        * @default: body-last
        */
        // inject?: 'body-last' | 'body-first'

        /**
        * custom dom id
        * @default: __svg__icons__dom__
        */
        // customDomId: '__svg__icons__dom__',
    }),
    ],
})
```
并在main.ts引入
```ts
import 'virtual:svg-icons-register'
```


### 新建用户代码片段（vue3）
> 2023年3月18日21:26:03
文件 --> 首选项 --> 配置用户代码片段 --> 新建代码片段 --> 配置以下JSON字符串 
```json
{
	"Print to console": {
		"prefix": "v3", // 代码片段快捷指令
		"body": [
			"<template>",
			"<div class=''></div>",
			"</template>",
			"",
			"<script lang='ts' setup>",
			"import {ref,reactive,toRefs,defineProps} from 'vue'",
			"",
			"</script>",
			"",
			"<style lang='scss' scoped>",
			"",
			"</style>",
		],
		"description": "Log output to console"
	}
}
```
使用：在*.vue文件里面输入v3即可生成以上代码片段。