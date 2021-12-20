<template>
  <div class="left-right-wrapper">
    <div class="logo-wrapper">
      <el-avatar :size="36" :src="logo" fit="cover"></el-avatar>
    </div>
    <el-menu
      :default-active="active"
      mode="horizontal"
      background-color="transparent"
      active-text-color="#757575"
      :ellipsis="false"
      router
    >
      <el-menu-item index="/">
        <component :is="icons['home-filled']" class="icon"></component>
        主页
      </el-menu-item>
      <el-menu-item index="/category">
        <component :is="icons['grid']" class="icon"></component>
        分类
      </el-menu-item>
      <el-menu-item index="/member">
        <component :is="icons['briefcase']" class="icon"></component>
        会员
      </el-menu-item>
      <el-menu-item index="/about">
        <component :is="icons['help-filled']" class="icon"></component>
        关于
      </el-menu-item>
      <el-menu-item v-if="!isLogin" index="/login">
        <component :is="icons['user']" class="icon"></component>
        登录
      </el-menu-item>
      <el-sub-menu v-else index="#">
        <template #title>{{ timeState() }}{{ username }}</template>
        <el-menu-item index="/personal">
          <component :is="icons['user']" class="icon"></component>
          个人中心
        </el-menu-item>
        <el-menu-item index="#" @click="goBackend">
          <component :is="icons['box']" class="icon"></component>
          后台管理
        </el-menu-item>
        <el-menu-item index="#" @click="logout">
          <component :is="icons['position']" class="icon"></component>
          退出登录
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script>
import { Grid, HomeFilled, User, Briefcase, HelpFilled, Position, Box } from '@element-plus/icons';
import logo from '@/assets/logo.ico';
import { useRouter, useRoute } from 'vue-router';
import { ref, shallowRef, computed, getCurrentInstance } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'HomeHeader',
  setup() {
    const { proxy } = getCurrentInstance();
    const route = useRoute();
    const active = ref(route.path);
    const store = useStore();
    const router = useRouter();
    const icons = shallowRef({
      grid: Grid,
      'home-filled': HomeFilled,
      user: User,
      briefcase: Briefcase,
      'help-filled': HelpFilled,
      position: Position,
      box: Box,
    });
    const logout = () => {
      proxy
        .$confirm('您确定要退出吗?', '退出登录', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
        .then(() => {
          store.commit('SET_TOKEN', null);
          store.commit('SET_USER', null);
          router.push('/');
        })
        .catch(() => {});
    };
    const goBackend = () => {
      window.open('/backend', '_blank');
    };
    const timeState = () => {
      const hours = new Date().getHours();
      if (hours >= 0 && hours <= 10) {
        return '早上好，';
      } else if (hours > 10 && hours <= 13) {
        return '中午好，';
      } else if (hours > 13 && hours <= 18) {
        return '下午好，';
      } else if (hours > 18 && hours <= 24) {
        return '晚上好，';
      }
    };
    return {
      active,
      icons,
      logo,
      isLogin: computed(() => store.getters.isLogin),
      username: computed(() => store.getters.username),
      goBackend,
      timeState,
      logout,
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
