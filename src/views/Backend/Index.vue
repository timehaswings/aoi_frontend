<template>
    <el-container class="wrapper">
      <el-aside class="backend-aside">
          <backend-aside></backend-aside>
      </el-aside>
      <el-container>
        <el-header>
            <backend-header></backend-header>
        </el-header>
        <el-main>
            <router-view/>
            <backend-footer></backend-footer>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
import BackendFooter from "../../components/Backend/Footer/Index.vue"
import BackendHeader from "../../components/Backend/Header/Index.vue"
import BackendAside from "../../components/Backend/Aside/Index.vue"

export default {
    components: { BackendFooter, BackendHeader, BackendAside }
}
</script>

<style scoped>

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  text-align: center;
  height: 60px;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: var(--el-text-color-primary);
  text-align: center;
  height: 100%;
}

.el-main {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
}

</style>