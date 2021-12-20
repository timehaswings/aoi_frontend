<template>
  <el-footer>{{ $t('footer.copyright') }}</el-footer>
</template>

<script>
export default {
  name: 'BackendFooter',
};
</script>

<style scoped>
.el-footer {
  color: var(--el-text-color-regular);
  text-align: center;
  margin-top: 25px;
  font-size: 14px;
  color: var(--el-text-color-regular);
}
</style>
