<template>
  <div class="styles">
    <div class="styles__hero__wrapper">
      <div class="styles__hero__title-vertical">
        <h2><slot name="verticalTitle"></slot></h2>
      </div>
      <div class="styles__hero__title">
        <h1><slot name="title"></slot></h1>

        <figure class="styles__hero__media">
          <slot></slot>
        </figure>
      </div>
      <div class="styles__hero__intro">
        <p>
          <slot name="header"></slot>
        </p>
      </div>
      <div class="styles__hero__square__box-one"></div>
      <div class="styles__hero__square__box-two"></div>
      <div class="styles__hero__square__box-three"></div>

      <!-- <div class="styles__hero__description"></div> -->
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.styles {
  width: 100%;
}

.styles__hero__wrapper {
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  @include phone {
    grid-template-rows: repeat(4, 1fr) 0.2fr 1fr;
  }
}

.styles__hero__title-vertical {
  grid-area: 1 / 1 / 7 / 2;
  position: relative;
  border-right: 1px solid $b-color;
  h2 {
    @extend %vertical-titles;
    @extend %title-50;
    @include phone {
      font-size: 30px;
    }
  }
  @include phone {
    grid-area: 1 / 1 / 5 / 3;
    border-bottom: 1px solid $b-color;
  }
}

.styles__hero__title {
  grid-area: 1 / 2 / 6 / 12;
  position: relative;
  height: 100%;
  width: 100%;

  @include phone {
    grid-area: 1 / 3 / 5 / 13;
  }

  .styles__hero__media {
    height: 100%;
    width: 100%;

    // .styles__hero__media__image {
    //   @extend %cover;
    // }
  }

  h1 {
    @extend %title-200;
    font-size: 30rem;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0);
    z-index: 2;
    color: get-color(primary, bright);
    line-height: 15.5rem;
  }
}

.styles__hero__intro {
  grid-area: 1 / 10 / 2 / 13;
  background-color: get-color(primary, bright);
  z-index: 2;
  @extend %paragraph-20-light;
  text-transform: uppercase;
  padding: 1.6rem;
  border-left: 1px solid $b-color;
  border-bottom: 1px solid $b-color;
  @include phone {
    grid-area: 6 / 1 / 7 / 13;
    border: none;
    border-top: 1px solid $b-color;
    padding-top: 8rem;
    padding-bottom: 8rem;
  }
}
.styles__hero__square__box-one {
  grid-area: 2 / 12 / 3 / 13;
  height: 100%;
  width: 100%;
  border-bottom: 1px solid $b-color;
  @include xs-phone {
    display: none;
  }
}

.styles__hero__square__box-two {
  grid-area: 3 / 12 / 5 / 13;
  height: 100%;
  width: 100%;
  border-bottom: 1px solid $b-color;
  @include xs-phone {
    display: none;
  }
}

.styles__hero__square__box-three {
  grid-area: 4 / 12 / 6 / 13;
  height: 100%;
  width: 100%;
  border-bottom: 1px solid $b-color;
  @include phone {
    display: none;
  }
}
</style>
