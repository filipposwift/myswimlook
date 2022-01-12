<template>
  <div class="page__wrapper styles">
    <SocialHead :title="title" :description="description" :image="image" />
    <hero></hero>
    <div class="styles__container">
      <div
        v-for="(n, num) in 10"
        :key="num"
        :class="`styles__box ${classLetter(num)}`"
      >
        <p v-if="num < 7">
          #my<span>{{ itemsNum(num) }}</span
          >swimlook
        </p>
      </div>
      <styles-grid
        v-for="(style, index) in styles"
        :key="style.name"
        :name="style.name"
        :image="style.image"
        :number="classLetter(index)"
        :slug="style.slug"
        :class="`styles__grid__box__wrapper ${classLetter(index)}`"
      ></styles-grid>
      <div class="styles__title__wrapper">
        <div class="styles__titles"><h2>7 different mood and</h2></div>
      </div>
    </div>
    <div class="styles__title__wrapper one">
      <div class="styles__titles"><h2>1 personality</h2></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { slideRight } from '@/utils/transitions'

export default {
  name: 'StylesPage',
  layout: 'homeLayout',
  scrollToTop: true,

  transition: slideRight,

  data() {
    return {
      title:
        'mySwimlook Styles - Browse through our collection of curated swimwear looks and find inspiration on how to mix and match a beach look that fits your style.',
      description:
        'We want to help you find the perfect look for your body type. We have selected looks from some of the best fashion designers in the world, and we are confident that our style collection will give you plenty of inspiration.',
      image: 'https://myswimlook.com/social-media-card.jpg',
    }
  },

  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.description,
        },
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: 'https://myswimlook.com/styles',
        },
      ],
    }
  },

  computed: {
    ...mapGetters({
      styles: 'styles/getStyles',
    }),
  },

  methods: {
    classLetter(num) {
      const letter = [
        'one',
        'two',
        'three',
        'four',
        'five',
        'six',
        'seven',
        'eight',
        'nine',
        'ten',
        'eleven',
        'twelve',
        'thirteen',
        'fourteen',
      ]
      return letter[num]
    },
    itemsNum(num) {
      if (num < 7) {
        return this.styles[num].name.toLowerCase()
      } else {
        return ''
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.styles__container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(24, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  width: 100%;
  height: calc(100vw - 128px);
  border-top: 1px solid;
}

.styles__box {
  background-color: get-color(primary, normal);
  z-index: 2;
  padding: 0.8rem;
  @extend %paragraph-16;
  p {
    @extend %paragraph-16;
    text-align: right;
    span {
      color: get-color(basic, normal);
    }
  }
  &.one {
    grid-area: 9 / 1 / 10 / 5;
    border-top: 1px solid;
  }
  &.two {
    grid-area: 2 / 5 / 3 / 8;
    border-bottom: 1px solid;
    border-left: 1px solid;
    border-right: 1px solid;
  }
  &.three {
    grid-area: 8 / 9 / 9 / 13;
    background-color: get-color(primary, normal);
    border-left: 1px solid;
  }
  &.four {
    grid-area: 16 / 9 / 17 / 13;
    border-bottom: 1px solid;
    border-left: 1px solid;
  }
  &.five {
    grid-area: 22 / 1 / 23 / 5;
    border-bottom: 1px solid;
  }
  &.six {
    grid-area: 15 / 5 / 16 / 9;
    border-bottom: 1px solid;
    border-left: 1px solid;
  }
  &.seven {
    grid-area: 23 / 1 / 24 / 9;
    background-color: get-color(primary, normal);
    border-bottom: 1px solid;
  }

  &.nine {
    grid-area: 1 / 1 / 2 / 8;
    border-bottom: 1px solid;
    border-right: 1px solid;
  }
  &.ten {
    grid-area: 1 / 8 / 3 / 9;
    border-bottom: 1px solid;
  }
}

.styles__title__wrapper {
  grid-area: 10 / 1 / 15 / 9;
  border-top: 1px solid;
  border-bottom: 1px solid;

  background-color: get-color(primary, normal);
  z-index: 2;
  position: sticky;
  top: calc(100% / 10);
  &.one {
    grid-area: 23 / 1 / 25 / 9;
    height: 16rem;
    border: 0px;
  }
}

.styles__titles {
  @extend %center;
  height: 100%;
  h2 {
    @extend %title-100;
    padding: 1.6 rem;
    @include desktop {
      font-size: 7rem;
    }
  }
}

.styles__grid__box__wrapper {
  &.one {
    grid-area: 2 / 1 / 9 / 5;
    // position: sticky;
    // top: calc(100% / 24);
  }
  &.two {
    grid-area: 3 / 5 / 10 / 9;
    // position: sticky;
    // top: calc(100% / 24);
  }
  &.three {
    grid-area: 1 / 9 / 8 / 13;
    // position: sticky;
    // top: 0;
  }
  &.four {
    grid-area: 9 / 9 / 16 / 13;
  }

  &.five {
    grid-area: 15 / 1 / 22 / 5;
    z-index: 3;
  }
  &.six {
    grid-area: 16 / 5 / 23 / 9;
  }
  &.seven {
    grid-area: 17 / 9 / 24 / 13;
    z-index: 3;
  }
}
</style>
