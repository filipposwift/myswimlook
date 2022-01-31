<template>
  <div class="page__wrapper designer">
    <SocialHead :title="designer.name" :description="designer.description" />
    <div class="designer__intro">
      <div class="designer__intro__left">
        <h1>{{ designer.name }}</h1>
        <div class="designer__intro__left__visit-site">
          <VisitSite :url="designer.website" />
        </div>
      </div>
      <div class="designer__intro__right">
        <h2>From {{ designer.name }} website:</h2>
        <p>{{ designer.description }}</p>
      </div>
    </div>
    <div
      v-for="item in models"
      :key="item.modelName"
      class="designer__slider__wrapper"
    >
      <div class="designer__slider__content">
        <div class="designer__slider__cell sticky">
          <div class="designer__slider__cell-text">
            <nuxt-link
              :to="{
                path: localePath(`/styles/${item.style.toLowerCase()}`),
                hash: `${item.modelName}`,
              }"
            >
              <h3>in {{ item.style }} Style</h3>
              <h2>{{ item.modelName }}</h2>
            </nuxt-link>
          </div>
          <div class="designer__slider__cell-swipe">
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
            <h3>Swipe to Scroll</h3>
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
  h1 {
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
  border-top: 1px solid $b-color;
  border-left: 1px solid $b-color;
}

.designer__intro__right {
  padding: 3.2rem 1.6rem;
  h2 {
    @extend %title-30;
    text-transform: uppercase;
    padding-bottom: 3.2rem;
  }
  p {
    @extend %paragraph-16;
  }
}

.designer__slider__wrapper {
  border-top: 1px solid $b-color;
  margin-top: 10rem;
  position: relative;
  overflow-x: scroll;
  overflow-y: hidden;
  overflow: -moz-scrollbars-none;
  scrollbar-width: none;
  -ms-overflow-style: none;
  height: 40vw;
  width: 100vw;
  border-bottom: 1px solid $b-color;
  overscroll-behavior-x: contain;
  @include phone {
    height: 50vw;
  }
}
.designer__slider__wrapper::-webkit-scrollbar {
  display: none !important;
}

.designer__slider__content {
  display: flex;
  position: absolute;
  width: auto;
  align-self: flex-start;
  overflow: hidden;
}

.designer__slider__cell:first-of-type {
  position: sticky;
  left: 0;
  z-index: 4;
  background-color: get-color(primary, bright);
}

.designer__slider__cell:last-of-type {
  margin-right: 10vw;
}

.designer__slider__cell {
  width: 30vw;
  height: 40vw;
  border-right: 1px solid $b-color;
  z-index: 1;

  @include phone {
    width: 60vw;
    height: 50vw;
  }
}

.designer__slider__cell-text {
  position: relative;

  padding: 1.6rem;
  margin: 4rem 0rem;
  h3 {
    @extend %title-30;
    padding-bottom: 8rem;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    &:hover {
      color: get-color(basic, normal);
    }
  }
  h2 {
    font-family: 'Work Sans', sans-serif;
    font-size: 3rem;
    text-align: center;
    text-transform: uppercase;
    color: get-color(secondary, dark);

    transition: all 0.3s ease-in-out;
    cursor: pointer;
    &:hover {
      color: get-color(basic, normal);
    }
    @include desktop {
      font-size: 4rem;
    }
    @include tablet {
      font-size: 5rem;
    }
  }
}

.designer__slider__cell-swipe {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
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

.arrow_left {
  transform: rotate(180deg);
}

.designer__slider__cell__media {
  height: 100%;
  position: relative;
  width: 100%;
  transition: transform 1s ease-out;
  overflow: hidden;

  &:hover {
    transform: scale(0.95);
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

.designer__end {
  height: 10rem;
}
</style>
