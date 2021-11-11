import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './axios'
import installElementPlus from './plugins/element'
import './assets/css/app.css'


const app = createApp(App)
app.config.globalProperties.$api = api;
installElementPlus(app)

app.use(router).use(store).mount('#app')
