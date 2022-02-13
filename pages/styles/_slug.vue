<template>
  <div class="page__wrapper style">
    <SocialHead
      :title="`my${currentStyle.name}Swimlook`"
      :description="currentStyle.description"
      :image="currentStyle.image[0].secure_url"
    />
    <!-- <div class="grid__container"> -->
    <div class="style__title__box">
      <h2>{{ name }}</h2>
    </div>
    <div class="previous__circle">
      <NewArrowLeftCircle :link="previousSlug" class="arrow-icon-wrapper" />
    </div>
    <div class="style__numbers__box">
      <h2>{{ swimsuits.length }}<span>swimsuits</span></h2>
    </div>
    <div class="next__circle">
      <NewArrowRightCircle :link="nextSlug" class="arrow-icon-wrapper" />
    </div>
    <div class="previous__bar-left">
      <div class="previous__bar__inner">
        <p>{{ previousNumberOfItems }}</p>
        <h2>{{ previous }}</h2>
      </div>
    </div>
    <div class="next__bar-right">
      <div class="next__bar__inner">
        <p>{{ nextNumberOfItems }}</p>
        <h2>{{ next }}</h2>
      </div>
    </div>
    <div class="style__items__wrapper">
      <h1>{{ name }}</h1>
      <div v-dompurify-html="$md.render(description)" class="markdown-16"></div>

      <div class="items">
        <div
          v-for="(swimsuit, index) in swimsuits"
          :key="swimsuit.name"
          class="item"
        >
          <new-item-card :item="swimsuit" :number="index + 1" />
        </div>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import { slideRight, slideLeft } from '@/utils/transitions'

export default {
  name: 'StylePage',
  // layout: 'home',
  validate({ params, store }) {
    return store.state.styles.data.some((el) => el.fields.slug === params.slug)
  },

  // transition(from, to) {
  //   const order = {
  //     sporty: 0,
  //     blooming: 1,
  //     fascinante: 2,
  //     provocative: 3,
  //     charmant: 4,
  //     gorgeous: 5,
  //     bellissima: 6,
  //   }
  //   if (!from) {
  //     return slideRight
  //   }

  //   const val = (x) => {
  //     return order[x]
  //   }

  //   if (val(to.params.slug) === 6 && val(from.params.slug) === 0) {
  //     return slideRight
  //   } else if (val(to.params.slug) === 0 && val(from.params.slug) === 6) {
  //     return slideLeft
  //   } else {
  //     return val(to.params.slug) > val(from.params.slug)
  //       ? slideLeft
  //       : slideRight
  //   }
  // },

  head() {
    return {
      title: `my ${this.currentStyle.name} Swimlook`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.currentStyle.description,
        },
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `https://www.myswimlook.com/styles/${this.$route.params.slug}`,
        },
      ],
    }
  },

  computed: {
    ...mapGetters({
      data: 'data/getNewItems',
      styles: 'styles/getStyles',
    }),

    swimsuits() {
      return this.data.filter((el) => el.style === this.name)
    },

    currentStyle() {
      return this.styles.find((style) => style.slug === this.$route.params.slug)
    },

    name() {
      return this.currentStyle.name
    },

    description() {
      return this.currentStyle.description
    },

    previous() {
      const getIndex = this.styles.map((e) => e.name).indexOf(this.name)
      return this.styles[
        getIndex - 1 >= 0 ? getIndex - 1 : this.styles.length - 1
      ].name
    },
    previousNumberOfItems() {
      return this.data.filter((el) => el.style === this.previous).length
    },

    next() {
      const getIndex = this.styles.map((e) => e.name).indexOf(this.name)
      return this.styles[getIndex + 1 < this.styles.length ? getIndex + 1 : 0]
        .name
    },

    nextNumberOfItems() {
      return this.data.filter((el) => el.style === this.next).length
    },

    previousSlug() {
      const getIndex = this.styles.map((e) => e.name).indexOf(this.name)

      const slug =
        this.styles[getIndex - 1 >= 0 ? getIndex - 1 : this.styles.length - 1]
          .slug
      return 'styles/' + slug
    },

    nextSlug() {
      const getIndex = this.styles.map((e) => e.name).indexOf(this.name)
      const slug =
        this.styles[getIndex + 1 < this.styles.length ? getIndex + 1 : 0].slug
      return 'styles/' + slug
    },
  },

  mounted() {},

  methods: {},
}
</script>

<style lang="scss" scoped>
.style {
  transform: none;
}

.style__title__box {
  @extend %center;
  border-right: 1px solid $b-color;
  border-bottom: 1px solid $b-color;
  background-color: get-color(primary, bright);
  position: fixed;
  height: calc(92vw / 12 * 0.75);
  width: calc(92vw / 4);
  top: 50px;
  z-index: 3;
  h2 {
    @extend %title-50;
    letter-spacing: 2px;
    padding: 10px;
    text-transform: uppercase;
    @include phone {
      font-size: 3rem;
    }
  }

  @include phone {
    height: calc(92vw / 6 * 0.75);
    border-top: 1px solid $b-color;
  }
}

.style__numbers__box {
  @extend %center;
  border-left: 1px solid $b-color;
  border-bottom: 1px solid $b-color;
  background-color: get-color(primary, bright);
  position: fixed;
  height: calc(92vw / 12 * 0.75);
  width: calc(92vw / 6);
  top: 50px;
  right: calc(4vw + 2px);
  z-index: 3;

  h2 {
    @extend %title-50;
    padding: 10px;
    text-transform: uppercase;
    @include phone {
      font-size: 3rem;
    }
    span {
      @extend %title-24;
      padding-left: 0.8rem;
      @include xs-phone {
        font-size: 12px;
      }
    }
  }
  p {
    @extend %title-24;
    padding-right: 1.6rem;
  }

  @include phone {
    height: calc(92vw / 6 * 0.75);
    width: calc(92vw / 4);
    right: 0;
    border-top: 1px solid $b-color;
  }
}

.previous__circle {
  // grid-area: 2 / 1 / 3 / 2;
  width: calc(92vw / 12 * 0.75);
  height: calc(92vw / 12 * 0.75);
  position: fixed;
  top: calc((92vw / 12 * 0.75) + 49px);
  z-index: 4;
  border-bottom: 1px solid $b-color;
  border-top: 1px solid $b-color;
  background-color: get-color(primary, normal);
  left: calc(4vw + 2px);
  @include phone {
    width: calc(92vw / 6 * 0.75);
    height: calc(92vw / 6 * 0.75);
    top: calc((92vw / 6 * 0.75) + 49px);
    left: 0;
    border-right: 1px solid $b-color;
  }
  @include xs-phone {
    width: calc(92vw / 5 * 0.75);
    height: calc(92vw / 5 * 0.75);
  }
}

.next__circle {
  width: calc(92vw / 12 * 0.75);
  height: calc(92vw / 12 * 0.75);
  position: fixed;
  top: calc((92vw / 12 * 0.75) + 49px);
  z-index: 4;
  border-bottom: 1px solid $b-color;
  border-top: 1px solid $b-color;
  background-color: get-color(primary, normal);
  right: calc(4vw + 2px);
  @include phone {
    width: calc(92vw / 6 * 0.75);
    height: calc(92vw / 6 * 0.75);
    top: calc((92vw / 6 * 0.75) + 49px);
    right: 0;
    border-left: 1px solid $b-color;
  }
  @include xs-phone {
    width: calc(92vw / 5 * 0.75);
    height: calc(92vw / 5 * 0.75);
  }
}

.arrow-icon-wrapper {
  width: 100%;
  height: 100%;
  z-index: 4;
}

.previous__bar-left {
  position: fixed;
  width: calc(92vw / 12 * 0.75);
  top: calc(92vw / 6);
  left: calc(4vw + 2px);
  @include phone {
    left: 0;
    padding-left: 5px;
  }
}

.next__bar-right {
  position: fixed;
  width: calc(92vw / 12 * 0.75);
  top: calc(92vw / 6);
  right: calc(4vw + 2px);
  @include phone {
    right: 0;
    padding-right: 5px;
  }
}

.previous__bar__inner,
.next__bar__inner {
  position: relative;
  height: 500px;
  h2 {
    @extend %title-50;
    @extend %vertical-titles;
    text-transform: uppercase;
    top: 35%;

    @include phone {
      font-size: 24px;
      top: 40%;
    }
  }
  p {
    @extend %title-30;
    @extend %vertical-titles;
    top: 10%;
    left: 25%;
    @include phone {
      top: 25%;
      left: 30%;
      font-size: 20px;
    }
  }
}

.style__items__wrapper {
  // grid-area: 1 / 2 / 4 / 12;
  margin: 0 calc((92vw / 12 * 0.75) + 2px);
  border-left: 1px solid $b-color;
  border-right: 1px solid $b-color;

  h1 {
    @extend %title-110;
    text-align: center;
    padding-top: 5rem;
    @include phone {
      font-size: 8rem;
    }
  }
}

.markdown-16 {
  @extend %title-30;
  white-space: pre-line;
  padding: 3rem;
  @include desktop {
    font-size: 3.4rem;
    line-height: 1.3;
  }
  @include phone {
    font-size: 16px;
    line-height: 1.3;
    font-family: 'Work Sans', sans-serif;
    font-weight: 300;
    color: get-color(secondary, dark);
    padding: 3rem 7rem;
  }
}
</style>
