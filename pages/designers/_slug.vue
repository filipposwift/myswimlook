<template>
  <div class="page__wrapper designer">
    <SocialHead :title="designer.name" :description="designer.description" />
    <div class="designer__intro">
      <div class="designer__intro__left">
        <h2>{{ designer.name }}</h2>
        <div class="designer__intro__left__visit-site">
          <VisitSite :url="designer.website" />
        </div>
      </div>
      <div class="designer__intro__right">
        <p>{{ designer.description }}</p>
      </div>
    </div>
    <div
      v-for="item in models"
      :key="item.modelName"
      class="designer__slider__wrapper"
    >
      <div class="designer__slider__content">
        <div class="designer__slider__cell">
          <div class="designer__slider__cell-text">
            <h3>{{ item.modelName }}</h3>
            <h3>in {{ item.style }}</h3>
          </div>
        </div>
        <div
          v-for="(picture, index) in item.cloudinarySwimlook"
          :key="index"
          class="designer__slider__cell"
        >
          <nuxt-link
            :to="{
              path: localePath(`/styles/${item.style.toLowerCase()}`),
              hash: `${item.modelName}`,
            }"
          >
            <figure class="designer__slider__cell__media">
              <nuxt-img
                :src="picture.public_id"
                :alt="`Photo n. ${index} of ${item.modelName}`"
                provider="cloudinary"
                width="400"
                class="designer__slider__cell__media-img"
              ></nuxt-img>
            </figure>
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="designer__end"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'DesignerPage',
  layout: 'home',
  validate({ params, store }) {
    return store.state.data.data.some((el) => el.slug === params.slug)
  },

  head() {
    return {
      title: this.designer.name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.designer.description,
        },
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `https://www.myswimlook.com/designers/${this.$route.params.slug}`,
        },
      ],
    }
  },

  computed: {
    ...mapState({
      designers: (state) => state.data.data,
    }),

    designer() {
      return this.designers.find(
        (designer) => designer.slug === this.$route.params.slug
      )
    },

    models() {
      const tmp = this.designer.items.map((el) => el.fields)
      return tmp
    },
  },
}
</script>

<style lang="scss" scoped>
.designer__intro {
  min-height: 32rem;
  display: flex;
  border-bottom: 1px solid $b-color;
}
.designer__intro__left {
  position: relative;
  border-right: 1px solid $b-color;
  flex-shrink: 0;
  width: 30vw;
  padding: 1.6rem;
  h2 {
    @extend %title-50;
    @extend %translateCenter;
    white-space: nowrap;
    @include phone {
      white-space: normal;
      text-align: center;
    }
  }
}

.designer__intro__left__visit-site {
  position: absolute;
  bottom: 0;
  right: 0;
}

.designer__intro__right {
  padding: 1.6rem;
  p {
    @extend %paragraph-16;
  }
}

.designer__slider__wrapper {
  position: relative;
  overflow-x: scroll;
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
  height: 30vw;
  width: 100vw;
  border-bottom: 1px solid $b-color;
  overscroll-behavior-x: contain;
  &::-webkit-scrollbar {
    display: none !important;
  }
}

.designer__slider__content {
  display: flex;
  position: absolute;
  width: auto;
  overflow: hidden;
  :nth-child(1) {
    position: sticky;
    left: 0;
    z-index: 4;
    background-color: get-color(primary, normal);
  }
  .designer__slider__cell:last-of-type {
    margin-right: 10vw;
  }
}

.designer__slider__cell {
  width: 22.5vw;
  height: 30vw;
  border-right: 1px solid $b-color;
  z-index: 1;
}

.designer__slider__cell-text {
  @extend %title-30;
  padding: 1.6rem;
  :nth-child(1) {
    margin: 4rem 0rem;
    color: get-color(basic, normal);
  }
}

.designer__slider__cell__media {
  height: 100%;
  position: relative;
  width: 100%;

  &-img {
    @extend %cover;
  }
}

.designer__end {
  height: 10rem;
}
</style>
