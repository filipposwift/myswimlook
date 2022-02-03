<template>
  <div :id="`${item.modelName}`" class="item__card__wrapper">
    <div class="item__card__designer">
      <div class="item__card__designer__right">
        <figure
          v-for="image in images"
          :key="image.public_id"
          class="item__card__designer__right__media"
        >
          <nuxt-img
            class="item__card__designer__right__media-img"
            provider="cloudinary"
            :src="`${image.public_id}`"
            width="800"
          />
        </figure>
      </div>
      <div class="item__card__designer__left sticky">
        <div class="item__card__designer__left-title">
          <div class="item__card__designer__left-title__inner">
            <h1
              :class="
                titleWordCount < 20
                  ? isMobile
                    ? 'title30'
                    : 'title80'
                  : isMobile
                  ? 'title30'
                  : 'title60'
              "
            >
              {{ item.designer }}
            </h1>
            <p>{{ item.modelName }}</p>
            <div v-if="isNewMobile" class="item__card__designer__left-price">
              <p>USD {{ item.price }}</p>
            </div>
            <div
              v-if="designerSite && isNewMobile"
              class="item__card__designer__left-visit-site"
            >
              <VisitSite :url="designerSite" />
            </div>
          </div>
        </div>
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
  },

  data() {
    return {
      windowSize: 800,
    }
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
    isMobile() {
      return this.windowSize <= 768 && this.titleWordCount > 10
    },
    isNewMobile() {
      return this.windowSize > 768
    },
  },
  mounted() {
    this.windowSize = window.innerWidth
    window.addEventListener('resize', () => {
      this.windowSize = window.innerWidth
    })
  },
}
</script>

<style lang="scss" scoped>
.item__card__wrapper {
  width: 100%;
  border-top: 1px solid $b-color;
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
  grid-template-rows: repeat(2, 100vh);
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
  border-bottom: 1px solid $b-color;
}

.item__card__designer__right__media-img {
  @extend %cover;
  // z-index: 0;
}

.item__card__designer__left {
  width: 60%;
  height: 50vh;
  // min-height: fit-content;
  flex-grow: 1;

  @include desktop {
    width: 50%;
  }

  @include phone {
    width: 100%;
    height: auto;
    margin-bottom: 3.2rem;
    // display: none;
    top: 2rem;
  }
  &.sticky {
    align-self: flex-start;
    position: sticky;
    top: 10rem;
    overflow: hidden;
    @include phone {
      top: 50px;
    }
  }
}

.item__card__designer__left-title {
  width: 110%;
  background-color: get-color(primary, bright);
  border-right: 1px solid $b-color;
  border-bottom: 1px solid $b-color;
  height: 25rem;
  // z-index: 3;
  @include desktop {
    height: 35rem;
  }
  @include phone {
    background-color: transparent;
    width: 100%;
    height: 100px;
  }

  p {
    @extend %paragraph-20;
    text-transform: uppercase;
    text-align: center;
    padding: 2.4rem;
    @include phone {
      dispaly: block;
      width: 100%;
      background-color: get-color(primary, bright);
      font-size: 16px;
      line-height: 1.2;
    }
  }
}

.item__card__designer__left-title__inner {
  height: 100%;
  position: relative;
  border-top: 1px solid $b-color;
}

.title80 {
  @extend %title-80;
  text-align: center;
  padding-top: 2.4rem;
  padding-bottom: 2rem;
}

.title60 {
  @extend %title-60;
  text-align: center;
  padding-top: 2.4rem;
  padding-bottom: 2rem;
}

.title30 {
  @extend %title-30;
  text-align: center;
  padding-top: 2.4rem;
  padding-bottom: 2rem;
  background-color: get-color(primary, bright);
}

.item__card__designer__left-price {
  @extend %center;
  width: 20%;
  padding: 0.8rem;
  border-top: 1px solid $b-color;
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: get-color(primary, normal);
  // z-index: 2;
  @include desktop {
    width: 30%;
  }
  @include tablet {
    width: 40%;
  }

  p {
    @extend %paragraph-20;
    font-weight: 300;
    letter-spacing: 2px;
    display: block;
    padding: 0px;

    @include phone {
      font-size: 16px;
    }
  }
}

.item__card__designer__left-visit-site {
  position: absolute;
  bottom: 0;
  right: 20%;
  z-index: 2;
  border-top: 1px solid $b-color;
  border-left: 1px solid $b-color;
  border-right: 1px solid $b-color;

  @include desktop {
    right: 30%;
  }
  @include tablet {
    right: 40%;
  }
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
