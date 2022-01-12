import { createClient } from '@/plugins/contentful'

export const state = () => ({
  data: null,
})

export const getters = {
  getItems: (state) => {
    return state.data.map(({ items }) => ({
      items: items.map((el) => el.fields),
    }))
  },
  getNewItems: (state) => {
    const temp = state.data.map(({ items }) => ({
      items: items.map((el) => el.fields),
    }))
    const newtemp = temp.flatMap((el) => el.items)
    return newtemp
  },
  getDesigners: (state) => {
    return state.data.map(({ name, slug, description, featured }) => ({
      name,
      slug,
      description,
      featured,
    }))
  },
}

export const mutations = {
  updateValue: (state, payload) => {
    state.data = payload
  },
}

export const actions = {
  async init({ commit }) {
    try {
      const client = createClient()
      const response = await client.getEntries({
        content_type: 'designers',
        include: 10,
      })

      if (!response.total) {
        return
      }

      const fields = response.items.map(({ fields }) => ({
        name: fields.name,
        slug: fields.slug,
        featured: fields.featured,
        description: fields.description,
        website: fields.website,
        logo: fields.logo,
        items: fields.swimsuit,
      }))

      commit('updateValue', fields)
    } catch (err) {
      console.error(err)
    }
  },
}
