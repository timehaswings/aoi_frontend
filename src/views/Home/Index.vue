<template>
  <div style="min-height: 80vh">
    <el-carousel :interval="carouselConfig.interval" type="card" :height="carouselConfig.height">
      <el-carousel-item v-for="item in carouselConfig.data" :key="item.id" @click="goDetails(item.id)">
        <el-image :src="item.url" :style="{ height: carouselConfig.height }">
          <template #placeholder>
            <div class="image-slot">
              Loading
              <span class="dot">...</span>
            </div>
          </template>
          <template #error>
            <div class="image-slot">
              <el-icon :size="42"><Picture /></el-icon>
            </div>
          </template>
        </el-image>
      </el-carousel-item>
    </el-carousel>

    <div v-for="item in categoryData" :key="item.id" style="margin-top: 30px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">分类</el-breadcrumb-item>
        <el-breadcrumb-item>{{ item.name }}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row v-for="(o, index) in rows(item.videoList)" :key="o" :gutter="20" style="margin-top: 15px">
        <el-col
          v-for="video in videoRange(item.videoList, index)"
          :key="video.id"
          :span="24 / carouselConfig.colNumber"
        >
          <el-card shadow="never" :body-style="{ padding: '0px', 'text-align': 'center' }" @click="goDetails(item.id)">
            <el-image :src="video.url" style="height: 200px">
              <template #placeholder>
                <div class="col-image-slot" style="line-height: 200px">
                  Loading
                  <span class="dot">...</span>
                </div>
              </template>
              <template #error>
                <div class="col-image-slot" style="line-height: 200px">
                  <el-icon :size="32"><Picture /></el-icon>
                </div>
              </template>
            </el-image>
            <div style="padding: 14px">
              <div class="video-title">{{ video.name }}</div>
              <div class="time">{{ video.desc }}</div>
              <div class="left-right-wrapper time">
                <span>{{ video.artists }}</span>
                <span>{{ video.releaseTime }}</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { ref, reactive, getCurrentInstance, onMounted } from 'vue';
import { Picture } from '@element-plus/icons';
import { useRouter } from 'vue-router';

export default {
  name: 'HomeIndex',
  components: {
    Picture,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const router = useRouter();
    const carouselConfig = reactive({
      interval: 4000,
      height: '400px',
      colNumber: 4,
      data: [],
    });
    const categoryData = ref([]);
    const getCarousel = () => {
      proxy.$api.home
        .getIndexCarousel()
        .then(res => {
          if (res.success) {
            carouselConfig.data = res.data;
          } else {
            proxy.$tips.warning(res.msg);
          }
        })
        .catch(err => {
          proxy.$tips.error(err.msg);
        });
    };
    const goDetails = id => {
      router.push('/details?id=' + id);
    };
    const getCategory = () => {
      proxy.$api.home
        .getIndexCategory()
        .then(res => {
          if (res.success) {
            categoryData.value = res.data;
          } else {
            proxy.$tips.warning(res.msg);
          }
        })
        .catch(err => {
          proxy.$tips.error(err.msg);
        });
    };
    onMounted(() => {
      getCarousel();
      getCategory();
    });
    const rows = videos => {
      return Math.ceil(videos.length / carouselConfig.colNumber);
    };
    const videoRange = (videos, index) => {
      const tmp = index * carouselConfig.colNumber + carouselConfig.colNumber;
      const end = tmp > videos.length ? videos.length : tmp;
      return videos.slice(index * carouselConfig.colNumber, end);
    };
    return {
      carouselConfig,
      categoryData,
      rows,
      videoRange,
      goDetails,
    };
  },
};
</script>

<style scoped>
.video-title {
  font-size: 14px;
  color: var(--el-color-primary);
  text-align: left;
}

.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: var(--el-text-color-secondary);
}

.col-image-slot {
  color: var(--el-text-color-secondary);
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
  text-align: left;
}
</style>
