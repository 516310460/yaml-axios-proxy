export default function ({ app, store, route, params, error, redirect, res }) {
  // const UrlPathArray = route.path.split('/')[1]
  // const UrlPathArrayState = UrlPathArray.includes('-')
  // let url = ''
  // if (!route.path.includes(`/${store.state.locale}`) && store.state.locale !== app.i18n.fallbackLocale) {
  //   if (UrlPathArrayState) {
  //     url = route.path.replace(UrlPathArray, store.state.locale)
  //   } else {
  //     url = `/${store.state.locale}${route.path}`
  //   }
  //   return redirect(url)
  // } else {
  //   if (UrlPathArrayState) {
  //     return
  //   } else {
  //     url = `/${store.state.locale}${route.path}`
  //   }
  //   return redirect(url)
  // }
}
