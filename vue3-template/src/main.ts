import { createApp, Directive } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import { loadAllPlugins } from './plugins'
import './permission'
import * as directives from './directive'

// import '@/styles/element-variables.scss'
import '@/styles/index.scss'

const app = createApp(App)
console.log(xxxx)

// 加载所有插件
loadAllPlugins(app)

// 自定义指令
Object.keys(directives).forEach((key) => {
  app.directive(key, (directives as { [key: string]: Directive })[key])
})

app.use(store).use(router).mount('#app')
