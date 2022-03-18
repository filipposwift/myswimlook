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
        width="440"
        sizes="xs:100vw sm:50vw md:50vw xl:325px xxl:440px"
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
        width="440"
        sizes="xs:100vw sm:50vw md:50vw xl:325px xxl:440px"
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
  height: 75vh;
  min-height: 100rem;
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-template-rows: 10rem repeat(2, minmax(0, 1fr)) 10rem;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  @include phone {
    grid-template-rows: repeat(2, 1fr);
  }
}
.story__middle__reference__media {
  &-top {
    grid-area: 1 / 1 / 3 / 4;
    position: relative;
    @include phone {
      grid-area: 1 / 1 / 2 / 7;
    }
  }

  &-bottom {
    grid-area: 3 / 1 / 5 / 4;
    position: relative;
    @include phone {
      grid-area: 1 / 7 / 2 / 13;
    }
  }

  &-big {
    grid-area: 2 / 4 / 5 / 13;
    position: relative;
    @include phone {
      grid-area: 2 / 1 / 3 / 13;
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
