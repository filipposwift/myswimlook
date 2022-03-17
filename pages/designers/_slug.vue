<template>
  <div class="page__wrapper designer">
    <SocialHead
      :title="designer.name"
      :description="designer.description"
      :url="`https://www.myswimlook.com/designers/${$route.params.slug}`"
    />
    <div class="designer__intro">
      <div class="designer__intro__left">
        <h1>{{ designer.name }}</h1>
        <div class="designer__intro__left__visit-site">
          <VisitSite :url="designer.website" />
        </div>
      </div>
      <div class="designer__intro__right">
        <h2 v-if="!designer.original">From {{ designer.name }} website:</h2>
        <div
          v-dompurify-html="$md.render(designer.description)"
          class="description"
        ></div>
        <!-- <p>{{ designer.description }}</p> -->
      </div>
    </div>
    <div
      v-for="item in models"
      :key="item.modelName"
      class="designer__container"
    >
      <h4>in {{ item.style }} Style</h4>
      <div class="designer__slider__wrapper">
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
            <price-and-visit
              :price="item.price"
              :designer-site="designer.website"
              class="designer__price-visit"
            />
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
      <swipe-to-scroll />
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
          vmid: 'description',
          hid: 'description',
          name: 'description',
          content: this.designer.description,
        },
      ],
      link: [
        {
          vmid: 'canonical',
          hid: 'canonical',
          rel: 'canonical',
          href: `https://www.myswimlook.com/designers/${this.$route.params.slug}/`,
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
  @include xs-phone {
    flex-direction: column;
    margin-top: 10rem;
    margin-bottom: 20rem;
  }
}
.designer__intro__left {
  position: relative;
  border-right: 1px solid $b-color;
  flex-shrink: 0;
  width: 30vw;
  padding: 1.6rem;
  @include xs-phone {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-bottom: 10rem;
    border-right: 0px;
    border-bottom: 1px solid $b-color;
  }
  h1 {
    @extend %title-50;
    @extend %translateCenter;
    white-space: nowrap;
    @include phone {
      white-space: normal;
      text-align: center;
    }
    @include xs-phone {
      flex-grow: 1;
      text-align: left;
      position: static;
      transform: none;
    }
  }
}

.designer__intro__left__visit-site {
  position: absolute;
  bottom: 0;
  right: 0;
  border-top: 1px solid $b-color;
  border-left: 1px solid $b-color;
  @include xs-phone {
    // position: static;
    display: none;
  }
}

.designer__intro__right {
  padding: 3.2rem 1.6rem;
  h2 {
    @extend %title-20;
    text-transform: uppercase;
    padding-bottom: 3.2rem;
  }

  .description {
    @extend %paragraph-16;
    white-space: pre-line;
  }
}

.designer__container {
  margin-top: 10rem;
  h4 {
    display: none;
    @extend %title-30;
    padding: 1.6rem;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    &:hover {
      color: get-color(basic, normal);
    }
    @include phone {
      display: block;
    }
  }
}

.designer__slider__wrapper {
  border-top: 1px solid $b-color;

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
    height: 85vw;
  }
}
.designer__slider__wrapper::-webkit-scrollbar {
  display: none !important;
}

.designer__slider__content {
  display: flex;
  position: absolute;
  width: auto;
  // align-self: flex-start;
  // overflow: hidden;
}

.designer__slider__cell:first-of-type {
  position: sticky;
  align-self: flex-start;
  left: 0;
  z-index: 4;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: get-color(primary, bright);
  @include phone {
    width: 20vw;
    height: 85vw;
  }
  @include xs-phone {
    width: 25vw;
  }
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
    width: 90vw;
    height: 85vw;
  }
}

.designer__slider__cell-text {
  @extend %center;
  height: 80%;
  width: 100%;
  background-color: get-color(primary, bright);
  padding-left: 10px;
  position: relative;
  h3 {
    @extend %title-30;
    padding-bottom: 8rem;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    &:hover {
      color: get-color(basic, normal);
    }
    @include phone {
      display: none;
    }
  }
  h2 {
    font-family: 'Work Sans', sans-serif;
    font-size: 3rem;
    text-align: center;
    text-transform: uppercase;

    transition: all 0.3s ease-in-out;
    cursor: pointer;
    &:hover {
      color: get-color(basic, normal);
    }
    @include desktop {
      font-size: 3.5rem;
    }
    @include tablet {
      font-size: 4rem;
    }
    @include phone {
      font-size: 2.5rem;
      transform: rotate(-90deg);
      width: 50vw;
      line-height: 1.5;
    }
    @include xs-phone {
      font-size: 20px;
    }
  }
}

.designer__price-visit {
  border-top: 1px solid $b-color;
  border-left: 1px solid $b-color;
  margin-left: auto;
  width: fit-content;
  @include phone {
    border-left: 0px;
  }
}

.designer__slider__cell__media {
  height: 100%;
  position: relative;
  width: 100%;
  transition: transform 1s ease-out;
  overflow: hidden;

  &:hover {
    transform: translate3d(0, 0, 0);
    transform: scale(0.95);
  }

  &-img {
    @extend %cover;
    cursor: pointer;
    transition: transform 1s ease-out;

    &:hover {
      transform: translate3d(0, 0, 0);
      transform: scale(1.2);
    }
  }
}

.designer__end {
  height: 10rem;
}
</style>
