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
            <el-button-group style="margin-left: 10px">
              <el-button type="primary">
                <el-icon><star /></el-icon>
              </el-button>
              <el-button type="primary">
                <el-icon><share /></el-icon>
              </el-button>
              <el-button type="primary">
                <el-icon><delete /></el-icon>
              </el-button>
            </el-button-group>
            <el-divider></el-divider>
            <el-row :gutter="20">
              <el-col v-for="video in videoList" :key="video.id" :xs="24" :sm="12" :md="6" :lg="4" :xl="3">
                <el-card class="image-item" shadow="never" :body-style="{ padding: '0px' }">
                  <el-image style="width: 100%; min-height: 240px" :src="video.thumb" fit="contain">
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
          </el-tab-pane>
          <el-tab-pane label="评论">
            <el-timeline>
              <el-timeline-item v-for="comment in comments" :key="comment.id" :timestamp="comment.createTime">
                {{ comment.content }}
              </el-timeline-item>
            </el-timeline>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, getCurrentInstance } from 'vue';
import AoiPlayer from '@/components/AoiPlayer/Index.vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { Star, Share, Delete, Picture } from '@element-plus/icons';

export default {
  name: 'Details',
  components: { AoiPlayer, Star, Share, Delete, Picture },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const { proxy } = getCurrentInstance();
    const videoList = ref([]);
    const comments = ref([]);
    const isLogin = computed(() => store.getters.isLogin);
    const userTravel = (id, operation) => {
      if (!isLogin.value) {
        return;
      }
      const params = {
        videoId: id,
        userId: store.state.auth.user.id,
        operation,
      };
      proxy.$api.userTravel.add(params);
    };
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
    const getComment = id => {
      proxy.$api.home
        .getVideoComment({ id })
        .then(res => {
          if (res.success) {
            comments.value = res.data.rows;
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
            videoList.value = res.data;
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
    onMounted(() => {
      const { id } = route.query;
      if (!id) {
        router.replace({ name: 'Page404' });
      } else {
        getVideo(id);
        userTravel(id, 'come');
        getRecommend(id);
        getComment(id);
      }
    });
    onUnmounted(() => {
      userTravel(id, 'leave');
    });
    return {
      video,
      comments,
      videoList,
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

  .image-item {
    margin-bottom: 12px;
    width: 100%;
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
}
</style>
