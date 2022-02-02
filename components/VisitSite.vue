<template>
  <div class="visit__site">
    <a :href="url" target="_blank" rel="nofollow noopener noreferrer"
      >Visit Site</a
    >
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.visit__site {
  background-color: get-color(basic, normal);
  color: get-color(primary, bright);
  position: relative;
  overflow: hidden;
  width: 100%;
  // min-width: 40%;
  padding: 0.8rem 1.6rem;

  a {
    @extend %paragraph-20-light;
    letter-spacing: 2px;
    text-transform: uppercase;
    text-align: center;
    display: block;
    @include phone {
      font-size: 16px;
    }
  }

  &::before {
    position: absolute;
    content: 'Visit Site';
    color: get-color(basic, normal);
    display: block;
    text-align: center;
    text-transform: uppercase;
    cursor: pointer;
    padding: 0.8rem;
    @extend %paragraph-20-light;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: get-color(primary, bright);
    transform: translateX(-101%);
    transform-origin: 0% 50%;
    transition: transform 0.5s cubic-bezier(0.785, 0.135, 0.15, 0.86);
    @include phone {
      font-size: 16px;
    }
  }

  &:hover::before {
    transition: transform 0.5s cubic-bezier(0.785, 0.135, 0.15, 0.86);
    transform: translateX(0);
    transform-origin: 100% 50%;
    // border-left: 1px solid $b-color;
  }
}
</style>
