<template>
  <div class="error-page">
    <div class="error-code">4<span>0</span>4</div>
    <div class="error-desc">啊哦~ 你所访问的页面不存在</div>
    <div class="error-handle">
      <router-link to="/">
        <el-button type="primary" size="large">返回首页</el-button>
      </router-link>
      <el-button type="primary" class="error-btn" size="large" @click="goBack">返回上一页</el-button>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
  name: '404',
  setup() {
    const router = useRouter();
    const goBack = () => {
      router.go(-1);
    };
    return {
      goBack,
    };
  },
};
</script>

<style scoped>
.error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: var(--default-bg-color);
  box-sizing: border-box;
}
.error-code {
  line-height: 1;
  font-size: 240px;
  font-weight: bolder;
  color: #2d8cf0;
}
.error-code span {
  color: var(--el-color-error);
}
.error-desc {
  font-size: 30px;
  color: #777;
}
.error-handle {
  margin-top: 30px;
  padding-bottom: 200px;
}
.error-btn {
  margin-left: 100px;
}
</style>
