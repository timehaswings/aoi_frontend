<template>
  <div class="aside-wrapper">
    <div class="aside-logo">
      <el-avatar :size="logoSize" :src="circleUrl" fit="cover" class="v-middle"></el-avatar>
    </div>
    <div class="nav-container">
      <backend-menu></backend-menu>
    </div>
    <div class="aside-footer" @click="toggleCollapse">
      <el-icon :size="14" class="v-middle">
        <d-arrow-left v-if="!isCollapse" />
        <d-arrow-right v-else />
      </el-icon>
      <span v-if="!isCollapse" class="footer-text">折叠侧边栏</span>
    </div>
  </div>
</template>

<script>
import { DArrowLeft, DArrowRight } from '@element-plus/icons';
import { reactive, computed, toRefs } from 'vue';
import { useStore } from 'vuex';
import BackendMenu from './Menu.vue';

export default {
  name: 'BackendAside',
  components: {
    DArrowLeft,
    DArrowRight,
    BackendMenu,
  },
  setup() {
    const store = useStore();
    const state = reactive({
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      toggleCollapse() {
        store.commit('TOGGLE');
      },
    });
    return {
      isCollapse: computed(() => store.state.common.isCollapse),
      logoSize: computed(() => (store.state.common.isCollapse ? 36 : 54)),
      ...toRefs(state),
    };
  },
};
</script>

<style scoped>
.aside-wrapper {
  display: flex;
  flex-flow: column;
  height: 100%;
  overflow: hidden;
}

.aside-logo {
  text-align: center;
  padding: 20px 0;
}

.nav-container {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}

.nav-container::-webkit-scrollbar {
  width: 4px;
  height: 1px;
}

.nav-container::-webkit-scrollbar-thumb {
  border-radius: 2px;
  background-color: rgba(144, 147, 153, 0.5);
}

.nav-container::-webkit-scrollbar-track {
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.5);
  background: transparent;
}

.aside-footer {
  height: var(--aside-footer-height);
  line-height: var(--aside-footer-height);
  color: var(--el-text-color-regular);
  border-top: 1px solid white;
  text-align: center;
  cursor: pointer;
}

.aside-footer:hover {
  background-color: var(--backend-header-bg-color);
}

.footer-text {
  margin-left: 15px;
  font-size: 12px;
  letter-spacing: 2px;
  vertical-align: middle;
}
</style>
