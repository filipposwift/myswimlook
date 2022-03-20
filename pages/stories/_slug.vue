<template>
  <div class="page__wrapper story">
    <SocialHead
      :title="story.title"
      :description="story.subtitle"
      :image="story.coverImage[0].secure_url"
      :url="`https://www.myswimlook.com/stories/${$route.params.slug}`"
    />
    <section class="story__intro">
      <div class="story__intro__title">
        <h1>
          {{ story.title }}
        </h1>
      </div>
      <figure class="story__intro__media">
        <nuxt-img
          :src="story.coverImage[0].public_id.replace(/\s+/g, '%20')"
          :alt="
            story.coverImage[0].context
              ? story.coverImage[0].context.custom.alt
              : 'Cover photo of the article'
          "
          width="1164"
          sizes="xs:100vw sm:100vw md:90vw xl:870px xxl:1164"
          provider="cloudinary"
          class="story__intro__media__image"
        ></nuxt-img>
        <figcaption
          :class="story.coverImage[0].context ? 'story__fig-caption' : ''"
        >
          <p>
            Photo:
            {{
              story.coverImage[0].context
                ? story.coverImage[0].context.custom.caption
                : ''
            }}
          </p>
        </figcaption>
      </figure>
      <div
        v-dompurify-html="$md.render(story.subtitle)"
        class="story__intro__subtitle"
      ></div>
      <div v-if="story.author" class="story__intro__author">
        <h6>by {{ story.author }}</h6>
      </div>
      <div
        v-dompurify-html="$md.render(story.incipit)"
        class="story__intro__incipit"
      ></div>
      <div
        v-dompurify-html="$md.render(story.highLight)"
        class="story__intro__highlight"
      ></div>
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
              :src="itemCard.featuredImageForStory[0].public_id"
              alt="Hero image of woman in swimwear"
              width="485"
              provider="cloudinary"
              class="story__intro__style-card__media__image"
            ></nuxt-img>
          </figure>
          <div class="story__intro__style-card__title">
            <h3>{{ itemCard.designer }}</h3>
          </div>
          <div class="story__intro__style-card__title__price">
            <PriceAndVisit
              :price="itemCard.price"
              :designer-site="designerUrl"
              class="story__visit"
            />
          </div>
        </div>
      </div>
    </section>
    <section v-if="middleLayout === 'c'">
      <StoryMiddleCombined :story="story" />
    </section>
    <section v-if="middleLayout === 's'">
      <StoryMiddleStacked :story="story" />
    </section>
    <section v-if="middleLayout === 'r'">
      <StoryMiddleReversedStacked :story="story" />
    </section>
    <section v-if="middleLayout === 't'">
      <StoryMiddlePortraits :story="story" />
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
    <section class="story__instagram">
      <h2>Instagram references</h2>
      <carousel :slides="slides" />
    </section>
  </div>
</template>

<script>
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types'
import RichTextRenderer from 'contentful-rich-text-vue-renderer'
// import createSEOMeta from '@/utils/seo.js'
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
          vmid: 'description',
          hid: 'description',
          name: 'description',
          content: this.story.subtitle,
        },
      ],
      link: [
        {
          vmid: 'canonical',
          hid: 'canonical',
          rel: 'canonical',
          href: `https://www.myswimlook.com/stories/${this.$route.params.slug}/`,
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

    slides() {
      if (this.story.instagramReferences) {
        const temp = this.story.instagramReferences.map(({ fields }) => ({
          image: fields.image,
          reference: fields.reference,
          name: fields.name,
        }))
        return temp
      }
      return []
    },

    middleLayout() {
      const txt = this.story.middleLayout
      txt.trim()
      const revisedTxt = txt.slice(0, 1)
      return revisedTxt.toLowerCase()
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
            'story-image-wrapper',
            {
              key,
              attrs: {
                story: node.data,
                nodeType: node.nodeType,
              },
            },
            next(node.content, key, h, next)
          ),

        [INLINES.EMBEDDED_ENTRY]: (node, key, h, next) =>
          h(
            'story-image-wrapper',
            {
              key,
              attrs: {
                story: node.data,
                nodeType: node.nodeType,
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
.prova {
  position: relative;
  width: 100%;
  height: 100%;
}

.story__intro {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows:
    16rem fit-content(40%) minmax(16rem, auto) 10rem minmax(48rem, auto) 16rem
    64rem;
  grid-column-gap: 0px;
  grid-row-gap: 0px;

  @include phone {
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
    order: 1;
    border-top: 0px;
    border-right: 0px;
  }
  h1 {
    @extend %title-60;
    padding: 3.2rem 1.6rem;
    @include phone {
      font-size: 24px;
      line-height: 1.1;
      padding: 5rem 1.6rem;
    }
  }
}
.story__intro__media {
  grid-area: 1 / 5 / 7 / 13;
  position: relative;
  border-left: 1px solid $b-color;

  @include phone {
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
  @extend %paragraph-20;
  font-weight: 300;
  text-align: center;

  @include phone {
    order: 3;
  }
}

.story__intro__author {
  grid-area: 4 / 1 / 5 / 5;

  @include phone {
    order: 4;
  }

  h6 {
    @extend %paragraph-16;
    text-transform: uppercase;
    text-align: center;
    margin: 1.6rem 0;
  }
}
.story__intro__incipit {
  grid-area: 5 / 1 / 6 / 5;
  @extend %paragraph-16;
  white-space: pre-line;
  padding: 1.6rem;
  line-height: 1.5;
  text-align: justify;

  a {
    color: red;
  }

  @include phone {
    order: 5;
  }
}
.story__intro__highlight {
  grid-area: 7 / 1 / 8 / 9;
  border-top: 1px solid $b-color;
  border-bottom: 1px solid $b-color;
  @extend %center;
  @extend %title-30;
  white-space: pre-line;
  line-height: 1.5;

  text-align: center;
  text-transform: uppercase;
  padding: 3.2rem 1.6rem;

  @include phone {
    order: 7;
    font-size: 2.4rem;
    padding: 40px 1.6rem;
  }
  @include xs-phone {
    font-size: 14px;
  }
}

.story__intro__style__card__wrapper {
  grid-area: 6 / 9 / 8 / 13;
  z-index: 1;
  border-bottom: 1px solid $b-color;
  border-top: 1px solid $b-color;
  border-left: 1px solid $b-color;

  @include phone {
    order: 6;
    border-bottom: 0px;
    border-left: 0px;
    height: 70vh;
    margin-top: 40px;
  }
}

.story__intro__style-card {
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 0.2fr;
  grid-template-rows: 7rem 1fr 4rem;
}

.story__intro__style-card__hashtag {
  grid-area: 1 / 1 / 2 / 3;
  background-color: get-color(primary, normal);
  border-bottom: 1px solid $b-color;
  h3 {
    @extend %title-30;
    font-family: 'Work Sans', sans-serif;
    font-weight: 300;
    line-height: 7rem;
    text-align: center;
    padding-top: 0.8rem;
    @include phone {
      font-size: 24px;
    }

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

  // z-index: 3;
  position: relative;

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

.story__intro__style-card__title__price {
  position: absolute;
  bottom: 0;
  right: 0;

  z-index: 2;
  border-top: 1px solid $b-color;
}
.story__visit {
  border-left: 1px solid $b-color;
}

.story__intro__style-card__media {
  grid-area: 2 / 1 / 4 / 3;
  height: 100%;
  width: 100%;
  position: relative;
  // border: 1px solid $b-color;
}
.story__intro__style-card__media__image {
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
    padding-bottom: 1.6rem;

    a {
      color: get-color(basic, normal);
    }
  }

  p:last-of-type {
    margin-bottom: 150px;
    @include phone {
      margin-bottom: 50px;
    }
  }
}

.story__question {
  margin-top: 3.2rem;
  margin-bottom: 2.4rem;
  @extend %paragraph-16;
  font-weight: 400;

  font-family: 'Work Sans', sans-serif;
  @include phone {
    margin-top: 5rem;
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

.story__image-inline {
  float: right;
  margin-top: 1.6rem;
  margin-left: 1.6rem;
  margin-bottom: 1.6rem;
  height: 40vw;

  @include phone {
    display: block;
    float: none;
    padding: 0;
    margin-top: 5rem;
    margin-bottom: 1.6rem;
    height: 50vh;
  }
}

.story__instagram {
  border-top: 1px solid $b-color;
  border-bottom: 1px solid $b-color;
  overflow: hidden;
  width: 100%;

  position: relative;
  @extend %paragraph-20;
  text-transform: uppercase;
  margin-top: 10rem;
  margin-bottom: 20rem;
  @include phone {
    margin-bottom: 40rem;
  }
  @include xs-phone {
    margin-bottom: 60rem;
  }
  h2 {
    @extend %title-30;
    text-align: center;
    padding: 3.2rem 1.6rem;
    @include phone {
      font-size: 24px;
      padding: 5rem 1.6rem;
    }
  }
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
