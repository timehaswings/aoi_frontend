<template>
  <div class="left-right-wrapper">
    <div class="header-title">
      <el-icon :size="22" @click="drawer = true" class="header-open backend-open-nav"> <operation /></el-icon>
      <span style="margin-left: 5px"> 后台管理</span>
    </div>
    <ul class="horizontal-nav header-nav">
      <li @click="goHome">
        <el-icon :size="16" class="pr5"> <home-filled /></el-icon><span>网站首页</span>
      </li>
      <li>
        <el-icon :size="16" class="pr5"> <share /></el-icon><span>分享</span>
      </li>
      <li>
        <el-icon :size="16" class="pr5"> <notification /></el-icon><span>通知</span>
      </li>
      <li>
        <el-icon :size="16" class="pr5"> <user /></el-icon><span>欢迎您，{{ username }}</span>
      </li>
    </ul>
    <el-drawer v-model="drawer" :with-header="false" custom-class="backend-nav-drawer" append-to-body direction="ltr" :size="300">
      <backend-menu :inDrawer="true"></backend-menu>
    </el-drawer>
  </div>
</template>

<script>
import { User, Setting, Share, Notification, Operation, HomeFilled } from '@element-plus/icons';
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import BackendMenu from '../Aside/Menu.vue';

export default {
  name: 'BackendHeader',
  components: {
    Notification,
    User,
    Setting,
    Share,
    Operation,
    HomeFilled,
    BackendMenu,
  },
  setup() {
    const drawer = ref(false);
    const store = useStore();
    const goHome = () => {
      window.open('/', '_blank');
    };
    return {
      drawer,
      goHome,
      username: computed(() => store.getters.username),
    };
  },
};
</script>

<style lang="scss">
.backend-nav-drawer {
  background-color: var(--backend-aside-bg-color);
  color: var(--el-text-color-primary);

  .el-drawer__body {
    overflow-x: hidden;
    overflow-y: auto;
  }

  .el-drawer__body::-webkit-scrollbar {
    width: 4px;
    height: 1px;
  }

  .el-drawer__body::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background-color: rgba(144, 147, 153, 0.5);
  }

  .el-drawer__body::-webkit-scrollbar-track {
    box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.5);
    background: transparent;
  }
}
</style>

<style scoped>
.header-title {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  color: #f2f6fc;
}

.header-open:hover {
  cursor: pointer;
}

.header-open {
  padding: 10px;
}

.header-nav {
  color: white;
  font-size: 14px;
}

.pr5 {
  padding-right: 5px;
}
</style>
