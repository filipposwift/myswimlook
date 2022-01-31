<template>
  <div class="carousel">
    <div class="instagram-embed">
      <carousel-instagram
        :key="currentSlide"
        :post-id="reference"
        :current-index="currentSlide"
      >
      </carousel-instagram>
    </div>
    <div class="carousel-indicators-panel">
      <div v-if="emptyName" class="carousel-text">
        <p>
          See who is wearing <span>{{ modelName }}</span> by
          <strong>{{ designer }}</strong>
        </p>
      </div>
      <carousel-indicators
        v-if="slides.length > 0"
        :slides="slides"
        :current-index="currentSlide"
        @switch="switchSlide($event)"
      ></carousel-indicators>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    slides: {
      type: Array,
      default: () => [],
    },

    modelName: {
      type: String,
      default: '',
    },

    designer: {
      type: String,
      default: '',
    },
  },

  data: () => ({
    currentSlide: 0,
  }),

  computed: {
    reference() {
      if (this.slides.length > 0) {
        return this.slides.map((slide) => slide.reference)
      }
      return []
    },
    emptyName() {
      // eslint-disable-next-line no-unneeded-ternary
      return this.modelName === '' ? false : true
    },
  },

  methods: {
    setCurrentSlide(index) {
      this.currentSlide = index
    },

    switchSlide(index) {
      this.setCurrentSlide(index)
    },
  },
}
</script>

<style lang="scss" scoped>
.carousel {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-around;
  align-items: center;
  background-color: get-color(primary, normal);
  @include phone {
    flex-direction: column-reverse;
  }
}
.instagram-embed {
  height: 99.9%;
  width: 40%;
  min-width: 550px;
  overflow: hidden;

  @include desktop {
    width: 60%;
  }
  @include tablet {
    min-width: 326px;
  }

  @include phone {
    width: 100%;
    max-width: none;
  }
}

.carousel-indicators-panel {
  // height: 50rem;
  width: 60%;
  @include desktop {
    width: 40%;
  }
  @include phone {
    width: 100%;
    height: 100%;
  }
}

.carousel-text {
  @extend %paragraph-20;
  text-transform: uppercase;
  padding: 1.6rem;
  pointer-events: none;
  cursor: default;
  p {
    span {
      color: get-color(basic, normal);
    }
  }
}
</style>
