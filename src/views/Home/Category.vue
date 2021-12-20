<template>
  <div class="category">
    <el-row>
      <el-col :span="24">
        <div class="filter-container">
          <div style="width: 60px"><span>分类：</span></div>
          <div style="flex-shrink: 0">
            <el-radio-group v-model="queryParams.category" size="mini">
              <el-radio-button v-for="item in categoryList" :key="item.code" :label="item.code">
                {{ item.name }}
              </el-radio-button>
            </el-radio-group>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row style="margin-top: 5px">
      <el-col :span="24">
        <div class="filter-container">
          <div style="width: 60px"><span>地区：</span></div>
          <div style="flex-shrink: 0">
            <el-radio-group v-model="queryParams.area" size="mini">
              <el-radio-button v-for="item in areaList" :key="item.code" :label="item.code">
                {{ item.name }}
              </el-radio-button>
            </el-radio-group>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row style="margin-top: 5px">
      <el-col :span="24">
        <div class="filter-container">
          <div style="width: 60px"><span>排序：</span></div>
          <div style="flex-shrink: 0">
            <el-radio-group v-model="queryParams.order" size="mini">
              <el-radio-button v-for="item in orderList" :key="item.code" :label="item.code">
                {{ item.name }}
              </el-radio-button>
            </el-radio-group>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row justify="center" style="margin-top: 20px">
      <el-col :span="24">
        <div
          v-masonry="containerId"
          :horizontal-order="true"
          transition-duration="0.3s"
          item-selector=".image-item"
          :gutter="12"
        >
          <div v-for="(item, index) in blocks" :key="index" v-masonry-tile class="item">
            <el-card class="image-item" :body-style="{ padding: '0px' }">
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
        </div>
      </el-col>
    </el-row>
    <el-row justify="right" style="margin-top: 20px">
      <el-col :span="24">
        <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';

export default {
  name: 'HomeCategory',
  setup() {
    const queryParams = reactive({
      category: 'all',
      area: 'all',
      order: 'default',
    });
    const containerId = ref(100);
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
    };
  },
};
</script>

<style scoped>
.category {
}

.image-item {
  margin-bottom: 12px;
}

.filter-container {
  display: flex;
  flex-flow: nowrap row;
  align-items: center;
}
</style>
