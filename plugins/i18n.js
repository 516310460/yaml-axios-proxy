import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Element from 'element-ui'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import twLocale from 'element-ui/lib/locale/lang/zh-TW'
import zhCN from '~/locales/zh-CN.js'
import zhTW from '~/locales/zh-TW.js'
import enUS from '~/locales/en-US.js'

Vue.use(VueI18n)

export default ({ app, store, route }) => {
  app.i18n = new VueI18n({
    locale: store.state.locale,
    fallbackLocale: 'zh-CN',
    messages: {
      'zh-CN': Object.assign(zhCN, zhLocale),
      'zh-TW': Object.assign(zhTW, twLocale),
      'en-US': Object.assign(enUS, enLocale)
    }
  })

  Vue.use(Element, {
    i18n: (key, value) => app.i18n.t(key, value)
  })

  app.i18n.getPath = (link) => {
    return `/${app.i18n.locale}${link}`
  }

  store.commit('SET_LOCALES', Object.keys(app.i18n.messages))

  // 切换路由时进行跳转
  store.watch(state => state.locale, (value) => {
    app.i18n.locale = value
  })
}
