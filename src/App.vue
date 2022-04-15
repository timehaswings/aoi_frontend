<template>
  <router-view />
</template>

<script>
import { onBeforeMount } from 'vue';
import { useStore } from 'vuex';
export default {
  setup() {
    const store = useStore();
    // 设置主题
    onBeforeMount(() => {
      const docStyle = document.body.style;
      for (let theme of store.getters.getThemeList) {
        docStyle.setProperty(theme.property, theme.value);
      }
    });
  },
};
</script>
