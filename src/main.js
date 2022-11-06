import mitt from 'mitt'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import './network/mockjs'
import Lazyload from 'vue-lazyload'
import Toaster from "@meforma/vue-toaster"

FastClick.attach(document.body)
const app = createApp(App)
app.config.globalProperties.$bus = new mitt();
app.use(Toaster).use(store).use(router).mount('#app');
app.use(Lazyload, {
  loading: require('assets/img/common/placeholder.png')
}) //也可以传一些参数引入，用于设置图片没有加载出来时候的占位图片
