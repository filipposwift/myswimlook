export const state = () => ({})

export const getters = {}

export const mutations = {}

export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('data/init')
    await dispatch('styles/init')
    await dispatch('stories/init')
    await dispatch('people/init')
  },
}
