<template>
<div class="form__error">
  <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="error, index in errors" :key="index">{{ error }}</li>
    </ul>
  </p>
 <form
    id="contact_form"
    name="contact"
    method="POST"
    data-netlify="true"
    netlify-honeypot="bot-field"
    novalidate="true"
    action="/thank-you/"
    class="form__container"
    @submit="checkForm"
  >
    <input type="hidden" name="form-name" value="contact" />

    <p class="hidden">
      <label>
        Don’t fill this out if you're human:
        <input name="bot-field" />
      </label>
    </p>
    <div class="form__group">
      <div class="form__group__name">
        <label for="full_name" class="sr-only">Full name</label>
        <input
          id="name"
          v-model="name"
          name="name"
          type="text"
          placeholder="Your Name"
          required
          autocomplete="name"
          class="form__input"
        />
      </div>
      <div class="form__group__mail">
        <label for="email" class="sr-only">Email</label>
        <input
          id="email"
          v-model="email"
          name="email"
          placeholder="Your Email"
          required
          type="email"
          autocomplete="email"
          class="form__input"
        />
      </div>
    </div>
    <div class="form__message">
      <label for="message" class="sr-only">Message</label>
      <textarea
        id="message"
        v-model="message"
        name="message"
        placeholder="Your Message"
        required
        rows="4"
        class="form__input"
      ></textarea>
    </div>
    <div class="form__button">
      <button class="button__submit" type="submit">
        <span>Send Message</span>
      </button>
    </div>
  </form>
</div>
 
</template>

<script>
export default {
  data() {
    return {
      errors: [],
      name: null,
      email: null,
      movie: null,
    }
  },
  methods: {
    checkForm(e) {
      this.errors = []

      if (!this.name) {
        this.errors.push('Name required.')
      }
      if (!this.email) {
        this.errors.push('Email required.')
      } else if (!this.validEmail(this.email)) {
        this.errors.push('Valid email required.')
      }
      if (!this.message) {
        this.errors.push('Message required')
      }

      if (!this.errors.length) {
        return true
      }

      e.preventDefault()
    },
    validEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
  },
}
</script>

<style lang="scss" scoped>

.form__error {
  @extend %paragraph-16;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1.4rem;
  line-height: 1.5;
  @include phone {
    width: 90%;
  }
  b {
    font-weight: 400;
  }

  ul {
    padding-left: 2rem;
  }

}
.form__container {
  min-width: 70%;
  margin-left: auto;
  margin-right: auto;
  @include xs-phone {
    min-width: 90%;
  }
}

.form__group {
  display: flex;
  width: 100%;
}

.form__group__name {
  border: 1px solid $b-color;
  width: 50%;
  padding: 1.2rem 1.4rem;
}

.form__group__mail {
  border-top: 1px solid $b-color;
  border-bottom: 1px solid $b-color;
  border-right: 1px solid $b-color;
  width: 50%;
  padding: 1.2rem 1.4rem;
  line-height: normal;
  resize: none;
  transition: border-color 0.1s ease-in-out;
  background: transparent;
}

.form__message {
  margin-top: 1.2rem;
  border: 1px solid $b-color;
  width: 100%;
  padding: 1.2rem 1.4rem;
  height: 200px;
}

.form__input {
  @extend %paragraph-16;
  width: 100%;
  background: transparent;
  line-height: normal;
  resize: none;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.hidden {
  visibility: hidden;
}

.form__button {
  width: 100%;
  margin-top: 1.2rem;
  border: 1px solid $b-color;
}

.button__submit {
  width: 100%;
  margin: auto;
  text-transform: uppercase;
  padding: 1.2rem 1.4rem;
  overflow: hidden;
  background-color: get-color(secondary, normal);
  color: get-color(primary, bright);
  position: relative;
  span {
    position: relative;
    @extend %paragraph-16;
    font-weight: 400;
    mix-blend-mode: difference;
  }

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: '';
    background: get-color(primary, normal);
    transition: transform 0.5s cubic-bezier(0.785, 0.135, 0.15, 0.86);
    transform-origin: 0% 50%;
  }
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &:hover::before {
    transform: scale3d(0, 1, 1);
    transform-origin: 100% 50%;
  }
}
</style>
