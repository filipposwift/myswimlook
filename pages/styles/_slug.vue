<template>
  <div class="page__wrapper style">
    <SocialHead
      :title="`my${currentStyle.name}Swimlook`"
      :description="currentStyle.description"
      :image="currentStyle.image[0].secure_url"
    />
    <div class="grid-container">
      <div class="left-icon-grid">
        <ArrowLeftCircle :link="previousSlug" class="arrow-icon-wrapper" />
      </div>
      <div class="right-icon-grid">
        <ArrowRightCircle :link="nextSlug" class="arrow-icon-wrapper" />
      </div>

      <div class="previous-title-grid">
        <h2 class="style-nav-item-number">{{ previousNumberOfItems }}</h2>
        <h2 class="style-nav-item">{{ previous }}</h2>
      </div>
      <div class="next-title-grid">
        <h2 class="style-nav-item-number">{{ nextNumberOfItems }}</h2>
        <h2 class="style-nav-item">{{ next }}</h2>
      </div>
      <div class="no-icon-grid"></div>
      <div class="current-title-grid">
        <h2 class="style-nav-item-number is-current">{{ swimsuits.length }}</h2>
        <h2 class="style-nav-item is-current">{{ name }}</h2>
      </div>

      <div class="content-grid">
        <h2>{{ name }}</h2>
        <div class="markdown-16" v-html="$md.render(description)"></div>

        <div class="items">
          <div v-for="swimsuit in swimsuits" :key="swimsuit.name" class="item">
            <item-card :item="swimsuit" />
          </div>
        </div>
      </div>

      <!-- <div class="spacer-nuovo"></div> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import { slideRight, slideLeft } from '@/utils/transitions'

export default {
  name: 'StylePage',
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
h2 {
  @extend %title-110;
  text-align: center;
  padding-top: 5rem;
  @include phone {
    font-size: 8rem;
  }
}

.markdown-16 {
  @extend %title-30;
  white-space: pre-line;
  padding: 3rem;
  @include desktop {
    font-size: 3.4rem;
  }
  @include phone {
    font-size: 2.4rem;
  }
  @include xs-phone {
    font-size: 16px;
  }
}

.grid-container {
  display: grid;
  grid-template-columns: 0.75fr 0.75fr repeat(9, minmax(0, 1fr)) 0.75fr;
  // grid-auto-columns: minmax(auto, calc((100vw - 128px) / 12));
  grid-template-rows: 100px 1fr 100vh;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  @include phone {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
}

.left-icon-grid {
  grid-area: 1 / 1 / 4 / 2;
  // height: 100%;
  border-right: 1px solid $b-color;
  display: flex;
  justify-content: center;
  @include phone {
    flex: 1 0 auto;
    position: fixed;
    left: 4vw;
    z-index: 4;
    background-color: get-color(primary, normal);
    width: 20%;
    border-bottom: 1px solid $b-color;
    border-left: 1px solid $b-color;
  }
}

.arrow-icon-wrapper {
  width: 100%;
  height: 50px;
  position: sticky;
  top: 12rem;
  padding: 0.8rem;
  z-index: 4;
  @include phone {
    position: static;
  }
}

.arrow-icon-wrapper-link {
  width: 100%;
  height: 100%;
}

.arrow-icon {
  transition: 0.2s;
  cursor: pointer;
  &:hover {
    filter: invert(41%) sepia(84%) saturate(2937%) hue-rotate(346deg)
      brightness(104%) contrast(97%);
  }
}

.right-icon-grid {
  grid-area: 1 / 12 / 4 / 13;
  border-left: 1px solid $b-color;
  display: flex;
  justify-content: center;
  @include phone {
    flex: 1 0 auto;
    position: fixed;
    right: 4vw;
    z-index: 4;
    background-color: get-color(primary, normal);
    width: 20%;
    border-bottom: 1px solid $b-color;
    border-right: 1px solid $b-color;
  }
}

.previous-title-grid {
  grid-area: 2 / 1 / 4 / 2;
  position: relative;
  @include phone {
    flex: 1 0 auto;
    position: fixed;
    left: 4vw;
    top: 50px;
    z-index: 5;
    display: flex;
    flex-direction: row-reverse;
  }
}

.style-nav-item {
  @extend %title-50;

  writing-mode: vertical-lr;
  transform: rotate(180deg);
  overflow-wrap: normal;
  padding: 10px;
  text-transform: uppercase;
  height: 50%;
  text-align: right;
  opacity: 0.4;
  position: sticky;
  top: 34rem;

  @include phone {
    writing-mode: inherit;
    transform: none;
    height: 100%;
    text-align: center;
    position: static;
    font-size: 2rem;
    line-height: 2rem;
  }

  &.is-current {
    opacity: 1;
  }
}

.style-nav-item-number {
  @extend %title-30;

  writing-mode: vertical-lr;
  transform: rotate(180deg);

  padding: 5px;
  text-transform: uppercase;
  // height: 0.5%;
  text-align: right;
  opacity: 0.4;
  position: sticky;
  top: 29rem;
  @include phone {
    writing-mode: inherit;
    transform: none;
    height: 100%;
    text-align: center;
    position: static;
    font-size: 16px;
    line-height: 2rem;
  }

  &.is-current {
    opacity: 1;
  }
}

.no-icon-grid {
  grid-area: 1 / 2 / 2 / 3;
  border-right: 1px solid $b-color;
  background-color: white;
  @include phone {
    display: none;
  }
}

.current-title-grid {
  grid-area: 2 / 2 / 4 / 3;
  border-right: 1px solid $b-color;
  background-color: white;
  position: relative;
  @include phone {
    display: none;
  }
}

.content-grid {
  grid-area: 1 / 3 / 3 / 12;
}

.next-title-grid {
  grid-area: 2 / 12 / 4 / 13;
  border-left: 1px solid $b-color;
  position: relative;
  @include phone {
    flex: 1 0 auto;
    position: fixed;
    right: 4vw;
    top: 50px;
    z-index: 5;
    display: flex;
    flex-direction: row-reverse;
    border-left: 0px;
  }
}

.border-xs {
  border-left: 1px solid;
  border-right: 1px solid;
}

.spacer-nuovo {
  grid-area: 3 / 3 / 4 / 12;
  height: 100vh;
  border-top: 1px solid;
}
</style>
