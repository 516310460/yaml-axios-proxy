import axios from 'axios'
import qs from 'qs'
const actions = {
    nuxtServerInit({ commit }, { req }) {
      if (req.session) {
        if (req.session.authUser) {
          commit('SET_USER', req.session.authUser)
        }
        if (req.session.lan) {
          commit('SET_LANG', req.session.lan)
        }
      }
    },
    async language({commit}, params) {
      try {
        const postData = qs.stringify(params)
        const { data } = await axios.post('http://localhost:3000/api/language', postData)
        // const { data } = await axios.post('/api/language', postData)
        commit('SET_LANG', data)
      } catch (error) {
        if (error.response && error.response.status === 401) {
          throw new Error('Bad credentials')
        }
        throw error
      }
    },

    async login({ commit }, params) {
      try {
        const postData = qs.stringify(params)
        const { data } = await axios.post('http://localhost:3000/api/login', postData)
        // const { data } = await axios.post('/api/login', postData)
        commit('SET_USER', data)
      } catch (error) {
        if (error.response && error.response.status === 401) {
          throw new Error('Bad credentials')
        }
        throw error
      }
    },
  
    async logout({ commit }) {
      await axios.post('http://localhost:3000/api/logout')
      // await axios.post('/api/logout')
      commit('SET_USER', null)
    }
  
}

export default actions
