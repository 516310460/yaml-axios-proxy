import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
  createPersistedState({
    key: 'buybit',
    storage: window.localStorage
  })(store)
}
