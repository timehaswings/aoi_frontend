<template>
  <div>
    <base-table></base-table>
  </div>
</template>

<script>
import { reactive, onMounted, getCurrentInstance } from 'vue';
import { useStore } from 'vuex';
import BaseTable from '@/components/Backend/BaseTable/Index.vue';

export default {
  components: { BaseTable },
  setup() {
    let store = useStore();
    let data = reactive({
      count: 0,
    });
    onMounted(() => {
      //   console.log(store.state.common.notifyMsg);
      const { proxy } = getCurrentInstance();
      //   console.log(proxy.$api);
      // store.dispatch('addCount')
    });
    let add = () => {
      // store.dispatch('addCount')
    };
    return {
      data,
      add,
    };
  },
};
</script>

<style scoped></style>
