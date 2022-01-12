<template>
  <div class="page__wrapper person">
    <SocialHead
      :title="person.name"
      :description="person.description"
      :image="person.socialMedia[0].fields.image[0].secure_url"
    />
    <div class="person__intro">
      <div class="person__intro__left">
        <div class="person__intro__left-title">{{ person.name }}</div>
        <div class="person__intro__left-description">
          {{ person.description }}
        </div>
      </div>

      <figure class="person__image__media">
        <nuxt-img
          :src="person.socialMedia[0].fields.image[0].public_id"
          class="person__image__media-img"
          provider="cloudinary"
          width="400"
        ></nuxt-img>
      </figure>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PersonPage',
  validate({ params, store }) {
    return store.state.people.data.some((el) => el.slug === params.slug)
  },
  head() {
    return {
      title: this.person.name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.person.description,
        },
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `https://www.myswimlook.com/people/${this.$route.params.slug}`,
        },
      ],
    }
  },

  computed: {
    person() {
      return this.$store.state.people.data.find(
        (person) => person.slug === this.$route.params.slug
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.person__intro {
  display: flex;
  height: 100vmin;
}

.person__intro__left {
  width: 120%;
}
.person__intro__left-title {
  @extend %title-50;
  margin: 10rem 1.6rem;
}
.person__intro__left-description {
  @extend %paragraph-16;
  margin: 1.6rem;
}

.person__image__media {
  width: 100%;
  height: 100%;
  display: block;
  position: relative;
}

.person__image__media-img {
  @extend %cover;
}
</style>
