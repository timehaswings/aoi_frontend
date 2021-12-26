<template>
  <el-menu
    mode="vertical"
    background-color="transparent"
    :collapse="isCollapse"
    :collapse-transition="false"
    :unique-opened="true"
    :default-active="active"
    router
  >
    <el-menu-item index="/backend">
      <i class="el-icon-menu"></i>
      <span>数据统计</span>
    </el-menu-item>
    <el-sub-menu index="#">
      <template #title>
        <i class="el-icon-location"></i>
        <span>视频管理</span>
      </template>
      <el-menu-item index="/backend/video">视频管理</el-menu-item>
      <el-menu-item index="/backend/tag">标签管理</el-menu-item>
      <el-menu-item index="/backend/category">分类管理</el-menu-item>
      <el-menu-item index="/backend/comment">评论管理</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="#">
      <template #title>
        <i class="el-icon-location"></i>
        <span>用户管理</span>
      </template>
      <el-menu-item index="/backend/user">用户管理</el-menu-item>
      <el-menu-item index="/backend/group">组别管理</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="#">
      <template #title>
        <i class="el-icon-location"></i>
        <span>页面管理</span>
      </template>
      <el-menu-item index="/backend/menu">菜单管理</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="#">
      <template #title>
        <i class="el-icon-location"></i>
        <span>系统管理</span>
      </template>
      <el-menu-item index="/backend/config">常量配置</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';

export default {
  name: 'BackendMenu',
  props: {
    inDrawer: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const store = useStore();
    const route = useRoute();
    const active = ref(route.path);
    return {
      active,
      isCollapse: computed(() => {
        if (props.inDrawer) {
          return false;
        }
        return store.state.common.isCollapse;
      }),
    };
  },
};
</script>

<style scoped>
.el-menu {
  border-right: none;
}
</style>
