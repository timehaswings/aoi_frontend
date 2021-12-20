<template>
  <div class="left-right-wrapper">
    <div class="header-title">
      <el-icon :size="22" class="header-open backend-open-nav" @click="drawer = true"><operation /></el-icon>
      <span style="margin-left: 5px">{{ $t('header.backendTitle') }}</span>
    </div>
    <ul class="horizontal-nav header-nav">
      <li @click="goHome">
        <el-icon :size="16" class="pr5"><home-filled /></el-icon>
        <span>{{ $t('header.home') }}</span>
      </li>
      <li>
        <el-icon :size="16" class="pr5"><share /></el-icon>
        <span>{{ $t('header.notify') }}</span>
      </li>
      <li>
        <el-popover placement="bottom" trigger="hover" :offset="-10">
          <div class="vertical-menu">
            <ul>
              <li @click="language('zh-cn')">中文</li>
              <li @click="language('en')">English</li>
            </ul>
          </div>
          <template #reference>
            <div class="flex-vh-center">
              <el-icon :size="16" class="pr5"><notification /></el-icon>
              <span>{{ $t('header.language') }}</span>
            </div>
          </template>
        </el-popover>
      </li>
      <li>
        <el-icon :size="16" class="pr5"><user /></el-icon>
        <span>{{ $t('header.welcome') }}{{ username }}</span>
      </li>
    </ul>
    <!-- 左侧导航栏 -->
    <el-drawer
      v-model="drawer"
      :with-header="false"
      custom-class="backend-nav-drawer"
      append-to-body
      direction="ltr"
      :size="280"
    >
      <backend-menu :in-drawer="true"></backend-menu>
    </el-drawer>
  </div>
</template>

<script>
import { User, Share, Notification, Operation, HomeFilled } from '@element-plus/icons';
import { ref, computed, getCurrentInstance } from 'vue';
import { useStore } from 'vuex';
import BackendMenu from '../Aside/Menu.vue';

export default {
  name: 'BackendHeader',
  components: {
    Notification,
    User,
    Share,
    Operation,
    HomeFilled,
    BackendMenu,
  },
  setup() {
    const store = useStore();
    const { proxy } = getCurrentInstance();
    const goHome = () => {
      window.open('/', '_blank');
    };
    const language = code => {
      if (proxy.$i18n.locale !== code) {
        proxy.$i18n.locale = code;
      }
    };
    return {
      drawer: ref(false),
      goHome,
      language,
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
