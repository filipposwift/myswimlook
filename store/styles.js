import { createClient } from '@/plugins/contentful'

export const state = () => ({
  data: null,
  privacy: null,
  homeGallery: null,
})

export const getters = {
  getStyles(state) {
    return state.data.map(({ fields }) => ({
      name: fields.name,
      slug: fields.slug,
      description: fields.description,
      image: fields.image,
    }))
  },
}

export const mutations = {
  updateData: (state, payload) => {
    state.data = payload
  },
  updatePrivacy: (state, payload) => {
    state.privacy = payload
  },
  updateGallery: (state, payload) => {
    state.homeGallery = payload
  },
}

export const actions = {
  async init({ commit }) {
    try {
      const client = createClient()
      const response = await client.getEntries({
        content_type: 'homeGallery',
      })

      if (response.items.length > 0) commit('updateGallery', response.items)
    } catch (err) {
      console.error(err)
    }
    try {
      const client = createClient()
      const response = await client.getEntries({
        content_type: 'provaStyles',
        include: 10,
      })

      if (response.items.length > 0) commit('updateData', response.items)
    } catch (err) {
      console.error(err)
    }
    try {
      const client = createClient()
      const response = await client.getEntries({
        content_type: 'privacyText',
      })

      if (response.items.length > 0) commit('updatePrivacy', response.items)
    } catch (err) {
      console.error(err)
    }
  },
}
