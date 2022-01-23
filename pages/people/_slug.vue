<template>
  <div class="page__wrapper person">
    <SocialHead
      :title="person.name"
      :description="person.description"
      :image="person.socialMedia[0].fields.image[0].secure_url"
    />

    <div class="person__intro">
      <h1>{{ person.name }}</h1>
      <p>{{ person.description }}</p>
    </div>
    <!-- <div v-if="getSwimsuit(ref.fields.reference)"></div> -->
    <div
      v-for="ref in person.socialMedia"
      :key="ref.fields.reference"
      class="person__swimsuit"
    >
      <div
        v-if="getSwimsuit(ref.fields.reference)"
        class="person__swimsuit__left__text"
      >
        <h2>
          {{ getSwimsuit(ref.fields.reference).designer }}
        </h2>
        <h3>
          {{ getSwimsuit(ref.fields.reference).modelName }}
        </h3>
        <div class="person__swimsuit__left__info">
          <div class="person__swimsuit__left__info__price">
            <p>USD {{ getSwimsuit(ref.fields.reference).price }}</p>
          </div>
          <VisitSite
            :url="getDesignerSite(getSwimsuit(ref.fields.reference).designer)"
          />
        </div>
        <div class="person__swimsuit__left__back">
          <button class="circle__back">
            <svg
              aria-hidden="true"
              class="progress"
              width="70"
              height="70"
              viewbox="0 0 70 70"
            >
              <path
                class="progress__circle"
                d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z"
              />
              <path
                class="progress__path"
                d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z"
                pathLength="1"
              />
            </svg>
            <figure>
              <svg
                aria-hidden="true"
                class="arrow"
                width="120"
                height="35"
                viewBox="0 -10.5 36 35"
              >
                <path
                  class="arrow_path"
                  d="M23.4198 0H22.1506C22.1506 3.8 25.3235 7.09333 29.8926 8.86667H0V10.1333H29.7657C25.1966 11.9067 22.0237 15.2 22.0237 19H23.2928C23.2928 14.06 29.3849 10.1333 37 10.1333V8.86667C29.5118 8.86667 23.4198 4.94 23.4198 0Z"
                ></path>
              </svg>
            </figure>
          </button>
          <nuxt-link :to="localePath('/people')" exact>
            <span>Back to people</span>
          </nuxt-link>
        </div>
        <div class="person__left__product-image__wrapper">
          <figure
            v-for="image in ref.fields.productImage"
            :key="image.public_id"
            class="person__left__swimsuit__media"
          >
            <nuxt-img
              :src="image.public_id"
              provider="cloudinary"
              width="400"
              class="person__left__swimsuit__image"
            >
            </nuxt-img>
          </figure>
          <p>Product image(s) may be referred to a different color or print</p>
        </div>
      </div>

      <div
        v-if="getSwimsuit(ref.fields.reference) && !isMobile"
        class="person__left__style__name"
      >
        <h2>{{ getSwimsuit(ref.fields.reference).style }} Style</h2>
      </div>
      <div class="person__right">
        <div class="person__right__inner">
          <carousel-instagram
            key="0"
            :post-id="[ref.fields.reference]"
          ></carousel-instagram>
        </div>
      </div>
      <div v-if="getSwimsuit(ref.fields.reference)" class="person__hashtag">
        <h3>
          #my<span>{{
            getSwimsuit(ref.fields.reference).style.toLowerCase()
          }}</span
          >swimlook
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'PersonPage',
  layout: 'home',
  validate({ params, store }) {
    return store.state.people.data.some((el) => el.slug === params.slug)
  },
  data() {
    return {
      windowSize: null,
    }
  },

  head() {
    return {
      title: this.person.name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.person.description,
        },
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `https://www.myswimlook.com/people/${this.$route.params.slug}`,
        },
      ],
    }
  },

  computed: {
    ...mapState({
      people: (state) => state.people.data,
      designers: (state) => state.data.data,
    }),

    ...mapGetters({
      swimsuits: 'data/getNewItems',
    }),

    person() {
      return this.people.find(
        (person) => person.slug === this.$route.params.slug
      )
    },

    reference() {
      const temp = this.person.socialMedia.map(
        (person) => person.fields.reference
      )
      return temp
    },

    designerSite() {
      return 'prova'
    },

    isMobile() {
      return this.windowSize <= 768
    },
  },

  mounted() {
    window.addEventListener('resize', () => {
      this.windowSize = window.innerWidth
    })
  },

  destroyed() {
    window.removeEventListener('resize', () => {
      this.windowSize = window.innerWidth
    })
  },

  methods: {
    getSwimsuit(ref) {
      return this.swimsuits.find((swimsuit) => {
        if (swimsuit.socialMedia) {
          return swimsuit.socialMedia.some((item) => {
            return item.fields.reference === ref
          })
        }
        return false
      })
    },
    getDesignerSite(name) {
      const designer = this.designers.find((designer) => {
        return designer.name === name
      })
      return designer.website
    },
  },
}
</script>

<style lang="scss" scoped>
.circle__back {
  width: 120px;
  height: 120px;
  pointer-events: auto;
  cursor: pointer;
  position: relative;
  display: inline-block;
  -webkit-clip-path: circle(50% at 50% 50%);
  clip-path: circle(50% at 50% 50%);
}

.arrow {
  transform: rotate(180deg);
}

.arrow_path {
  fill: get-color(secondary, normal);
}

.progress {
  position: absolute;
  width: 80px;
  height: 80px;
  top: calc(50% - 40px);
  left: calc(50% - 40px);
  transition: transform 0.4s cubic-bezier(0.7, 0, 0.3, 1);
}

.circle__back:hover .progress {
  transform: scale3d(1.05, 1.05, 1);
}

.progress__circle,
.progress__path {
  fill: none;
  stroke: $b-color;
  stroke-width: 1px;
}

.circle__back:focus-visible .progress__circle {
  fill: rgba(252, 196, 63, 0.4);
}

.progress__path {
  stroke: get-color(basic, normal);
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  transition: stroke-dashoffset 0.4s cubic-bezier(0.7, 0, 0.3, 1);
}

.circle__back:hover .progress__path {
  stroke-dashoffset: 0;
}

.person__intro {
  border-bottom: 1px solid $b-color;
  padding: 10rem 1.6rem;
  background-color: get-color(primary, bright);

  h1 {
    @extend %title-100;
  }
  p {
    @extend %paragraph-20;
  }
}

.person__swimsuit {
  display: grid;
  grid-template-columns: minmax(50%, 1fr) minmax(326px, 540px);
  grid-template-rows: 75px 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  position: relative;
  // min-height: 56rem;
  border-bottom: 1px solid $b-color;
  margin-bottom: 3rem;
  @include phone {
    grid-template-columns: minmax(40%, 1fr) minmax(326px, 540px);
  }
  @include xs-phone {
    grid-template-columns: 1fr;
    grid-template-rows: 75px 1fr 0.5fr;
  }
}

.person__left__style__name {
  grid-area: 1 / 1 / 2/ 2;
  border-right: 1px solid $b-color;
  @extend %center;
  position: relative;
  h2 {
    @extend %title-50;
    line-height: 1.2;
    text-align: center;
    padding-top: 0.8rem;
  }
}

.person__left__product-image__wrapper {
  display: flex;
  flex-direction: column;
  padding-top: 5rem;
  border-right: 1px solid $b-color;

  p {
    @extend %paragraph-16;
    text-align: center;
    padding: 1.6rem;
  }
}

.person__left__swimsuit__media {
  width: 100%;
  padding-bottom: 100%;
  position: relative;
}

.person__left__swimsuit__image {
  @extend %cover;
}

.person__swimsuit__left__text {
  grid-area: 2 / 1 / 3 / 2;
  padding: 1.6rem;

  h2 {
    @extend %title-80;
    text-align: center;
    padding: 10rem 0;
  }
  h3 {
    @extend %paragraph-20;
    font-size: 3rem;
    text-align: center;
    margin-bottom: 3.2rem;
  }
  @include xs-phone {
    grid-area: 2 / 1 / 3 / 2;
  }
}

.person__swimsuit__left__info {
  width: 100%;
  display: flex;

  justify-content: center;
  @include phone {
    flex-direction: column;
  }
}

.person__swimsuit__left__back {
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid $b-color;
  justify-content: center;
  align-items: center;
  padding: 1.6rem;

  span {
    @extend %paragraph-20;
    display: block;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
}

.person__swimsuit__left__info__price {
  background-color: get-color(primary, bright);
  border-top: 1px solid $b-color;
  border-left: 1px solid $b-color;

  width: 40%;
  padding: 0.8rem;
  @include phone {
    width: 100%;
  }
  p {
    @extend %paragraph-20;
    font-weight: 300;
    text-align: center;
  }
}

.person__right {
  min-height: 966px;
  grid-area: 2 / 2 / 3 / 3;
  width: 100%;
  position: relative;
  border-left: 1px solid $b-color;
  @include xs-phone {
    grid-area: 3 / 1 / 4 / 2;
  }
}

// .person__right__inner {
//   position: absolute;
//   top: -20%;
//   right: 0;
// }

.person__hashtag {
  grid-area: 1 / 2 / 2 / 3;
  border-top: 1px solid $b-color;
  @extend %center;
  @include xs-phone {
    grid-area: 1 / 1 / 2 / 2;
  }

  h3 {
    @extend %title-50;
    font-family: 'Wok Sans', sans-serif;
    font-weight: 300;
    line-height: 1.2;
    text-align: center;
    padding-top: 0.8rem;
    @include phone {
      font-size: 24px;
    }
    span {
      color: get-color(basic, normal);
    }
  }
}
</style>
