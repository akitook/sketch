export const state = () => ({
  width: 0,
  height: 0,
  containerWidth: 0
})

export const actions = {
  init({ commit }) {
    if (process.client) {
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight
      commit('SET_WINDOW_SIZE', { width: windowWidth, height: windowHeight })
    }
  }
}

export const getters = {
  getContainerWidth: state => {
    return state.width < 376 ? state.width * 0.75 : state.width * 0.55
  }
}

export const mutations = {
  SET_WINDOW_SIZE(state, size) {
    state.width = size.windowWidth
    state.height = size.windowHeight
  }
}
