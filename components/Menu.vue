<template>
  <div>
    <div ref="sideNav" class="bm-menu">
      <nav class="bm-item-list">
        <slot></slot>
      </nav>
      <span
        class="bm-cross-button cross-style"
        :class="{ hidden: !crossIcon }"
        @click="closeMenu"
      >
        <span
          v-for="(x, index) in 2"
          :key="x"
          class="bm-cross"
          :style="{
            position: 'absolute',
            width: '3px',
            height: '28px',
            transform: index === 1 ? 'rotate(45deg)' : 'rotate(-45deg)',
          }"
        >
        </span>
      </span>
    </div>
    <div
      ref="bmBurgerButton"
      class="bm-burger-button"
      :class="{ hidden: !burgerIcon }"
      @click="openMenu"
    >
      <span
        v-for="(x, index) in 3"
        :key="index"
        class="bm-burger-bars line-style"
        :style="{ top: 20 + 10 * (index * 2) + '%' }"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuBar',

  props: {
    isOpen: {
      type: Boolean,
      required: false,
    },

    width: {
      type: [String],
      required: false,
      default: '300',
    },
    disableEsc: {
      type: Boolean,
      required: false,
    },

    // onStateChange: {
    //   type: Function,
    //   required: false,
    // },
    burgerIcon: {
      type: Boolean,
      required: false,
      default: true,
    },
    crossIcon: {
      type: Boolean,
      required: false,
      default: true,
    },
    disableOutsideClick: {
      type: Boolean,
      required: false,
      default: false,
    },
    closeOnNavigation: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      isSideBarOpen: false,
    }
  },

  watch: {
    isOpen: {
      deep: true,
      immediate: true,
      handler(newValue, oldValue) {
        this.$nextTick(() => {
          if (!oldValue && newValue) {
            this.openMenu()
          }
          if (oldValue && !newValue) {
            this.closeMenu()
          }
        })
      },
    },

    created() {
      document.addEventListener('click', this.documentClick)
    },

    destroyed() {
      document.removeEventListener('keyup', this.closeMenuOnEsc)
      document.removeEventListener('click', this.documentClick)
    },
  },

  mounted() {
    if (!this.disableEsc) {
      document.addEventListener('keyup', this.closeMenuOnEsc)
    }
  },

  methods: {
    openMenu() {
      this.$emit('openMenu')
      this.isSideBarOpen = true

      this.$nextTick(function () {
        this.$refs.sideNav.style.width = this.width ? this.width + '%' : '100%'
      })
    },

    closeMenu() {
      this.$emit('closeMenu')
      this.isSideBarOpen = false
      document.body.classList.remove('bm-overlay')
      this.$refs.sideNav.style.width = '0px'
    },

    closeMenuOnEsc(e) {
      e = e || window.event
      if (e.key === 'Escape' || e.keyCode === 27) {
        this.closeMenu()
      }
    },
    documentClick(e) {
      const element = this.$refs.bmBurgerButton
      let target = null
      if (e && e.target) {
        target = e.target
      }

      if (
        element &&
        element !== target &&
        !element.contains(target) &&
        !this.hasClass(target, 'bm-menu') &&
        this.isSideBarOpen &&
        !this.disableOutsideClick
      ) {
        this.closeMenu()
      } else if (
        element &&
        this.hasClass(target, 'bm-menu') &&
        this.isSideBarOpen &&
        this.closeOnNavigation
      ) {
        this.closeMenu()
      }
    },
    hasClass(element, className) {
      do {
        if (element.classList && element.classList.contains(className)) {
          return true
        }
        element = element.parentNode
      } while (element)
      return false
    },
  },
}
</script>

<style lang="scss" scoped>
.bm-burger-button {
  position: absolute;
  width: 35%;
  height: 35px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}
.bm-burger-button.hidden {
  display: none;
}
.bm-burger-bars {
  background-color: get-color(secondary, normal);
}

.line-style {
  position: absolute;
  height: 10%;
  left: 0;
  right: 0;
}
.cross-style {
  position: absolute;
  top: 12px;
  right: 12px;
  cursor: pointer;
}
.bm-cross {
  background: get-color(secondary, dark);
}
.bm-cross-button {
  height: 24px;
  width: 24px;
}
.bm-cross-button.hidden {
  display: none;
}
.bm-menu {
  // height: 100%; /* 100% Full-height */
  width: 0; /* 0 width - change this with JavaScript */
  height: 100vh;
  position: fixed; /* Stay in place */
  z-index: 1000; /* Stay on top */
  top: 0;
  left: 0;
  background-color: get-color(primary, bright);
  opacity: 0.9;
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 60px; /* Place content 60px from the top */
  transition: 0.5s; /*0.5 second transition effect to slide in the sidenav*/
}

.bm-item-list {
  margin-left: 10%;
  font-size: 20px;
}
.bm-item-list > * {
  display: flex;
  text-decoration: none;
  padding: 0.7em;

  // & .linkExactActiveClass {
  //   color: get-color(basic, normal);
  // }

  // span {
  //   margin-left: 10px;
  //   font-weight: 700;
  //   color: get-color(secondary, dark);
  // }
}
// .bm-item-list > * > span {
//   margin-left: 10px;
//   font-weight: 700;
//   color: get-color(secondary, dark);
// }
</style>
