import './assets/main.css'
import router from './router'
import { createApp } from 'vue'
import App from './App.vue'

import api from './services/api'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
    
})

import * as FaIcons from "oh-vue-icons/icons/fa"
import { OhVueIcon, addIcons } from "oh-vue-icons"
import { FaFlag, RiZhihuFill } from "oh-vue-icons/icons"

const Fa = Object.values({ ...FaIcons });
addIcons(Fa, FaFlag, RiZhihuFill);

const app = createApp(App)

app.component("v-icon", OhVueIcon)
app.use(router)
app.use(vuetify)
app.use(api)
app.mount('#app')






