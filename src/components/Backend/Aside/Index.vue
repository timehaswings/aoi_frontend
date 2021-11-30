<template>
  <div class="aside-wrapper">
    <div class="aside-logo">
      <el-avatar :size="logoSize" :src="circleUrl" fit="cover" class="v-middle"></el-avatar>
    </div>
    <div style="flex: 1; overflow: auto">
      <el-menu
        mode="vertical"
        background-color="transparent"
        :collapse="isCollapse"
        :collapse-transition="false"
        :unique-opened="true"
        default-active="2"
      >
        <el-sub-menu index="1">
          <template #title>
            <i class="el-icon-location"></i>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group>
            <template #title><span>Group One</span></template>
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title><span>item four</span></template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <template #title>Navigator Two</template>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <template #title>Navigator Three</template>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <template #title>Navigator Four</template>
        </el-menu-item>
      </el-menu>
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

export default {
  name: 'BackendAside',
  components: {
    DArrowLeft,
    DArrowRight,
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

.el-menu {
  border-right: none;
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
  font-size: 14px;
  letter-spacing: 2px;
  vertical-align: middle;
}
</style>
