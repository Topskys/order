<script lang="ts" setup>
import {ref, toRefs, watch, defineEmits} from 'vue'


const props = defineProps({
    value: {
        type: [String, Number],
        default: ''
    },
    config: {
        type: Object,
        default: () => ({
            disabled: false,
            placeholder: "请输入",
        })
    }
})

const {value, config} = toRefs(props)
const emit = defineEmits(["update:value"])

let val = ref("")


watch({
    value: {
        handler(newVal) {
            val.value = newVal
        },
        immediate: true
    }
})

// 动态组件 :value.sync="field[item.prop]" ，
// .sync：可以将子组件的数据同步到父组件，
// 以实现组件分离form数据效验问题
// this.$emit("update:value", this.val); // 数据同步，更新父组件数据（field[item.prop]）
// or
// this.$emit("updateValue",this.val); // 子传父
const valChange = () => emit("update:value", val.value)


</script>

<template>
    <div style="background: white">
        <el-input v-model="val" @input="valChange" :placeholder="config?.placeholder"
                  :disabled="config?.disabled"></el-input>
    </div>
</template>


<style>

</style>