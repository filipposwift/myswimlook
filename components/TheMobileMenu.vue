<template>
  <transition name="show">
    <div v-if="open" class="mobile__menu">
      <div class="header__logo__wrapper">
        <figure class="header__logo__media">
          <img
            src="~/assets/img/Logo.svg"
            alt="Logo myswimlook"
            class="header__logo__media__image"
            width="332"
            height="48"
          />
        </figure>
      </div>

      <nav class="mobile__item-list">
        <ul>
          <slot></slot>
        </ul>
      </nav>
      <button
        class="mobile__cross-button cross-style"
        @click="$emit('toggleNav')"
      >
        <span
          v-for="(x, index) in 2"
          :key="x"
          class="mobile__cross"
          :style="{
            position: 'absolute',
            width: '3px',
            height: '28px',
            transform: index === 1 ? 'rotate(45deg)' : 'rotate(-45deg)',
          }"
        >
        </span>
      </button>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    $route() {
      if (this.open) {
        this.$emit('toggleNav')
      }
    },
  },

  methods: {},
}
</script>

<style lang="scss" scoped>
.mobile__menu {
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  background-color: get-color(primary, normal);
  opacity: 1;
  padding-top: 60px;
  transition: 0.7s;
}
.header__logo__wrapper {
  width: 100%;
  height: 100px;
  margin: 20rem 0 10rem 0;
  border-bottom: 1px solid $b-color;
  border-top: 1px solid $b-color;
}

.header__logo__media {
  height: 100%;
  width: 50%;
  position: relative;
}

.header__logo__media__image {
  @extend %cover;
  object-fit: contain;
}

.mobile__item-list {
  margin-left: 10%;
  font-size: 20px;

  ul {
    list-style: none;
  }
}

.mobile__cross-button {
  height: 24px;
  width: 24px;
}
.mobile__cross-button.hidden {
  display: none;
}

.mobile__cross {
  background: get-color(secondary, dark);
}

.cross-style {
  position: absolute;
  top: 12px;
  right: 36px;
  cursor: pointer;
}

.show {
  &-enter,
  &-leave-to {
    transform: translateX(-100%);
  }
  &-enter-active,
  &-leave-active {
    transition: transform 0.7s easeOutCubic;
  }
}
</style>
