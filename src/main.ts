import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Material from '@primevue/themes/material'
import ConfirmationService from 'primevue/confirmationservice'

import Button from 'primevue/button'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import ConfirmDialog from 'primevue/confirmdialog'
import VirtualScroller from 'primevue/virtualscroller'

import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import 'primeflex/themes/primeone-dark.css'
import './assets/main.css'

const app = createApp(App)

app.component('app-button', Button)
app.component('app-card', Card)
app.component('app-input-text', InputText)
app.component('app-dialog', ConfirmDialog)
app.component('app-virtual-scroller', VirtualScroller)
app.use(ConfirmationService)
app.use(PrimeVue, {
  theme: {
    preset: Material,
  },
})

app.mount('#app')
