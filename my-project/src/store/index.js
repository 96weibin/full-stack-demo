import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sid:'',
    activeName:'login'
  },
  mutations: {
    setSid(state,arg){
      state.sid = arg
    },
    setActiveName(state,arg){
      state.activeName = arg
    }
  },
  actions: {
  },
  modules: {
  }
})
