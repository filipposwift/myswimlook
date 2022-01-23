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
    this.initImageReveal()
  },
  methods: {
    initImageReveal() {
      const el = document.querySelector('.reveal__media')
      const image = el.querySelector('.reveal__media-img')
      const imgMask = el.querySelector('.img-mask')

      const tl = this.$gsap.timeline({
        scrollTrigger: {
          trigger: el,
          toggleActions: 'restart none none reset',
        },
      })

      // create tween for the image
      tl.to(
        imgMask,
        {
          scaleX: 1,
          transformOrigin: 'right',
          duration: 0.5,
          ease: 'power2.inOut',
        },
        0
      )
        .set(el, {
          autoAlpha: 1,
        })

        .from(el, 1.5, {
          xPercent: 100,
          delay: -0.5,
          ease: 'power2.out',
        })

        .from(image, 1.5, {
          xPercent: -100,
          scale: 1.3,
          delay: -1.5,
          ease: 'power2.out',
        })
        .to(imgMask, {
          scaleX: 0,
          transformOrigin: 'left',
          duration: 0.7,
          delay: -0.7,
          ease: 'power2.inOut',
        })
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
  // transform-origin: left;
}
</style>
