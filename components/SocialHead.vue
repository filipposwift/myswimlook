<template>
  <span v-if="false" />
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: 'https://www.myswimlook.com/social-media-card.jpg',
    },
    url: {
      type: String,
      default: 'https://www.myswimlook.com',
    },
  },

  head() {
    return {
      meta: [
        {
          vmid: 'twitter:title',
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.title,
        },
        {
          vmid: 'twitter:url',
          hid: 'twitter:url',
          property: 'twitter:url',
          content: this.url,
        },
        {
          vmid: 'twitter:description',
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.description,
        },
        {
          vmid: 'twitter:image',
          hid: 'twitter:image',
          name: 'twitter:image',
          content: this.image,
        },
        {
          vmid: 'twitter:image:alt',
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: this.title,
        },

        {
          vmid: 'og:title',
          hid: 'og:title',
          property: 'og:title',
          content: this.title,
        },
        {
          vmid: 'og:url',
          hid: 'og:url',
          property: 'og:url',
          content: this.url,
        },

        {
          vmid: 'og:description',
          hid: 'og:description',
          property: 'og:description',
          content: this.description,
        },
        {
          vmid: 'og:image',
          hid: 'og:image',
          property: 'og:image',
          content: this.image,
        },
        {
          vmid: 'og:image:secure_url',
          hid: 'og:image:secure_url',
          property: 'og:image:secure_url',
          content: this.image,
        },
        {
          vmid: 'og:image:alt',
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: this.title,
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped></style>
