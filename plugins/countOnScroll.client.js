import Vue from 'vue'

const countOnScrollObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.intersectionRatio > 0) {
      entry.target.classList.add('in-view')
    } else {
      entry.target.classList.remove('in-view')
    }
  })
})

Vue.directive('count-on-scroll', {
  bind: (el) => {
    countOnScrollObserver.observe(el)
  },
})
