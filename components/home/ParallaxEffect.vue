<template>
  <figure class="reveal__media">
    <div class="reveal__media-img">
      <slot> </slot>
    </div>
    <div class="img-mask"></div>
  </figure>
</template>

<script>
export default {
  mounted() {
    this.initImageParallax()
  },
  methods: {
    initImageParallax() {
      const el = document.querySelector('.reveal__media')
      const image = el.querySelector('.reveal__media-img')

      this.$gsap.to(
        image,
        {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'bottom bottom',
            scrub: true,
          },
        },
        0
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.img-mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transform: scaleX(0);
  transform-origin: left center;
  background: get-color(primary, bright);
}

.reveal__media {
  width: calc(50vw + 6.6vw);
  margin: 0 6.6vw 0 33.33vw;
  padding-bottom: 33.33vw;
  // background-color: #000000;
  overflow: hidden;
  position: relative;
  z-index: 1; /* fix for Safari */
  visibility: hidden;
  transform-origin: right;
}
.reveal__media-img {
  position: absolute;
  width: 100%;
  left: 0;
  object-fit: cover;
  opacity: 0.9;
  height: 120%;
  top: -20%;
}
</style>
