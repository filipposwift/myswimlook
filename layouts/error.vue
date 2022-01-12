<template>
  <div class="container">
    <h1>
      {{ pageError.title }}
    </h1>

    <p>
      {{ pageError.message }}
    </p>

    <nuxt-link :to="localePath(`/`)" exact>
      <h1>Home Page</h1>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  layout: 'error',

  props: {
    error: {
      type: Object,
      default: null,
    },
  },

  head() {
    return {
      title: this.pageError.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.pageError.message,
        },
      ],
    }
  },

  computed: {
    pageError() {
      return this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    },

    pageNotFound() {
      return {
        title: this.$t('pageNotFoundTitle'),
        message: this.$t('pageNotFoundMessage'),
      }
    },

    otherError() {
      return {
        title: this.$t('otherErrorTitle'),
        message: this.$t('otherErrorMessage'),
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  padding: 20px;
  width: 100vw;
  height: 100vh;
}

h1 {
  font-size: 5rem;
  margin-bottom: 20px;
}

p {
  font-size: 2rem;
  margin-bottom: 20px;
}
</style>
