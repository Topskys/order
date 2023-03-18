<script setup lang="ts">
import {ref, toRefs, reactive} from 'vue'


// 自动化导入控件
const files = import.meta.glob("../../components/control/**/*.vue")
const modules = {}
for (const file in files) {
    modules[`ep-${file.split("/").at(-2)}`] = files[file]()
}






</script>


<template>



</template>


<style lang="scss" scoped>

</style>