import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import api from './axios';
import installElementPlus from './plugins/element';
import animate from 'animate.css';
import 'normalize.css/normalize.css';
import './assets/css/app.css';
// import 'animate.css/animate.min.css';

const app = createApp(App);
app.config.globalProperties.$api = api;
installElementPlus(app);

app.use(router).use(store).use(animate).mount('#app');
