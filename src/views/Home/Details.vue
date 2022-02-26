<template>
  <div class="details">
    <el-row>
      <el-col><el-page-header :content="video.name" /></el-col>
    </el-row>
    <el-row class="mbt15">
      <el-col><aoi-player :src="video.m3u8"></aoi-player></el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-tabs type="card" stretch class="plr10">
          <el-tab-pane label="相关推荐">
            <el-descriptions class="plr10" :column="1">
              <el-descriptions-item label="影片简介：">{{ video.desc }}</el-descriptions-item>
              <el-descriptions-item label="领衔主演：">{{ video.artists }}</el-descriptions-item>
              <el-descriptions-item label="上映时间：">{{ video.releaseTime }}</el-descriptions-item>
            </el-descriptions>
            <div style="margin: 5px 0 10px 10px">
              <el-tag v-for="tag in video.tagsList" :key="tag.id" type="success" effect="dark">
                {{ tag.name }}
              </el-tag>
            </div>
            <el-button-group size="small" style="margin-left: 10px">
              <el-button type="primary">
                <el-icon><edit /></el-icon>
              </el-button>
              <el-button type="primary">
                <el-icon><share /></el-icon>
              </el-button>
              <el-button type="primary">
                <el-icon><delete /></el-icon>
              </el-button>
            </el-button-group>
            <el-divider></el-divider>
          </el-tab-pane>
          <el-tab-pane label="评论">
            <el-timeline>
              <el-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.timestamp">
                {{ activity.content }}
              </el-timeline-item>
            </el-timeline>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ref, onMounted, getCurrentInstance, shallowRef } from 'vue';
import AoiPlayer from '@/components/AoiPlayer/Index.vue';
import { useRoute } from 'vue-router';
import { Edit, Share, Delete } from '@element-plus/icons';

export default {
  name: 'Details',
  components: { AoiPlayer, Edit, Share, Delete },
  setup() {
    const route = useRoute();
    const { proxy } = getCurrentInstance();
    const getVideo = id => {
      proxy.$api.home
        .getVideo({ id })
        .then(res => {
          if (res.success && res.data.rows.length === 1) {
            video.value = res.data.rows[0];
          } else {
            proxy.$tips.warning(res.msg);
          }
        })
        .catch(err => {
          proxy.$tips.error(err.msg);
        });
    };
    const getRecommend = id => {
      proxy.$api.home
        .getRecommendVideo({ id })
        .then(res => {
          if (res.success) {
            console.log(res.data);
          } else {
            proxy.$tips.warning(res.msg);
          }
        })
        .catch(err => {
          proxy.$tips.error(err.msg);
        });
    };
    const video = ref({
      name: null,
      artists: null,
      releaseTime: null,
      desc: null,
      thumb: null,
      m3u8: null,
      tagsList: [],
    });
    const activities = ref([
      {
        content: 'Event start',
        timestamp: '2018-04-15',
      },
    ]);
    onMounted(() => {
      const { id } = route.query;
      if (!id) {
        proxy.$tips.warning('url出错!');
      } else {
        getVideo(id);
        getRecommend(id);
      }
    });
    return {
      video,
      activities,
    };
  },
};
</script>

<style lang="scss">
.details {
  .mbt15 {
    margin: 15px 0;
  }

  .plr10 {
    padding-left: 10px;
    padding-right: 10px;
  }

  .el-descriptions__body {
    background-color: transparent;
  }
}
</style>
