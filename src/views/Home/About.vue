<template>
  <div class="animate__animated animate__bounceInLeft">
    <span>dsds</span>
    <el-button type="primary" @click="add">Primary--{{ number }}</el-button>
    <div ref="test" class="test">kk</div>
    <div class="text">llllllll</div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { test } from '../../axios/modules/test';

export default {
  name: 'About',
  setup(props) {
    const test = ref(null);
    const number = ref(0);
    const color = ref('red');
    const add = () => {
      // number.value += 1;
      // console.log(document.documentElement.style);
      // console.log(getComputedStyle(document.documentElement).getPropertyValue('--default-bg-color'));
      // document.documentElement.style.setProperty('--default-bg-color', 'green');
      // console.log(test.value.style['background-color']);
      // console.log(getComputedStyle(test.value).getPropertyValue('background-color'));
      // test.value.style.setProperty('background-color', 'var(--light-bg-color)');
      color.value = 'green';
    };
    onMounted(() => {});
    return {
      number,
      add,
      test,
      color,
    };
  },
};
</script>

<style scoped>
.router_animate-enter-active {
  animation: rollIn 1s;
}
.router_animate-leave-active {
  animation: rollOut 0.6s;
}
.test {
  background-color: var(--default-bg-color);
}

.text {
  color: v-bind(color);
}
</style>
