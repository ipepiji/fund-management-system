import { createApp } from 'vue'

import App from './App.vue'
import router from './routes'
import '@/assets/main.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
