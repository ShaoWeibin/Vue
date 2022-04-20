/*
 * @Description: i18n国际化
 * @Author:
 */
import i18n from '@/locales'
export default function loadComponent(app: any) {
  app.use(i18n)
}
