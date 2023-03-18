<script lang="ts" setup>
import {ref, toRefs, reactive,} from 'vue'
//import epInput from '../../components/control/input/index.vue'


let f = ref("")

watch({
    f: {
        handler(nv) {
            console.log('1111----', nv)
        }
    }
})

</script>


<template>
    <div style="height:100px;background: green;">
      
    </div>
</template>


<style lang="scss" scoped>


</style>