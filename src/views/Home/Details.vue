<template>
  <div class="details">
    <el-row>
      <el-col> <el-page-header content="视频播放" /></el-col>
    </el-row>
    <el-row class="mbt15">
      <el-col> <aoi-player :src="video.src"></aoi-player></el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-tabs type="card" stretch class="plr10">
          <el-tab-pane label="相关推荐">
            <el-descriptions class="plr10" :title="video.name" :column="1">
              <el-descriptions-item label="影片简介：">{{ video.desc }}</el-descriptions-item>
              <el-descriptions-item label="领衔主演：">{{ video.artist }}</el-descriptions-item>
              <el-descriptions-item label="上映时间：">{{ video.release }}</el-descriptions-item>
            </el-descriptions>
            <el-button-group size="small">
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
import { ref, onMounted, shallowRef } from 'vue';
import AoiPlayer from '@/components/AoiPlayer/Index.vue';
import { Grid, HomeFilled, ArrowLeft, Briefcase, HelpFilled, Edit, Share, Delete } from '@element-plus/icons';

export default {
  name: 'Details',
  components: { AoiPlayer, HomeFilled, ArrowLeft, Edit, Share, Delete },
  setup(props) {
    const video = ref({
      name: '无间道8',
      artist: '刘德华，梁朝伟，曾志伟',
      release: '2020-09',
      desc: '我想做个好人。。',
      avator: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
    });
    const activities = ref([
      {
        content: 'Event start',
        timestamp: '2018-04-15',
      },
      {
        content: 'Approved',
        timestamp: '2018-04-13',
      },
      {
        content: 'Success',
        timestamp: '2018-04-11',
      },
    ]);
    onMounted(() => {});
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
