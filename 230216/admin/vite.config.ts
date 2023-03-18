import path from 'path'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
// 自动导入（按需引用）element-ui plus
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver,} from 'unplugin-vue-components/resolvers'
// 配置svgIcon
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons'


// https://vitejs.dev/config/
export default defineConfig({
    // 代理，跨域
    server: {
        proxy: {
            // '/api': "http://***.com"
        }
    },
    // 别名
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    plugins: [
        vue(),

        // element-ui plus autoImport
        AutoImport({
            resolvers: [ElementPlusResolver()],
            imports: ['vue', 'vue-router'], // 自动导入vue相关函数
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
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
    // css
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                  @import "./src/style/index.scss";
                  `
            }
        }
    },


})
