export const slideRight = {
  name: 'slide-right',
  mode: 'out-in',
  css: false,

  enter(el, done) {
    this.$gsap.from(el, {
      x: '-100%',
      opacity: 0,
      duration: 1,
      ease: 'power4.out',
      onComplete: done,
    })
  },

  leave(el, done) {
    this.$gsap.to(el, {
      opacity: 0,
      duration: 0.5,
      ease: 'power4.in',
      onComplete: done,
    })
  },
}

export const slideLeft = {
  name: 'slide-left',
  mode: 'out-in',
  css: false,

  enter(el, done) {
    this.$gsap.from(el, {
      x: '100%',
      opacity: 0,
      duration: 1,
      ease: 'power4.out',
      onComplete: done,
    })
  },

  leave(el, done) {
    this.$gsap.to(el, {
      opacity: 0,
      duration: 0.5,
      ease: 'power4.in',
      onComplete: done,
    })
  },
}
