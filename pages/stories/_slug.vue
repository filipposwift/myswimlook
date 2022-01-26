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
      <div class="story__intro__style__card__wrapper">
        <div class="story__intro__style-card">
          <div class="story__intro__style-card__hashtag">
            <h3>
              #my<span>{{ itemCard.style.toLowerCase() }}</span
              >swimlook
            </h3>
          </div>
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
          </div>
          <div class="story__intro__style-card__title__price">
            <p>USD {{ itemCard.price }}</p>
            <VisitSite :url="designerUrl" class="visit" />
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

  layout: 'home',

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

    designerUrl() {
      const tmp = this.$store.state.data.data.find(
        (designer) => designer.name === this.itemCard.designer
      ).website
      return tmp
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
  @include phone {
    grid-template-rows: none;
    grid-auto-rows: minmax(16rem, auto);
  }
  @include xs-phone {
    display: flex;
    flex-direction: column;
  }
}
.story__intro__title {
  grid-area: 2 / 1 / 3 / 7;
  z-index: 2;
  border-top: 1px solid $b-color;
  border-bottom: 1px solid $b-color;
  border-right: 1px solid $b-color;
  background-color: get-color(primary, bright);
  @include phone {
    grid-area: 2 / 1 / 3 / 8;
  }
  @include xs-phone {
    order: 1;
    border-top: 0px;
    border-right: 0px;
  }
  h1 {
    @extend %title-60;
    padding: 3.2rem 1.6rem;
    @include xs-phone {
      font-size: 24px;
      line-height: 1.1;
      padding: 5rem 1.6rem;
    }
  }
}
.story__intro__media {
  grid-area: 1 / 5 / 5 / 13;
  position: relative;
  border-left: 1px solid $b-color;
  @include phone {
    grid-area: 1 / 3 / 7 / 13;
  }
  @include xs-phone {
    order: 2;
    height: 50vh;
  }
}
.story__intro__media__image {
  @extend %cover;
}

.story__intro__subtitle {
  grid-area: 3 / 1 / 4 / 5;
  margin: 4rem;
  @include phone {
    grid-area: 7 / 1 / 8 / 8;
  }
  @include xs-phone {
    order: 3;
  }
  p {
    @extend %paragraph-20;
    font-weight: 300;
    text-align: center;
  }
}
.story__intro__incipit {
  grid-area: 4 / 1 / 5 / 5;
  @include phone {
    grid-area: 8 / 1 / 9 / 8;
  }

  @include xs-phone {
    order: 4;
  }

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
  @extend %center;

  @include phone {
    grid-area: 9 / 1 / 10 / 13;
  }

  @include xs-phone {
    order: 6;
  }

  h3 {
    @extend %title-30;

    text-align: center;
    text-transform: uppercase;
    padding: 3.2rem 1.6rem;
    @include phone {
      font-size: 20px;
      line-height: 1.1;
      @include xs-phone {
        padding: 40px 1.6rem;
      }
    }
  }
}

.story__intro__style__card__wrapper {
  grid-area: 4 / 9 / 6 / 13;
  z-index: 1;
  border-bottom: 1px solid $b-color;
  border-top: 1px solid $b-color;
  border-left: 1px solid $b-color;
  @include phone {
    grid-area: 6 / 8 / 9 / 13;
    border-bottom: 0px;
  }
  @include xs-phone {
    order: 5;
    border-bottom: 0px;
    border-left: 0px;
    height: 70vh;
    margin-top: 40px;
  }
}

.story__intro__style-card {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 0.2fr;
  grid-template-rows: 5rem 1fr 5rem;
  @include phone {
    grid-template-rows: 7rem 1fr 7rem;
  }
  @include xs-phone {
    grid-template-rows: 14rem 1fr 14rem;
  }
}

.story__intro__style-card__hashtag {
  grid-area: 1 / 1 / 2 / 3;
  background-color: get-color(primary, normal);
  border-bottom: 1px solid $b-color;
  h3 {
    @extend %title-30;
    font-family: 'Wok Sans', sans-serif;
    font-weight: 300;
    line-height: 1.2;
    text-align: center;
    padding-top: 0.8rem;
    @include phone {
      font-size: 24px;
    }
    // @include xs-phone {
    //   font-size: 16px;
    //   line-height: 20rem;
    // }
    span {
      color: get-color(basic, normal);
    }
  }
}

.story__intro__style-card__title {
  grid-area: 2 / 2 / 3 / 3;
  height: 100%;

  background-color: get-color(primary, bright);
  border-left: 1px solid $b-color;

  z-index: 3;
  position: relative;

  h3 {
    @extend %title-30;
    @extend %vertical-titles;
    @include xs-phone {
      font-size: 30px;
    }
  }
}

.story__intro__style-card__title__price {
  grid-area: 3 / 1 / 5 / 3;
  display: flex;
  background-color: get-color(primary, normal);
  z-index: 2;
  border-top: 1px solid $b-color;

  p {
    display: block;
    width: 50%;
    @extend %paragraph-20-light;
    text-align: center;
    line-height: 5rem;
    border-right: 1px solid $b-color;
    @include phone {
      font-size: 18px;
      line-height: 7rem;
    }
    @include xs-phone {
      line-height: 14rem;
    }
  }
  .visit {
    flex-grow: 1;
    @include xs-phone {
      align-items: center;
      display: flex;
      justify-content: center;
    }
  }
}
.story__intro__style-card__media {
  grid-area: 2 / 1 / 2 / 3;
  height: 100%;
  width: 100%;
  position: relative;
  // border: 1px solid $b-color;
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
  margin-bottom: 5rem;

  @include phone {
    margin-top: 5rem;
    margin-bottom: 10rem;
  }

  @include xs-phone {
    margin-top: 40px;
    margin-bottom: 100px;
  }

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
  @include phone {
    margin-top: 5rem;
    margin-bottom: 1.6rem;
  }
  @include xs-phone {
    margin-top: 30px;
    margin-bottom: 20px;
  }
}

.story__image {
  float: left;
  padding-top: 1.6rem;
  padding-right: 1.6rem;
  padding-bottom: 1.6rem;
  @include phone {
    display: block;
    float: none;
    padding: 0;
    margin-top: 5rem;
    margin-bottom: 1.6rem;
  }
}
</style>
