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
              alt="Image from instagram post"
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
import _shuffle from 'lodash/shuffle'
import { slideLeft } from '@/utils/transitions'
export default {
  name: 'PeoplePage',
  layout: 'home',
  scrollToTop: true,
  transition: slideLeft,

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

      adjustedPeople: null,
    }
  },

  computed: {
    ...mapState({
      people: (state) => state.people.data,
    }),
    // adjustedPeople() {
    //   const tmp = [...this.people]
    //   const shuffled = tmp
    //     .map((value) => ({ value, sort: Math.random() }))
    //     .sort((a, b) => a.sort - b.sort)
    //     .map(({ value }) => value)

    //   let i = 0
    //   while (i * 3 < shuffled.length) {
    //     shuffled.splice(++i * 3, 0, this.peopleSpace)
    //   }
    //   shuffled.splice(0, 0, this.peopleIntro)
    //   // tmp.splice(1, 0, this.peopleIntro)

    //   return shuffled
    // },
  },

  mounted() {
    this.adjustedPeople = this.adjusted()
  },

  methods: {
    adjusted() {
      const tmp = [...this.people]
      const shuffled = _shuffle(tmp)

      let i = 0
      while (i * 3 < shuffled.length) {
        shuffled.splice(++i * 3, 0, this.peopleSpace)
      }
      shuffled.splice(0, 0, this.peopleIntro)
      // tmp.splice(1, 0, this.peopleIntro)

      return shuffled
    },
  },
}
</script>

<style lang="scss" scoped>
.people__grid {
  display: grid;
  grid-template-columns: repeat(4, 25%);
  grid-auto-flow: dense;
  @include phone {
    grid-template-columns: repeat(2, 50%);
  }
}

.people__grid--large {
  grid-auto-rows: 50vmin;
  margin-top: 0.5vw;
  --grid-padding: 0.5vw;
  border-top: 1px solid $b-color;
}

.people__grid__cell {
  border-bottom: 1px solid $b-color;
}

.people__grid__cell:nth-child(1) {
  border-bottom: 0px;
}

.people__grid__cell:nth-child(even) {
  border-left: 1px solid $b-color;
}

.people__grid__cell:nth-child(4n + 3) {
  border-left: 1px solid $b-color;
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
    transform: translate3d(0, 0, 0);
    transform: scale(0.95);
  }
}

.people__grid__cell__media-img {
  @extend %cover;
  cursor: pointer;
  transition: transform 1s ease-out;

  &:hover {
    transform: translate3d(0, 0, 0);
    transform: scale(1.2);
  }
}

.people__grid__cell__media-txt {
  display: block;
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
  position: relative;
  height: 100%;
  h2 {
    @extend %title-100;
    position: absolute;
    left: -75%;
    bottom: 0;
    transform: rotate(-90deg);
    white-space: nowrap;
    @include phone {
      font-size: 60px;
      position: static;
      transform: none;
      white-space: normal;
      overflow-wrap: normal;
    }
    @include xs-phone {
      font-size: 40px;
    }
  }
}
</style>
