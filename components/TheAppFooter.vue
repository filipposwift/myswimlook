<template>
  <footer class="footer__container">
    <div class="footer__disclaimer">
      <p>
        We may earn a commission from some links on the site, however we only
        include swimsuits that we love and we want to wear.
      </p>
    </div>
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
            <nuxt-link :to="localePath('/contact')" exact
              ><span>Contact</span></nuxt-link
            >
          </li>
        </ul>
      </div>
      <div class="footer__item">
        <h2>Quick Links</h2>
        <ul class="footerLinks">
          <li class="footerLinks__item">
            <nuxt-link :to="localePath('/privacy')" exact
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
          We are a team of fashion lovers and technical software delevopers
          composed by three women and one (very lucky) man. Our passion for the
          ocean, fashion and the environment is what drives MySwimLook. We focus
          on how technology and social media can help people make better and
          easier choices. We hope you enjoy our website and share our vision.
        </p>
      </div>
    </div>
    <div class="footer__bottom__inner">
      <div class="footer__logo">
        <nuxt-link :to="localePath('/')" exact>
          <figure class="footer__logo__media">
            <!-- <img
              src="~/assets/img/Logowhite.svg?data"
              alt="Logo myswimllok"
              width="250"
              height="70"
              class="footer__logo__media__image"
            /> -->
            <LogoWhite class="footer__logo__media__image" />
          </figure>
        </nuxt-link>
      </div>
      <div class="footer__social__links">
        <a
          href="https://www.facebook.com/myswimlook/"
          target="_blank"
          rel="nofollow noopener noreferrer"
          aria-label="facebook"
        >
          <IconFacebook class="social__logo" />
        </a>
        <a
          href="https://www.instagram.com/myswimlook/"
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          <IconInstagram class="social__logo" />
        </a>
        <a href="" target="_blank" rel="nofollow noopener noreferrer">
          <IconPinterest class="social__logo" />
        </a>
      </div>
      <div class="footer__copyright">
        <p>© mySwimlook 2022</p>
      </div>
    </div>
  </footer>
</template>

<script>
import IconFacebook from '@/assets/img/facebook.svg?inline'
import IconInstagram from '@/assets/img/instagram.svg?inline'
import IconPinterest from '@/assets/img/pinterest.svg?inline'
// import LogoWhite from '@/assets/img/logowhite.svg?inline'
export default {
  components: {
    IconFacebook,
    IconInstagram,
    IconPinterest,
  },
}
</script>

<style lang="scss" scoped>
.footer__container {
  width: 100%;
  z-index: 10;
  position: relative;
  border: 1px solid $b-color;
  background-color: get-color(primary, bright);
  @include phone {
    margin-bottom: 1.6rem;
  }
}

.footer__disclaimer {
  padding: 0.8rem;
  p {
    @extend %paragraph-16;
    font-size: 14px;
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
.social__logo {
  height: 24px;
  width: 24px;
}
</style>
