<template>
  <el-container class="wrapper">
    <el-aside :class="asideStyle">
      <backend-aside></backend-aside>
    </el-aside>
    <el-container>
      <el-header>
        <backend-header></backend-header>
      </el-header>
      <el-main>
        <router-view />
        <backend-footer></backend-footer>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import BackendFooter from '../../components/Backend/Footer/Index.vue';
import BackendHeader from '../../components/Backend/Header/Index.vue';
import BackendAside from '../../components/Backend/Aside/Index.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'BackendIndex',
  components: { BackendFooter, BackendHeader, BackendAside },
  setup() {
    const store = useStore();
    const asideStyle = computed(() => {
      return store.state.common.isCollapse ? 'backend-aside--collapse' : 'backend-aside';
    });
    return {
      asideStyle,
    };
  },
};
</script>

<style scoped>
.el-header,
.el-footer {
  background-color: var(--backend-header-bg-color);
  color: var(--el-text-color-primary);
}

.el-header {
  height: var(--header-height);
  line-height: var(--header-height);
}

.el-footer {
  height: var(--content-footer-height);
  line-height: var(--content-footer-height);
  text-align: center;
}

.el-aside {
  background-color: var(--backend-aside-bg-color);
  color: var(--el-text-color-primary);
  transition: width 0.3s, left 0.3s;
  height: 100%;
}

.el-main {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  transition: width 0.3s, left 0.3s;
}
</style>
