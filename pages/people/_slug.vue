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
    <div
      v-for="ref in person.socialMedia"
      :key="ref.fields.reference"
      class="person__swimsuit"
    >
      <div
        v-if="getSwimsuit(ref.fields.reference)"
        class="person__swimsuit__left__text"
      >
        <div class="person__swimsuit__left__text__container">
          <h2>
            {{ getSwimsuit(ref.fields.reference).designer }}
          </h2>
          <h3>
            {{ getSwimsuit(ref.fields.reference).modelName }}
          </h3>

          <div class="person__swimsuit__price-visit">
            <PriceAndVisit
              :price="getSwimsuit(ref.fields.reference).price"
              :designer-site="
                getDesignerSite(getSwimsuit(ref.fields.reference).designer)
              "
            />
          </div>
        </div>
        <div class="person__swimsuit__left__back">
          <ArrowBackCircle link="people" />
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
              width="600"
              alt="product image"
              class="person__left__swimsuit__image"
            >
            </nuxt-img>
          </figure>
          <p v-if="ref.fields.productImage">
            Product image(s) may be referred to a different color or print
          </p>
        </div>
      </div>

      <div
        v-if="getSwimsuit(ref.fields.reference)"
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
.person__intro {
  border-bottom: 1px solid $b-color;
  padding: 10rem 1.6rem;
  background-color: get-color(primary, bright);

  h1 {
    @extend %title-100;
  }
  p {
    @extend %paragraph-20;
    @include xs-phone {
      font-size: 16px;
      font-weight: 300;
    }
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
    display: flex;
    flex-direction: column;
  }
}

.person__left__style__name {
  grid-area: 1 / 1 / 2/ 2;
  border-right: 1px solid $b-color;
  border-top: 1px solid $b-color;
  border-bottom: 1px solid $b-color;
  @extend %center;
  position: relative;
  @include phone {
    display: none;
  }
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
  border-bottom: 1px solid $b-color;
  @include phone {
    border: 0;
  }

  p {
    @extend %paragraph-16;
    text-align: center;
    padding: 1.6rem;
  }
}

.person__left__swimsuit__media {
  width: 100%;
  max-width: 60rem;
  padding-bottom: 100%;
  position: relative;
}

.person__left__swimsuit__image {
  @extend %cover;
}

.person__swimsuit__left__text {
  grid-area: 2 / 1 / 3 / 2;
  // padding: 1.6rem;

  h2 {
    @extend %title-80;
    text-align: center;
    padding: 10rem 0;
    @include phone {
      font-size: 6rem;
    }
  }
  h3 {
    @extend %title-30;
    font-family: 'Work Sans', sans-serif;
    text-align: center;
    margin-bottom: 15rem;
    @include phone {
      font-size: 3rem;
    }
    @include xs-phone {
      font-size: 24px;
    }
  }
  @include xs-phone {
    order: 3;
    margin-top: -200px;
    border-top: 1px solid $b-color;
    margin-bottom: 40px;
  }
}

.person__swimsuit__left__text__container {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  border-right: 1px solid $b-color;
  justify-content: center;
  @include phone {
    border: 0;
  }
}

.person__swimsuit__left__back {
  width: 100%;
  display: flex;
  flex-direction: column;
  border-top: 1px solid $b-color;
  border-right: 1px solid $b-color;
  border-bottom: 1px solid $b-color;
  justify-content: center;
  align-items: center;
  padding: 1.6rem;
  @include phone {
    border-right: 0;
  }

  span {
    @extend %paragraph-20-light;
    display: block;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 2px;
    @include phone {
      font-size: 16px;
      font-weight: 300;
    }
  }
}

.person__swimsuit__price-visit {
  border-top: 1px solid $b-color;
  border-left: 1px solid $b-color;
  position: absolute;
  right: 0;
  bottom: 0;
}

.person__right {
  min-height: 966px;
  grid-area: 2 / 2 / 3 / 3;
  width: 100%;
  position: relative;

  @include xs-phone {
    order: 2;
  }
}

.person__hashtag {
  grid-area: 1 / 2 / 2 / 3;
  border-top: 1px solid $b-color;
  border-bottom: 1px solid $b-color;
  @extend %center;
  @include phone {
    border: 0;
  }
  @include xs-phone {
    order: 1;
    border-top: 0px;
    padding: 4.8rem 0;
  }

  h3 {
    @extend %title-30;
    font-family: 'Wok Sans', sans-serif;
    font-weight: 300;
    line-height: 1.2;
    text-align: center;
    padding-top: 0.8rem;
    @include xs-phone {
      font-size: 2.4rem;
    }

    span {
      color: get-color(basic, normal);
    }
  }
}
</style>
