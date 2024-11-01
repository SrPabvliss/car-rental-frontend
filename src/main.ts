import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
import Toast from 'vue-toastification'

import 'vue-toastification/dist/index.css'
import App from './App.vue'
import router from './router'

import './assets/index.css'

const app = createApp(App)
const pinia = createPinia()

const toastOptions = {
  position: 'top-right',
  timeout: 4000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false,
}

pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(Toast, toastOptions)

app.mount('#app')
