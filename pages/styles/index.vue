<template>
  <div class="page__wrapper styles">
    <SocialHead :title="title" :description="description" :image="image" />
    <hero>
      <template #title> Styles </template>
      <template #verticalTitle> Style isn't what you wear </template>
      <template #header>
        Find your perfect outfit in no time with this easy-to use style compass
        that will help you decide what image people see when they think of
        yooou!
      </template>
      <template #credit>
        <a
          href="https://shutterstock.com"
          target="_blank"
          rel="nofollow noopener noreferrer"
          class="credit"
          >Shutterstock</a
        >
      </template>
      <nuxt-img
        src="swimlook/Home%20Page/Styles-1.jpg"
        alt="Hero image of woman in swimwear"
        width="2000"
        provider="cloudinary"
        class="styles__hero__media__image"
      ></nuxt-img
    ></hero>
    <div class="styles__container">
      <div
        v-for="(n, num) in 9"
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
        <div class="styles__titles"><h2>7 different styles</h2></div>
      </div>
    </div>
    <div class="styles__title__wrapper one">
      <div class="styles__titles"><h2>to describe yourself</h2></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { slideRight } from '@/utils/transitions'

export default {
  name: 'StylesPage',
  layout: 'home',
  scrollToTop: true,
  transition: slideRight,

  data() {
    return {
      title:
        'mySwimlook Styles - Browse through our collection of curated swimwear looks and find inspiration on how to mix and match a beach look that fits your style.',
      description:
        'We want to help you find the perfect look for your body type. We have selected looks from some of the best fashion designers in the world, and we are confident that our style collection will give you plenty of inspiration.',
      image:
        'https://res.cloudinary.com/swimlook/image/upload/v1642171165/swimlook/Home%20Page/Styles-1.jpg',
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
          href: 'https://www.myswimlook.com/styles',
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
.credit {
  @extend %paragraph-16;
  font-size: 14px;
  color: get-color(secondary, normal);
  transition: all 0.3s ease-in-out;
  padding-right: 1.6rem;
  &:hover {
    color: get-color(basic, normal);
  }
}
.styles__container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(24, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  width: 100%;
  height: calc(100vw - 128px);
  border-top: 1px solid $b-color;
  @include phone {
    display: flex;
    flex-direction: column;
    // height: 300vh;
    height: auto;
  }
}

.styles__box {
  background-color: get-color(primary, normal);
  z-index: 2;
  padding: 0.8rem;
  @extend %paragraph-16;
  @include phone {
    padding-top: 3.2rem;
    padding-bottom: 3.2rem;
  }
  p {
    @extend %paragraph-16;
    text-align: right;
    @include phone {
      font-size: 20px;
      text-align: center;
    }
    span {
      color: get-color(basic, normal);
    }
  }
  &.one {
    grid-area: 9 / 1 / 10 / 5;
    border-top: 1px solid $b-color;
    border-right: 1px solid $b-color;
    @include phone {
      width: 100%;
      order: 2;
      border-right: 0px;
    }
  }
  &.two {
    grid-area: 2 / 5 / 3 / 9;
    border-right: 1px solid $b-color;
    border-top: 1px solid $b-color;
    @include phone {
      width: 100%;
      order: 4;
      border-right: 0px;
    }
  }
  &.three {
    grid-area: 8 / 9 / 9 / 13;
    background-color: get-color(primary, normal);
    border-top: 1px solid $b-color;
    border-bottom: 1px solid $b-color;
    @include phone {
      width: 100%;
      order: 6;
    }
  }
  &.four {
    grid-area: 16 / 9 / 17 / 13;
    border-top: 1px solid $b-color;
    border-bottom: 1px solid $b-color;
    @include phone {
      width: 100%;
      order: 9;
    }
  }
  &.five {
    grid-area: 22 / 1 / 23 / 5;
    border-top: 1px solid $b-color;
    border-right: 1px solid $b-color;
    @include phone {
      width: 100%;
      order: 11;
      border-right: 0px;
    }
  }
  &.six {
    grid-area: 15 / 5 / 16 / 9;
    border-bottom: 1px solid $b-color;
    border-right: 1px solid $b-color;
    @include phone {
      width: 100%;
      order: 13;
      border-right: 0px;
    }
  }
  &.seven {
    grid-area: 23 / 1 / 24 / 9;
    background-color: get-color(primary, normal);
    border-bottom: 1px solid $b-color;
    border-right: 1px solid $b-color;
    border-top: 1px solid $b-color;
    @include phone {
      width: 100%;
      order: 15;
      border-right: 0px;
    }
  }
  &.eight {
    grid-area: 24/ 9 / 25 / 13;
    border-top: 1px solid $b-color;
    @include phone {
      display: none;
    }
  }

  &.nine {
    grid-area: 1 / 1 / 2 / 9;
    border-right: 1px solid $b-color;
    @include phone {
      display: none;
    }
  }
}

.styles__title__wrapper {
  grid-area: 10 / 1 / 15 / 9;
  border-top: 1px solid $b-color;
  border-bottom: 1px solid $b-color;
  border-right: 1px solid $b-color;
  background-color: get-color(primary, normal);
  z-index: 2;
  @include phone {
    width: 100%;
    order: 7;
    min-height: 35vh;
    border-top: 0px;
    border-right: 0px;
  }

  &.one {
    height: 16rem;
    border: 0px;
    @include phone {
      width: 100%;
      min-height: 35vh;
    }
  }
}

.styles__titles {
  @extend %center;
  height: 100%;
  @include phone {
    min-height: 35vh;
  }
  h2 {
    @extend %title-100;
    padding: 1.6rem;
    @include phone {
      font-size: 8rem;
      // padding: 3.2rem 1.6rem;
    }
  }
}

.styles__grid__box__wrapper {
  @include phone {
    height: 75vh;
  }
  &.one {
    grid-area: 2 / 1 / 9 / 5;
    border-top: 1px solid $b-color;
    @include phone {
      width: 100%;
      order: 1;
      border-top: 0px;
    }
  }
  &.two {
    grid-area: 3 / 5 / 10 / 9;
    border-top: 1px solid $b-color;
    @include phone {
      width: 100%;
      order: 3;
    }
  }
  &.three {
    grid-area: 1 / 9 / 8 / 13;
    @include phone {
      width: 100%;
      order: 5;
      border-top: 1px solid $b-color;
    }
  }
  &.four {
    grid-area: 9 / 9 / 16 / 13;
    @include phone {
      width: 100%;
      order: 8;
    }
  }

  &.five {
    grid-area: 15 / 1 / 22 / 5;
    @include phone {
      width: 100%;
      order: 10;
    }
  }
  &.six {
    grid-area: 16 / 5 / 23 / 9;
    @include phone {
      width: 100%;
      order: 12;
      border-top: 1px solid $b-color;
    }
  }
  &.seven {
    grid-area: 17 / 9 / 24 / 13;
    @include phone {
      width: 100%;
      order: 14;
    }
  }
}

.styles__hero__media__image {
  @extend %cover;
}
</style>
