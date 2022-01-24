<template>
  <!-- <h1 class="section__heading">
    <span class="line"></span><slot></slot><span class="line back"></span>
  </h1> -->
  <div class="section__heading">
    <div class="line"></div>
    <h1><slot></slot></h1>
    <div class="line back"></div>
  </div>
</template>

<script>
export default {
  name: 'TheTitle',
}
</script>

<style lang="scss" scoped>
.line {
  width: 100%;
  height: 1px;
  margin: 0 0 10px 0;
  //   position: relative;
  //   display: inline-block;
  background-color: $b-color;
  transform-origin: left center;
  //   vertical-align: bottom;
  &.back {
    transform-origin: right center;
    // vertical-align: top;
    margin: 10px 0 0 0;
  }
}

.section__heading {
  @extend %title-120;
  text-transform: uppercase;
  h1 {
    padding: 1.6rem;
  }
}
</style>
