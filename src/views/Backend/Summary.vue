<template>
  <div>
    <custom-pie title="用户分布" :data="pieData"></custom-pie>
    <custom-bar title="用户分布" :data="pieData"></custom-bar>
    <custom-line title="用户分布" :data="pieData"></custom-line>
    <custom-scatter title="用户分布" :data="pieData"></custom-scatter>
    <custom-gauge title="用户分布" :data="pieData"></custom-gauge>
  </div>
</template>

<script>
import { reactive, onMounted, getCurrentInstance } from 'vue';
import { useStore } from 'vuex';
import CustomPie from '@/components/Charts/CustomPie.vue';
import CustomBar from '@/components/Charts/CustomBar.vue';
import CustomLine from '@/components/Charts/CustomLine.vue';
import CustomScatter from '@/components/Charts/CustomScatter.vue';
import CustomGauge from '@/components/Charts/CustomGauge.vue';

export default {
  components: { CustomPie, CustomBar, CustomLine, CustomScatter, CustomGauge },
  setup() {
    let store = useStore();
    let data = reactive({
      count: 0,
    });
    const pieData = reactive({
      columns: ['老人', '小孩', '男人', '女人', '狗'],
      rows: [
        { value: 335, name: '老人' },
        { value: 310, name: '小孩' },
        { value: 234, name: '男人' },
        { value: 135, name: '女人' },
        { value: 154, name: '狗' },
      ],
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
      pieData,
    };
  },
};
</script>

<style scoped></style>
