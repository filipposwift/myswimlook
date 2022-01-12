<template>
  <div class="home__gallery">
    <div class="hg__left">
      <div
        v-for="(style, index) in oddStyles"
        :key="style.name"
        :class="`hg__image hg__image--${classLetter(index)}`"
      >
        <nuxt-img
          :src="style.image[0].public_id"
          alt="Photo1"
          provider="cloudinary"
          width="400"
          class="hg__image-img"
        >
        </nuxt-img>
      </div>
    </div>
    <div class="hg__right">
      <div
        v-for="(style, index) in evenStyles"
        :key="style.name"
        :class="`hg__image hg__image--${classLetter(index)}`"
      >
        <nuxt-img
          :src="style.image[0].public_id"
          alt="Photo1"
          provider="cloudinary"
          width="400"
          class="hg__image-img"
        >
        </nuxt-img>
      </div>
    </div>
    <div class="hg__text">
      <!-- <h1 class="hg__text-one">How</h1>
      <h1 class="hg__text-two">do you</h1>
      <h1 class="hg__text-three">feel</h1>
      <h1 class="hg__text-four">today?</h1> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'HomeGallery',
  computed: {
    ...mapGetters({
      styles: 'styles/getStyles',
    }),

    evenStyles() {
      const filtered = this.styles.filter((element, index) => {
        return index % 2 === 0
      })
      return filtered
    },

    oddStyles() {
      const filtered = this.styles.filter((element, index) => {
        return index % 2 !== 0
      })
      return filtered
    },
  },

  mounted() {
    this.animateOnScroll()
  },

  methods: {
    classLetter(index) {
      const letter = ['l', 'm', 's', 'e']
      return letter[index]
    },

    animateOnScroll() {
      const images = this.$gsap.utils.toArray('.hg__image')
      const img = this.$gsap.utils.toArray('.hg__image-img')
      // const modifier = (index) => 2000 + index * 300
      const tl = this.$gsap.timeline()
      images.forEach((image, index) => {
        tl.to(
          image,
          {
            scale: 0.9,
          },
          0
        )
      })

      img.forEach((image) => {
        tl.to(
          image,
          {
            scale: 1.4,
            ease: 'expoScale(1, 1.4)',
          },
          0
        )
      })

      this.$ScrollTrigger.create({
        animation: tl,
        trigger: '.home__gallery',
        start: 'top 100',
        end: 'bottom 40%',
        scrub: 1,
        // pin: '.home__gallery',

        // markers: true,
        toggleActions: 'restart none reverse pause',
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.home__gallery {
  min-height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  flex-direction: column;

  z-index: 2;

  @include phone {
    display: none;
  }
}
// .hg__left {
//   // perspective: 500px;

//   // transform-style: preserve-3d;
// }
// .hg__right {
//   // perspective: 500px;
//   // transform-style: preserve-3d;
// }

.hg__image {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  overflow: hidden;
  border: 16px solid #fff;

  img {
    @extend %cover;
    object-position: 50% 50%;
    opacity: 0.8;
    // border: 16px solid #fff;
  }
  &--l {
    width: 24vw;
    padding-bottom: 20vw;
  }
  &--m {
    width: 15vw;
    padding-bottom: 24vw;
  }
  &--s {
    width: 20vw;
    padding-bottom: 13vw;
  }

  &--e {
    width: 22vw;
    padding-bottom: 20vw;
  }
}

.hg__text {
  @extend %title-80;
  &-one {
    position: absolute;
    top: 2vh;
    left: 27vw;
  }
  &-two {
    position: absolute;
    top: 14vh;
    left: 30vw;
  }
  &-three {
    position: absolute;
    bottom: 10vh;
    left: 20vw;
  }
  &-four {
    position: absolute;
    bottom: 10vh;
    left: 28vw;
  }
}

.hg__left .hg__image:nth-child(1) {
  top: 1vh;
  left: 2vw;
  img {
    object-position: 50% 10%;
  }
}
.hg__left .hg__image:nth-child(2) {
  top: 20vh;
  left: 29vw;
}
.hg__left .hg__image:nth-child(3) {
  top: 53vh;
  left: 0vw;
  img {
    object-position: 50% 20%;
  }
}

.hg__right .hg__image:nth-child(1) {
  top: 0vh;
  left: auto;
  right: 0vw;
  img {
    object-position: 50% 10%;
  }
}
.hg__right .hg__image:nth-child(2) {
  top: 0vh;
  left: auto;
  right: 30vw;
}
.hg__right .hg__image:nth-child(3) {
  top: 61vh;
  left: auto;
  right: 28vw;
  z-index: 1;
  img {
    object-position: 50% 10%;
  }
}

.hg__right .hg__image:nth-child(4) {
  top: 45vh;
  left: auto;
  right: 5vw;
  z-index: 1;
}
</style>
