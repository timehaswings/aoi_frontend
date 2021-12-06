<template>
  <div class="left-right-wrapper">
    <div style="display: inline-block">LOGO</div>
    <el-menu class="el-menu-demo" mode="horizontal" background-color="transparent" active-text-color="#fff" :ellipsis="false" router>
      <el-menu-item index="/"><home-filled class="icon" />主 页</el-menu-item>
      <el-menu-item index="/category"><grid class="icon" />分 类</el-menu-item>
      <el-menu-item index="/member"><briefcase class="icon" />会员福利</el-menu-item>
      <el-menu-item index="/about"><help-filled class="icon" />关于我们</el-menu-item>
      <el-menu-item index="/personal"><user-filled class="icon" />个人中心</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { Grid, HomeFilled, UserFilled, Briefcase, HelpFilled } from '@element-plus/icons';

export default {
  name: 'HomeHeader',
  components: {
    Grid,
    HomeFilled,
    UserFilled,
    Briefcase,
    HelpFilled,
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
