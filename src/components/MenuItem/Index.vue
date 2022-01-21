<template>
  <template v-for="nav in navList" :key="nav.id">
    <el-menu-item v-if="nav.isLeaf" :index="nav.path">
      <i v-if="nav.icon && nav.icon.startsWith('el-icon-')" :class="[nav.icon, 'icon']"></i>
      <fa-icon v-if="nav.icon && nav.icon.startsWith('fa')" class="icon" :icon="nav.icon.split(/\s+/)"></fa-icon>
      {{ nav.name }}
    </el-menu-item>
    <el-sub-menu v-else :index="'#' + nav.id">
      <template #title>
        <i v-if="nav.icon && nav.icon.startsWith('el-icon-')" :class="[nav.icon, 'icon']"></i>
        <fa-icon v-if="nav.icon && nav.icon.startsWith('fa')" class="icon" :icon="nav.icon.split(/\s+/)"></fa-icon>
        {{ nav.name }}
      </template>
      <template v-for="subNav in nav.children" :key="subNav.id">
        <el-menu-item v-if="subNav.isLeaf" :index="subNav.path">
          <i v-if="subNav.icon && subNav.icon.startsWith('el-icon-')" :class="[subNav.icon, 'icon']"></i>
          <fa-icon
            v-if="subNav.icon && subNav.icon.startsWith('fa')"
            class="icon"
            :icon="subNav.icon.split(/\s+/)"
          ></fa-icon>
          {{ subNav.name }}
        </el-menu-item>
        <el-sub-menu v-else :index="'#' + subNav.id">
          <template #title>
            <i v-if="subNav.icon && subNav.icon.startsWith('el-icon-')" :class="[subNav.icon, 'icon']"></i>
            <fa-icon
              v-if="subNav.icon && subNav.icon.startsWith('fa')"
              class="icon"
              :icon="subNav.icon.split(/\s+/)"
            ></fa-icon>
            {{ subNav.name }}
          </template>
          <template v-for="grandNav in subNav.children" :key="grandNav.id">
            <el-menu-item v-if="grandNav.isLeaf" :index="grandNav.path">
              <i v-if="grandNav.icon && grandNav.icon.startsWith('el-icon-')" :class="[grandNav.icon, 'icon']"></i>
              <fa-icon
                v-if="grandNav.icon && grandNav.icon.startsWith('fa')"
                class="icon"
                :icon="grandNav.icon.split(/\s+/)"
              ></fa-icon>
              {{ grandNav.name }}
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-sub-menu>
  </template>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    navList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
};
</script>
