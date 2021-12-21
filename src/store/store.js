import Vuex from "vuex"
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    privateMessage: ''
  },
  //以同步的方法存取
  mutations: {
    launchChat(state, id) {
      console.log(id)
      state.privateMessage = id
    }
  }
})
