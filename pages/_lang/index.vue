<template>
  <div>
    <section id="home" class="hero is-info is-fullheight" v-in-viewport.once>
      <!-- Hero header: will stick at the top -->
      <div class="hero-head animated fadeIn delay-1-6" v-headroom>
        <nav class="navbar">
          <div class="container is-widescreen">
            <div class="navbar-brand">
              <a class="navbar-item" href="http://bulma.io">
                <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
              </a>
              <div class="navbar-burger" @click="navbarActive = !navbarActive">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>

            <scrollactive class="navbar-menu"
                          :class="{ 'is-active': navbarActive }"
                          :modify-url="false"
                          :offset="0">
              <div class="navbar-end">
                <a :href="`#${item}`" class="scrollactive-item nav-item" v-for="item in navs">
                  {{$t(`nav.${item}`)}}
                </a>
                <lang-select></lang-select>
              </div>
            </scrollactive>

          </div>
        </nav>
      </div>

      <!-- Hero content: will be in the middle -->
      <div class="hero-body">
        <div class="container has-text-centered hvr-bounce-in home-text-wrapper">
          <no-ssr>
            <div>
              <vue-typer :text="$t('home.typingText')"></vue-typer>
              {{$t('home.contract')}}
            </div>
          </no-ssr>
        </div>
      </div>
    </section>
    <section id="feature" class="hero is-light is-fullheight" v-in-viewport.once>
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title is-1 animated inview3 flipInX delay-0-5">
            Feature
          </h1>
        </div>
      </div>
    </section>

    <section id="tech" class="hero is-success is-medium" v-in-viewport.once>
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title is-1 animated inview3 tada delay-0-5">
            Tech
          </h1>
        </div>
      </div>
    </section>

    <section id="roadmap" class="hero is-success is-medium" v-in-viewport.once>
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title is-1 animated inview3 tada delay-0-5">
            Roadmap
          </h1>
        </div>
      </div>
    </section>

    <section id="team" class="hero is-success is-medium" v-in-viewport.once>
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title is-1 animated inview3 tada delay-0-5">
            Team
          </h1>
        </div>
      </div>
    </section>

    <section id="faq" class="hero is-success is-medium" v-in-viewport.once>
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title is-1 animated inview3 tada delay-0-5">
            Faq
          </h1>
        </div>
      </div>
    </section>



    <footer class="footer">
      <div class="container">
        <div class="content has-text-centered">
          <p>
            <strong>Bulma</strong> by
            <a href="http://jgthms.com">Jeremy Thomas</a>. The source code is licensed
            <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content is licensed
            <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
          </p>
          <p>
            <a class="icon" href="https://github.com/jgthms/bulma">
              <i class="fa fa-github"></i>
            </a>
          </p>
        </div>
      </div>
    </footer>

  </div>
</template>

<script>
  import Vue from 'vue'
  import LangSelect from '~/components/LangSelect.vue'

  if (process.browser) {
    require('particles.js')
    const VueTyper = require('vue-typer').VueTyper
    Vue.component('vue-typer', VueTyper)
  }

  export default {
    components: {
      LangSelect
    },
    mounted () {
      if (process.browser) {
        window.particlesJS.load('home', '/particlesjs-config.json', function () {
          console.log('callback - particles.js config loaded')
        })
      }
    },
    data () {
      return {
        navbarActive: false,
        navs: ['feature', 'tech', 'roadmap', 'team', 'faq']
      }
    }
  }
</script>

<style lang="scss">
  #home {
    .navbar-menu {
      &.is-active {
        background: rgba(0,0,0,0.7);
      }
    }
  }

  .particles-js-canvas-el {
    position: absolute;
    top: 0;
  }

  .vue-typer {
    font-size: 50px;
    .custom.char {
      color: white;
      &.typed {
        color: white;
      }
      &.selected {
        background: transparent;
      }
      &.erased {
        background: transparent;
      }
    }

    .custom.caret {
      background-color: dodgerblue;
      width: 5px;
    }
  }

  .headroom {
    position: fixed;
    right: 0;
    left: 0;
    top: 0;
    z-index: 1;
    transition: transform 0.4s ease;
  }
  .headroom.headroom--pinned {
    transform: translateY(0);
  }
  .headroom.headroom--unpinned {
    transform: translateY(-100%);
  }
  nav.navbar {
    transition: background-color 0.4s ease;
    background-color: rgba(0, 0, 0, 0.2);
  }
  .headroom.headroom--unpinned>nav.navbar,
  .headroom.headroom--top>nav.navbar {
    background-color: transparent;
  }
  .headroom.headroom--pinned.headroom--not-top>nav.navbar {
    background-color: rgba(0, 0, 0, 0.2);
  }
</style>
