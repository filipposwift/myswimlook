<template>
  <div class="styles">
    <div class="styles__hero__wrapper">
      <div class="styles__hero__title-vertical">
        <h2>to be inspired from</h2>
      </div>
      <div class="styles__hero__title">
        <h1>Styles</h1>

        <figure class="styles__hero__media">
          <nuxt-img
            src="swimlook/styles/cover-styles"
            alt="Hero image of woman in swimwear"
            width="2000"
            provider="cloudinary"
            class="styles__hero__media__image"
          ></nuxt-img>
        </figure>
      </div>
      <div class="styles__hero__intro">
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam
          repellendus, totam tenetur dignissimos impedit iusto!
        </p>
      </div>
      <div class="styles__hero__square__box-one"></div>
      <div class="styles__hero__square__box-two"></div>
      <div class="styles__hero__square__box-three"></div>

      <div class="styles__hero__dscription"></div>
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
}

.styles__hero__title-vertical {
  grid-area: 1 / 1 / 7 / 2;
  position: relative;
  border-right: 1px solid;
  h2 {
    @extend %vertical-titles;
    @extend %title-50;
  }
}

.styles__hero__title {
  grid-area: 1 / 2 / 6 / 12;
  position: relative;
  height: 100%;
  width: 100%;

  .styles__hero__media {
    height: 100%;
    width: 100%;

    .styles__hero__media__image {
      @extend %cover;
    }
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
  @extend %paragraph-20;
  text-transform: uppercase;
  padding: 1.6rem;
  border-left: 1px solid;
  border-bottom: 1px solid;
  p {
    font-weight: 300;
  }
}
.styles__hero__square__box-one {
  grid-area: 2 / 12 / 3 / 13;
  height: 100%;
  width: 100%;
  border-bottom: 1px solid;
}

.styles__hero__square__box-two {
  grid-area: 3 / 12 / 5 / 13;
  height: 100%;
  width: 100%;
  border-bottom: 1px solid;
}

.styles__hero__square__box-three {
  grid-area: 4 / 12 / 6 / 13;
  height: 100%;
  width: 100%;
  border-bottom: 1px solid;
}
</style>
