<template>
  <div class="story__middle">
    <figure class="story__middle__reference__media-top">
      <nuxt-img
        :src="encodeURI(story.imagesVertical[0].public_id)"
        :alt="
          story.imagesVertical[0].context
            ? story.imagesVertical[0].context.custom.alt
            : 'Image of woman in swimsuit'
        "
        width="558"
        provider="cloudinary"
        sizes="xs:100vw sm:50vw md:50vw xl:410px xxl:560px"
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
        :src="encodeURI(story.imagesVertical[1].public_id)"
        :alt="
          story.imagesVertical[1].context
            ? story.imagesVertical[1].context.custom.alt
            : 'Image of woman in swimsuit'
        "
        width="558"
        sizes="xs:100vw sm:50vw md:50vw xl:410px xxl:560px"
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
        :src="encodeURI(story.imageLandscape[0].public_id)"
        :alt="
          story.imageLandscape[0].context
            ? story.imageLandscape[0].context.custom.alt
            : 'Image fo woman in swimsuit'
        "
        width="768"
        sizes="xs:100vw sm:100vw md:100vw xl:410px xxl:560px"
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
  height: 50vh;
  min-height: 100rem;
  display: flex;
  justify-content: space-between;
  @include phone {
    flex-wrap: wrap;
    height: 100vh;
  }
}
.story__middle__reference__media {
  &-top {
    flex: 1 0 auto;
    margin: 20px;
    margin-left: 0;
    position: relative;
    @include phone {
      margin-right: 10px;
    }
  }

  &-bottom {
    flex: 1 0 auto;
    margin: 20px;
    position: relative;
    @include phone {
      margin-right: 0;
      margin-left: 10px;
    }
  }

  &-big {
    flex: 1 0 auto;
    margin: 20px;
    margin-right: 0;
    position: relative;
    @include phone {
      flex: 1 0 100%;
      margin-left: 0;
      margin-top: 0;
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
