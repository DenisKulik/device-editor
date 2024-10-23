import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Material from '@primevue/themes/material'
import ConfirmationService from 'primevue/confirmationservice'

import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import 'primeflex/themes/primeone-dark.css'
import './assets/main.css'

const app = createApp(App)

app.use(ConfirmationService)
app.use(PrimeVue, {
  theme: {
    preset: Material
  }
})

app.mount('#app')
