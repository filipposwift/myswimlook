<template>
  <div class="page__wrapper contact">
    <div class="contact__container">
      <h1>contact us</h1>
      <TheContactForm />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Contact MySwimLook',
      description: 'Contact us if you have any enquiry about the site.',
    }
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.description,
        },
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `https://www.myswimlook.com/contact`,
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.contact__container {
  margin: 10rem 10rem;
  padding: 3.2rem 1.6rem;
  border: 1px solid $b-color;
  @include desktop {
    margin: 15rem 8rem;
  }
  @include xs-phone {
    margin: 20rem 2rem;
  }
  h1 {
    @extend %paragraph-20;
    font-family: 'Work Sans', sans-serif;
    font-size: 3rem;
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 10rem;
    @include desktop {
      font-size: 30px;
    }
    // @include xs-phone {
    //   font-size: 30px;
    // }
  }
}
</style>
