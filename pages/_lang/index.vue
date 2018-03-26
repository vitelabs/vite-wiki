<template>
  <div class="page-home">
    <section id="home" class="is-info is-fullheight " v-in-viewport>
      <v-nav></v-nav>
      <div class="hero-body">
          <div class="container" v-in-viewport.once>
            <div class="has-text-centered hvr-bounce-in is-size-1-desktop is-size-2-touch hvr-grow">
              <h1 class="inview2 delay-0-700 animated fadeInDown">{{$t("home.header")}}</h1>
              <h2 class="inview2 delay-0-700 animated fadeInUp">{{$t("home.contract")}}</h2>
            </div>
            <div class="hero-btn-wrapper inview1 delay-0-800 animated fadeInUp">
              <nuxt-link class="button hvr-float-shadow" :to="`/${$i18n.locale}/wiki`" active-class="none">
                {{$t('home.whitePaper')}}
              </nuxt-link>
              <div class="social">
                <a :href="socialUrls.discord" target="_blank"><fa-icon class="icon" :icon="['fab', 'discord']" /></a>
                <a :href="socialUrls.twitter" target="_blank"><fa-icon class="icon" :icon="['fab', 'twitter']" /></a>
                <a :href="socialUrls.github" target="_blank"><fa-icon class="icon" :icon="['fab', 'github']" /></a>
              </div>
            </div>
          </div>
      </div>
    </section>

    <section id="feature" class="section">
      <div class="container" v-in-viewport.once>
        <div class="columns is-multiline" v-in-viewport.once>
          <v-feature></v-feature>
        </div>
      </div>
    </section>

    <section id="tech" class="section">
      <div class="container" v-in-viewport.once>
          <h2 class="title section-title animated fadeInUp inview1">
            {{$t('tech.title')}}
          </h2>
          <tech></tech>
      </div>
    </section>

    <section id="roadmap" class="hero">
      <div class="container" v-in-viewport>
        <h2 class="title section-title animated fadeInUp inview1">
          {{$t('roadmap.title')}}
        </h2>
        <timeline></timeline>
      </div>
    </section>

    <section id="token" class="section">
      <div class="container" v-in-viewport>
        <h2 class="title section-title animated fadeInUp inview1">
          {{$t('token.title')}}
        </h2>
        <token></token>
      </div>
    </section>

    <section id="team" class="section">
      <div class="container" v-in-viewport>
        <h2 class="title section-title inview1 animated fadeInDown delay-0-800">
          {{$t('team.title')}}
        </h2>
        <div class="sub-title inview1 animated fadeInUp delay-0-800">
          {{$t('team.subTitle')}}
        </div>
        <teams></teams>
      </div>
    </section>

    <section id="faq" class="section">
      <div class="container" v-in-viewport>
        <h2 class="title section-title inview1 animated fadeInUp delay-0-800">
          {{$t('faq.title')}}
        </h2>
        <faq></faq>
      </div>
    </section>

    <v-footer></v-footer>
  </div>
</template>

<script>
  import Timeline from '~/components/Timeline.vue'
  import Teams from '~/components/Teams.vue'
  import Faq from '~/components/FAQ'
  import Token from '~/components/Token.vue'
  import Footer from '~/components/Footer.vue'
  import Feature from '~/components/Feature'
  import Nav from '~/components/Nav'
  import Tech from '~/components/Tech'

  import config from '~/config.js'

  // Only run on brower
  if (process.browser) {
    require('particles.js')
  }

  export default {
    components: {
      Timeline,
      Teams,
      Faq,
      Token,
      VFooter: Footer,
      VFeature: Feature,
      VNav: Nav,
      Tech
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
        socialUrls: config.urls
      }
    },
    methods: {
      onNavClick () {
        this.navbarActive = false
      }
    }
  }
</script>

<style lang="scss">
  @import "assets/vars.scss";

  $background-image: linear-gradient(-179deg, #032841 3%, #013462 100%);

  .page-home {
    .particles-js-canvas-el {
      position: absolute;
      top: 0;
    }

    .section-title {
      text-align: center;
      font-size: 2.5rem;
      color: #111111;
      font-family: HelveticaNeue-Light;
      font-weight: normal;
      line-height: 3.06rem;
    }

    & > section {
      padding-top: 4rem;
      padding-bottom: 4rem;
    }

    #home {
      background-image: $background-image;
      color: rgba(255,255,255,0.9);
      padding-top: 0;
      padding-bottom: 0;
      .hero-body {
        z-index: 8;
        height: 100vh;
        .container {
          text-align: center;
          margin-top: 25vh;
          z-index: 100;
          max-width: 50rem;
        }
        .hero-btn-wrapper {
          margin-top: 4rem;
          padding: 0;
          .social {
            font-size: 3rem;
            .icon {
              color: white;
              &:hover {
                color: rgba(54, 130, 222, 1);
              }
            }
          }
          .button {
            height: 3.75rem;
            font-size: 1.13rem;
            width: 13.44rem;
            color: rgba(45,45,45,1);
            border: none;
            line-height: 1.38rem;
            display: inline-flex;

            @include mobile {
              height: 3rem;
              font-size: 1rem;
            }

            &:before {
              background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.1) 0%, transparent 80%);
            }

            &:hover {
              color: rgba(255,255,255, 1);
              background: rgba(54, 130, 222, 1);
            }
            &:focus {
              border: none;
            }
          }
        }

        h1, h2 {
          @include mobile {
            font-size: 2rem;
            line-height: 3rem;
          }
          @include tablet {
            font-size: 2.5rem;
            line-height: 3.6rem;
          }
          @include desktop {
            font-size: 3rem;
            line-height: 4.35rem;
          }
          @include fullhd {
            font-size: 3.44rem;
            line-height: 5.63rem;
          }
        },
        h2 {
          color: rgba(255,255,255, 0.8);
        }
      }
    }

    #feature {
      padding-top: 6.25rem;
      padding-bottom: 6.25rem;
      background: white;
    }

    #tech {
      background: rgba(247,247,247,1);
      @include mobile {
        & > .container {
          width: 100%;
        }
      }

      h2 {
        margin-bottom: 4rem;
      }
    }

    #roadmap {
      @include mobile {
        .container {
          margin: 0;
        }
      }
      h2 {
        margin-bottom: 4rem;
      }
    }

    #team {
      .section-title {
        margin-bottom: 0.63rem;
      }
      .sub-title {
        overflow: hidden;
        font-family: HelveticaNeue-Light;
        font-size: 1.13rem;
        color: #111111;
        text-align: center;
        line-height: 1.75rem;
        font-weight: 300;
        margin-bottom: 4.44rem;
      }
    }

    #faq {
      background: rgba(214,230,247,1);;
      .section-title {
        margin-bottom: 3.69rem;
      }
    }

    #token {
      background-color: rgba(216,216,216, 0.2);
      .section-title {
        margin-bottom: 4rem;
      }
    }
  }
</style>
