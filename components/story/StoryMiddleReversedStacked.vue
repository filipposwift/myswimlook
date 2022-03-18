<template>
  <div class="story__middle">
    <figure class="story__middle__reference__media-top">
      <nuxt-img
        :src="story.imagesVertical[0].public_id.replace(/\s+/g, '%20')"
        :alt="
          story.imagesVertical[0].context
            ? story.imagesVertical[0].context.custom.alt
            : 'Image of woman in swimsuit'
        "
        width="856"
        sizes="xs:100vw sm:50vw md:50vw xl:631px xxl:856px"
        provider="cloudinary"
        class="story__middle__reference__media__image"
      ></nuxt-img>
      <figcaption
        :class="story.imagesVertical[0].context ? 'story__fig-caption' : ''"
      >
        <p>
          Photo:
          {{
            story.imagesVertical[0].context
              ? story.imagesVertical[0].context.custom.caption
              : ''
          }}
        </p>
      </figcaption>
    </figure>
    <figure class="story__middle__reference__media-bottom">
      <nuxt-img
        :src="story.imagesVertical[1].public_id.replace(/\s+/g, '%20')"
        :alt="
          story.imagesVertical[1].context
            ? story.imagesVertical[1].context.custom.alt
            : 'Image of woman in swimsuit'
        "
        width="856"
        sizes="xs:100vw sm:50vw md:50vw xl:631px xxl:856px"
        provider="cloudinary"
        class="story__middle__reference__media__image"
      ></nuxt-img>
      <figcaption
        :class="story.imagesVertical[1].context ? 'story__fig-caption' : ''"
      >
        <p>
          Photo:
          {{
            story.imagesVertical[1].context
              ? story.imagesVertical[1].context.custom.caption
              : ''
          }}
        </p>
      </figcaption>
    </figure>
    <figure class="story__middle__reference__media-big">
      <nuxt-img
        :src="story.imageLandscape[0].public_id.replace(/\s+/g, '%20')"
        :alt="
          story.imageLandscape[0].context
            ? story.imageLandscape[0].context.custom.alt
            : 'Image fo woman in swimsuit'
        "
        width="1750"
        sizes="xs:100vw sm:100vw md:90vw xl:1310px xxl:1750px"
        provider="cloudinary"
        class="story__middle__reference__media__image"
      ></nuxt-img>
      <figcaption
        :class="story.imageLandscape[0].context ? 'story__fig-caption' : ''"
      >
        <p>
          Photo:
          {{
            story.imageLandscape[0].context
              ? story.imageLandscape[0].context.custom.caption
              : ''
          }}
        </p>
      </figcaption>
    </figure>
  </div>
</template>

<script>
export default {
  props: {
    story: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.story__middle {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.story__middle__reference__media {
  &-top {
    flex: 1 0 auto;
    margin: 20px;
    height: 50vh;
    min-height: 80rem;
    margin-left: 0;
    position: relative;
    @include phone {
      margin-right: 0;
      height: 40vh;
    }
  }

  &-bottom {
    flex: 1 0 auto;
    margin: 20px;
    height: 50vh;
    min-height: 80rem;
    position: relative;
    margin-right: 0;
    @include phone {
      margin-left: 10px;
      height: 40vh;
    }
  }

  &-big {
    flex: 1 0 100%;
    margin: 20px;
    margin-right: 0;
    margin-left: 0;
    height: 100vh;
    min-height: 100rem;
    // height: 0;
    // padding-bottom: 56.25%;
    // overflow: hidden;
    position: relative;
    @include phone {
      margin-top: 0;
      height: 60vh;
      min-height: auto;
    }
  }
}

.story__middle__reference__media__image {
  @extend %cover;
}

.story__fig-caption {
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
</style>
