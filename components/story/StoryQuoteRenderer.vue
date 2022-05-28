<template>
  <div class="quote__renderer">
    <div class="quote__renderer-quote"></div>
    <div class="quote__renderer-text">
      <p>{{ item }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: Object,
      required: true,
    },
  },

  computed: {
    item() {
      const { value } = this.text.content[0]
      return value
    },
  },
}
</script>

<style lang="scss" scoped>
.quote__renderer {
  width: 80%;
  display: flex;
  flex-direction: row;
}

.quote__renderer-quote {
  width: 20%;
  p {
    @extend %title-80;
  }
}

.quote__renderer-text {
  width: 80%;
  padding: 2.8rem 1.4rem;
  margin-bottom: 1.4rem;
  background-color: get-color(primary, bright);
  p {
    @extend %paragraph-16;
    text-align: center;
    font-weight: 400;
  }
}
</style>
