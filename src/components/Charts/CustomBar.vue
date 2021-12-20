<template>
  <v-chart class="chart" autoresize :loading="loading" :option="option" v-bind="$attrs" />
</template>

<script>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { reactive } from 'vue';

use([CanvasRenderer, BarChart, GridComponent, TitleComponent, TooltipComponent, LegendComponent]);

export default {
  name: 'CustomBar',
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
      //   legend: {
      //     orient: 'vertical',
      //     left: 'left',
      //     data: props.data.columns,
      //   },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: props.title,
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
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
