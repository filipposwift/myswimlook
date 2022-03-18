<template>
  <div class="image__wrapper">
    <figure
      :class="[
        'image__media',
        item.contentType === 'itemCard'
          ? 'center'
          : item.contentType === 'cloudinaryAsset'
          ? 'left'
          : 'wide',
        nodeType === 'embedded-entry-block' ? '' : 'inline',
      ]"
    >
      <nuxt-img
        :src="image"
        :alt="alt"
        width="1750"
        sizes="xs:100vw sm:100vw md:90vw xl:1310px xxl:1750px"
        provider="cloudinary"
        class="image__media__image"
      ></nuxt-img>
      <figcaption :class="caption === '' ? '' : 'image__fig-caption'">
        <p>
          Photo:
          {{ caption }}
        </p>
      </figcaption>
    </figure>
    <div
      v-if="
        nodeType === 'embedded-entry-block' && item.contentType === 'itemCard'
      "
      class="image__title"
    >
      <h3>{{ designer }}</h3>
    </div>
    <div
      v-if="
        nodeType === 'embedded-entry-block' && item.contentType === 'itemCard'
      "
      class="image__visit-site"
    >
      <PriceAndVisit
        :price="story.target.fields.price"
        :designer-site="designerUrl"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    story: {
      type: Object,
      required: true,
    },
    nodeType: {
      type: String,
      required: true,
    },
  },

  computed: {
    item() {
      const { fields, sys } = this.story.target
      const contentType = sys.contentType.sys.id
      return { fields, contentType }
    },
    image() {
      if (this.item.contentType === 'itemCard') {
        return this.item.fields.featuredImageForStory[0].public_id.replace(
          /\s+/g,
          '%20'
        )
      }
      return this.item.fields.image[0].public_id.replace(/\s+/g, '%20')
    },
    alt() {
      if (this.item.contentType === 'itemCard') {
        return this.item.fields.featuredImageForStory[0].context
          ? this.item.fields.featuredImageForStory[0].context.custom.alt
          : 'Photo of swimsuit'
      }
      return this.item.fields.image[0].context
        ? this.item.fields.image[0].context.custom.alt
        : 'Photo of swimsuit'
    },

    caption() {
      if (this.item.contentType === 'itemCard') {
        // return this.item.fields.featuredImageForStory[0].context
        //   ? this.item.fields.featuredImageForStory[0].context.custom.caption
        //   : ''
        return ''
      }
      return this.item.fields.image[0].context
        ? this.item.fields.image[0].context.custom.caption
        : ''
    },
    designerUrl() {
      if (this.story.target.fields.designer) {
        const tmp = this.$store.state.data.data.find(
          (designer) => designer.name === this.story.target.fields.designer
        ).website
        return tmp
      }
      return ''
    },

    designer() {
      if (this.story.target.fields.designer) {
        const tmp = this.$store.state.data.data.find(
          (designer) => designer.name === this.story.target.fields.designer
        ).name
        return tmp
      }
      return ''
    },
  },
}
</script>

<style lang="scss" scoped>
.image__wrapper {
  position: relative;
  margin-top: 5rem;
  margin-bottom: 5rem;
}

.image__media {
  position: relative;
  height: 40vw;
  width: 30vw;
  &.center {
    margin: auto;
    margin-bottom: 1.6rem;
    @include phone {
      margin: 0;
    }
  }
  &.left {
    float: left;
    margin-right: 5rem;
    margin-bottom: 1.6rem;
    height: 0;
    width: 40vw;
    padding-bottom: 25%;
    @include phone {
      float: none;
      height: 50vh;
      width: 90%;
      margin: auto;
      padding-bottom: 0;
    }
  }

  &.wide {
    height: calc((88.7) / 16 * 9);
    width: 88.7vw;
    margin-top: 3.2rem;
    margin-bottom: 3.2rem;
    @include phone {
      height: 50vh;
      width: 100%;
      margin: auto;
    }
  }

  &.inline {
    float: right;
    margin-right: 0;
    margin-left: 5rem;
    margin-bottom: 1.6rem;
    @include phone {
      float: none;
      height: 50vh;
      width: 90%;
      margin: auto;
    }
  }

  @include phone {
    height: 50vh;
    width: calc(100% - 12.5vw);
  }
}
.image__media__image {
  @extend %cover;

  border: 1px solid $b-color;
}

.image__fig-caption {
  display: block;
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: get-color(primary, normal);
  opacity: 0.5;
  z-index: 5;
  p {
    font-family: 'Work Sans', sans-serif;
    font-size: 10px;
    line-height: 1.1;
  }
}
.image__title {
  background-color: get-color(primary, bright);
  border: 1px solid $b-color;
  border-left: 0;
  height: 40vw;
  position: absolute;
  top: 0;
  left: calc(50% + 15vw);
  width: 13rem;

  @include phone {
    width: 12.5vw;
    height: 50vh;
    right: 0;
    left: auto;
  }

  h3 {
    @extend %title-30;
    @extend %vertical-titles;
    @include desktop {
      font-size: 4.5rem;
    }
    @include phone {
      font-size: 30px;
    }
  }
}

.image__visit-site {
  position: absolute;
  bottom: 0;
  right: calc(30vw - 14.5rem);
  border: 1px solid $b-color;
  border-right: 0;

  @include phone {
    right: 0;
  }
}
</style>
