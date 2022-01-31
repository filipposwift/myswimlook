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
            d="M71.2393 17.5L1.23926 17.5M1.23926 17.5C10.5351 17.3613 18.4522 8.42593 18.4522 0M1.23926 17.5C10.7749 17.5 18.5029 26.5741 18.5029 35"
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
