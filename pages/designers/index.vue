<template>
  <div class="page__wrapper designers">
    <SocialHead
      :title="title"
      :description="description"
      :image="image"
      :url="url"
    />
    <div class="designers__intro">
      <h1>
        We have selected more than 100 different bikinis and one-piece models
        from top brands to inspire your awesome look. We wanted to make sure
        that there was something for everyone and we think we've succeeded!
      </h1>
    </div>
    <div class="designers__grid__wrapper">
      <div
        v-for="letter in letters"
        :key="letter"
        class="designers__grid__letters"
      >
        <div class="designers__letter">
          <p>{{ letter }}</p>
        </div>
        <ol class="designers__letter__items">
          <nuxt-link
            v-for="designer in FilterDesignerByLetter(letter)"
            :key="designer.name"
            :to="localePath(`/designers/${designer.slug}`)"
          >
            <li>
              <p>{{ designer.name }}</p>
            </li>
          </nuxt-link>
        </ol>
      </div>
    </div>
    <div class="designers__end"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { slideRight } from '@/utils/transitions'
export default {
  name: 'DesignersPage',
  layout: 'home',
  scrollToTop: true,
  transition: slideRight,

  data() {
    return {
      letters: [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
      ],
      title:
        'mySwimlook Designers - Browse our selection of more than 100 models from top brands to inspire you this summer - Sustainable swimwear from A to Z - Swimsuit inspiration for 2022 - Your guide to the best sustainable swimwear brands in 2022',
      description:
        "Here are some of our favorite swimwear brands that we have handpicked to help you find the perfect one for your body type. It was not an easy job and so we've created this guide on what makes each brand unique",
      image: 'https://www.myswimlook.com/social-media-card.jpg',
      url: 'https://www.myswimlook.com/designers',
    }
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          vmid: 'description',
          hid: 'description',
          name: 'description',
          content: this.description,
        },
      ],
      link: [
        {
          vmid: 'canonical',
          hid: 'canonical',
          rel: 'canonical',
          href: 'https://www.myswimlook.com/designers/',
        },
      ],
    }
  },

  computed: {
    ...mapState({
      designers: (state) => state.data.data,
    }),
  },

  methods: {
    FilterDesignerByLetter(letter) {
      const tmp = [...this.designers]
      const filtered = tmp.filter((el) =>
        el.name.toLowerCase().startsWith(letter.toLowerCase())
      )
      filtered.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })
      return filtered
    },
  },
}
</script>

<style lang="scss" scoped>
.designers__intro {
  width: 100%;
  padding: 8rem 1.6rem;
  h1 {
    font-size: 3rem;
    font-family: 'Work Sans', sans-serif;
    font-weight: 300;
    line-height: 1.5;
    @include desktop {
      font-size: 4rem;
    }

    @include tablet {
      font-size: 5rem;
    }

    @include phone {
      font-size: 18px;
    }
  }
}
.designers__grid__wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0px;

  border-top: 1px solid $b-color;
  @include xs-phone {
    display: block;
  }
}
.designers__grid__letters {
  border-bottom: 1px solid $b-color;
  border-right: 1px solid $b-color;

  &:nth-child(even) {
    border-right: none;
  }
}

.designers__letter {
  width: 100%;
  // height: 3.2rem;
  padding-left: 1.6rem;
  @extend %title-30;
  border-bottom: 1px solid $b-color;
  background-color: get-color(primary, bright);
}

.designers__letter__items {
  display: grid;
  grid-auto-rows: auto;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  min-height: 16rem;
  padding-top: 1.6rem;
  padding-bottom: 1.6rem;
  @include phone {
    grid-template-columns: repeat(2, 1fr);
  }

  li {
    @extend %paragraph-16;
    list-style: none;
    cursor: pointer;
    padding: 1.6rem;

    p {
      transition: 0.2s;
      &:hover {
        color: get-color(basic, normal);
      }
    }
  }
}

.designers__end {
  height: 10rem;
}
</style>
