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

      <div class="item__card__designer__left">
        <div class="item__card__designer__left-title">
          <div class="item__card__designer__left-title__inner">
            <h1 :class="titleWordCount < 20 ? 'title80' : 'title60'">
              {{ item.designer }}
            </h1>
            <p>{{ item.modelName }}</p>
            <div class="item__card__designer__left-price">
              <h2>USD {{ item.price }}</h2>
            </div>
            <div class="item__card__designer__left-visit-site">
              <a
                :href="designerSite"
                target="_blank"
                rel="nofollow noopener noreferrer"
                >Visit Site</a
              >
            </div>
          </div>
        </div>
        <div
          v-dompurify-html="$md.render(item.description)"
          class="item__card__designer__left-description"
        ></div>
      </div>
    </div>
    <div class="item__card__instagram">
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
      return this.$store.state.data.data.find(
        (designer) => designer.name === this.item.designer
      ).website
    },
  },
}
</script>

<style lang="scss" scoped>
.item__card__wrapper {
  width: 100%;
  border-top: 1px solid $b-color;
  z-index: 0;
}

.item__card__designer {
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  position: relative;
}

.item__card__designer__right {
  width: 40%;
  max-width: 50rem;
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 100vh);
  border-left: 1px solid $b-color;
}

.item__card__designer__right__media {
  height: 100%;
  width: 100%;
  position: relative;
  border-bottom: 1px solid $b-color;
}

.item__card__designer__right__media-img {
  @extend %cover;
  z-index: 0;
}

.item__card__designer__left {
  width: 60%;
  height: 75vh;
  position: relative;

  flex-grow: 1;
  position: sticky;
  top: 9rem;
}

.item__card__designer__left-title {
  width: 110%;
  background-color: get-color(primary, bright);
  // border-top: 1px solid $b-color;
  border-right: 1px solid $b-color;
  border-bottom: 1px solid $b-color;
  // margin-top: 10rem;

  height: 25rem;
  z-index: 2;

  p {
    @extend %paragraph-20;
    text-transform: uppercase;
    text-align: center;
    padding-bottom: 2.4rem;
  }
}

.item__card__designer__left-title__inner {
  height: 100%;
  position: relative;
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

.item__card__designer__left-price {
  @extend %center;

  width: 20%;
  height: 5rem;
  border-left: 1px solid $b-color;
  border-top: 1px solid $b-color;
  // border-right: 1px solid $b-color;
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: get-color(primary, normal);
  z-index: 2;

  h2 {
    @extend %paragraph-20;
    text-align: center;
  }
}

.item__card__designer__left-visit-site {
  @extend %center;

  width: 20%;
  height: 5rem;
  border-left: 1px solid $b-color;
  border-top: 1px solid $b-color;
  // border-right: 1px solid $b-color;
  position: absolute;
  bottom: 0;
  right: 20%;
  background-color: get-color(primary, normal);
  z-index: 2;

  a {
    @extend %paragraph-20;
    text-transform: uppercase;
    color: get-color(basic, normal);
    text-align: center;
  }
}

.item__card__designer__left-description {
  @extend %paragraph-16;
  padding: 5rem 3.2rem;
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
