<template>
  <nuxt-link :to="localePath(`/${link}`)" exact>
    <div class="circle__back">
      <div class="arrow__wrapper">
        <svg
          aria-hidden="true"
          class="arrow"
          width="70"
          height="35"
          viewBox="0 0 70 35"
        >
          <path
            d="M0 17.5L70 17.5M70 17.5C60.7042 17.6387 52.787 26.5741 52.787 35M70 17.5C60.4644 17.5 52.7363 8.42593 52.7363 -9.22768e-07"
            class="arrow__path"
            stroke-width="1.5"
            fill="none"
          />
        </svg>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
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
  width: 70px;
  height: 70px;
  cursor: pointer;
  position: relative;
}

.arrow__wrapper {
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
  transition: stroke 0.4s cubic-bezier(0.7, 0, 0.3, 1);
}

.circle__back:hover .arrow__path {
  stroke: get-color(secondary, normal);
}
</style>
