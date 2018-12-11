export default {
  state: {
    userInfo: {}
  },
  mutations: {
    SET_USER(state , userInfo){
      state.userInfo = userInfo
    }
  },
  actions: {
    setUser({commit}, userInfo){
      commit('SET_USER', userInfo)
    }
  }
}