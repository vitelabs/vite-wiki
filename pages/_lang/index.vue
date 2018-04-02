<template>
  <section class="hero is-fullheight " v-in-viewport>
    <div class="hero-body">
      <div class="container" v-in-viewport.once>
        <h1 class="header">
          <logo-word></logo-word>
        </h1>
        <div class="has-text-centered hvr-bounce-in is-size-1-desktop is-size-2-touch hvr-grow">
          <no-ssr>
            <p class="slogan inview2 delay-0-700 animated fadeInDown">
              <vue-typer :text="typerText" :repeat='0' :pre-type-delay='500'>Vite Labs</vue-typer>
            </p>
          </no-ssr>
        </div>
        <div class="hero-btn-wrapper inview1 delay-0-800 animated fadeInUp">
          <nuxt-link class="button" :to="`/${$i18n.locale}/whitePaper/index`" active-class="none">
            {{$t('home.start')}}
          </nuxt-link>
          <nuxt-link class="button white-btn" :to="`/${$i18n.locale}/about/start-contribute`" active-class="none">
            {{$t('home.contribute')}}
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="social">
      <a :href="urls.discord" target="_blank"><fa-icon class="icon" :icon="['fab', 'discord']" /></a>
      <a :href="urls.twitter" target="_blank"><fa-icon class="icon" :icon="['fab', 'twitter']" /></a>
      <a :href="urls.github" target="_blank"><fa-icon class="icon" :icon="['fab', 'github']" /></a>
    </div>
  </section>
</template>

<script type="text/babel">
  import Vue from 'vue'
  import config from '~/config'
  import Logo from '~/components/Logo.vue'
  import LogoWord from '~/components/LogoWord'

  if (process.browser) {
    let {VueTyper} = require('vue-typer')
    Vue.component('vue-typer', VueTyper)
  }

  export default {
    layout: 'index',
    components: {
      Logo,
      LogoWord
    },
    head () {
      let title = this.$t('head.title')
      let description = this.$t('head.homeDesc')
      return {
        titleTemplate: `%s - ${title}`,
        title: this.$t('head.document'),
        meta: [
          { hid: 'description', name: 'description', content: description },

          // Open Grapg
          { name: 'og:title', content: title, hid: 'og:title' },
          { name: 'og:description', content: description, hid: 'og:description' },
          { name: 'og:type', content: 'website', hid: 'og:type' },
          { name: 'og:url', content: 'http://doc.vite.org', hid: 'og:url' },
          // { name: 'og:image', content: 'https://i.imgur.com/PzEm5j2.png' },

          // Twitter Card
          { name: 'twitter:card', content: 'summary', hid: 'twitter:card' },
          { name: 'twitter:site', content: '@vitelabs', hid: 'twitter:site' },
          { name: 'twitter:title', content: title, hid: 'twitter:title' },
          { name: 'twitter:description', content: description, hid: 'twitter:description' },
          // { name: 'twitter:image', content: 'https://i.imgur.com/PzEm5j2.png' },
          { name: 'twitter:image:alt', content: 'Vite Logo', hid: 'twitter:image:alt' }
        ]
      }
    },
    data: function () {
      return {
        urls: config.urls,
        typerText: this.$t('home.slogan')
      }
    },
    methods: {}
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~assets/vars";

  body {
    background: rgba(247,247,247,1);
  }
  .hero {
    font-family: $font-family-light;
    text-align: center;

    .logo {
      margin-bottom: 2rem;
      height: 10rem;
      width: auto;
      color: $light-blue;
    }
    h2 {
      font-size: 3rem;
      color: rgba(0,0,0,0.5);
      @include mobile {
        font-size: 1.8rem;
      }
    }
    .header {
      margin-bottom: 1rem;
      color: $light-blue;
      @include mobile {
        font-size: 3.2rem;
        line-height: 3.2rem * 1.5;
      }
      @include tablet {
        font-size: 3.6rem;
        line-height: 3.6rem * 1.5;
      }
      @include desktop {
        font-size: 4rem;
        line-height: 4rem * 1.5;
      }
      @include fullhd {
        font-size: 4.5rem;
        line-height: 4.5rem * 1.5;
      }
    }
    .slogan{
      font-size: 1.5rem;
      line-height: 2rem;
      font-weight: 200;
      @include mobile {
        font-size: 1.2rem;
      }
    }
    .social {
      font-size: 3rem;
      position: absolute;
      bottom: 1rem;
      width: 100%;
      text-align: center;
      .icon {
        color: rgba(0,0,0,0.1);
        &:hover {
          color: rgba(54, 130, 222, 1);
        }
      }
    }
    .hero-btn-wrapper {
      margin-top: 2.5rem;
      .button {
        background: rgba(54,130,222,0.9);
        color: white;
        border: none;
        margin-left: 1rem;
        font-size: 1.3rem;
        padding-right: 2rem;
        padding-left: 2rem;
        &.white-btn {
          background: transparent;
          border: 1px solid rgba(0,0,0,0.1);
          color: rgba(0,0,0,0.5);
          &:hover {
            background: transparent;
            color: rgba(0,0,0,0.6);
          }
        }
        &:first-child {
          margin-left: 0;
        }
        &:hover {
          background: rgba(54,130,222,1);
        }
      }
    }
  }
</style>
