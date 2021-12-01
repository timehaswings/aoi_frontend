import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import api from './axios';
import installElementPlus from './plugins/element';
import 'xe-utils';
import VXETable from 'vxe-table';
import 'default-passive-events';
import 'vxe-table/lib/style.css';
import 'normalize.css/normalize.css';
import 'animate.css';
import './assets/css/app.css';

const app = createApp(App);
app.config.globalProperties.$api = api;
installElementPlus(app);

app.use(VXETable);

app.use(router).use(store).mount('#app');
