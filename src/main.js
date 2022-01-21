import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import api from './axios';
import installElementPlus from './plugins/element';
import videoPlayerPlus from './plugins/videoPlayer';
import tips from './plugins/tips';
import fontAwesome from './plugins/fontawesome';
import errorMonitor from './plugins/errorMonitor';
import auth from './directives/auth';
import resize from './directives/resize';
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

errorMonitor.run();

// 加载插件
installElementPlus(app);
videoPlayerPlus(app);
masonryPlus(app);
tips(app);
fontAwesome(app);

// 启用mock
// if (import.meta.env.MODE === 'development') {
//   mock.start();
// }

// 加载指令
auth(app);
resize(app);

app.use(VXETable);

app.use(router).use(store).mount('#app');
