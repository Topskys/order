<script>
import {defineProps} from 'vue'

const props = defineProps({
    type: {
        type: String, // submit,reset,button,menu
    },
    disabled: {
        type: Boolean
    },
    className: {
        type: String,
        default: ''
    },
    buttonVal: undefined,
    name: {
        type: String,
    },
})
</script>


<template>
    <button
            :type="type"
            :value="buttonVal"
            :disabled="disabled"
            :name="name"
            class="e-button"
            :class="className">
        <slot></slot>
    </button>
</template>

<style scoped>
button {
    color: #606266;
    font-size: 14px;
    padding: 8px 15px;
    margin: 0 5px;
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    user-select: none;
    -webkit-appearance: none;
    border: 1px solid #dcdfe6;
    border-radius: 2px;
    background-color: #ffffff;
    transition: .3s;
}

button:hover, button:focus, button:active {
    color: #333;
    background-color: #f5f5f7;
}

.large {
    font-size: 14px;
    padding: 12px 19px;
}

.small {
    font-size: 12px;
    padding: 5px 11px;
}
</style>