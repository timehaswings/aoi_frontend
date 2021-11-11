<template>
    <div>
       关于我们
    </div>
</template>

<script>
import { reactive, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
    setup(){
        let store = useStore();
        let data = reactive({
        	count: 0
        });
        onMounted(() => {
            console.log(store.state.common.notifyMsg);
            // store.dispatch('addCount')
        });
        let add = () => {
            // store.dispatch('addCount')
        };
        return{
        	data,
            add
        }
    }
}
</script>

<style scoped>

</style>