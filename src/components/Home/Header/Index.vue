<template>
  <div class="left-right-wrapper">
    <div class="logo-wrapper">
      <el-avatar :size="36" :src="logo" fit="cover"></el-avatar>
    </div>
    <el-menu :default-active="active" mode="horizontal" background-color="transparent" active-text-color="#757575" :ellipsis="false" router>
      <el-menu-item v-for="item in menus" :key="item.route" v-show="item.show" :index="item.route"
        ><component :is="icons[item.icon]" class="icon"></component>{{ item.name }}</el-menu-item
      >
      <el-sub-menu index="#">
        <template #title><component :is="icons['user-filled']" class="icon"></component>下午好，周杰伦</template>
        <el-menu-item index="/personal">个人中心</el-menu-item>
        <el-menu-item index="/logout">退出登录</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script>
import { Grid, HomeFilled, UserFilled, Briefcase, HelpFilled } from '@element-plus/icons';
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
      'user-filled': UserFilled,
      briefcase: Briefcase,
      'help-filled': HelpFilled,
    });
    const menus = ref([
      { route: '/', name: '主 页', icon: 'home-filled', show: true },
      { route: '/category', name: '分 类', icon: 'grid', show: true },
      { route: '/member', name: '会员福利', icon: 'briefcase', show: true },
      { route: '/about', name: '关于我们', icon: 'help-filled', show: true },
    ]);
    return {
      active,
      menus,
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
