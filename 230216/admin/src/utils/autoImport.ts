// 自动化导入控件
import {App, Component} from "vue";


interface FileType {
    [key: string]: Component
}

const files = import.meta.glob("/src/components/control/**/*.vue")


export default (app: App<Element>): void => {
    Object.keys(files).map((key: string) => {
        const [name, component] = [`ep-${key.split("/").at(-2)}`, files[key]()]
        // console.log("n-c::",name,component)
        // 注册全局组件
        app.component(name, component)
    })
}


