<!--
 * @Author: Topskys
 * @Date: 2023-02-16 22:28:45
 * @LastEditTime: 2023-04-22 14:10:41
-->
<template>
    <div class="container" @keyup="onKeyUp">
        <AsideBar @fileData="fileData"></AsideBar>
        <main>
            <VueMavonEditor
                ref="mdr"
                v-model="content"
                :toolbars="toolbars"
                :boxShadow="false"
                :toolbarsFlag="toolbar"
                :shortCut="globKey"
                :subfield="subfield"
                :html="html"
                :ishljs="ishljs"
                :language="lang"
                :fontSize="`${fs}px`"
                :code_style="code_style"
                @save="save"
                @imgAdd="imgAdd"
                @imgDel="imgDel"
                @subfieldToggle="$store.dispatch('app/toggleSubfield')"
                :external-link="externalLink"
            >
            </VueMavonEditor>
            <FooterStatus :length="content.length" @pushFile='pushFile'></FooterStatus>
        </main>
    </div>
</template>


<script>
// 渲染进程
const {ipcRenderer} = window.require("electron");
const fs = window.require("fs");
const path = window.require("path");
import File from "../renderer/file";
import notification from "../renderer/notice";
import axios from "axios";
import {uploadFile} from "@/api/doc.js";

// Vuex
import {mapActions, mapGetters, mapState} from "vuex";
// 组件
import {mavonEditor} from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import FooterStatus from "@/components/Footer/index.vue";
import AsideBar from "./AsideBar1.vue";
// import Terminal from "../components/Terminal/index.vue";
// config
import homeState from "@/config/homeMapState.js";
import mavonEditorConfig from "@/config/mavonEditor";

// 实例化
const {readStream, writeStream, createFile} = new File();

export default {
    name: "Home",
    components: {
        VueMavonEditor: mavonEditor,
        AsideBar,
        // Terminal,
        FooterStatus,
    },
    data() {
        return {
            /* 编辑的文本数据 */
            content: "",
            /* 选中文本 */
            selection: "",
            /* 编辑区配置 */
            toolbars: {...mavonEditorConfig},
            /* Terminal */
            drawer: true,
            direction: "btt",
            cmd: "",
            ps: "",
            code_style: "solarized-dark",
            externalLink: {
                markdown_css: () => "./md/markdown/github-markdown.min.css",
                hljs_js: () => "/md/highlightjs/highlight.min.js",
                hljs_css: (css) => "/md/highlightjs/styles/" + css + ".min.css",
                hljs_lang: (lang) => "/md/highlightjs/languages/" + lang + ".min.js",
                katex_css: () => "/md/katex/katex.min.css",
                katex_js: () => "/md/katex/katex.min.js",
            },
            currFilename: "",
        };
    },
    computed: {
        ...homeState.app,
        ...homeState.mixins,
        ...mapGetters("file", ["getCurrFile"]),
    },
    mounted() {
        this.code_style = "solarized-dark";
        // 打开文件并修改当前文件
        ipcRenderer.on("openFile", (e, filePath) => {
            filePath &&
            this.pushFiles({
                filePath,
                curr: true,
            });
        });
        // 文件保存按钮
        ipcRenderer.on("saveFile", () => this.save());
        // 主菜单栏另存为
        ipcRenderer.on("saveAs", (e, data) => {
            return createFile(data.filePath, this.content);
        });
    },
    methods: {
        ...mapActions("file", ["pushFiles", "removeFiles"]),
        ...mapActions("app", ["toggleCollapsed", "toggleToolbar"]),
        fileData(file) {
            this.readFileContent(file);
            this.filename = file.filePath;
        },
        // 监听键盘事件
        onKeyUp(e) {
            // ctrl + e
            if ((e.ctrlKey || e.metaKey) && e.keyCode == 69) {
                e.preventDefault();
                navigator.clipboard.readText().then((text) => {
                    const reqUrl = `http://fanyi.youdao.com/translate?&doctype=json&type=AUTO&i=${text}`;
                    axios
                        .get(reqUrl)
                        .then((res) => res.data)
                        .then((data) => {
                            const res = data.translateResult[0][0];
                            notification({
                                title: "翻译",
                                body: `${res.src}：${res.tgt}`,
                            });
                        })
                        .catch((err) => {
                            console.error(err);
                        });
                });
            }

            if (!this.globKey) {
                notification({
                    title: "Warning",
                    body: "全局快捷键已关闭",
                });
                return;
            }

            const colCode = this.collapsedKey.split("+").at(-1).trim().charCodeAt();
            const tolCode = this.toolBarKey.split("+").at(-1).trim().charCodeAt();

            // Ctrl + F 70
            if ((e.ctrlKey || e.metaKey) && e.keyCode === colCode) {
                e.preventDefault();
                this.toggleCollapsed();
            }
            // Ctrl + T 84
            if ((e.ctrlKey || e.metaKey) && e.keyCode === tolCode) {
                e.preventDefault();
                this.toggleToolbar();
            }
        },
        // 保存，写入文件
        save(filePath) {
            const filename = filePath || this.filename || this.currFile?.filePath;
            writeStream(filename, this.content);
        },
        // 读取文件内容
        readFileContent(file) {
            const filePath = file?.filePath || ''
            if (!filePath) return
            readStream(filePath)
                .then((res) => {
                    this.content = res.toString(); // Buffer 》》 string
                })
                .catch((err) => {
                    this.removeFiles(file);
                    this.$message({
                        type: "info",
                        message: "文件读取失败",
                    });
                });
        },
        // 上传图片
        imgAdd(e, $file) {
            let formData = new FormData();
            formData.append("file", $file);

            // this.$http({
            //   url: "/upload",
            //   method: "POST",
            //   data: formData,
            //   headers: { "Content-Type": "multipart/form-data" },
            // }).then(({ data }) => {
            //   $vm.$img2Url(data.url);
            // });
        },
        // 删除图片
        imgDel() {
        },
        openMenu(e) {
            console.log("--", e);
            // this.$refs.rightMenu.openMenu(e);
        },
        // 读取文件夹
        openDirectory() {
        },
        //  上传文档
        async pushFile() {
            await uploadFile(this.currFile)
        }
    },
    watch: {
        content: {
            handler(nv) {
                if (nv === this.content) {
                    this.$store.dispatch("file/setIsSave", true);
                } else {
                    this.$store.dispatch("file/setIsSave", false);
                }
            },
        },
        currFile: {
            handler(nv) {
                if (!nv?.filePath) return
                this.readFileContent(nv);
                this.currFilename = nv?.filePath;
            },
            immediate: true,
        },
    },
};
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    overflow: hidden;

    main {
        flex: 1;
        overflow: hidden;

        .v-note-wrapper {
            position: relative;
            box-shadow: none !important;
            width: inherit;
            max-width: 100vw;
            height: calc(100vh - 30px);
            overflow: hidden;
            border: none;
        }
    }
}
</style>


