<template>
  <div class="page__wrapper people">
    <SocialHead :title="title" :description="description" :image="image" />
    <div class="people__grid people__grid--large">
      <div
        v-for="(person, index) in adjustedPeople"
        :key="index"
        class="people__grid__cell"
      >
        <nuxt-link
          v-if="person.name"
          :to="localePath(`/people/${person.slug}`)"
        >
          <figure class="people__grid__cell__media">
            <nuxt-img
              :src="person.socialMedia[0].fields.image[0].public_id"
              provider="cloudinary"
              width="400"
              class="people__grid__cell__media-img"
            ></nuxt-img>
            <figcaption class="people__grid__cell__media-txt">
              <p>{{ person.name }}</p>
            </figcaption>
          </figure>
        </nuxt-link>
        <div v-else class="people__grid__cell__text">
          <h2>{{ person.intro }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PeoplePage',
  layout: 'homeLayout',
  scrollToTop: true,

  data() {
    return {
      peopleSpace: {
        intro: '',
      },
      peopleIntro: {
        intro: 'Discover and Share',
      },
      title:
        "mySwimlook People - See what your favorite influencers are wearing - We'll help you find the best swimsuit for any occasion and style - Search for people who have similar style tastes as you - Share your style with friends and celebrities",
      description:
        "We believe that you can always find someone who has a style you want. You just need to look at what they're wearing and take some inspiration from their choices. There's a wide spectrum in terms of age and location; some people are influencers, content creators or even just your average Mary. They all have their own unique interests: some can make us feel good by being authentic while others catch our attention with aesthetically pleasing images",
      image: 'https://myswimlook.com/social-media-card.jpg',
    }
  },

  computed: {
    ...mapState({
      people: (state) => state.people.data,
    }),
    adjustedPeople() {
      const tmp = [...this.people]
      const shuffled = tmp.sort(() => Math.random() - 0.5)
      let i = 0
      while (i * 3 < shuffled.length) {
        shuffled.splice(++i * 3, 0, this.peopleSpace)
      }
      shuffled.splice(0, 0, this.peopleIntro)
      // tmp.splice(1, 0, this.peopleIntro)

      return shuffled
    },
  },

  methods: {},
}
</script>

<style lang="scss" scoped>
.people__grid {
  display: grid;
  grid-template-columns: repeat(4, 25%);
  grid-auto-flow: dense;
}

.people__grid--large {
  grid-auto-rows: 50vmin;
  margin-top: 0.5vw;
  --grid-padding: 0.5vw;
  border-top: 1px solid;
}

.people__grid__cell {
  border-bottom: 1px solid;
}

.people__grid__cell:nth-child(1) {
  border-bottom: 0px;
}

.people__grid__cell:nth-child(even) {
  border-left: 1px solid;
}

.people__grid__cell:nth-child(4n + 3) {
  border-left: 1px solid;
}

.people__grid__cell__media {
  width: calc(100% - var(--grid-padding) * 2);
  height: calc(100% - var(--grid-padding) * 2);
  margin: var(--grid-padding);
  display: block;
  position: relative;
  overflow: hidden;

  transition: transform 1s ease-out;

  &:hover {
    transform: scale(0.95);
  }
}

.people__grid__cell__media-img {
  @extend %cover;
  cursor: pointer;
  transition: transform 1s ease-out;

  &:hover {
    transform: scale(1.2);
  }
}

.people__grid__cell__media-txt {
  background-color: get-color(primary, normal);
  opacity: 0.65;
  position: absolute;
  bottom: 0;
  right: 0;
  // width: 50%;
  padding: 0.8rem;

  p {
    @extend %paragraph-16;
    line-height: 1.2;
    font-weight: 500;
    text-align: right;
  }
}

.people__grid__cell__text {
  padding: 1.6rem 0.8rem;
  @extend %title-40;
}
</style>
