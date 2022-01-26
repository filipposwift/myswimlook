<template>
  <section id="grid2" class="tiles tiles--rotated">
    <div class="tiles__wrap">
      <div class="tiles__line right">
        <div class="tiles__line-img"></div>
        <div class="tiles__line-img"></div>
        <div class="tiles__line-img"></div>
        <div
          v-for="image in images.slice(0, 2)"
          :key="image.public_id"
          class="tiles__line-img"
        >
          <nuxt-img
            :src="image.public_id"
            alt="Photo1"
            provider="cloudinary"
            width="400"
            class="hg__image-img"
          >
          </nuxt-img>
        </div>
      </div>
      <div class="tiles__line left">
        <!-- <div class="tiles__line-img"></div> -->
        <div
          v-for="image in images.slice(0, 5)"
          :key="image.slug"
          class="tiles__line-img"
        >
          <nuxt-img
            :src="image.public_id"
            alt="Photo1"
            provider="cloudinary"
            width="400"
            class="hg__image-img"
          >
          </nuxt-img>
        </div>
      </div>
      <div class="tiles__line right">
        <div
          v-for="image in images.slice(4, 11)"
          :key="image.slug"
          class="tiles__line-img"
        >
          <nuxt-img
            :src="image.public_id"
            alt="Photo1"
            provider="cloudinary"
            width="400"
            class="hg__image-img"
          >
          </nuxt-img>
        </div>
      </div>

      <div class="tiles__line left">
        <div
          v-for="image in images.slice(0, 8)"
          :key="image.slug"
          class="tiles__line-img"
        >
          <nuxt-img
            :src="image.public_id"
            alt="Photo1"
            provider="cloudinary"
            width="400"
            class="hg__image-img"
          >
          </nuxt-img>
        </div>

        <!-- <div class="tiles__line-img"></div> -->
      </div>
      <div class="tiles__line right">
        <div class="tiles__line-img"></div>
        <div
          v-for="image in images.slice(4, 7)"
          :key="image.slug"
          class="tiles__line-img"
        >
          <nuxt-img
            :src="image.public_id"
            alt="Photo1"
            provider="cloudinary"
            width="400"
            class="hg__image-img"
          >
          </nuxt-img>
        </div>

        <div class="tiles__line-img"></div>
        <div class="tiles__line-img"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HomeGallery',
  computed: {
    images() {
      return this.$store.state.styles.homeGallery[0].fields.images
    },
  },

  mounted() {
    this.horizAnim()
  },

  methods: {
    horizAnim() {
      const containers = this.$gsap.utils.toArray('.tiles__line')
      const wrap = document.querySelector('.tiles__wrap')

      containers.forEach((container) => {
        const images = container.querySelectorAll('.tiles__line-img')

        this.$gsap.to(images, {
          xPercent: container.classList.contains('right')
            ? 10 * (images.length - 1)
            : -10 * (images.length - 1),
          ease: 'none',
          scrollTrigger: {
            trigger: wrap,
            start: 'top center',
            // invalidateOnRefresh: true,
            pin: false,
            scrub: 1,
            // markers: true,
            end: () => '+=' + wrap.offsetWidth,
          },
        })
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.tiles {
  --tiles-height: 50vh;
  height: var(--tiles-height);
  position: relative;
  overflow: hidden;
  margin-top: 16rem;
}

.tiles--rotated .tiles__wrap {
  --tileswrap-height: calc(var(--tiles-height) * 1.8);
  transform: translate3d(-50%, -50%, 0) rotate(22.5deg);
}

.tiles--rotated .tiles__line-img {
  --tile-margin: 0.5vw;
  width: calc(16.6666% - var(--tile-margin) * 2);
  height: calc(var(--tileswrap-height) / 5 - (4 * var(--tile-margin) / 2));
}

.tiles__wrap {
  width: 150%;
  --tileswrap-height: var(--tiles-height);
  height: var(--tileswrap-height);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
}

.tiles__line {
  display: flex;
}

.tiles__line-img {
  --tile-margin: 2vw;
  flex: none;
  width: calc(16.6666% - var(--tile-margin) * 2);
  height: calc(var(--tileswrap-height) / 3 - (3 * var(--tile-margin) / 2));
  margin: var(--tile-margin);
  position: relative;
}

.hg__image-img {
  @extend %cover;
}
</style>
