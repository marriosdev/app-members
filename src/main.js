import 'mosha-vue-toastify/dist/style.css'
import './assets/main.css'
import 'vuetify/styles'
import "bootstrap-icons/font/bootstrap-icons.css";
import 'mosha-vue-toastify/dist/style.css'

import router from './router'
import {ref, createApp } from 'vue'
import App from './App.vue'
import api from './services/api'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})

const app = createApp(App)

const loading = ref(false)

app.use(loading)
app.use(router)
app.use(vuetify)
app.use(api)
app.mount('#app')
