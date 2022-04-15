<template>
  <el-container class="wrapper">
    <el-header>
      <home-header></home-header>
    </el-header>
    <el-main>
      <router-view />
      <home-footer></home-footer>
      <el-backtop target=".el-main" />
    </el-main>
  </el-container>
</template>

<script>
import HomeHeader from '../components/Home/Header/Index.vue';
import HomeFooter from '../components/Home/Footer/Index.vue';

export default {
  name: 'Index',
  components: { HomeHeader, HomeFooter },
};
</script>

<style scoped>
.el-header,
.el-footer {
  background-color: var(--home-header-bg-color);
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: var(--home-header-height);
}

.el-main {
  background-color: var(--home-main-bg-color);
  color: var(--el-text-color-primary);
  padding-bottom: 0;
  font-size: 14px;
}
</style>
