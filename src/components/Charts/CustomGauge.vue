<template>
  <v-chart class="chart" autoresize :loading="loading" :option="option" v-bind="$attrs" />
</template>

<script>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { GaugeChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { reactive } from 'vue';

use([CanvasRenderer, GaugeChart, GridComponent, TitleComponent, TooltipComponent, LegendComponent]);

export default {
  name: 'CustomGauge',
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
      //   xAxis: {},
      //   yAxis: {},
      series: [
        {
          name: 'Pressure',
          type: 'gauge',
          detail: {
            formatter: '{value}',
          },
          data: [
            {
              value: 50,
              name: 'SCORE',
            },
          ],
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
