<template>
  <div>
    <el-row :gutter="25">
      <el-col :span="12">
        <el-carousel :interval="carouselConfig.interval" arrow="always">
          <el-carousel-item v-for="item in carouselConfig.data" :key="item">
            <el-image :src="item.url">
              <template #placeholder>
                <div class="image-slot">
                  Loading
                  <span class="dot">...</span>
                </div>
              </template>
            </el-image>
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col :span="12">
        <el-descriptions title="User Info" :column="1">
          <el-descriptions-item label="Username">kooriookami</el-descriptions-item>
          <el-descriptions-item label="Telephone">18100000000</el-descriptions-item>
          <el-descriptions-item label="Place">Suzhou</el-descriptions-item>
          <el-descriptions-item label="Remarks">
            <el-tag size="small">School</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="Address">
            No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
          </el-descriptions-item>
        </el-descriptions>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-col :span="24">
        <el-radio-group v-model="queryParams.order" size="mini">
          <el-radio-button v-for="item in orderList" :key="item.code" :label="item.code">
            {{ item.name }}
          </el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-col :span="24">
        <div
          v-masonry="containerId"
          :horizontal-order="true"
          transition-duration="0.3s"
          item-selector=".image-item"
          :gutter="12"
        >
          <div v-masonry-tile class="item" v-for="(item, index) in blocks" :key="index">
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
  name: 'HomeMember',
  setup() {
    const queryParams = reactive({
      order: 'default',
    });
    const carouselConfig = reactive({
      interval: 4000,
      height: '400px',
      data: [
        { name: '张三', url: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' },
        { name: '李四', url: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' },
        { name: '王五', url: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' },
        { name: '赵六', url: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' },
        { name: '王二', url: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' },
        { name: '九九', url: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' },
      ],
    });
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
      carouselConfig,
      orderList,
      queryParams,
      blocks,
    };
  },
};
</script>

<style scoped>
.el-carousel__item .img-item {
  height: 400px;
  text-align: center;
}
</style>
