<template>
  <div v-loading="loading" style="margin-top: -10px; min-height: 80vh">
    <div class="filter-container" :style="{ width: width }">
      <div class="title"><span>分类：</span></div>
      <div style="flex-shrink: 0">
        <el-radio-group v-model="queryParams.category" size="small">
          <el-radio-button v-for="item in categoryList" :key="item.id" :label="item.id">
            {{ item.name }}
          </el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div class="filter-container" :style="{ width: width }">
      <div class="title"><span>地区：</span></div>
      <div style="flex-shrink: 0">
        <el-radio-group v-model="queryParams.area" size="small">
          <el-radio-button v-for="item in areaList" :key="item.id" :label="item.id">
            {{ item.name }}
          </el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div class="filter-container" :style="{ width: width }">
      <div class="title"><span>排序：</span></div>
      <div style="flex-shrink: 0">
        <el-radio-group v-model="queryParams.order" size="small">
          <el-radio-button v-for="item in orderList" :key="item.code" :label="item.code">
            {{ item.name }}
          </el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div class="filter-container" :style="{ width: width }">
      <el-row :gutter="20" style="margin-bottom: 10px">
        <el-col
          v-for="video in videoList"
          :key="video.id"
          :xs="24"
          :sm="12"
          :md="6"
          :lg="4"
          :xl="3"
          style="margin-top: 20px"
        >
          <el-card shadow="never" :body-style="{ padding: 0 }">
            <el-image style="width: 240px; height: 260px" :src="video.thumb" fit="contain">
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
            <div style="padding: 14px">
              <span class="video-title">{{ video.name }}</span>
              <div class="vidoe-desc">
                <span>{{ video.desc }}</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="filter-container" :style="{ width: width }">
      <el-pagination
        v-model:page-size="pageSize"
        v-model:current-page="pageNo"
        background
        layout="prev, pager, next, jumper"
        :total="total"
        @size-change="getVideo"
        @current-change="getVideo"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, getCurrentInstance } from 'vue';
import { useStore } from 'vuex';
import { Picture } from '@element-plus/icons';

export default {
  name: 'HomeCategory',
  components: {
    Picture,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const store = useStore();
    const width = ref('90vw');
    const videoList = ref([]);
    const total = ref(0);
    const pageSize = ref(10);
    const pageNo = ref(1);
    const loading = ref(false);
    const queryParams = reactive({
      category: -1,
      area: -1,
      order: '-id',
    });
    const categoryList = ref([
      {
        id: -1,
        name: '全部',
      },
    ]);
    const areaList = ref([{ id: -1, name: '全部' }]);
    const orderList = ref([
      { code: '-id', name: '更新时间' },
      { code: 'popular', name: '人气' },
      { code: 'views', name: '播放量' },
      { code: 'praise', name: '点赞数' },
    ]);
    onMounted(async () => {
      // 获取视频
      getVideo();
      // 获取分类
      await store.dispatch('getCategory');
      categoryList.value = categoryList.value.concat(store.getters.category);
      // 获取地区
      await store.dispatch('getArea');
      areaList.value = areaList.value.concat(store.getters.area);
    });
    const getVideo = async () => {
      const params = {
        category: queryParams.category === -1 ? '' : queryParams.category,
        area: queryParams.area === -1 ? '' : queryParams.area,
        pageSize: pageSize.value,
        pageNo: pageNo.value,
        sort: queryParams.order,
      };
      loading.value = true;
      await proxy.$api.home
        .getVideo(params)
        .then(res => {
          if (res.success) {
            videoList.value = res.data.rows;
            total.value = res.data.total;
          } else {
            proxy.$tips.warning(res.msg);
          }
        })
        .catch(err => {
          proxy.$tips.error(err.msg);
        });
      loading.value = false;
    };
    return {
      queryParams,
      orderList,
      areaList,
      categoryList,
      videoList,
      width,
      total,
      pageSize,
      pageNo,
      loading,
      getVideo,
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

.video-title {
  font-weight: 500;
  line-height: 28px;
  color: var(--el-text-color-regular);
}

.vidoe-desc {
  line-height: 24px;
  color: var(--el-text-color-secondary);
}

.image-item {
  margin-bottom: 12px;
  width: 240px;
}

.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #f5f7fa;
  color: var(--el-text-color-secondary);
}

.filter-container {
  display: flex;
  flex-flow: nowrap row;
  align-items: center;
  margin: 0 auto;
  padding: 3px 0;
}
</style>
