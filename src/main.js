import mitt from 'mitt'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './network/mockjs'

const app = createApp(App)
app.config.globalProperties.$bus = new mitt();
app.use(store).use(router).mount('#app')

