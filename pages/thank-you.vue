<template>
  <div class="page__wrapper thank-you">
    <h1>
      Thank you! Your message has been submitted<br />
      We'll came back to you shortly
    </h1>
    <nuxt-link :to="localePath(`/`)" exact>
      <h2>Back to Home Page</h2>
    </nuxt-link>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.thank-you {
  width: 100%;
  height: 80vh;

  h1 {
    @extend %title-50;
    margin-top: 10rem;
    text-align: center;
    margin-bottom: 5rem;
    line-height: 1.2;
    @include xs-phone {
      font-size: 30px;
      margin-top: 20rem;
      margin-bottom: 10rem;
    }
  }

  h2 {
    @extend %paragraph-16;

    font-size: 2rem;
    text-align: center;
    transition: all 0.3s ease;

    @include xs-phone {
      font-size: 20px;
    }

    &:hover {
      color: get-color(basic, normal);
    }
  }
}
</style>
