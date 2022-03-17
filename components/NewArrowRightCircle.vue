<template>
  <nuxt-link :to="localePath(`/${link}/`)" exact>
    <div class="circle__back">
      <ArrowRight class="arrow_wrapper" />
    </div>
  </nuxt-link>
</template>

<script>
import ArrowRight from '@/assets/img/new-arrow-right.svg?inline'

export default {
  components: { ArrowRight },

  props: {
    link: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.circle__back {
  height: 100%;
  width: 100%;
  //   pointer-events: auto;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  background-color: get-color(basic, normal);
  transition: background 1s ease-out;
  &:hover .arrow__path {
    stroke: get-color(primary, normal);
  }
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: '';
    background: get-color(primary, normal);
    transition: transform 0.5s cubic-bezier(0.785, 0.135, 0.15, 0.86);
    transform-origin: 0% 50%;
  }
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  &:hover::before {
    transform: scale3d(0, 1, 1);
    transform-origin: 100% 50%;
  }
}

.arrow_wrapper {
  position: absolute;
  width: 70%;
  height: 70%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.arrow {
  @extend %ab-center;
}

.arrow__path {
  stroke: get-color(basic, normal);
}
</style>
