import Vue3VideoPlayer from '@cloudgeek/vue3-video-player';
import '@cloudgeek/vue3-video-player/dist/vue3-video-player.css';

const config = {
  lang: 'zh-CN',
};

export default app => {
  app.use(Vue3VideoPlayer, config);
};
