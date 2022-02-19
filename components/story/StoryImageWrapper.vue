<template>
  <div class="image__wrapper">
    <figure
      :class="[
        'image__media',
        item.contentType === 'itemCard' ? 'center' : 'left',
        nodeType === 'embedded-entry-block' ? '' : 'inline',
      ]"
    >
      <nuxt-img
        :src="image"
        :alt="alt"
        width="1000"
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
        return this.item.fields.featuredImageForStory[0].public_id
      }
      return this.item.fields.image[0].public_id
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
  }
  &.left {
    float: left;
    margin-right: 5rem;
    margin-bottom: 1.6rem;
    height: 30vw;
    width: 20vw;
    @include phone {
      float: none;
      height: 50vh;
      width: 90%;
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
    width: 90%;
    margin: auto;
  }
}
.image__media__image {
  @extend %cover;
  // object-position: center top;
  // @include phone {
  //   object-position: center center;
  // }
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
.image__visit-site {
  position: absolute;
  bottom: 0;
  right: calc(30vw - 1.6rem);
  border: 1px solid $b-color;
  @include phone {
    right: 5%;
  }
}
</style>
