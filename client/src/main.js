import { createApp } from 'vue'
import { createPinia } from 'pinia'
import store from './stores/index.js'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"



import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(store)
app.use(router)

app.mount('#app')


