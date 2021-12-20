<template>
  <v-chart class="chart" autoresize :loading="loading" :option="option" v-bind="$attrs" />
</template>

<script>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { reactive } from 'vue';

use([CanvasRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent]);

export default {
  name: 'CustomPie',
  components: {
    VChart,
  },
  provide: {
    [THEME_KEY]: 'macarons',
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    height: {
      type: String,
      default: '400px',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => {
        return {
          columns: [],
          rows: [],
        };
      },
    },
  },
  setup: props => {
    const option = reactive({
      title: {
        text: props.title,
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: props.data.columns,
      },
      series: [
        {
          name: props.title,
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: props.data.rows,
        },
      ],
    });
    return { option };
  },
};
</script>

<style scoped>
.chart {
  height: v-bind(height);
}
</style>
