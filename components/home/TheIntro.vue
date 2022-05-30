<template>
  <div class="intro">
    <div class="intro__one">
      <h1 class="heading">
        <span>. dDiscover. </span>Discover<span>. Discover. </span>
      </h1>
      <h1 class="heading-2">
        <span>swimsuits. </span>swimsuits.<span> swimsuits. </span>
      </h1>
    </div>
    <div class="intro__two">
      <h1 class="heading-2">
        <span>ou. You. You. </span>You<span>. You. You. </span>
      </h1>
      <h1 class="heading">
        <span>standout. </span>standout.<span> standout. </span>
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheIntro',
  mounted() {
    this.wordAnimation()
    this.$ScrollTrigger.getById('intro').enable()
  },

  destroyed() {
    this.$ScrollTrigger.getById('intro').disable()
  },

  methods: {
    wordAnimation() {
      const words = this.$gsap.timeline()

      this.$ScrollTrigger.create({
        id: 'intro',
        animation: words,
        trigger: '.intro__one',
        endTrigger: '.intro__two',
        start: 'top center',
        end: 'bottom 25%',
        scrub: 4,
        toggleActions: 'restart none reverse reset',
      })
      words
        .to(
          '.heading',
          {
            xPercent: 1.5,
            yPercent: -200,
            scale: 1.5,
            ease: 'none',
          },
          0
        )
        .to(
          '.heading-2',
          {
            xPercent: -1.5,
            yPercent: -200,
            ease: 'none',
          },
          0
        )
    },
  },
}
</script>

<style lang="scss" scoped>
.intro {
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: get-color(primary, normal);
  margin-bottom: 2rem;
  background-image: url('static/backgroud-image.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.intro__one {
  margin-top: 40vh;
  padding-top: 10vh;
  white-space: nowrap;
  overflow: hidden;
}

.intro__two {
  padding-top: 10vh;
  white-space: nowrap;
  overflow: hidden;
}

.heading,
.heading-2 {
  will-change: transform;
}

h1 {
  font-family: 'Work Sans', sans-serif;
  font-size: 20rem;
  color: get-color(secondary, dark);
  letter-spacing: -5px;
  margin-top: 10px;
  margin-bottom: 10px;
  line-height: 0.85;
  font-weight: 400;
  @include desktop {
    font-size: 25rem;
  }
  @include phone {
    font-size: 12.5rem;
  }

  span {
    // color: #d6d6d6;
    color: #c2cdd6;
  }
}

// .heading-2 {
//   overflow: visible;
// }
</style>
