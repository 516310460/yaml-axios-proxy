const mutations = {

  // 多种语言版本
  SET_LOCALES(state, locales) {
    state.locales = locales
  },

  SET_USER(state, user) {
    state.authUser = user
  },

  SET_ISMAINTAIN(state, isMaintain) {
    state.isMaintain = isMaintain
  },

  // 切换语言
  SET_LANG(state, locale) {
    // locales中存在相应的语言即设置其为locale
    if (state.locales.includes(locale)) {
      state.locale = locale
    }
  },

  // token值
  SET_TOKEN(state, token) {
    state.token = token
    if (!state.token) {
      state.UserInfo = ''
    }
  },

  // 用户信息
  SET_USERINFO(state, userinfo) {
    state.UserInfo = userinfo
  },

  // 一口价
  SET_FIXPIRCE(state, FixPirce) {
    state.FixPirce = FixPirce
  },

  // 币种信息
  SET_COININFO(state, CoinInfo) {
    state.CoinInfo = CoinInfo
  }

}

export default mutations
