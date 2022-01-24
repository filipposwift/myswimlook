<template>
  <div>
    <HomeTheIntro />
    <div class="home__content">
      <section class="home__section home__styles">
        <HomeTheTitle>Styles</HomeTheTitle>
        <div class="hc__text">
          <p>
            Browse through our collection of curated swimwear looks and find
            inspiration on how to mix and match a beach look that fits your
            style.
          </p>
          <p class="second">
            We want to help you find the perfect look for your body type. We
            have selected looks from some of the best fashion designers in the
            world, and we are confident that our style collections will give you
            plenty of inspiration.
          </p>
        </div>
        <div class="hc__slider__wrapper">
          <div class="hc__slider__content">
            <div
              v-for="(style, index) in adjustedStyles"
              :key="index"
              class="hc__slider__cell"
            >
              <!-- <div v-if="index !== 0" class="cell__spacer"></div> -->
              <nuxt-link
                v-if="index !== 0"
                :to="localePath(`/styles/${style.slug}`)"
                class="cell__content"
              >
                <figure class="cell__image__media">
                  <nuxt-img
                    :src="style.image[0].public_id"
                    :alt="`Photo of style ${style.name}`"
                    provider="cloudinary"
                    width="400"
                    class="cell__image__media-img"
                  ></nuxt-img>
                </figure>
                <div class="cell__title">
                  <h2>{{ style.name }}</h2>
                </div>
              </nuxt-link>
              <div v-else class="hc__slider__cell-text">
                <h2>{{ style.intro }}</h2>
                <div class="hc__slider__cell-swipe">
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
                  <h3>{{ style.message.text }}</h3>
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
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="home__section home__designers">
        <HomeTheTitle>Designers</HomeTheTitle>
        <div class="hc__text">
          <p>
            Myswimlook is your guide to the best sustainable swimwear brands in
            2022
          </p>
          <p class="second">
            Here are some of our favorite eco-friendly swimwear brands that we
            have handpicked to help you find the perfect one for your body type.
            It was not an easy job and so we've created this guide on what makes
            each brand unique
          </p>
        </div>
        <div class="hc__slider__wrapper">
          <div class="hc__slider__content">
            <div
              v-for="(designer, index) in featuredDesigners"
              :key="index"
              class="hc__slider__cell"
            >
              <nuxt-link
                v-if="index !== 2"
                :to="localePath(`/designers/${designer.slug}`)"
                class="cell__content"
              >
                <figure class="cell__image__media">
                  <nuxt-img
                    :src="getFeaturedImage(designer.items)"
                    :alt="`Photo of style ${designer.name}`"
                    provider="cloudinary"
                    width="400"
                    class="cell__image__media-img"
                  ></nuxt-img>
                </figure>
                <div class="cell__title">
                  <h2>{{ designer.name }}</h2>
                </div>
              </nuxt-link>
              <div v-else class="hc__slider__cell-text">
                <h2>{{ designer.intro }}</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="home__section home__stories">
        <HomeTheTitle>Stories</HomeTheTitle>
        <div class="hc__text">
          <p>
            Get inspired by our weekly fashion articles covering everything you
            need know about beachwear fashion
          </p>
          <p class="second">
            Stay up to date with the latest fashion trends in swimwear around
            the world, discover emerging designers and learn what celebrities
            are choosing
          </p>
        </div>
        <div class="hc__stories">
          <div class="story__wrapper">
            <figure class="story__media">
              <nuxt-img
                :src="lastStory.images[0].public_id"
                provider="cloudinary"
                width="400"
                class="story__media-img"
              ></nuxt-img>
            </figure>
            <div class="story__text__inner">
              <div class="story__text__intro"><h2>Latest Article</h2></div>
              <div class="story__text">
                <h3>{{ lastStory.title }}</h3>
                <p>{{ lastStory.incipit }}</p>
                <p v-if="!isMobile">{{ lastStory.highLight }}</p>
              </div>
              <div class="story__text__cta">
                <div class="cta__link">
                  <nuxt-link :to="localePath(`/stories/${lastStory.slug}`)"
                    ><span>Read More</span></nuxt-link
                  >
                </div>
                <div class="cta__link no__border-right">
                  <nuxt-link :to="localePath('/stories')"
                    ><span>All Articles</span></nuxt-link
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="home__section home__people">
        <HomeTheTitle>People</HomeTheTitle>
        <HomeGallery />
        <div class="hc__text is-last">
          <p>
            We believe that you can always find someone who has a style you
            want. You just need to look at what they're wearing and take some
            inspiration from their choices. We have searched for a wide spectrum
            in terms of age and location; some people are influencers, content
            creators or even just your average Mary. They all have their own
            unique interests: some can make us feel good by being authentic
            while others catch our attention with aesthetically pleasing images
          </p>
          <p class="second">
            Visit our instragram @myswimlook to share your ideas
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'HomePage',
  layout: 'home',

  data() {
    return {
      designerIntro: {
        intro: 'Featured designers to start your 2022',
      },
      stylesIntro: {
        message: {
          image: '',
          text: 'Swipe to scroll',
        },
        intro: "What's your mood today?",
      },
      windowSize: null,
    }
  },

  computed: {
    ...mapGetters({
      styles: 'styles/getStyles',
    }),
    ...mapState({
      designers: 'data',
      stories: 'stories',
    }),

    featuredDesigners() {
      const filtered = this.designers.data.filter((el) => {
        return el.featured
      })
      filtered.splice(2, 0, this.designerIntro)
      return filtered
    },
    adjustedStyles() {
      const tmp = [...this.styles]
      tmp.splice(0, 0, this.stylesIntro)
      return tmp
    },
    lastStory() {
      return this.stories.story[0].fields
    },

    isMobile() {
      return this.windowSize <= 768
    },
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.windowSize = window.innerWidth
    })

    this.lineAnimation()
    this.$ScrollTrigger.getById('item0').enable()
    this.$ScrollTrigger.getById('item1').enable()
  },

  destroyed() {
    window.removeEventListener('resize', () => {
      this.windowSize = window.innerWidth
    })
    this.$ScrollTrigger.getById('item0').disable()
    this.$ScrollTrigger.getById('item1').disable()
  },

  methods: {
    getFeaturedImage(designer) {
      return designer[0].fields.cloudinarySwimlook[0].public_id
    },

    lineAnimation() {
      const sections = this.$gsap.utils.toArray('section')
      sections.forEach((section) => {
        const items = section.querySelectorAll('.line')

        items.forEach((item, i) => {
          const anim = this.$gsap.from(item, {
            scaleX: 0,
            duration: 1,
            ease: 'power1.out',
            paused: true,
          })

          this.$ScrollTrigger.create({
            id: 'item' + i,
            trigger: item,
            start: 'center 80%',
            // markers: true,
            onEnter: () => anim.play(),
          })

          this.$ScrollTrigger.create({
            id: 'item' + i,
            trigger: item,
            start: 'top bottom',
            onLeaveBack: () => anim.pause(0),
          })
        })
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.cell__spacer {
  width: 100%;
  height: 15%;
}

.cell__content {
  width: 100%;
  height: 100%;
  display: flex;
}

.cell__image__media {
  height: 100%;
  position: relative;
  width: 90%;
  transition: transform 1s ease-out;
  overflow: hidden;

  &:hover {
    transform: scale(0.95);
  }
  @include phone {
    height: 95%;
    margin-top: 16px;
  }

  &-img {
    @extend %cover;
    cursor: pointer;
    transition: transform 1s ease-out;

    &:hover {
      transform: scale(1.2);
    }
  }
}

.cell__title {
  position: relative;
  width: 25%;
  @extend %title-50;
  border-left: 1px solid $b-color;

  h2 {
    @extend %vertical-titles;
    transition: 0.2s;
    @include phone {
      font-size: 24px;
    }
    &:hover {
      color: get-color(basic, normal);
    }
  }
}

.arrow_left {
  transform: rotate(180deg);
}

.home__content {
  width: 100%;
  height: 100%;
}

.home__section {
  margin-top: 20rem;
}

.hc__text {
  border-bottom: 1px solid $b-color;
  @extend %paragraph-16;
  font-size: 3rem;
  line-height: 4rem;
  padding: 8rem 1.6rem 18rem 1.6rem;

  &.is-last {
    border-bottom: none;
  }
  @include phone {
    font-size: 18px;
    line-height: 1.4;

    p {
      padding-top: 2.4rem;
    }
  }
}

.second {
  margin-top: 2.4rem;
}

.hc__slider__wrapper {
  position: relative;
  overflow-x: scroll;
  overflow-y: hidden;
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
  height: 35vw;
  width: 100vw;
  border-bottom: 1px solid $b-color;
  overscroll-behavior-x: contain;
  @include phone {
    height: 50vw;
  }
}
.hc__slider__wrapper::-webkit-scrollbar {
  display: none !important;
}

.hc__slider__content {
  display: flex;
  overflow: hidden;
  position: absolute;
  width: auto;
}
.hc__slider__cell:last-of-type {
  margin-right: 10vw;
}

.hc__slider__cell {
  width: 30vw;
  height: 35vw;
  border-right: 1px solid $b-color;

  @include phone {
    width: 60vw;
    height: 50vw;
  }

  &-text {
    height: 100%;
    width: 100%;
    background-color: get-color(primary, bright);
    padding-left: 10px;
    position: relative;
    h2 {
      @extend %title-50;
      line-height: 1.2;
      font-size: max(5vw);
      @include phone {
        font-size: 32px;
      }
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
}
.hc__slider__cell-txt:nth-child(2) {
  text-align: end;
}

.hc__slider__cell-swipe {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.hc__stories {
  height: 80rem;
  @include phone {
    height: 800px;
  }
}
.story__wrapper {
  display: flex;
  height: 100%;
  @include phone {
    flex-direction: column;
    position: relative;
    width: 100%;
  }
}
.story__media {
  width: 100%;
  height: 100%;
  position: relative;
  border: 1px solid $b-color;
  border-top: 0px;
  @include phone {
    width: 90%;
  }
}
.story__media-img {
  @extend %cover;
}

.story__text__inner {
  position: relative;
  max-width: 50%;
  @include phone {
    position: static;
    max-width: 100%;
    border-top: 1px solid $b-color;
  }
}

.story__text__intro {
  position: absolute;
  top: 0;
  right: 0;
  width: 120%;
  @extend %title-50;
  font-size: max(5vw);
  border-bottom: 1px solid $b-color;
  border-left: 1px solid $b-color;
  background-color: get-color(primary, bright);
  padding: 3.2rem 1.6rem;

  @include phone {
    width: auto;
    top: 15%;
    background: none;
    border: none;
    transform: translate(35%, 0%) rotate(-90deg);
    white-space: nowrap;
    font-size: 40px;
  }
}
.story__text {
  margin-top: 15rem;
  padding: 2.4rem 1.6rem;
  // overflow: hidden;

  @include phone {
    padding: none;
  }
  h3 {
    @extend %title-30;
    @include phone {
      border-bottom: 1px solid $b-color;
      padding: 4.8rem 1.6rem;
      // font-size: 30px;
    }
  }
  p {
    @extend %paragraph-18;
    padding: 1.6rem;
    @include phone {
    }
  }
}

.story__text__cta {
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  right: 0;

  background-color: get-color(primary, bright);
  border-top: 1px solid $b-color;
  border-left: 1px solid $b-color;
  border-bottom: 1px solid $b-color;
  width: 100%;
  @include phone {
    position: static;
  }
}

.cta__link {
  width: 100%;
  height: 50px;
  border-right: 1px solid $b-color;
  overflow: hidden;
  text-align: center;
  background-color: get-color(secondary, normal);
  color: get-color(primary, bright);
  position: relative;
  span {
    @extend %paragraph-20;
    font-weight: 300;
    line-height: 50px;
    text-transform: uppercase;
    white-space: nowrap;
    mix-blend-mode: difference;
  }
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: '';
    background: get-color(primary, bright);
    transition: transform 0.5s cubic-bezier(0.785, 0.135, 0.15, 0.86);
    transform-origin: 0% 50%;
  }
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &:hover::before {
    transform: scale3d(0, 1, 1);
    transform-origin: 100% 50%;
  }
}

.no__border-right {
  border-right: 0px;
}
</style>
