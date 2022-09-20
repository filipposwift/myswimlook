<template>
  <div :id="`${item.modelName}`" class="item__card__wrapper">
    <div class="item__card__title sticky">
      <div class="item__card__title__inner">
        <p class="is-mobile">{{ number }}</p>
        <h2>
          <span>{{ number }} - </span> {{ item.designer }}
        </h2>
        <h3>{{ item.modelName }}</h3>
      </div>
    </div>
    <div class="item__card__designer">
      <div class="item__card__designer__right">
        <figure
          v-for="(image, index) in images"
          :key="image.public_id"
          :class="`item__card__designer__right__media top-${returnLetter(
            index
          )}`"
        >
          <nuxt-img
            class="item__card__designer__right__media-img"
            provider="cloudinary"
            :src="encodeURI(image.public_id)"
            :alt="item.modelName"
            sizes="xs:100vw sm:100vw md:90vw xl:570px xxl:600px"
            width="600"
          />
          <PriceAndVisit
            v-if="designerSite"
            :price="item.price"
            :designer-site="designerSite"
            class="item__card__visit-site"
          />
        </figure>
      </div>
      <div class="item__card__designer__left sticky">
        <div
          v-dompurify-html="$md.render(item.description)"
          class="item__card__designer__left-description"
        ></div>
      </div>
    </div>
    <div v-if="slides.length > 0" class="item__card__instagram">
      <!-- <p>As Seen On Instragram</p> -->
      <carousel
        :slides="slides"
        :model-name="item.modelName"
        :designer="item.designer"
      ></carousel>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemCard',

  props: {
    item: {
      type: Object,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
  },

  computed: {
    titleWordCount() {
      return this.item.designer.length
    },
    images() {
      const temp = this.item.cloudinarySwimlook.slice(0, 2)
      return temp
    },

    slides() {
      if (this.item.socialMedia) {
        const temp = this.item.socialMedia.map(({ fields }) => ({
          image: fields.image,
          reference: fields.reference,
          name: fields.name,
        }))
        return temp
      }
      return []
    },

    designerSite() {
      if (this.item.designer) {
        const tmp = this.$store.state.data.data.find(
          (designer) => designer.name === this.item.designer
        )
        if (tmp) {
          return tmp.website
        }
        return false
      }
      return false
    },
  },
  mounted() {},
  methods: {
    returnLetter(index) {
      if (index === 0) {
        return 'one'
      }
      return 'none'
    },
  },
}
</script>

<style lang="scss" scoped>
.item__card__wrapper {
  width: 100%;

  // z-index: 0;
}

.item__card__designer {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row-reverse;
  position: relative;
  @include phone {
    flex-direction: column-reverse;
  }
}

.item__card__designer__right {
  width: 40%;
  max-width: 50rem;
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 75vh);
  border-left: 1px solid $b-color;

  // z-index: 2;
  @include desktop {
    width: 50%;
    max-width: none;
  }

  @include phone {
    width: 100%;
    max-width: none;
  }
}

.item__card__designer__right__media {
  height: 100%;
  width: 100%;
  position: relative;

  &.top-one {
    border-bottom: 1px solid $b-color;
  }
}

.item__card__designer__right__media-img {
  @extend %cover;
  // z-index: 0;
}

.item__card__designer__left {
  width: 60%;
  height: 50vh;
  flex-grow: 1;

  @include desktop {
    width: 50%;
  }

  @include phone {
    width: 100%;
    height: auto;
    margin-bottom: 0;
    top: 2rem;
  }
  &.sticky {
    align-self: flex-start;
    position: sticky;
    top: calc(51px + 35rem);

    @include phone {
      top: 50px;
    }
  }
}

.item__card__title {
  width: 100%;
  background-color: get-color(primary, bright);
  z-index: 2;
  border-bottom: 1px solid $b-color;
  height: calc((92vw / 12 * 0.75 * 2) - 1px);
  @include phone {
    height: 25rem;
  }

  &.sticky {
    align-self: flex-start;
    position: sticky;
    top: 50px;
  }
}

.item__card__title__inner {
  height: 100%;
  position: relative;
  border-top: 1px solid $b-color;
  background-color: get-color(primary, bright);

  h2 {
    @extend %title-80;
    text-align: center;
    padding-top: 2.4rem;
    padding-bottom: 2rem;
    @include phone {
      font-size: 5rem;
      padding-top: 0;
    }
    span {
      @include phone {
        display: none;
      }
    }
  }

  h3 {
    font-family: 'Work Sans', sans-serif;
    @extend %paragraph-20;
    text-transform: uppercase;
    text-align: center;
    padding: 0 2.4rem;
    @include tablet {
      font-size: 3rem;
    }
    @include phone {
      font-size: 20px;
      line-height: 1.4;
    }
    @include xs-phone {
      font-size: 16px;
      font-weight: 300;
      line-height: 1.2;
      padding: 0 7rem;
    }
    &.is-mobile {
      display: none;
      @include phone {
        display: block;
        font-family: 'FogtwoNo5', serif;
        font-size: 4rem;
        line-height: 1;
        color: get-color(secondary, normal);
        padding-top: 1.6rem;
      }
    }
  }
}

.item__card__visit-site {
  position: absolute;
  bottom: 0;
  right: 0;
  // z-index: 2;
  border-top: 1px solid $b-color;
  border-left: 1px solid $b-color;
  // @include phone {
  //   display: none;
  // }
}

.item__card__designer__left-description {
  @extend %paragraph-16;
  padding: 5rem 3.2rem;
  @include phone {
    display: none;
  }
}

.item__card__instagram {
  border-top: 1px solid $b-color;
  // padding: 1.6rem;
  overflow: hidden;

  position: relative;
  @extend %paragraph-20;
  text-transform: uppercase;
}
</style>
