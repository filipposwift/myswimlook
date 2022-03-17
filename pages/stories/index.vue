<template>
  <div class="page__wrapper stories">
    <SocialHead
      :title="title"
      :description="description"
      :image="image"
      :url="url"
    />
    <hero>
      <template #title> Stories </template>
      <template #verticalTitle>Swimwear trends in a click</template>
      <template #header>
        Stay up to date with the latest fashion trends, discover emerging
        designers and learn what celebrities are choosing
      </template>
      <template #credit>
        <a
          href="https://unsplash.com/@shotbythegypsy?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
          target="_blank"
          rel="nofollow noopener noreferrer"
          class="credit"
          >Emily Goodhart</a
        ><span> on </span
        ><a
          href="https://unsplash.com/"
          target="_blank"
          rel="nofollow noopener noreferrer"
          class="credit"
          >Unsplash</a
        >
      </template>
      <nuxt-img
        src="swimlook/styles/cover-styles"
        alt="Hero image of woman in swimwear"
        width="2000"
        provider="cloudinary"
        class="styles__hero__media__image"
      ></nuxt-img
    ></hero>
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
                :src="story.fields.coverImage[0].public_id"
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
    <swipe-to-scroll />
    <div class="stories__text">
      <p>Visit our instragram @myswimlook to share your ideas</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { slideLeft } from '@/utils/transitions'
export default {
  name: 'StoriesPage',
  layout: 'home',
  scrollToTop: true,
  transition: slideLeft,
  data() {
    return {
      storiesIntro: {
        intro: 'Latest Articles',
      },
      title:
        "mySwimlook Stories - The world's swimwear trends in a click - Be the first to know about new arrivals - Get inspired by our weekly fashion articles - Share your style with friends and celebrities",
      description:
        'Stay up to date with the latest fashion trends in swimwear around the world, discover emerging designers and learn what celebrities are choosing. Get inspired by browsing our curated selection of articles who cover everything you need know about beachwear fashion',
      image:
        'https://res.cloudinary.com/swimlook/image/upload/v1639078741/swimlook/styles/cover-styles.jpg',
      url: 'https://www.myswimlook.com/stories',
    }
  },

  head() {
    return {
      title: this.title,
      meta: [
        {
          vmid: 'description',
          hid: 'description',
          name: 'description',
          content: this.description,
        },
      ],
      link: [
        {
          vmid: 'canonical',
          hid: 'canonical',
          rel: 'canonical',
          href: 'https://www.myswimlook.com/stories/',
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
span {
  @extend %paragraph-16;
  font-size: 14px;
  padding-right: 0.8rem;
}
.credit {
  @extend %paragraph-16;
  font-size: 14px;
  color: get-color(secondary, normal);
  transition: all 0.3s ease-in-out;
  padding-right: 0.8rem;
  &:hover {
    color: get-color(basic, normal);
  }
}

.stories__slider__wrapper {
  position: relative;
  overflow-x: scroll;
  overflow-y: hidden;
  overflow: -moz-scrollbars-none;
  scrollbar-width: none;
  -ms-overflow-style: none;
  height: 40vw;
  width: 100vw;
  border-top: 1px solid $b-color;
  border-bottom: 1px solid $b-color;
  overscroll-behavior-x: contain;
  @include phone {
    height: 80vw;
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
  height: 40vw;
  border-right: 1px solid $b-color;
  @include tablet {
    width: 40vw;
  }
  @include phone {
    height: 80vw;
    width: 90vw;
  }
}

.stories__slider__cell-text {
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

.stories__text {
  border-bottom: 1px solid $b-color;

  @extend %paragraph-16;
  font-size: 3rem;
  line-height: 4rem;
  padding: 8rem 1.6rem 8rem 1.6rem;

  @include phone {
    padding: 16rem 1.6rem 16rem 1.6rem;
    font-size: 18px;
    line-height: 1.2;
  }
}

.cell__content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.cell__image__media {
  height: 80%;
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
  width: 100%;
  height: 20%;
  @extend %title-24;
  border-top: 1px solid $b-color;
  padding: 4rem 1.6rem;
  @include phone {
    font-size: 20px;
    padding: 4rem 1.6rem;
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
}

.styles__hero__media__image {
  @extend %cover;
}
</style>
