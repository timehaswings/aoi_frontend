import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import api from './axios';
import installElementPlus from './plugins/element';
import videoPlayerPlus from './plugins/videoPlayer';
import tips from './plugins/tips';
import auth from './directives/auth';
// import mock from './mock';
import masonryPlus from './plugins/masonry';
import 'xe-utils';
import VXETable from 'vxe-table';
import 'vxe-table/lib/style.css';
import 'normalize.css/normalize.css';
import 'animate.css';
import './assets/css/app.css';

const app = createApp(App);
app.config.globalProperties.$api = api;

// 加载插件
installElementPlus(app);
videoPlayerPlus(app);
masonryPlus(app);
tips(app);

// 启用mock
// if (import.meta.env.MODE === 'development') {
//   mock.start();
// }

// 加载指令
auth(app);

app.use(VXETable);

app.use(router).use(store).mount('#app');
