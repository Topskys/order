<template>
    <el-dialog
            :title="title"
            :visible.sync="visible"
            :width="width"
            :fullscreen="fullscreen"
            :top="top"
            :lock-scroll="lockScroll"
            :modal-append-to-body="modalAppendToBody"
            :close-on-click-modal="closeOnClickModal"
            :close-on-press-escape="closeOnPressEscape"
            :show-close="showClose"
            :before-close="beforeClose"
            @open="handleOpen"
            @close="handleClose"
            @opened="handleOpened"
            @closed="handleClosed">
        <slot></slot>
        <template #footer>
            <el-button @click="handleCancel">取 消</el-button>
            <el-button type="primary" @click="handleOk">确 定</el-button>
        </template>
    </el-dialog>
</template>

<script>
export default {
    name: 'Dialog',
    props: {
        title: String,
        visible: Boolean,
        width: String,
        fullscreen: Boolean,
        top: String,
        lockScroll: {
            type: Boolean,
            default: true
        },

    },
    methods:{
    
    }
}
</script>