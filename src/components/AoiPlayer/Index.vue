<template>
  <div class="player-container">
    <vue3-video-player
      ref="playerRef"
      :core="null"
      :muted="true"
      @play="onPlay"
      @pause="onPause"
      src="https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
      v-bind="$attrs"
    ></vue3-video-player>
  </div>
</template>

<script>
import HLSCore from '@cloudgeek/playcore-hls';
import { ref, onMounted } from 'vue';

export default {
  name: 'AoiPlayer',
  props: {
    height: {
      type: [String, Number],
      default: '420px',
    },
  },
  setup(props) {
    const playerRef = ref(null);
    const onPlay = (e) => {
      console.log('=== onPlay ===');
      console.log(e);
    };
    const onPause = (e) => {
      console.log('=== onPause ===');
      console.log(e);
    };
    onMounted(() => {
      console.log(playerRef);
    });
    return {
      HLSCore,
      playerRef,
      onPlay,
      onPause,
    };
  },
};
</script>

<style scoped>
.player-container {
  margin: 0;
  padding: 0;
  height: v-bind(height);
}
</style>
