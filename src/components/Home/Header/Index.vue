<template>
  <div class="left-right-wrapper">
    <div class="logo-wrapper">
      <el-avatar :size="36" :src="logo" fit="cover"></el-avatar>
      <span class="title">{{ $t('app.title') }}</span>
    </div>
    <el-menu
      :default-active="active"
      mode="horizontal"
      background-color="transparent"
      active-text-color="#757575"
      :ellipsis="false"
      router
    >
      <menu-item :nav-list="openNav"></menu-item>
      <el-menu-item v-if="!isLogin" index="/login">
        <component :is="icons['user']" class="icon"></component>
        登录
      </el-menu-item>
      <el-sub-menu v-else index="#">
        <template #title>{{ timeState() }}{{ username }}</template>
        <menu-item :nav-list="shrinkNav"></menu-item>
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
import MenuItem from '@/components/MenuItem/Index.vue';
import { useRouter, useRoute } from 'vue-router';
import { ref, shallowRef, computed, onMounted, getCurrentInstance } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'HomeHeader',
  components: { MenuItem },
  setup() {
    const { proxy } = getCurrentInstance();
    const route = useRoute();
    const active = ref(route.path);
    const store = useStore();
    const router = useRouter();
    const navLength = ref(5);
    const icons = shallowRef({
      grid: Grid,
      'home-filled': HomeFilled,
      user: User,
      briefcase: Briefcase,
      'help-filled': HelpFilled,
      position: Position,
      box: Box,
    });
    onMounted(() => {
      console.log(store.getters.backendMenu);
    });
    const openNav = computed(() => {
      const menus = store.getters.frontendMenu;
      if (navLength.value - 1 >= menus.length) {
        return menus;
      }
      return menus.slice(0, navLength.value - 1);
    });
    const shrinkNav = computed(() => {
      const menus = store.getters.frontendMenu;
      if (navLength.value - 1 >= menus.length) {
        return [];
      }
      return menus.slice(navLength.value - 1, menus.length - 1);
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
          store.commit('SET_PRIVATE_ROUTES', null);
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
      navLength,
      goBackend,
      timeState,
      logout,
      openNav,
      shrinkNav,
      isLogin: computed(() => store.getters.isLogin),
      username: computed(() => store.getters.username),
    };
  },
};
</script>

<style scoped>
.icon {
  width: 1em;
  height: 1em;
  margin-right: 10px;
}

.logo-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.title {
  font-size: 20px;
  margin-left: 10px;
}

.el-avatar {
  --el-avatar-background-color: transparent;
}
</style>
