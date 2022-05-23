import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'virtual:windi.css'
import router from './router'
import App from './App.vue'

const app = createApp(App)

app
  .use(createPinia())
  .use(router)
  .mount('#app')
