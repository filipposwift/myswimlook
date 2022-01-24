<template>
  <div class="privacy__policy">
    <RichTextRenderer
      :document="content"
      :node-renderers="renderNodes()"
      :mark-renderers="renderMarks()"
    />
  </div>
</template>

<script>
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types'
import RichTextRenderer from 'contentful-rich-text-vue-renderer'

export default {
  name: 'PrivacyPage',
  components: { RichTextRenderer },

  computed: {
    content() {
      return this.$store.state.styles.privacy[0].fields.newDescription
    },
  },

  methods: {
    renderNodes() {
      return {
        [BLOCKS.PARAGRAPH]: (node, key, h, next) =>
          h('p', { key }, next(node.content, key, h, next)),
        [BLOCKS.HEADING_1]: (node, key, h, next) =>
          h('h1', { key }, next(node.content, key, h, next)),
        [BLOCKS.HEADING_2]: (node, key, h, next) =>
          h('h2', { key }, next(node.content, key, h, next)),
        [BLOCKS.HEADING_3]: (node, key, h, next) =>
          h('h3', { key }, next(node.content, key, h, next)),
        [BLOCKS.HEADING_4]: (node, key, h, next) =>
          h('h4', { key }, next(node.content, key, h, next)),
        [BLOCKS.UL_LIST]: (node, key, h, next) =>
          h('ul', { key }, next(node.content, key, h, next)),
        [INLINES.HYPERLINK]: (node, key, h, next) =>
          h(
            'nuxt-link',
            {
              key,
              attrs: {
                to: node.data.uri,
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
.privacy__policy {
  width: 100%;
  padding: 10rem 3.2rem;
  white-space: break-spaces;
  word-break: break-word;

  h1 {
    font-family: 'Work Sans', sans-serif;
    color: get-color(secondary, dark);
    font-size: 5rem;
    font-weight: 400;
    text-align: center;
    margin-bottom: 3.2rem;
    @include xs-phone {
      font-size: 50px;
      margin-bottom: 6.4rem;
    }
  }

  h2 {
    font-family: 'Work Sans', sans-serif;
    color: get-color(secondary, dark);
    font-size: 3rem;
    font-weight: 400;
    margin-bottom: 2.4rem;
    margin-top: 2.4rem;
    @include xs-phone {
      font-size: 30px;
      margin-bottom: 4.8rem;
    }
  }

  h3 {
    font-family: 'Work Sans', sans-serif;
    color: get-color(secondary, dark);
    font-size: 2.4rem;
    font-weight: 400;
    margin-bottom: 1.6rem;
    margin-top: 1.6rem;
    @include xs-phone {
      font-size: 24px;
      margin-bottom: 3.2rem;
      margin-top: 3.2rem;
    }
  }

  h4 {
    font-family: 'Work Sans', sans-serif;
    color: get-color(secondary, dark);
    font-size: 2rem;
    font-weight: 400;

    margin-bottom: 1.2rem;
    margin-top: 1.2rem;
    @include xs-phone {
      font-size: 20px;
      margin-bottom: 2.4rem;
      margin-top: 2.4rem;
    }
  }

  ul {
    @extend %paragraph-16;
    text-align: justify;
    line-height: 1.2;
    padding-left: 2rem;
    @include xs-phone {
      padding-left: 4rem;
    }
  }

  p {
    @extend %paragraph-16;
    text-align: justify;
    line-height: 1.2;
    margin-top: 0.8rem;
    @include xs-phone {
      font-size: 20px;
      margin-top: 1.6rem;
    }
  }

  a {
    color: get-color(secondary, normal);
  }
}
</style>
