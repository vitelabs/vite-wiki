<template>
  <section class="hero is-fullheight " v-in-viewport>
    <div class="hero-body">
      <div class="container" v-in-viewport.once>
        <div class="has-text-centered hvr-bounce-in is-size-1-desktop is-size-2-touch hvr-grow">
          <h1 class="inview2 delay-0-700 animated fadeInDown">Vite Labs</h1>
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
  </section>
</template>

<script type="text/babel">
  import config from '~/config'
  export default {
    layout: 'index',
    data: function () {
      return {
        urls: config.urls
      }
    },
    methods: {}
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  body {
    background: rgba(247,247,247,1);
  }
  .hero {
    text-align: center;
    h1 {
      font-size: 5rem;
    }
    .hero-btn-wrapper {
      margin-top: 1.6rem;
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
