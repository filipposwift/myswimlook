<template>
  <div class="page__wrapper story">
    <SocialHead
      :title="story.title"
      :description="story.highLight"
      :image="story.images[0].secure_url"
    />
    <section class="story__intro">
      <div class="story__intro__title">
        <h1>
          {{ story.title }}
        </h1>
      </div>
      <figure class="story__intro__media">
        <nuxt-img
          :src="story.images[0].public_id"
          alt="Hero image of woman in swimwear"
          width="2000"
          provider="cloudinary"
          class="story__intro__media__image"
        ></nuxt-img>
      </figure>
      <div class="story__intro__subtitle">
        <p>
          {{ story.subtitle }}
        </p>
      </div>
      <div class="story__intro__incipit">
        <p>
          {{ story.incipit }}
        </p>
      </div>
      <div class="story__intro__highlight">
        <h3>
          {{ story.highLight }}
        </h3>
      </div>
      <div class="story__intro__style-card">
        <figure class="story__intro__style-card__media">
          <nuxt-img
            :src="itemCard.cloudinarySwimlook[5].public_id"
            alt="Hero image of woman in swimwear"
            width="800"
            provider="cloudinary"
            class="story__intro__style-card__media__image"
          ></nuxt-img>
        </figure>
        <div class="story__intro__style-card__title">
          <h3>{{ itemCard.designer }}</h3>
          <div class="story__intro__style-card__title__price">
            <p>USD {{ itemCard.price }}</p>
            <h4>VISIT SITE</h4>
          </div>
        </div>
      </div>
    </section>
    <section class="story__middle">
      <figure class="story__middle__reference__media-top">
        <nuxt-img
          :src="story.images[2].public_id"
          alt="Hero image of woman in swimwear"
          width="2000"
          provider="cloudinary"
          class="story__middle__reference__media__image"
        ></nuxt-img>
      </figure>
      <figure class="story__middle__reference__media-bottom">
        <nuxt-img
          :src="story.images[3].public_id"
          alt="Hero image of woman in swimwear"
          width="2000"
          provider="cloudinary"
          class="story__middle__reference__media__image"
        ></nuxt-img>
      </figure>
      <figure class="story__middle__reference__media-big">
        <nuxt-img
          :src="story.images[1].public_id"
          alt="Hero image of woman in swimwear"
          width="2000"
          provider="cloudinary"
          class="story__middle__reference__media__image"
        ></nuxt-img>
      </figure>
    </section>
    <section class="story__end">
      <div class="story__end__article__body">
        <RichTextRenderer
          :document="story.articleBody"
          :node-renderers="renderNodes()"
          :mark-renderers="renderMarks()"
        />
      </div>
    </section>
  </div>
</template>

<script>
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types'
import RichTextRenderer from 'contentful-rich-text-vue-renderer'

export default {
  name: 'StoryPage',

  components: { RichTextRenderer },

  validate({ params, store }) {
    return store.state.stories.story.some(
      (el) => el.fields.slug === params.slug
    )
  },

  head() {
    return {
      title: this.story.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.story.highLight,
        },
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `https://www.myswimlook.com/stories/${this.$route.params.slug}`,
        },
      ],
    }
  },

  computed: {
    story() {
      return this.$store.state.stories.story.find(
        (story) => story.fields.slug === this.$route.params.slug
      ).fields
    },
    itemCard() {
      return this.story.swimsuits[0].fields
    },
  },

  methods: {
    renderNodes() {
      return {
        [BLOCKS.PARAGRAPH]: (node, key, h, next) =>
          h('p', { key }, next(node.content, key, h, next)),
        [BLOCKS.HEADING_6]: (node, key, h, next) =>
          h(
            'h6',
            { key, attrs: { class: 'story__question' } },
            next(node.content, key, h)
          ),
        [BLOCKS.EMBEDDED_ENTRY]: (node, key, h, next) =>
          h(
            'nuxt-img',
            {
              key,
              attrs: {
                src: node.data.target.fields.image[0].public_id,
                provider: 'cloudinary',
                width: '400',
                class: 'story__image',
              },
            },

            next(node.content, key, h, next)
          ),
        [INLINES.EMBEDDED_ENTRY]: (node, key, h, next) =>
          h(
            'nuxt-img',
            {
              key,
              attrs: {
                src: node.data.target.fields.image[0].public_id,
                provider: 'cloudinary',
                width: '400',
                class: 'story__image',
              },
            },
            next(node.content, key, h, next)
          ),
      }
    },
    renderMarks() {
      return {
        [MARKS.BOLD]: (text, key, h) =>
          h('strong', { key, attrs: { class: 'font-bold' } }, text),
        [MARKS.ITALIC]: (text, key, h) =>
          h('em', { key, attrs: { class: 'font-italic' } }, text),
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.story__intro {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 16rem repeat(4, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}
.story__intro__title {
  grid-area: 2 / 1 / 3 / 7;
  z-index: 2;
  border-top: 1px solid $b-color;
  border-bottom: 1px solid $b-color;
  border-right: 1px solid $b-color;
  background-color: get-color(primary, bright);
  h1 {
    @extend %title-60;
    padding: 3.2rem 1.6rem;
  }
}
.story__intro__media {
  grid-area: 1 / 5 / 5 / 13;
  position: relative;
  border-left: 1px solid $b-color;
}
.story__intro__media__image {
  @extend %cover;
}

.story__intro__subtitle {
  grid-area: 3 / 1 / 4 / 5;
  margin: 4rem;
  p {
    @extend %paragraph-20;
    font-weight: 300;
    text-align: center;
  }
}
.story__intro__incipit {
  grid-area: 4 / 1 / 5 / 5;

  p {
    @extend %paragraph-16;
    padding: 1.6rem;
    line-height: 1.5;
    text-align: justify;
  }
}
.story__intro__highlight {
  grid-area: 5 / 1 / 6 / 9;
  border-top: 1px solid $b-color;
  border-bottom: 1px solid $b-color;

  position: relative;

  h3 {
    @extend %title-30;
    @extend %cover;
    text-transform: uppercase;
    padding: 3.2rem 1.6rem;
  }
}

.story__intro__style-card {
  grid-area: 4 / 9 / 6 / 13;
  display: flex;
}

.story__intro__style-card__title {
  height: 100%;
  width: 20%;
  background-color: get-color(primary, bright);

  z-index: 3;
  position: relative;
  h3 {
    @extend %title-30;
    @extend %vertical-titles;
  }
}

.story__intro__style-card__title__price {
  flex-direction: column;
  width: 110%;
  height: 5rem;
  position: absolute;
  bottom: 0;
  right: 0%;
  background-color: get-color(primary, normal);
  z-index: 2;
  border-bottom: 1px solid $b-color;
  border-top: 1px solid $b-color;
  border-left: 1px solid $b-color;

  p {
    @extend %paragraph-16;
    text-align: center;
  }

  h4 {
    @extend %paragraph-20;
    text-transform: uppercase;
    color: get-color(basic, normal);
    position: absolute;
    bottom: 0;
    left: 0;
    padding-left: 5px;
  }
}
.story__intro__style-card__media {
  height: 100%;
  width: 80%;
  position: relative;
  border: 1px solid $b-color;
}
.story__intro__style-card__media__image {
  @extend %cover;
}

.story__middle {
  width: 100%;
  height: 75vh;
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-template-rows: 5rem repeat(2, minmax(0, 1fr)) 5rem;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}
.story__middle__reference__media {
  &-top {
    grid-area: 1 / 1 / 3 / 4;
    position: relative;
  }

  &-bottom {
    grid-area: 3 / 1 / 5 / 4;
    position: relative;
  }

  &-big {
    grid-area: 2 / 4 / 5 / 13;
    position: relative;
  }
}

.story__middle__reference__media__image {
  @extend %cover;
}

.story__end {
  width: 100%;
}

.story__end__article__body {
  width: 100%;
  margin-top: 3.2rem;
  padding: 1.6rem;

  p {
    @extend %paragraph-16;
    line-height: 1.5;

    a {
      color: get-color(basic, normal);
    }
  }
}

.story__question {
  margin-top: 3.2rem;
  margin-bottom: 0.8rem;
  @extend %paragraph-16;
  font-family: 'Work Sans', sans-serif;
}

.story__image {
  float: left;
  padding-top: 1.6rem;
  padding-right: 1.6rem;
  padding-bottom: 1.6rem;
}
</style>
