export const slideRight = {
  name: 'slide-right',
  mode: 'in-out',
  css: false,
  appear: true,
  beforeEnter(el) {
    this.$gsap.set(el, {
      scaleX: 0,
      opacity: 0,
    })
  },

  enter(el, done) {
    this.$gsap.to(el, {
      transformOrigin: 'right',
      scaleX: 1,
      //   scale: 1,
      opacity: 1,
      duration: 0.6,
      //   delay: 2,
      ease: 'sine.out',
      onComplete: done,
    })
  },

  leave(el, done) {
    this.$gsap.to(el, {
      //   delay: 2,
      scaleX: 0,
      transformOrigin: 'left',
      duration: 0.4,
      ease: 'sine.out',
      onComplete: done,
    })
  },
}

export const slideLeft = {
  name: 'slide-left',
  mode: 'in-out',
  css: false,
  appear: true,
  beforeEnter(el) {
    this.$gsap.set(el, {
      scaleX: 0,
      opacity: 0,
    })
  },

  enter(el, done) {
    this.$gsap.to(el, {
      transformOrigin: 'left',
      scaleX: 1,
      //   scale: 1,
      opacity: 1,
      duration: 0.6,
      //   delay: 2,
      ease: 'sine.out',
      onComplete: done,
    })
  },

  leave(el, done) {
    this.$gsap.to(el, {
      //   delay: 2,
      scaleX: 0,
      transformOrigin: 'right',
      duration: 0.5,
      ease: 'sine.out',
      onComplete: done,
    })
  },
}
