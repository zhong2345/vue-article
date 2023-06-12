import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'
import * as Elicons from "@element-plus/icons-vue";
import ElementPlus from 'element-plus';
import { ElButton, ElIcon } from 'element-plus'
// import '@element-plus/icons'
import 'element-plus/dist/index.css'
//引入
// import {createPinia} from 'pinia'
import axios from './http/axios'
import pinia from './utils/pinia'
// import MyComponent from './components/MyComponent.vue'
//创建 Pinia实例

//createApp(App).mount('#app')
const app = createApp(App);//确保 _use_ 路由实例使整个应用支持路由。
// app.component("MyComponent",MyComponent)
// axios.defaults.baseURL = 'https://your.api.com/'; // 设置axios默认请求的url
// axios.defaults.headers.common['token'] = 'eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2ODg1Mjc4NDgsInN1YiI6IjQxNDA5MDI5N0BxcS5jb20iLCJpYXQiOjE2ODU5MzU4NDg5NTN9.sl6w2npKu3jyPb6F86fqbKEWq-ab1rqQ07Lekwczm2-yjm10EaZDzskzc4qv7La2z7fQyNq8yICkOqADrUrNQg';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
app.use(pinia)//挂载pinia 完成
app.use(router).use(ElButton).use(ElIcon).use(ElementPlus)// 挂载router,完成

for (const name in Elicons) {
    app.component(name, Elicons[name]);
  }
app.mount('#app');//挂在index.html
app.config.globalProperties.$axios=axios