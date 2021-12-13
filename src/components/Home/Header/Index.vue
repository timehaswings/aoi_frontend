<template>
  <div class="left-right-wrapper">
    <div class="logo-wrapper">
      <el-avatar :size="36" :src="logo" fit="cover"></el-avatar>
    </div>
    <el-menu :default-active="active" mode="horizontal" background-color="transparent" active-text-color="#757575" :ellipsis="false" router>
      <el-menu-item index="/"><component :is="icons['home-filled']" class="icon"></component> 主页</el-menu-item>
      <el-menu-item index="/category"><component :is="icons['grid']" class="icon"></component> 分类</el-menu-item>
      <el-menu-item index="/member"><component :is="icons['briefcase']" class="icon"></component> 会员</el-menu-item>
      <el-menu-item index="/about"><component :is="icons['help-filled']" class="icon"></component> 关于</el-menu-item>
      <el-sub-menu index="#">
        <template #title>下午好，周杰伦</template>
        <el-menu-item index="/personal"><component :is="icons['user']" class="icon"></component> 个人中心</el-menu-item>
        <el-menu-item index="/logout"><component :is="icons['position']" class="icon"></component> 退出登录</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script>
import { Grid, HomeFilled, User, Briefcase, HelpFilled, Position } from '@element-plus/icons';
import logo from '@/assets/logo.ico';
import { useRoute } from 'vue-router';
import { ref, shallowRef } from 'vue';

export default {
  name: 'HomeHeader',
  setup() {
    const route = useRoute();
    const active = ref(route.path);
    const icons = shallowRef({
      grid: Grid,
      'home-filled': HomeFilled,
      'user': User,
      briefcase: Briefcase,
      'help-filled': HelpFilled,
      'position': Position,
    });
    return {
      active,
      icons,
      logo,
    };
  },
};
</script>

<style scoped>
.icon {
  width: 1.125em;
  height: 1.125em;
  margin-right: 5px;
}

.logo-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.el-avatar {
  --el-avatar-background-color: transparent;
}
</style>
