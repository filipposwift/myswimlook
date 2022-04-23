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
        alt="women's white and pink floral bikini top"
        width="1460"
        sizes="xs:100vw sm:100vw md:100vw xl:1088px xxl:1460px"
        provider="cloudinary"
        class="styles__hero__media__image"
      ></nuxt-img
    ></hero>
    <HomeTheTitle>Inspiration</HomeTheTitle>
    <StorySliderWrapper :items="inspoStories.filtered" />
    <swipe-to-scroll v-if="inspoStories.show" class="show" />
    <HomeTheTitle class="margin-top">Your Swimsuits and You</HomeTheTitle>
    <StorySliderWrapper :items="whatYourStories.filtered" />
    <swipe-to-scroll v-if="whatYourStories.show" class="show" />
    <HomeTheTitle class="margin-top">Sustainability</HomeTheTitle>
    <StorySliderWrapper :items="sustainabilityStories.filtered" />
    <swipe-to-scroll v-if="sustainabilityStories.show" class="show" />
    <HomeTheTitle class="margin-top">Body Positivity</HomeTheTitle>
    <StorySliderWrapper :items="positivityStories.filtered" />
    <swipe-to-scroll v-if="positivityStories.show" class="show" />
    <HomeTheTitle class="margin-top">News and Trends</HomeTheTitle>
    <StorySliderWrapper :items="newsStories.filtered" />
    <swipe-to-scroll v-if="newsStories.show" class="show" />
    <div class="stories__text">
      <span>Share your swim looks #myswimlook </span
      ><a
        href="https://www.instagram.com/myswimlook/"
        target="_blank"
        rel="nofollow noopener noreferrer"
        >@myswimlook</a
      >
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
    whatYourStories() {
      let show = false
      const tmp = [...this.stories]
      const filtered = tmp.filter(
        (el) => el.fields.category === 'What Your Swimsuits Say About You'
      )
      if (filtered.length > 3) {
        show = true
      }
      return { filtered, show }
    },
    sustainabilityStories() {
      let show = false
      const tmp = [...this.stories]
      const filtered = tmp.filter(
        (el) => el.fields.category === 'Save the Planet'
      )
      if (filtered.length > 3) {
        show = true
      }
      return { filtered, show }
    },
    positivityStories() {
      let show = false
      const tmp = [...this.stories]
      const filtered = tmp.filter(
        (el) => el.fields.category === 'Love Your Body'
      )
      if (filtered.length > 3) {
        show = true
      }
      return { filtered, show }
    },
    newsStories() {
      let show = false
      const tmp = [...this.stories]
      const filtered = tmp.filter(
        (el) => el.fields.category === 'News and Trends'
      )
      if (filtered.length > 3) {
        show = true
      }
      return { filtered, show }
    },
    inspoStories() {
      let show = false
      const tmp = [...this.stories]
      const filtered = tmp.filter(
        (el) =>
          el.fields.category === 'First Look' ||
          el.fields.category === 'Get the Look'
      )
      if (filtered.length > 3) {
        show = true
      }
      return { filtered, show }
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

.show {
  @include phone {
    display: none;
  }
}
.margin-top {
  margin-top: 2.4rem;
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
.stories__text {
  border-bottom: 1px solid $b-color;

  @extend %paragraph-16;
  font-size: 3rem;
  line-height: 4rem;
  padding: 8rem 1.6rem 8rem 1.6rem;

  a {
    color: get-color(basic, normal);
  }

  @include phone {
    padding: 16rem 1.6rem 16rem 1.6rem;
    font-size: 18px;
    line-height: 1.2;
  }
}

.styles__hero__media__image {
  @extend %cover;
}
</style>
