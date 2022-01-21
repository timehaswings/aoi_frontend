<template>
  <el-menu
    mode="vertical"
    background-color="transparent"
    :collapse="isCollapse"
    :collapse-transition="false"
    :unique-opened="true"
    :default-active="active"
    router
  >
    <menu-item :nav-list="backendNav"></menu-item>
  </el-menu>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import MenuItem from '@/components/MenuItem/Index.vue';

export default {
  name: 'BackendMenu',
  components: { MenuItem },
  props: {
    inDrawer: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const store = useStore();
    const route = useRoute();
    const active = ref(route.path);
    const backendNav = computed(() => {
      return store.getters.backendMenu;
    });
    return {
      active,
      backendNav,
      isCollapse: computed(() => {
        if (props.inDrawer) {
          return false;
        }
        return store.state.common.isCollapse;
      }),
    };
  },
};
</script>

<style scoped>
.el-menu {
  border-right: none;
}
</style>
