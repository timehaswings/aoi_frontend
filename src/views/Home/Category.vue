<template>
  <div v-resize="handleResize" style="margin-top: -10px">
    <div class="filter-container" :style="{ width: width }">
      <div class="title"><span>分类：</span></div>
      <div style="flex-shrink: 0">
        <el-radio-group v-model="queryParams.category" size="mini">
          <el-radio-button v-for="item in categoryList" :key="item.code" :label="item.code">
            {{ item.name }}
          </el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div class="filter-container" :style="{ width: width }">
      <div class="title"><span>地区：</span></div>
      <div style="flex-shrink: 0">
        <el-radio-group v-model="queryParams.area" size="mini">
          <el-radio-button v-for="item in areaList" :key="item.code" :label="item.code">
            {{ item.name }}
          </el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div class="filter-container" :style="{ width: width }">
      <div class="title"><span>排序：</span></div>
      <div style="flex-shrink: 0">
        <el-radio-group v-model="queryParams.order" size="mini">
          <el-radio-button v-for="item in orderList" :key="item.code" :label="item.code">
            {{ item.name }}
          </el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div
      ref="masonry"
      v-masonry="containerId"
      class="container"
      :horizontal-order="true"
      transition-duration="0.3s"
      item-selector=".image-item"
      :fit-width="true"
      :gutter="12"
    >
      <el-card
        v-for="(item, index) in blocks"
        :key="index"
        class="image-item"
        shadow="never"
        :body-style="{ padding: '0px', width: '235px', height: '324px' }"
      >
        <img :src="item.src" />
        <div style="padding: 14px">
          <span>Yummy hamburger</span>
          <div class="bottom">
            <time class="time">2020-01-01</time>
            <el-button type="text" class="button">Operating</el-button>
          </div>
        </div>
      </el-card>
    </div>
    <div class="filter-container" :style="{ width: width }">
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';

export default {
  name: 'HomeCategory',
  setup() {
    const queryParams = reactive({
      category: 'all',
      area: 'all',
      order: 'default',
    });
    onMounted(() => {
      width.value = masonry.value.style.width;
    });
    const width = ref('500px');
    const masonry = ref(null);
    const containerId = ref(100);
    const handleResize = () => {
      width.value = masonry.value.style.width;
    };
    const categoryList = ref([
      { code: 'all', name: '全部' },
      { code: '1', name: '福利' },
      { code: '2', name: 'MV' },
      { code: '3', name: '体育' },
    ]);
    const areaList = ref([
      { code: 'all', name: '全部' },
      { code: 'china', name: '国产' },
      { code: 'japan_south_korea', name: '日韩' },
      { code: 'europe_america', name: '欧美' },
    ]);
    const orderList = ref([
      { code: 'default', name: '默认' },
      { code: 'update_time', name: '更新时间' },
      { code: 'popular', name: '人气' },
      { code: 'views', name: '播放量' },
      { code: 'praise', name: '点赞数' },
    ]);
    const blocks = ref([
      {
        name: '名字1',
        src: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        id: 1,
      },
      {
        name: '名字2',
        src: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        id: 2,
      },
      {
        name: '名字3',
        src: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        id: 3,
      },
      {
        name: '名字4',
        src: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        id: 4,
      },
      {
        name: '名字5',
        src: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        id: 5,
      },
      {
        name: '名字6',
        src: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        id: 6,
      },
      {
        name: '名字7',
        src: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        id: 7,
      },
      {
        name: '名字8',
        src: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        id: 8,
      },
      {
        name: '名字9',
        src: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        id: 9,
      },
      {
        name: '名字10',
        src: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        id: 10,
      },
      {
        name: '名字11',
        src: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        id: 11,
      },
      {
        name: '名字12',
        src: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        id: 12,
      },
    ]);
    return {
      queryParams,
      containerId,
      blocks,
      orderList,
      areaList,
      categoryList,
      masonry,
      width,
      handleResize,
    };
  },
};
</script>

<style scoped>
.container {
  margin: 0 auto;
  padding-top: 5px;
}

.title {
  width: 60px;
  font-weight: 600;
  color: #409eff;
}

.image-item {
  margin-bottom: 12px;
}

.filter-container {
  display: flex;
  flex-flow: nowrap row;
  align-items: center;
  margin: 0 auto;
  padding: 3px 0;
}
</style>
