/*
 * @Description: element 组件
 * @Author:
 */

/**
 *  系统的全局设置size，全部加载方便设置。
 *  如需按需加载:
 *  1.放开注释
 *  2.引入babel-plugin-component库
 *  3.放开babel.config 注释
 */
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import i18n from '@/locales'
import { useStore } from '@/store'
export default function loadComponent(app: any) {
  app.use(ElementPlus, { size: useStore().state.app.size, i18n: i18n.global.t, locale: zhCn })

  // app.config.globalProperties.$message = ElMessage
}
