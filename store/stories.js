import { createClient } from '@/plugins/contentful'

export const state = () => ({
  story: null,
})

export const getters = {}

export const mutations = {
  updateData: (state, payload) => {
    state.story = payload
  },
}

export const actions = {
  async init({ commit }) {
    try {
      const client = createClient()
      const response = await client.getEntries({
        content_type: 'stories',
        include: 10,
      })

      if (response.items.length > 0) commit('updateData', response.items)
    } catch (err) {
      console.error(err)
    }
  },
}
