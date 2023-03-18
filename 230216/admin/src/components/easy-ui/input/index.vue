<script lang="ts" setup>
import {ref, defineProps, watch, defineEmits} from 'vue'

// 接收属性
const props = defineProps({
    type: {
        type: String,
        default: "text",
    },
    value: {
        required: true,
    },
    placeholder: {
        type: String,
        default: "请输入"
    },
    size: {
        type: Number,
    },
    disabled: {
        type: Boolean,
    },
    minlength: {
        type: Number,
    },
    maxlength: {
        type: Number,
    },
    className: {
        type: String,
    },
})


const emit = defineEmits(["value"])

// 创建响应式的 value
let inputVal = ref(props.value)

// 监听响应式的 inputVal 变化，以更新父组件的 v-model 值
watch(inputVal, (newValue) => emit("update:value", newValue))

</script>


<template>
    <input
            class="e-input"
            :class="className"
            v-model="inputVal"
            :type="type"
            :placeholder="placeholder"
            :disabled="disabled"
            :size="size"
            :minlength="minlength"
            :maxlength="maxlength"/>
</template>
