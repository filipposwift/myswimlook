<template>
  <header class="header__container">
    <div class="header__logo">
      <nuxt-link :to="localePath('/')" exact>
        <figure class="header__logo__media">
          <img
            src="~/assets/img/Logo.svg"
            alt="Logo myswimlook"
            class="header__logo__media__image"
            width="332"
            height="48"
          />
        </figure>
      </nuxt-link>
    </div>
    <div class="header__main">
      <div class="header__claim">
        <h2>
          Be inspired by the best designers, discover stylish swimsuits and
          share your look
        </h2>
      </div>
    </div>
    <div class="isMobile">
      <div class="header__hamburgher__wrapper">
        <Menu :width="'100'">
          <nuxt-link :to="localePath('/')" exact>
            <span>Home</span>
          </nuxt-link>

          <nuxt-link :to="localePath('/styles')" exact>
            <span>Styles</span>
          </nuxt-link>

          <nuxt-link :to="localePath('/designers')" exact>
            <span>Designers</span>
          </nuxt-link>
          <nuxt-link :to="localePath('/stories')" exact>
            <span>Stories</span>
          </nuxt-link>
          <nuxt-link :to="localePath('/people')" exact>
            <span>People</span>
          </nuxt-link>
        </Menu>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'TheAppHeader',

  methods: {
    openMenu() {
      this.$emit('openMenu')
    },
    closeMenu() {
      this.$emit('closeMenu')
    },
  },
}
</script>

<style lang="scss" scoped>
.isMobile {
  display: none;
  position: relative;
  border-bottom: 1px solid $b-color;

  .linkExactActiveClass {
    color: get-color(basic, normal);
  }

  span {
    @extend %paragraph-20;
  }
  @include phone {
    display: block;
    width: 20%;
  }
}

.header__hamburgher__wrapper {
  @extend %cover;
}

.header__container {
  width: 92%;
  position: fixed;
  left: 50%;
  top: 0%;
  transform: translate(-50%, 0%);
  z-index: 10;
  background-color: get-color(primary, normal);
  border-top: 1px solid $b-color;
  display: flex;

  @include phone {
    width: 100%;
    height: 20rem;
  }
}

.header__logo {
  border-right: 1px solid $b-color;
  border-left: 1px solid $b-color;
  border-bottom: 1px solid $b-color;
  padding: 0.8rem;
  background-color: get-color(primary, bright);
  width: 20%;
  @include phone {
    width: 80%;
    padding: 2.4rem;
  }
}

.header__logo__media {
  height: 100%;
  width: 100%;
  position: relative;
}

.header__logo__media__image {
  @extend %cover;
  object-fit: contain;
}

.header__main {
  flex-grow: 1;
  @include phone {
    display: none;
  }
}

.header__claim {
  background-color: get-color(secondary, normal);
  text-align: center;
  border-right: 1px solid $b-color;
  border-bottom: 1px solid $b-color;

  h2 {
    color: get-color(primary, bright);
    @extend %title-24;
    line-height: 49px;

    // @include tablet {
    //   font-size: 0.9rem;
    // }
  }
}
// #item {
//   @extend %paragraph-20;
//   margin-left: 10px;
// }
</style>
