<template>
  <div>
    <el-carousel :interval="carouselConfig.interval" type="card" :height="carouselConfig.height">
      <el-carousel-item v-for="item in carouselConfig.data" :key="item">
        <el-image :src="item.url">
          <template #placeholder>
            <div class="image-slot">Loading<span class="dot">...</span></div>
          </template>
        </el-image>
      </el-carousel-item>
    </el-carousel>

    <div v-for="item in data" :key="item.id" style="margin-top: 30px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ item.category }}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row v-for="(o, index) in rows(item.videos)" :key="o" :gutter="20" style="margin-top: 15px">
        <el-col v-for="col in videoRange(item.videos, index)" :span="24 / carouselConfig.colNumber" :key="col.name">
          <el-card :body-style="{ padding: '0px' }">
            <el-image :src="col.avator" class="image">
              <template #placeholder>
                <div class="image-slot">Loading<span class="dot">...</span></div>
              </template>
              <template #error>
                <div class="image-slot">
                  <el-icon><icon-picture /></el-icon>
                </div>
              </template>
            </el-image>
            <div style="padding: 14px">
              <div class="video-title">{{ col.name }}</div>
              <div class="time">{{ col.desc }}</div>
              <div class="left-right-wrapper time">
                <span>{{ col.artist }}</span>
                <span>{{ col.release }}</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { Picture as IconPicture } from '@element-plus/icons';

export default {
  name: 'HomeIndex',
  components: { IconPicture },
  setup() {
    const carouselConfig = reactive({
      interval: 4000,
      height: '400px',
      colNumber: 4,
      data: [
        { name: '张三', url: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' },
        { name: '李四', url: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' },
        { name: '王五', url: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' },
        { name: '赵六', url: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' },
        { name: '王二', url: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' },
        { name: '九九', url: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' },
      ],
    });
    const rows = (videos) => {
      return Math.ceil(videos.length / carouselConfig.colNumber);
    };
    const videoRange = (videos, index) => {
      const tmp = index * carouselConfig.colNumber + carouselConfig.colNumber;
      const end = tmp > videos.length ? videos.length : tmp;
      return videos.slice(index * carouselConfig.colNumber, end);
    };
    const data = reactive([
      {
        id: 1,
        category: '精彩推荐',
        videos: [
          {
            name: '无间道1',
            artist: '刘德华，梁朝伟，曾志伟',
            release: '2020-09',
            desc: '我想做个好人。。',
            avator: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          },
          {
            name: '无间道2',
            artist: '刘德华，梁朝伟，曾志伟',
            release: '2020-09',
            desc: '我想做个好人。。',
            avator: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          },
          {
            name: '无间道3',
            artist: '刘德华，梁朝伟，曾志伟',
            release: '2020-09',
            desc: '我想做个好人。。',
            avator: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          },
          {
            name: '无间道4',
            artist: '刘德华，梁朝伟，曾志伟',
            release: '2020-09',
            desc: '我想做个好人。。',
            avator: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          },
          {
            name: '无间道5',
            artist: '刘德华，梁朝伟，曾志伟',
            release: '2020-09',
            desc: '我想做个好人。。',
            avator: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          },
        ],
      },
      {
        id: 2,
        category: '福利',
        videos: [
          {
            name: '无间道6',
            artist: '刘德华，梁朝伟，曾志伟',
            release: '2020-09',
            desc: '我想做个好人。。',
            avator: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          },
          {
            name: '无间道7',
            artist: '刘德华，梁朝伟，曾志伟',
            release: '2020-09',
            desc: '我想做个好人。。',
            avator: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          },
          {
            name: '无间道8',
            artist: '刘德华，梁朝伟，曾志伟',
            release: '2020-09',
            desc: '我想做个好人。。',
            avator: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          },
          {
            name: '无间道9',
            artist: '刘德华，梁朝伟，曾志伟',
            release: '2020-09',
            desc: '我想做个好人。。',
            avator: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          },
          {
            name: '无间道10',
            artist: '刘德华，梁朝伟，曾志伟',
            release: '2020-09',
            desc: '我想做个好人。。',
            avator: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          },
        ],
      },
    ]);
    return {
      carouselConfig,
      data,
      rows,
      videoRange,
    };
  },
};
</script>

<style scoped>
.video-title {
  font-size: 14px;
  color: var(--el-color-primary);
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.time {
  margin-top: 13px;
  line-height: 12px;
  font-size: 13px;
  color: #999;
}
</style>
