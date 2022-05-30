<template>
  <div class="bm-burger-button" @click="$emit('toggleNav')">
    <span
      v-for="(x, index) in 3"
      :key="index"
      class="bm-burger-bars line-style"
      :style="{ top: 20 + 10 * (index * 2) + '%' }"
    ></span>
  </div>
</template>

<script>
export default {}
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
  height: 3%;
  left: 0;
  right: 0;
}
</style>
