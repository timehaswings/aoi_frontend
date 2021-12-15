<template>
  <el-menu
    mode="vertical"
    background-color="transparent"
    :collapse="isCollapse"
    :collapse-transition="false"
    :unique-opened="true"
    default-active="2"
  >
    <el-sub-menu index="1">
      <template #title>
        <i class="el-icon-location"></i>
        <span>Navigator One</span>
      </template>
      <el-menu-item-group>
        <template #title><span>Group One</span></template>
        <el-menu-item index="1-1">item one</el-menu-item>
        <el-menu-item index="1-2">item two</el-menu-item>
        <el-menu-item index="1-1">item one</el-menu-item>
        <el-menu-item index="1-2">item two</el-menu-item>
        <el-menu-item index="1-1">item one</el-menu-item>
        <el-menu-item index="1-2">item two</el-menu-item>
        <el-menu-item index="1-1">item one</el-menu-item>
        <el-menu-item index="1-2">item two</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="Group Two">
        <el-menu-item index="1-3">item three</el-menu-item>
      </el-menu-item-group>
      <el-sub-menu index="1-4">
        <template #title><span>item four</span></template>
        <el-menu-item index="1-4-1">item one</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <template #title>Navigator Two</template>
    </el-menu-item>
    <el-menu-item index="3">
      <i class="el-icon-document"></i>
      <template #title>Navigator Three</template>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <template #title>Navigator Four</template>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'BackendMenu',
  props: {
    inDrawer: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const store = useStore();
    return {
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
