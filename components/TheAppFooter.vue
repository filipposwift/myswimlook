<template>
  <footer class="footer__container">
    <div class="footer__logo">
      <nuxt-link :to="localePath('/')" exact>
        <figure class="footer__logo__media">
          <img
            src="~/assets/img/Logowhite.svg"
            alt="Logo myswimllok"
            width="250"
            height="70"
            class="footer__logo__media__image"
          />
        </figure>
      </nuxt-link>
    </div>
  </footer>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.footer__container {
  width: 100%;
  height: 10rem;
  z-index: 10;
  border-top: 1px solid $b-color;
  border-bottom: 1px solid $b-color;
}

.footer__logo {
  background-color: get-color(secondary, normal);
  border-right: 1px solid $b-color;
  border-left: 1px solid $b-color;
  height: 100%;
  width: 99.8%;
  padding: 0.8rem;
}
.footer__logo__media {
  height: 100%;
  width: 50%;
  margin: auto;
  position: relative;
}

.footer__logo__media__image {
  @extend %cover;
  object-fit: contain;
}
</style>
