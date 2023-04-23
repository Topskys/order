/*
 * @Author: Topskys
 * @Date: 2023-04-10 09:27:44
 * @LastEditTime: 2023-04-10 09:29:42
 */
import { mapState } from 'vuex'

const state = {
    app: mapState("app", [
        "isCollapsed",
        "toolbar",
        "autoSave",
        "collapsedKey",
        "toolBarKey",
        "html",
        "lang",
        "fs",
        "subfield",
    ]),
    mixins: mapState({
        currFile: (state) => state.file?.currFile,
        isSave: (state) => state.file?.isSave,
        globKey: (state) => state.app.globKey,
        upload: (state) => (state.app.upload === "true" ? true : false),
        ishljs: (state) => (state.app.ishljs === "true" ? true : false),
    }),
}

export default state