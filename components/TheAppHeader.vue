<template>
  <header class="header__container">
    <div class="header__logo">
      <nuxt-link :to="localePath('/')" exact>
        <figure class="header__logo__media">
          <!-- <img
            src="~/assets/img/Logo.svg"
            alt="Logo myswimlook"
            class="header__logo__media__image"
            width="332"
            height="48"
          /> -->
          <LogoBlue class="header__logo__media__image" />
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
        <HamburgherMenu @toggleNav="navOpen = !navOpen" />
        <TheMobileMenu :open="navOpen" @toggleNav="navOpen = !navOpen">
          <transition-group appear name="fade">
            <li
              v-for="(route, index) in navRoutes"
              :key="route.name"
              class="nav__items"
              :style="{ '--index': index }"
            >
              <nuxt-link :to="localePath(`/${route.slug}`)" exact>
                {{ route.name }}
              </nuxt-link>
            </li>
          </transition-group>
        </TheMobileMenu>
      </div>
    </div>
  </header>
</template>

<script>
// import LogoNormal from '@/assets/img/logo.svg?inline'
export default {
  name: 'TheAppHeader',
  // components: {
  //   LogoNormal,
  // },

  data() {
    return {
      windowSize: 800,
      navOpen: false,
      navRoutes: [
        {
          name: 'Home',
          slug: '',
        },
        {
          name: 'Styles',
          slug: 'styles',
        },
        {
          name: 'Designers',
          slug: 'designers',
        },
        {
          name: 'Stories',
          slug: 'stories',
        },
        {
          name: 'People',
          slug: 'people',
        },
        { name: 'Contact', slug: 'contact' },
        { name: 'Privacy Policy', slug: 'privacy' },
      ],
    }
  },

  computed: {
    // isMobile() {
    //   return this.windowSize <= 768
    // },
    routes() {
      return this.$router.options.routes
    },
  },

  // mounted() {
  //   this.windowSize = window.innerWidth

  //   window.addEventListener('resize', () => {
  //     this.windowSize = window.innerWidth
  //   })
  // },

  // destroyed() {
  //   window.removeEventListener('resize', () => {
  //     this.windowSize = window.innerWidth
  //   })
  // },

  methods: {},
}
</script>

<style lang="scss" scoped>
.isMobile {
  display: none;
  @include phone {
    display: block;
    width: 20%;
    height: 50px;
    flex: 1;
    position: relative;
    border-bottom: 1px solid $b-color;
    border-right: 1px solid $b-color;

    .linkExactActiveClass {
      color: get-color(basic, normal);
    }
  }
  // width: 20%;
  // height: 50px;
  // flex: 1;
  // position: relative;
  // border-bottom: 1px solid $b-color;
  // border-right: 1px solid $b-color;

  // .linkExactActiveClass {
  //   color: get-color(basic, normal);
}

// span {
//   @extend %paragraph-20;
//   font-weight: 300;
//   text-transform: uppercase;
// }
// }

.header__hamburgher__wrapper {
  position: absolute;
  width: 40%;
  top: 30px;
  right: 0;
}

.header__container {
  display: flex;
  width: 100%;
  position: fixed;
  left: 50%;
  top: 0%;
  transform: translate(-50%, 0%);
  z-index: 10;
  background-color: get-color(primary, normal);
  border-top: 1px solid $b-color;

  @include phone {
    width: calc(100vw - 8vw);
    position: fixed;
  }
}

.header__logo {
  border-right: 1px solid $b-color;
  border-left: 1px solid $b-color;
  border-bottom: 1px solid $b-color;
  padding: 0.8rem;
  background-color: get-color(primary, bright);
  width: 20%;
  cursor: pointer;
  @include phone {
    width: 50%;
    height: 50px;
    padding: 5px;
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
    @extend %title-30;
    line-height: 49px;
    @include desktop {
      font-size: 3.5rem;
    }
    @include tablet {
      font-size: 4rem;
    }
  }
}

.nav__items {
  @extend %paragraph-20;
  font-weight: 300;
  text-transform: uppercase;
  padding-bottom: 20px;
  color: get-color(secondary, normal);

  &:nth-child(6) {
    padding-top: 70px;
    padding-bottom: 10px;
    font-size: 16px;
  }

  &:nth-child(7) {
    font-size: 16px;
  }
}

.fade {
  &-enter {
    transform: translateX(-100%);
  }
  &-enter-active {
    transition: all 500ms ease-in-out;
    transition-delay: calc(100ms * var(--index));
  }
}
</style>
