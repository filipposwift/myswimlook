<template>
  <div>
    <transition :name="transitionEffect">
      <div
        v-show="currentSlide === index"
        class="carousel__item"
        @mouseenter="$emit('mouseenter')"
        @mouseout="$emit('mouseout')"
      >
        <img :src="slide" />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    slide: {
      type: String,
      default: '',
    },
    currentSlide: {
      type: Number,
      default: 0,
    },
    index: {
      type: Number,
      default: 0,
    },
    direction: {
      type: String,
      default: 'right',
    },
  },
  emits: ['mouseenter', 'mouseout'],

  computed: {
    transitionEffect() {
      return this.direction === 'right' ? 'slide-out' : 'slide-in'
    },
  },
}
</script>

<style lang="scss" scoped>
.carousel__item {
  position: relative;
  height: 100%;
  width: 100%;
  img {
    @extend %cover;
  }
}
.slide-in-enter-active,
.slide-in-leave-active,
.slide-out-enter-active,
.slide-out-leave-active {
  transition: all 1s ease-in-out;
}
.slide-in-enter-from {
  transform: translateX(-100%);
}
.slide-in-leave-to {
  transform: translateX(100%);
}
.slide-out-enter-from {
  transform: translateX(100%);
}
.slide-out-leave-to {
  transform: translateX(-100%);
}
</style>
