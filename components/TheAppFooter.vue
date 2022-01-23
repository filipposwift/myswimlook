<template>
  <footer class="footer__container">
    <div class="footer__items">
      <div class="footer__item">
        <h2>Explore</h2>
        <ul class="footerLinks">
          <li class="footerLinks__item">
            <nuxt-link :to="localePath('/styles/')" exact
              ><span>Styles</span></nuxt-link
            >
          </li>
          <li class="footerLinks__item">
            <nuxt-link :to="localePath('/designers')" exact>
              <span>Designers</span>
            </nuxt-link>
          </li>
          <li class="footerLinks__item">
            <nuxt-link :to="localePath('/stories')" exact>
              <span>Stories</span>
            </nuxt-link>
          </li>
          <li class="footerLinks__item">
            <nuxt-link :to="localePath('/people')" exact>
              <span>People</span>
            </nuxt-link>
          </li>
        </ul>
      </div>
      <div class="footer__item">
        <h2>Get in touch</h2>
        <ul class="footerLinks">
          <li class="footerLinks__item">
            <nuxt-link :to="localePath('/contactPage')" exact
              ><span>Contact</span></nuxt-link
            >
          </li>
        </ul>
      </div>
      <div class="footer__item">
        <h2>Quick Links</h2>
        <ul class="footerLinks">
          <li class="footerLinks__item">
            <nuxt-link :to="localePath('/privacyPage')" exact
              ><span>Privacy Policy</span></nuxt-link
            >
          </li>
          <!-- <li class="footerLinks__item">
            <nuxt-link :to="localePath('/')" exact>
              <span>Terms and conditions</span>
            </nuxt-link>
          </li> -->
        </ul>
      </div>
      <div class="footer__item last">
        <h2>About us</h2>
        <p>
          We’re a mix of fashion lovers and technical software delevoppers.
          We're four women and one man (poor him!!), we act almsost as a family,
          with strong passion for the sea, the sun and the environment. We’re
          focused on ways technology and social media can help people to make a
          more easy choice when buying the most compelling piece of dress. We
          hope you enjoy the site and the passion who has drove us in building
          myswimlook.
        </p>
      </div>
    </div>
    <div class="footer__bottom__inner">
      <div class="footer__logo">
        <nuxt-link :to="localePath('/')" exact>
          <figure class="footer__logo__media">
            <img
              src="~/assets/img/Logowhite.svg"
              alt="Logo myswimllok"
              width="250"
              height="70"
              class="footer__logo__media__image"
            />
          </figure>
        </nuxt-link>
      </div>
      <div class="footer__social__links">
        <a href="" target="_blank" rel="nofollow noopener noreferrer">
          <nuxt-img
            src="/facebook.svg"
            alt="Logo facebook"
            class="social__logo"
            width="24"
            height="24"
          ></nuxt-img>
        </a>
        <a href="" target="_blank" rel="nofollow noopener noreferrer">
          <nuxt-img
            src="/instagram.svg"
            alt="Logo instagram"
            class="social__logo"
            width="24"
            height="24"
          ></nuxt-img>
        </a>
        <a href="" target="_blank" rel="nofollow noopener noreferrer">
          <nuxt-img
            src="/pinterest.svg"
            alt="Logo pinterest"
            class="social__logo"
            width="24"
            height="24"
          ></nuxt-img>
        </a>
      </div>
      <div class="footer__copyright">
        <p>© mySwimlook 2022</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.footer__container {
  width: 100%;
  z-index: 10;
  border: 1px solid $b-color;
  background-color: get-color(primary, bright);
  @include phone {
    margin-bottom: 1.6rem;
  }
}

.footer__items {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 3.2rem 1.6rem;
}

.footer__item {
  flex: 0 1 auto;
  @include phone {
    flex: 1 0 auto;
    min-width: 33%;
    padding-bottom: 2.4rem;
    margin-bottom: 2.4rem;
  }

  h2 {
    @extend %paragraph-20;
    text-transform: uppercase;
    margin-bottom: 2rem;
  }
  p {
    @extend %paragraph-16;
    word-break: break-word;
    text-align: justify;
  }

  &.last {
    flex-basis: 30%;
    @include phone {
      flex-basis: 100%;
    }
  }
}

.footerLinks {
  list-style: none;
}

.footerLinks__item {
  position: relative;
  display: block;
  margin-bottom: 12px;
  width: 100%;
  line-height: 1.5;
  text-align: left;
  // transition: all 0.2s ease-in-out;

  span {
    @extend %paragraph-16;
    text-transform: uppercase;
    transition: color 0.3s ease-in-out;
    &:hover {
      color: get-color(basic, normal);
    }
  }
}

.footer__bottom__inner {
  display: flex;
  padding: 0.8rem;
}

.footer__logo {
  background-color: get-color(secondary, normal);
  border-right: 1px solid $b-color;
  border-left: 1px solid $b-color;
  height: 5rem;
  width: 20%;
  padding: 0.8rem;
  margin-right: 1.6rem;
  @include phone {
    width: 40%;
  }
  @include xs-phone {
    width: 30%;
  }
}
.footer__logo__media {
  height: 100%;
  width: 100%;
  margin: auto;
  position: relative;
}

.footer__logo__media__image {
  @extend %cover;
  object-fit: contain;
}

.footer__social__links {
  display: flex;
  margin-top: auto;
  margin-bottom: auto;
  a {
    margin-right: 3.2rem;
    @include xs-phone {
      margin-right: 7rem;
    }
  }
}

.footer__copyright {
  @extend %paragraph-16;
  text-transform: uppercase;
  margin-top: auto;
  margin-bottom: auto;
  @include xs-phone {
    font-size: 10px;
  }
}
</style>
