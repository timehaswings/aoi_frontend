<template>
  <div class="about"></div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'HomeAbout',
  setup(props) {
    const number = ref(0);
    const add = () => {
      // number.value += 1;
      // console.log(document.documentElement.style);
      // console.log(getComputedStyle(document.documentElement).getPropertyValue('--default-bg-color'));
      // document.documentElement.style.setProperty('--default-bg-color', 'green');
      // console.log(test.value.style['background-color']);
      // console.log(getComputedStyle(test.value).getPropertyValue('background-color'));
      // test.value.style.setProperty('background-color', 'var(--light-bg-color)');
      // color.value = 'green';
    };
    onMounted(() => {});
    return {
      number,
      add,
    };
  },
};
</script>

<style scoped>
.about {
  width: 100%;
  height: 100%;
  min-width: 1000px;
  z-index: -10;
  zoom: 1;
  background-color: #fff;
  background: url('@/assets/img/aboutbg.jpg');
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
}
</style>
