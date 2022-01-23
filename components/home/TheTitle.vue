<template>
  <h1 class="heading">
    <span class="line"></span><slot></slot><span class="line back"></span>
  </h1>
</template>

<script>
export default {
  name: 'TheTitle',
}
</script>

<style lang="scss" scoped>
.line {
  width: 100%;
  // max-width: 800px;
  height: 1px;
  margin: 0 0 10px 0;
  position: relative;
  display: inline-block;
  background-color: $b-color;
  transform-origin: left center;
  vertical-align: bottom;
  &.back {
    transform-origin: right center;
    vertical-align: top;
    margin: 5px 0 10px 0;
  }
}

.heading {
  @extend %title-120;
  padding: 1.6rem;
  text-transform: uppercase;
}
</style>
