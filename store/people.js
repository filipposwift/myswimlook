import { createClient } from '@/plugins/contentful'

export const state = () => ({
  data: null,
})

export const getters = {}

export const mutations = {
  updateData: (state, payload) => {
    state.data = payload.sort(function (a, b) {
      return Math.random() * 2 - 1
    })
  },
}

export const actions = {
  async init({ commit }) {
    try {
      const client = createClient()
      const response = await client.getEntries({
        content_type: 'people',
      })

      if (!response.total) {
        return
      }

      const fields = response.items.map(({ fields }) => ({
        name: fields.title,
        slug: fields.slug,
        description: fields.description,
        socialMedia: fields.socialMedia,
      }))

      commit('updateData', fields)
    } catch (err) {
      console.log(err)
    }
  },
}
