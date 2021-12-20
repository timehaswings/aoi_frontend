<template>
  <v-chart class="chart" autoresize :loading="loading" :option="option" v-bind="$attrs" />
</template>

<script>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { ScatterChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { reactive } from 'vue';

use([CanvasRenderer, ScatterChart, GridComponent, TitleComponent, TooltipComponent, LegendComponent]);

export default {
  name: 'CustomScatter',
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
      xAxis: {},
      yAxis: {},
      series: [
        {
          symbolSize: 20,
          data: [
            [10.0, 8.04],
            [8.07, 6.95],
            [13.0, 7.58],
            [9.05, 8.81],
            [11.0, 8.33],
            [14.0, 7.66],
            [13.4, 6.81],
            [10.0, 6.33],
            [14.0, 8.96],
            [12.5, 6.82],
            [9.15, 7.2],
            [11.5, 7.2],
            [3.03, 4.23],
          ],
          type: 'scatter',
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
