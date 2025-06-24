import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueECharts from 'vue-echarts'
import * as echarts from 'echarts'

const app = createApp(App)

app.use(ElementPlus)
app.component('v-chart', VueECharts)

app.mount('#app')
