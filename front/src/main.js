import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueApexCharts from "vue3-apexcharts";
import VueGoogleMaps from 'vue-google-maps-community-fork'

import App from './App.vue'
import router from './router'
import DashboardLayout from "./components/DashboardLayout.vue";

import './assets/index.css';
const app = createApp(App)

app.component("default-layout", DashboardLayout);

app.use(createPinia())
app.use(router)
app.use(VueApexCharts)
app.use(VueGoogleMaps, {
    load: {
        key: 'xxxxxxxxxx',
        libraries: 'places',
    },
})
app.mount('#app')
