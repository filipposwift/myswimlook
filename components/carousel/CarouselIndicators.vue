<template>
  <div class="carousel-indicators">
    <div
      v-for="(slide, index) in slides"
      :key="index"
      class="carousel-indicators-wrapper"
      @click="$emit('switch', index)"
    >
      <div class="hg__image">
        <nuxt-img
          :src="`${encodeURI(slide.image[0].public_id)}`"
          provider="cloudinary"
          class="carousel-indicator-item"
          :class="{ active: currentIndex === index }"
        ></nuxt-img>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    slides: {
      type: Array,
      required: true,
    },
    total: {
      type: Number,
      default: 0,
    },
    currentIndex: {
      type: Number,
      default: 0,
    },
  },
  emits: ['switch'],
}
</script>

<style lang="scss" scoped>
.carousel-indicators {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 20rem);
  grid-column-gap: 1.6rem;
  grid-row-gap: 1.6rem;
  margin-left: 1.6rem;
  height: 100%;
  cursor: pointer;
  @include desktop {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 20rem);
  }
  @include phone {
    // grid-template-rows: repeat(3, 40rem);
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    margin-bottom: 5rem;
  }
}

.hg__image {
  // padding: 1.6rem;
  cursor: pointer;
  position: relative;
  width: 100%;
  height: 20rem;
  transition: transform 0.5s ease-out;
  overflow: hidden;

  &:hover {
    transform: translate3d(0, 0, 0);
    transform: scale(0.95);
  }
}
.carousel-indicator-item {
  @extend %cover;
  opacity: 0.7;
  padding: 0.8rem;
  transition: transform 0.5s ease-out;

  &:hover {
    transform: translate3d(0, 0, 0);
    transform: scale(1.2);
    opacity: 1;
  }
}
.active {
  opacity: 1;
  border: 1px solid $b-color;
  // &:hover {
  //   scale: 1;
  // }
}
</style>
