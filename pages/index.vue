<template>
  <div>
    <HomeTheIntro />
    <div class="home__content">
      <section class="home__section home__styles">
        <HomeTheTitle>Styles</HomeTheTitle>
        <div class="hc__text">
          <p>
            Discover our personally curated collection of swimwear looks. We
            have handpicked looks from some of the best fashion designers in the
            world, and we are confident that our selection will give you plenty
            of creativity.
          </p>
          <p class="second">
            We want to help you find the perfect look: the one that makes you
            feel comfortable and beautiful in your own skin. <br />Get inspired,
            no one else can be you better than you!
          </p>
        </div>
        <div class="hc__slider__wrapper">
          <div class="hc__slider__content">
            <div
              v-for="(style, index) in adjustedStyles"
              :key="index"
              class="hc__slider__cell"
            >
              <nuxt-link
                v-if="index !== 0"
                :to="localePath(`/styles/${style.slug}/`)"
                class="cell__content"
              >
                <!-- <figure class="cell__image__media">
                  <nuxt-img
                    :src="style.image[0].public_id"
                    :alt="`Photo of style ${style.name}`"
                    provider="cloudinary"
                    width="400"
                    class="cell__image__media-img"
                  ></nuxt-img>
                </figure> -->
                <ImageWapper :image="style" class="cell__image__media" />
                <div class="cell__title">
                  <h2>{{ style.name }}</h2>
                </div>
              </nuxt-link>
              <div v-else class="hc__slider__cell-text">
                <h2>{{ style.intro }}</h2>
              </div>
            </div>
          </div>
        </div>
        <div class="hc__slider__photo-credits">
          <swipe-to-scroll />
          <p @click="showStyleCredits = true">Photo Credits</p>
          <PhotoCredits
            v-show="showStyleCredits"
            :items="styles"
            @closeCredits="showStyleCredits = false"
          />
        </div>
      </section>
      <section class="home__section home__designers">
        <HomeTheTitle>Designers</HomeTheTitle>
        <div class="hc__text">
          <p>
            Myswimlook is your guide to purchase the best, most sustainable
            swimwear brands in 2022. Living a sustainable lifestyle is not
            easy.<br />
            We created this guide as a helping hand.
          </p>
          <p class="second">
            Here are some of our favorite eco-friendly swimwear brands that we
            have picked just for you.
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
                :to="localePath(`/designers/${designer.slug}/`)"
                class="cell__content"
              >
                <!-- <figure class="cell__image__media">
                  <nuxt-img
                    :src="getFeaturedImage(designer.items)"
                    :alt="`Photo of style ${designer.name}`"
                    provider="cloudinary"
                    width="400"
                    class="cell__image__media-img"
                  ></nuxt-img>
                </figure> -->
                <ImageWapper :image="designer" class="cell__image__media" />
                <div class="cell__title">
                  <h2>{{ designer.name }}</h2>
                </div>
              </nuxt-link>
              <div v-else class="hc__slider__cell-text">
                <h2>{{ designer.intro }}</h2>
                <p>{{ designer.source }}</p>
              </div>
            </div>
          </div>
        </div>
        <swipe-to-scroll />
      </section>
      <section class="home__section home__stories">
        <HomeTheTitle>Stories</HomeTheTitle>
        <div class="hc__text">
          <p>
            Our weekly fashion articles cover everything you need know about
            beachwear fashion. <br />Stay up to date with the latest fashion
            trends in swimwear around the world, discover emerging designers and
            what celebrities are choosing.
          </p>
          <p class="second">So that you are never late to the party!</p>
        </div>
        <div class="hc__stories">
          <div class="story__wrapper">
            <figure class="story__media">
              <nuxt-img
                :src="lastStory.coverImage[0].public_id.replace(/\s+/g, '%20')"
                :alt="`Image of article ${lastStory.title}`"
                provider="cloudinary"
                width="873"
                sizes="xs:100vw sm:100vw md:90vw xl:654px xxl:873px"
                class="story__media-img"
              ></nuxt-img>
            </figure>
            <div class="story__text__inner">
              <div class="story__text__intro"><h2>Latest Article</h2></div>
              <div class="story__text">
                <h3>{{ lastStory.title }}</h3>
                <div
                  v-dompurify-html="$md.render(lastStory.incipit)"
                  class="story__text__incipit"
                ></div>
              </div>
              <div class="story__text__cta">
                <div class="cta__link">
                  <nuxt-link :to="localePath(`/stories/${lastStory.slug}/`)"
                    ><span>Read More</span></nuxt-link
                  >
                </div>
                <div class="cta__link-inverse">
                  <nuxt-link :to="localePath('/stories/')"
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
        <div class="hc__gallery__photo-credits">
          <p @click="showGalleryCredits = true">Photo Credits</p>
          <PhotoCredits
            v-show="showGalleryCredits"
            :items="galleryCredits"
            @closeCredits="showGalleryCredits = false"
          />
        </div>
        <div class="hc__text is-last">
          <p>
            We believe that there is always someone out there who can be of
            inspiration. You just have to look in the right places. We have
            searched for a wide spectrum of women in terms of age and location;
            some people are influencers, content creators or even just the
            average girl next door (who happens to have an amazing style). They
            all have their own unique interests, what is yours?
          </p>
          <p class="second">
            <span>Visit our instragram </span
            ><a
              href="https://www.instagram.com/myswimlook/"
              target="_blank"
              rel="nofollow noopener noreferrer"
              >@myswimlook</a
            ><span> to share your ideas.</span>
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
        text: 'Swipe to scroll',
        intro: 'Sustainable brands to start your 2022',
        source: '(source: good on you)',
      },
      stylesIntro: {
        text: 'Swipe to scroll',
        intro: "What's your mood today?",
      },
      showStyleCredits: false,
      showGalleryCredits: false,
      galleryCredits: [
        {
          name: 'green bikini - first row',
          photoName: 'Shutterstock',
          photoLink: 'https://shutterstock.com',
        },

        {
          name: 'black swimsuit - first row',
          photoName: 'Patrick Perkins',
          photoLink:
            'https://unsplash.com/@patrickperkins?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
        },
        {
          name: 'red bikini - second row',
          photoName: 'Simona Sergi',
          photoLink:
            'https://unsplash.com/@i_am_simoesse?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
        },
        {
          name: 'white swimsuit - second row',
          photoName: 'Brand Custype',
          photoLink:
            'https://unsplash.com/@brandcustpe?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
        },
        {
          name: 'black swimsuit - second row',
          photoName: 'Hunter Newton',
          photoLink:
            'https://unsplash.com/@h7creatives?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
        },
        {
          name: 'printed bikini - second row',
          photoName: 'Shutterstock',
          photoLink: 'https://shutterstock.com',
        },
        {
          name: 'black swimsuit - third row',
          photoName: 'Felix Uresti',
          photoLink:
            'https://unsplash.com/@felixurestiv?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
        },
        {
          name: 'printed bikini - third row',
          photoName: 'Henrique Nery',
          photoLink:
            'https://unsplash.com/@neryhenrique?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
        },
      ],
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
  },

  mounted() {
    this.initImageParallax()
    this.lineAnimation()
    this.$ScrollTrigger.getById('parallax').enable()
    this.$ScrollTrigger.getById('item0').enable()
    this.$ScrollTrigger.getById('item1').enable()
  },

  destroyed() {
    this.$ScrollTrigger.getById('parallax').disable()
    this.$ScrollTrigger.getById('item0').disable()
    this.$ScrollTrigger.getById('item1').disable()
  },

  methods: {
    getFeaturedImage(designer) {
      return designer[0].fields.cloudinarySwimlook[0].public_id
    },

    initImageParallax() {
      const el = document.querySelector('.story__media')
      const image = el.querySelector('.story__media-img')

      this.$gsap.to(
        image,
        {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            id: 'parallax',
            trigger: el,
            start: 'top bottom',
            scrub: true,
          },
        },
        0
      )
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
  width: 90%;
}

.cell__title {
  position: relative;
  width: 25%;
  @extend %title-50;
  border-left: 1px solid $b-color;

  h2 {
    @extend %vertical-titles;
    transition: 0.2s;
    // @include phone {
    //   font-size: 24px;
    // }
    &:hover {
      color: get-color(basic, normal);
    }
  }
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

  @include desktop {
    font-size: 4rem;
    line-height: 5rem;
  }

  @include tablet {
    font-size: 4.5rem;
    line-height: 5.5rem;
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
  a {
    color: get-color(basic, normal);
  }
}

.hc__slider__wrapper {
  position: relative;
  overflow-x: scroll;
  overflow-y: hidden;
  overflow: -moz-scrollbars-none;
  scrollbar-width: none;
  -ms-overflow-style: none;
  // scroll-snap-type: x mandatory; //prova snap
  height: 35vw;
  width: 100vw;
  border-bottom: 1px solid $b-color;
  overscroll-behavior-x: contain;
  @include phone {
    height: 75vw;
  }
}
.hc__slider__wrapper::-webkit-scrollbar {
  display: none !important;
}

.hc__slider__content {
  display: flex;
  overflow: hidden;
  position: absolute;
  // scroll-snap-align: start; //prova snap
  width: auto;
  align-self: flex-start;
}
.hc__slider__cell:last-of-type {
  margin-right: 10vw;
}

.hc__slider__cell {
  // scroll-snap-align: start; //prova snap
  width: 30vw;
  height: 35vw;
  border-right: 1px solid $b-color;

  @include phone {
    width: 90vw;
    height: 75vw;
  }
}

.hc__slider__cell-text {
  @extend %center;
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
      font-size: 7rem;
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

  p {
    @extend %paragraph-16;

    position: absolute;
    left: 16px;
    bottom: 32px;
  }
}

.hc__slider__photo-credits {
  display: flex;
  position: relative;
  justify-content: space-between;
  p {
    @extend %paragraph-16;
    font-size: 14px;
    padding-right: 1.6rem;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
      color: get-color(basic, normal);
    }
  }
}

.hc__gallery__photo-credits {
  display: flex;
  position: relative;
  justify-content: flex-end;
  p {
    @extend %paragraph-16;
    font-size: 14px;
    padding-right: 1.6rem;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
      color: get-color(basic, normal);
    }
  }
}

.story__wrapper {
  display: flex;
  height: 50vw;
  @include phone {
    flex-direction: column;
    position: relative;
    width: 100%;
    height: auto;
  }
}
.story__media {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  border: 1px solid $b-color;
  border-top: 0px;
  @include phone {
    width: 85%;
    min-height: 60vh;
  }
  @include xs-phone {
    min-height: 40vh;
  }
}
.story__media-img {
  @extend %cover;
  height: 120%;
  // width: 120%;
  top: -20%;
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
    // top: 0;
    // left: 0;
    background: none;
    border: none;
    transform-origin: bottom right;
    transform: translate(0%, -50%) rotate(-90deg);
    white-space: nowrap;
    font-size: 4.5rem;
  }
}
.story__text {
  margin-top: 15rem;
  padding: 2.4rem 1.6rem;

  @include phone {
    margin-top: 0;
    padding: 0;
  }
  h3 {
    @extend %title-30;
    padding: 3.2rem 1.6rem;
    @include phone {
      border-bottom: 1px solid $b-color;
      padding: 4.8rem 1.6rem;
    }
  }
}

.story__text__incipit {
  @extend %paragraph-16;
  max-height: 12.6em;
  line-height: 1.4;
  overflow: hidden;
  margin: 3.2rem 1.6rem;

  padding-right: 1.6rem;
  position: relative;

  &::before {
    position: absolute;
    content: '...';
    bottom: 0; /* "bottom" */
    right: 0; /* "right" */
  }

  &::after {
    content: '';
    position: absolute;
    right: 0; /* "right" */
    width: 1rem;
    height: 1rem;
    background-color: get-color(primary, normal);
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
  background-color: get-color(primary, normal);
  color: get-color(primary, bright);
  position: relative;
  span {
    @extend %paragraph-20;

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
    background: get-color(secondary, normal);
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

.cta__link-inverse {
  width: 100%;
  height: 50px;
  overflow: hidden;
  text-align: center;
  background-color: get-color(secondary, normal);
  color: get-color(primary, bright);
  position: relative;
  span {
    @extend %paragraph-20;
    // font-weight: 300;
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
    background: get-color(primary, normal);
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
</style>
