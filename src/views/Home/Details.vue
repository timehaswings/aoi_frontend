<template>
  <div class="details">
    <el-row style="margin: 10px 0">
      <el-col>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">promotion management</a></el-breadcrumb-item>
          <el-breadcrumb-item>promotion list</el-breadcrumb-item>
          <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
        </el-breadcrumb></el-col
      >
    </el-row>
    <el-row style="margin: 10px 0">
      <el-col> <aoi-player></aoi-player></el-col>
    </el-row>
    <el-row style="margin: 10px 0">
      <el-col>
        <div>中华人民公司的副驾驶的覅士大夫</div>
        <div>中华人民公司的副驾驶的覅士大夫</div>
        <div>中华人民公司的副驾驶的覅士大夫</div>
        <div>中华人民公司的副驾驶的覅士大夫</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import AoiPlayer from '@/components/AoiPlayer/Index.vue';
import { Grid, HomeFilled, UserFilled, Briefcase, HelpFilled } from '@element-plus/icons';

export default {
  name: 'Details',
  components: { AoiPlayer, HomeFilled },
  setup(props) {
    const test = ref(null);
    onMounted(() => {});
    return {};
  },
};
</script>

<style scoped></style>
