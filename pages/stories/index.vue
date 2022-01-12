<template>
  <div class="page__wrapper stories">
    <SocialHead :title="title" :description="description" :image="image" />
    <hero-two></hero-two>
    <div class="stories__slider__wrapper">
      <div class="stories__slider__content">
        <div
          v-for="(story, index) in adjustedStories"
          :key="index"
          class="stories__slider__cell"
        >
          <nuxt-link
            v-if="index !== 0"
            :to="localePath(`/stories/${story.fields.slug}`)"
            class="cell__content"
          >
            <figure class="cell__image__media">
              <nuxt-img
                :src="story.fields.images[0].public_id"
                :alt="`Photo of article ${story.fields.title}`"
                provider="cloudinary"
                width="400"
                class="cell__image__media-img"
              ></nuxt-img>
            </figure>
            <div class="cell__title">
              <h2>{{ story.fields.title }}</h2>
            </div>
          </nuxt-link>
          <div v-else class="stories__slider__cell-text">
            <h2>{{ story.intro }}</h2>
          </div>
        </div>
      </div>
    </div>
    <div class="stories__text">
      <p>Visit our instragram @myswimlook to share your ideas</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'StoriesPage',
  layout: 'homeLayout',
  scrollToTop: true,
  transition: 'slide-left',
  data() {
    return {
      storiesIntro: {
        intro: 'Latest Articles',
      },
      title:
        "mySwimlook Stories - The world's swimwear trends in a click - Be the first to know about new arrivals - Get inspired by our weekly fashion articles - Share your style with friends and celebrities",
      description:
        'Stay up to date with the latest fashion trends in swimwear around the world, discover emerging designers and learn what celebrities are choosing. Get inspired by browsing our curated selection of articles who cover everything you need know about beachwear fashion',
      image: 'https://myswimlook.com/social-media-card.jpg',
    }
  },

  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.description,
        },
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: 'https://myswimlook.com/styles',
        },
      ],
    }
  },

  computed: {
    ...mapState({
      stories: (state) => state.stories.story,
    }),
    adjustedStories() {
      const tmp = [...this.stories]
      tmp.splice(0, 0, this.storiesIntro)
      return tmp
    },
  },
}
</script>

<style lang="scss" scoped>
.stories__slider__wrapper {
  position: relative;
  overflow-x: scroll;
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
  height: 20vw;
  width: 100vw;
  border-top: 1px solid;
  border-bottom: 1px solid;
  overscroll-behavior-x: contain;
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
  width: 22.5vw;
  height: 20vw;
  border-right: 1px solid;

  &-text {
    height: 100%;
    width: 100%;
    background-color: get-color(primary, bright);
    padding-left: 10px;
    h2 {
      @extend %title-50;
      line-height: 1.2;
      font-size: max(5vw);
    }
    // &:nth-child(2) {
    //   text-align: end;
    // }
  }
}
.stories__slider__cell-txt:nth-child(2) {
  text-align: end;
}

.stories__text {
  border-bottom: 1px solid;

  @extend %paragraph-16;
  font-size: 3rem;
  line-height: 4rem;
  padding: 8rem 1.6rem 8rem 1.6rem;
}

.cell__content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.cell__image__media {
  height: 75%;
  position: relative;
  width: 100%;
  transition: transform 0.7s ease-out;
  overflow: hidden;

  // &:hover {
  //   transform: scale(0.98);
  // }

  &-img {
    @extend %cover;
    transition: transform 0.7s ease-out;

    &:hover {
      transform: scale(1.1);
    }
  }
}

.cell__title {
  position: relative;
  width: 100%;
  height: 25%;
  @extend %title-24;

  h2 {
    padding: 0.8rem;
    transition: 0.2s;
    &:hover {
      color: get-color(basic, normal);
    }
  }
}
</style>
