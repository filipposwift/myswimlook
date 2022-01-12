<template>
  <div>
    <home-gallery></home-gallery>
    <div class="home__content">
      <div class="hc__text">
        <p>Discover, wear and share the best swimsuits for you.</p>
        <p>
          Listen suggestions from top influencers, read about the latest trends
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
            </div>
          </div>
        </div>
      </div>
      <div class="hc__slider__wrapper">
        <div class="hc__slider__content">
          <div
            v-for="(designer, index) in featuredDesigners"
            :key="index"
            class="hc__slider__cell"
          >
            <!-- <div v-if="index !== 2" class="cell__spacer"></div> -->
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
      <div class="hc__text">
        <p>Visit our instragram @myswimlook to share your ideas</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'HomePage',
  layout: 'homeLayout',

  data() {
    return {
      designerIntro: {
        intro: 'today designers to look at',
      },
      stylesIntro: {
        intro: '7 styles 1 everyday mood',
      },
    }
  },

  computed: {
    ...mapGetters({
      styles: 'styles/getStyles',
    }),
    ...mapState({
      designers: 'data',
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
  },
  mounted() {
    // console.log(this.featuredDesigners)
  },

  methods: {
    getFeaturedImage(designer) {
      return designer[0].fields.cloudinarySwimlook[0].public_id
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
  width: 75%;
  @include phone {
    height: 95%;
    margin-top: 16px;
  }

  &-img {
    @extend %cover;
  }
}

.cell__title {
  position: relative;
  width: 25%;
  @extend %title-30;

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

.home__content {
  width: 100%;
  height: 100%;
}

.hc__text {
  border-top: 1px solid $b-color;
  border-bottom: 1px solid;
  @extend %paragraph-16;
  font-size: 3rem;
  line-height: 4rem;
  padding: 8rem 1.6rem 8rem 1.6rem;
  @include phone {
    font-size: 24px;
    line-height: 1.1;
    p {
      padding-top: 2.4rem;
    }
  }
}

.hc__slider__wrapper {
  position: relative;
  overflow-x: scroll;
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
  height: 20vw;
  width: 100vw;
  border-bottom: 1px solid;
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
  width: 22.5vw;
  height: 20vw;
  border-right: 1px solid;

  @include phone {
    width: 60vw;
    height: 50vw;
  }

  &-text {
    height: 100%;
    width: 100%;
    background-color: get-color(primary, bright);
    padding-left: 10px;
    h2 {
      @extend %title-50;
      line-height: 1.2;
      font-size: max(5vw);
      @include phone {
        font-size: 32px;
      }
    }
    // &:nth-child(2) {
    //   text-align: end;
    // }
  }
}
.hc__slider__cell-txt:nth-child(2) {
  text-align: end;
}
</style>
