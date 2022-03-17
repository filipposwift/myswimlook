<template>
  <nuxt-link :to="localePath(`/${link}/`)" exact>
    <div class="circle__back">
      <div class="progress__wrapper">
        <svg
          aria-hidden="true"
          class="progress"
          width="70"
          height="70"
          viewbox="0 0 70 70"
        >
          <path
            class="progress__circle"
            d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z"
          />
          <path
            class="progress__path"
            d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z"
            pathLength="1"
          />
        </svg>
      </div>

      <div class="arrow_wrapper">
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
  //   pointer-events: auto;
  cursor: pointer;
  position: relative;
  display: inline-block;
  -webkit-clip-path: circle(50% at 50% 50%);
  clip-path: circle(50% at 50% 50%);
}

.progress__wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @include phone {
    display: none;
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

.progress {
  @extend %ab-center;
  transition: transform 0.4s cubic-bezier(0.7, 0, 0.3, 1);
}

.progress__circle,
.progress__path {
  fill: none;
  stroke: $b-color;
  stroke-width: 1px;
}

.circle__back:focus-visible .progress__circle {
  fill: rgba(252, 196, 63, 0.4);
}

.progress__path {
  stroke: get-color(basic, normal);
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  transition: stroke-dashoffset 0.4s cubic-bezier(0.7, 0, 0.3, 1);
}

.circle__back:hover .progress__path {
  stroke-dashoffset: 0;
}
</style>
