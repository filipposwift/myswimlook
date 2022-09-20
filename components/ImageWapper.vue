<template>
  <figure class="image__wrapper">
    <nuxt-img
      :src="publicId"
      :alt="`Photo of ${name}`"
      :width="width"
      sizes="xs:100vw sm:100vw md:90vw xl:339px xxl:452px"
      provider="cloudinary"
      class="image__media__image"
    ></nuxt-img>
    <figcaption :class="caption === '' ? '' : 'image__fig-caption'">
      <p>Photo: {{ caption }}</p>
    </figcaption>
  </figure>
</template>

<script>
export default {
  props: {
    image: {
      type: Object,
      required: true,
    },
  },

  computed: {
    publicId() {
      if (this.image.image) {
        return encodeURI(this.image.image[0].public_id)
      }

      return encodeURI(
        this.image.items[0].fields.cloudinarySwimlook[0].public_id
      )
    },
    name() {
      if (this.image.image) {
        return this.image.name
      }
      return this.image.title
    },
    caption() {
      if (this.image.image) {
        return this.image.image[0].context
          ? this.image.image[0].context.custom.caption
          : ''
      }
      return this.image.items[0].fields.cloudinarySwimlook[0].context
        ? this.image.items[0].fields.cloudinarySwimlook[0].context.custom
            .caption
        : ''
    },

    width() {
      if (this.image.image) {
        return this.image.image[0].width
      }
      return this.image.items[0].fields.cloudinarySwimlook[0].width
    },
  },
}
</script>

<style lang="scss" scoped>
.image__wrapper {
  position: relative;
  padding-bottom: 133.33%; /* 3:4 ratio */
  height: 0;
  overflow: hidden;
  transition: transform 1s ease-out;
  &:hover {
    transform: translate3d(0, 0, 0);
    transform: scale(0.95);
  }
}
.image__media__image {
  height: 100%;
  left: 0;
  object-fit: cover;
  position: absolute;
  top: 0;
  width: 100%;
  cursor: pointer;
  transition: transform 1s ease-out;
  overflow: hidden;
  &:hover {
    transform: translate3d(0, 0, 0);
    transform: scale(1.2);
  }
}

.image__fig-caption {
  display: block;
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: get-color(primary, normal);
  opacity: 0.5;
  z-index: 5;
  p {
    font-family: 'Work Sans', sans-serif;
    font-size: 10px;
    line-height: 1.1;
  }
}
</style>
