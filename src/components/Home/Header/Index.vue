<template>
  <div class="left-right-wrapper">
    <div style="display: inline-block">LOGO</div>
    <el-menu :default-active="active" mode="horizontal" background-color="transparent" active-text-color="#757575" :ellipsis="false" router>
      <el-menu-item v-for="item in menus" :key="item.route" v-show="item.show" :index="item.route"
        ><component :is="item.icon" class="icon"></component>{{ item.name }}</el-menu-item
      >
    </el-menu>
  </div>
</template>

<script>
import { Grid, HomeFilled, UserFilled, Briefcase, HelpFilled } from '@element-plus/icons';
import { useRoute } from 'vue-router';
import { ref } from 'vue';

export default {
  name: 'HomeHeader',
  components: {
    Grid,
    HomeFilled,
    UserFilled,
    Briefcase,
    HelpFilled,
  },
  setup() {
    const route = useRoute();
    const active = ref(route.path);
    const menus = ref([
      { route: '/', name: '主 页', icon: HomeFilled, show: true },
      { route: '/category', name: '分 类', icon: Grid, show: true },
      { route: '/member', name: '会员福利', icon: Briefcase, show: true },
      { route: '/about', name: '关于我们', icon: HelpFilled, show: true },
      { route: '/personal', name: '个人中心', icon: UserFilled, show: true },
    ]);
    return {
      active,
      menus,
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
</style>
