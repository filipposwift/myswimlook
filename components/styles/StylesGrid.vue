<template>
  <nuxt-link :to="localePath(`/styles/${slug}`)" class="styles__grid__link">
    <div class="styles__grid__container">
      <figure :class="`styles__grid__media ${number}`">
        <nuxt-img
          class="styles__grid__media__image"
          :src="`${url}`"
          alt="Photo of style"
          provider="cloudinary"
          width="400"
        ></nuxt-img>
      </figure>
      <div :class="`styles__grid__title ${number}`">
        <h2>{{ name }}</h2>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: Array,
      default: () => [],
    },
    slug: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
  },

  computed: {
    url() {
      return this.image[0].public_id
    },
  },
}
</script>

<style lang="scss" scoped>
.styles__grid__container {
  width: 100%;
  height: 100%;
  display: flex;
  cursor: pointer;
}

.styles__grid__link {
  width: 100%;
  height: 100%;
}

.styles__grid__media {
  width: 75%;
  height: 100%;
  position: relative;

  &.one {
    border-right: 1px solid;
    // border-bottom: 1px solid;
  }

  &.two {
    border-right: 1px solid;
    border-left: 1px solid;
  }

  &.three {
    border-right: 1px solid;
    border-left: 1px solid;
  }

  &.four {
    border-top: 1px solid;
    border-right: 1px solid;
    border-left: 1px solid;
  }

  &.five {
    border-right: 1px solid;
    border-bottom: 1px solid;
  }

  &.six {
    border-right: 1px solid;
    border-bottom: 1px solid;
    border-left: 1px solid;
  }

  &.seven {
    border-right: 1px solid;
    border-left: 1px solid;
  }

  .styles__grid__media__image {
    @extend %cover;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
}
.styles__grid__title {
  position: relative;
  width: 25%;
  height: 100%;
  background-color: get-color(primary, bright);

  h2 {
    @extend %vertical-titles;
    @extend %title-50;
    @include desktop {
      font-size: 4rem;
    }
  }
  &.three {
    border-bottom: 1px solid;
  }

  &.four {
    border-top: 1px solid;
    border-bottom: 1px solid;
  }

  &.five {
    border-bottom: 1px solid;
  }

  &.six {
    border-bottom: 1px solid;
  }

  &.seven {
    border-bottom: 1px solid;
  }
}
.styles__grid__carousel__controls {
  width: 80%;
  flex-shrink: 1;
}
</style>
