<template>
  <transition name="show">
    <div class="photo__credits">
      <div class="credits__wrapper">
        <div v-for="item in items" :key="item.name" class="credits">
          <span>
            <strong>{{ item.name }}</strong
            >: </span
          ><a
            :href="item.photoLink"
            target="_blank"
            rel="nofollow noopener noreferrer"
            >{{ item.photoName }}</a
          ><span v-if="item.photoName !== 'Shutterstock'"> on </span
          ><a
            v-if="item.photoName !== 'Shutterstock'"
            href="https://unsplash.com/"
            target="_blank"
            rel="nofollow noopener noreferrer"
            >Unsplash</a
          >
        </div>
      </div>

      <button
        class="mobile__cross-button cross-style"
        @click="$emit('closeCredits')"
      >
        <span
          v-for="(x, index) in 2"
          :key="x"
          class="mobile__cross"
          :style="{
            position: 'absolute',
            width: '2px',
            height: '16px',
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
    items: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.photo__credits {
  position: absolute;
  bottom: 0;
  right: 0;
  //   width: 1000px;
  //   height: 300px;
  background-color: get-color(primary, normal);
  border-top: 1px solid $b-color;
  border-left: 1px solid $b-color;
  border-bottom: 1px solid $b-color;
  display: flex;
  transition: 0.7s;
}
.credits__wrapper {
  padding: 50px 1.6rem;
  // transition: 0.7s;
}

.credits {
  border-left: 1px solid $b-color;
  border-right: 1px solid $b-color;
  border-top: 1px solid $b-color;
  padding: 1.6rem;
  background-color: get-color(primary, bright);
  @extend %paragraph-16;
  &:last-of-type {
    border-bottom: 1px solid $b-color;
  }

  a {
    color: get-color(secondary, normal);
    transition: all 0.3s ease-in-out;
    &:hover {
      color: get-color(basic, normal);
    }
  }
}

.mobile__cross-button {
  height: 16px;
  width: 16px;
}

.mobile__cross {
  background: get-color(secondary, dark);
}

.cross-style {
  position: absolute;
  top: 1.6px;
  right: 10.8px;
  cursor: pointer;
}

.show {
  &-enter,
  &-leave-to {
    transform: translateX(100%);
  }
  &-enter-active,
  &-leave-active {
    transition: transform 0.7s easeOutCubic;
  }
}
</style>
