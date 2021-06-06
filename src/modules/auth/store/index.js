import {
  SET_AUTH,
  SET_TOKEN,
  SET_USER,
  REMOVE_AUTH,
  REMOVE_TOKEN,
  REMOVE_USER,
} from '@/modules/auth/store/mutation-types'

const state = {
  token: localStorage.getItem('token') || null,
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null,
}

const getters = {
  hasToken: (state) => !!state.token,
  userName: (state) => state.user && state.user.name,
}

const actions = {
  async [SET_AUTH]({ dispatch }, { token, user }) {
    await dispatch(SET_TOKEN, token)
    await dispatch(SET_USER, user)
  },
  [SET_TOKEN]({ commit }, token) {
    commit(SET_TOKEN, token)

    localStorage.setItem('token', token)
  },
  [SET_USER]({ commit }, user) {
    commit(SET_USER, user)

    localStorage.setItem('user', JSON.stringify(user))
  },

  async [REMOVE_AUTH]({ dispatch }) {
    await dispatch(REMOVE_TOKEN, null)
    await dispatch(REMOVE_USER, null)
  },
  [REMOVE_TOKEN]({ commit }, token) {
    commit(REMOVE_TOKEN, token)

    localStorage.removeItem('token')
  },
  [REMOVE_USER]({ commit }, user) {
    commit(REMOVE_USER, user)

    localStorage.removeItem('user')
  },
}

const mutations = {
  [SET_TOKEN](state, token) {
    state.token = token
  },
  [SET_USER](state, user) {
    state.user = user
  },

  [REMOVE_TOKEN](state, token) {
    state.token = token
  },
  [REMOVE_USER](state, user) {
    state.user = user
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
