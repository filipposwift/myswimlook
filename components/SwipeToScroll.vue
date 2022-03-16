<template>
  <div class="slide__to__scroll">
    <svg
      aria-hidden="true"
      class="arrow_left"
      width="50"
      height="20"
      viewBox="0 0 20 20"
    >
      <path
        class="arrow_path"
        d="M23.4198 0H22.1506C22.1506 3.8 25.3235 7.09333 29.8926 8.86667H0V10.1333H29.7657C25.1966 11.9067 22.0237 15.2 22.0237 19H23.2928C23.2928 14.06 29.3849 10.1333 37 10.1333V8.86667C29.5118 8.86667 23.4198 4.94 23.4198 0Z"
      ></path>
    </svg>
    <h3>Swipe to scroll</h3>
    <SwipeSvg class="swipe-svg" />
    <svg
      aria-hidden="true"
      class="arrow_right"
      width="50"
      height="20"
      viewBox="0 0 20 20"
    >
      <path
        class="arrow_path"
        d="M23.4198 0H22.1506C22.1506 3.8 25.3235 7.09333 29.8926 8.86667H0V10.1333H29.7657C25.1966 11.9067 22.0237 15.2 22.0237 19H23.2928C23.2928 14.06 29.3849 10.1333 37 10.1333V8.86667C29.5118 8.86667 23.4198 4.94 23.4198 0Z"
      ></path>
    </svg>
  </div>
</template>

<script>
import SwipeSvg from '@/assets/img/swipe-svg.svg?inline'
export default {
  components: {
    SwipeSvg,
  },
}
</script>

<style lang="scss" scoped>
.slide__to__scroll {
  margin-top: 1.6rem;
  width: 40rem;
  display: flex;
  position: relative;
  justify-content: space-around;
  align-items: center;
  @include desktop {
    width: 47rem;
  }
  @include tablet {
    width: 52rem;
  }
  @include phone {
    width: 40rem;
  }
  @include xs-phone {
    width: 47rem;
  }
  h3 {
    font-family: 'Work Sans', sans-serif;
    color: #000000;
    font-weight: 300;
    line-height: 1.2;
    font-size: max(2vw);
    text-align: center;
    @include phone {
      font-size: 24px;
    }
    @include xs-phone {
      font-size: 16px;
    }
  }
}
.arrow_left {
  transform: rotate(180deg);
}
.swipe-svg {
  position: absolute;
  top: -100%;
  left: 20%;
  z-index: 4;
  opacity: 0.4;

  @include phone {
    display: none;
  }
}
</style>
