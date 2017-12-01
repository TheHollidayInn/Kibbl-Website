import Vuex from 'vuex'

export default function () {
  const store = new Vuex.Store({
    state: {
      token: ''
    },
    mutations: {
      setToken (state, token) {
        state.token = token
      }
    }
  })
  return store
}
