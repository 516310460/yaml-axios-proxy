import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

const createStore = () => {
  return new Vuex.Store({
    state: {
      locales: ['zh-CN', 'zh-TW', 'en-US'],
      locale: 'zh-CN',
      token: '',
      authUser: null,
      UserInfo: '', // 用户信息
      FixPirce: '', // 一口价
      CoinInfo: '',// 币种信息
      isMaintain: false,//是否是维护页面
    },
    mutations,
    actions
  })
}

export default createStore
