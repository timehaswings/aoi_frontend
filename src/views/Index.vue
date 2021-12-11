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
import HomeIndex from './Home/Index.vue';

export default {
  name: 'Index',
  components: { HomeHeader, HomeFooter, HomeIndex },
};
</script>

<style scoped>
.el-header,
.el-footer {
  background-color: #90a4b7;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: #fafafa;
  color: var(--el-text-color-primary);
  padding-bottom: 0;
}
</style>
