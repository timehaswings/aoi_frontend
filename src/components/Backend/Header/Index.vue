<template>
  <div class="left-right-wrapper">
    <div class="header-title">后台管理</div>
    <ul class="horizontal-nav header-nav">
      <li>
        <el-icon :size="16" class="pr5"> <share /></el-icon><span>分享</span>
      </li>
      <li>
        <el-icon :size="16" class="pr5"> <notification /></el-icon><span>通知</span>
      </li>
      <li>
        <el-icon :size="16" class="pr5"> <setting /></el-icon><span>设置</span>
      </li>
      <li>
        <el-icon :size="16" class="pr5"> <avatar /></el-icon><span>下午好，周杰伦</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { Avatar, Setting, Share, Notification } from '@element-plus/icons';
export default {
  name: 'BackendHeader',
  components: {
    Notification,
    Avatar,
    Setting,
    Share,
  },
};
</script>

<style scoped>
.header-title {
  font-size: 16px;
  font-weight: bold;
  color: #f2f6fc;
}

.header-nav {
  color: white;
  font-size: 14px;
}

.pr5 {
  padding-right: 5px;
}
</style>
