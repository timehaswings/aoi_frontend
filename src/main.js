import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import './assets/css/app.css'


const app = createApp(App)
installElementPlus(app)

app.use(router).use(store).mount('#app')
