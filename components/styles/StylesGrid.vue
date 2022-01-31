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
  // height: 100%;
}

.styles__grid__media {
  width: 75%;
  height: 100%;
  position: relative;
  overflow: hidden;
  transition: transform 1s ease-out;

  &:hover {
    transform: scale(0.95);
  }

  // &.one {
  //   // border-right: 1px solid $b-color;
  //   // border-bottom: 1px solid $b-color;
  // }

  // &.two {
  //   // border-right: 1px solid $b-color;
  //   // border-left: 1px solid $b-color;
  // }

  // &.three {
  //   // border-right: 1px solid $b-color;
  //   // border-left: 1px solid $b-color;
  // }

  // &.four {
  //   // border-top: 1px solid $b-color;
  //   // border-right: 1px solid $b-color;
  //   // border-left: 1px solid $b-color;
  // }

  // &.five {
  //   // border-right: 1px solid $b-color;
  //   // border-bottom: 1px solid $b-color;
  // }

  // &.six {
  //   // border-right: 1px solid $b-color;
  //   // border-bottom: 1px solid $b-color;
  //   // border-left: 1px solid $b-color;
  // }

  // &.seven {
  //   // border-right: 1px solid $b-color;
  //   // border-left: 1px solid $b-color;
  // }

  .styles__grid__media__image {
    @extend %cover;
    z-index: -1;
    cursor: pointer;
    transition: transform 1s ease-out;

    &:hover {
      transform: scale(1.2);
    }
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
    @include xs-phone {
      font-size: 40px;
    }
  }
  &.one {
    border-left: 1px solid $b-color;
    border-right: 1px solid $b-color;
    @include phone {
      border-right: 0px;
    }
  }
  &.two {
    border-left: 1px solid $b-color;
    border-right: 1px solid $b-color;
    @include phone {
      border-right: 0px;
    }
  }
  &.three {
    border-left: 1px solid $b-color;
  }

  &.four {
    border-left: 1px solid $b-color;
  }

  &.five {
    border-left: 1px solid $b-color;
    border-right: 1px solid $b-color;
    @include phone {
      border-right: 0px;
    }
  }

  &.six {
    border-left: 1px solid $b-color;
    border-right: 1px solid $b-color;
    @include phone {
      border-right: 0px;
    }
  }

  &.seven {
    border-left: 1px solid $b-color;
  }
}
.styles__grid__carousel__controls {
  width: 80%;
  flex-shrink: 1;
}
</style>
