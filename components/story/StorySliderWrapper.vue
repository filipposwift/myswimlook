<template>
  <div class="stories__slider__wrapper">
    <div class="stories__slider__content">
      <div
        v-for="(story, index) in items"
        :key="index"
        class="stories__slider__cell"
      >
        <nuxt-link
          :to="localePath(`/stories/${story.fields.slug}/`)"
          class="cell__content"
        >
          <figure class="cell__image__media">
            <nuxt-img
              :src="encodeURI(story.fields.coverImage[0].public_id)"
              :alt="`Photo of article ${story.fields.title}`"
              provider="cloudinary"
              width="400"
              class="cell__image__media-img"
            ></nuxt-img>
          </figure>

          <div class="cell__title">
            <div class="title">
              <h2>{{ story.fields.title }}</h2>
            </div>
            <div class="author">
              <h3>{{ story.fields.author }}</h3>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.stories__slider__wrapper {
  position: relative;
  overflow-x: scroll;
  overflow-y: hidden;
  overflow: -moz-scrollbars-none;
  scrollbar-width: none;
  -ms-overflow-style: none;
  height: 50vw;
  width: 100vw;

  // border-top: 1px solid $b-color;
  border-bottom: 1px solid $b-color;
  overscroll-behavior-x: contain;
  @include phone {
    height: 100vw;
  }
}
.stories__slider__wrapper::-webkit-scrollbar {
  display: none !important;
}

.stories__slider__content {
  display: flex;
  overflow: hidden;
  position: absolute;
  width: auto;
}

.stories__slider__cell:last-of-type {
  margin-right: 10vw;
}

.stories__slider__cell {
  width: 30vw;
  height: 50vw;
  border-right: 1px solid $b-color;
  @include tablet {
    width: 40vw;
  }
  @include phone {
    height: 100vw;
    width: 80vw;
  }
}

.cell__content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.cell__image__media {
  height: 0;
  padding-bottom: 133.3%;
  position: relative;
  width: 100%;
  transition: transform 1s ease-out;
  overflow: hidden;

  @include tablet {
    padding-bottom: 100%;
  }

  &:hover {
    transform: translate3d(0, 0, 0);
    transform: scale(0.95);
  }

  &-img {
    @extend %cover;
    transition: transform 1s ease-out;
    cursor: pointer;

    &:hover {
      transform: translate3d(0, 0, 0);
      transform: scale(1.2);
    }
  }
}

.cell__title {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 20%;
  @extend %title-24;
  border-top: 1px solid $b-color;
  padding: 4rem 1.6rem;
  @include tablet {
    padding: 2rem 1.6rem;
  }
  @include phone {
    font-size: 20px;
    padding: 1rem 1.6rem;
  }
  @include xs-phone {
    height: 35%;
  }

  h2 {
    // padding: 3.2rem 1.6rem;
    transition: 0.2s;
    &:hover {
      color: get-color(basic, normal);
    }
  }
  h3 {
    font-family: 'Work Sans', sans-serif;
    color: #000000;
    font-weight: 300;
    line-height: 1.2;
    font-size: 16px;
    text-align: center;
    margin-top: 1.6rem;
    @include phone {
      margin-top: 0;
    }
  }
  .title {
    flex: 1 0 90%;
    @include tablet {
      flex: 1 0 60%;
    }
    @include phone {
      flex: 1 0 80%;
    }
  }
  .author {
    flex-grow: 1;
    // @include phone {
    //   display: none;
    // }
  }
}
</style>
