<template>
  <div class="page-home">
    <section id="home" class="is-info is-fullheight " v-in-viewport>
      <div class="hero-head animated fadeIn delay-1-6 headroom" v-headroom>
        <nav class="navbar home-navbar">
          <div class="container is-widescreen" :class="{ 'is-open': navbarActive }">
            <div class="navbar-brand">
              <a class="navbar-item" href="http://bulma.io">
              </a>
              <div class="navbar-burger" @click="navbarActive = !navbarActive">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>

            <scrollactive class="navbar-menu"
                          :modify-url="false"
                          :offset="0">
              <div class="navbar-end">
                <a :href="`#${item}`" @click="onNavClick" class="scrollactive-item nav-item" v-for="item in navs">
                  {{$t(`nav.${item}`)}}
                </a>
                <div class="nav-item">
                  <lang-select></lang-select>
                </div>
              </div>
            </scrollactive>

          </div>
        </nav>
      </div>

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
            </div>
          </div>
      </div>
    </section>

    <section id="feature" class="section">
      <div class="container" v-in-viewport.once>
        <div class="columns is-multiline" v-in-viewport>
          <div class="column feature-item is-destop is-6-desktop is-6-tablet is-4-widescreen is-12-mobile animated inview2 delay-0-500"
               :class="{'fadeInLeft': (index + 1) % 3 === 1,'fadeInRight': (index + 1) % 3 === 0, 'fadeInUp': (index + 1) % 3 === 2}"
               v-for="(item, index) in features">
            <div class="is-info">
              <div class="icon-wrapper hvr-grow-rotate">
                <img :src="item.icon"/>
              </div>
              <h3 class="animated inview3 fadeInDown" >{{$t(`features.${item.key}.title`)}}</h3>
              <div class="feature-des animated inview3 fadeInUp">{{$t(`features.${item.key}.description`)}}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="tech" class="section">
      <div class="container" v-in-viewport.once>
          <h2 class="title section-title animated fadeInUp inview1">
            {{$t('tech.title')}}
          </h2>
          <no-ssr>
            <carousel :per-page="1" :autoplay="false">
              <slide :key="item.key" v-for="item in techDetails">
                <div class="columns tech-item-wrapper">
                  <div class="column">
                    <div class="tech-img-wrapper image">
                      <img :src="item.img" alt="">
                    </div>
                  </div>
                  <div class="column tech-item-detail">
                    <h3>{{$t(`tech.${item.key}.title`)}}</h3>
                    <p>{{$t(`tech.${item.key}.description`)}}</p>
                  </div>
                </div>
              </slide>
            </carousel>
          </no-ssr>
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
  import { Carousel, Slide } from 'vue-carousel'
  import LangSelect from '~/components/LangSelect.vue'
  import Timeline from '~/components/Timeline.vue'
  import Teams from '~/components/Teams.vue'
  import Faq from '~/components/FAQ'
  import Token from '~/components/Token.vue'
  import Footer from '~/components/Footer.vue'

  // Only run on brower
  if (process.browser) {
    require('particles.js')
  }

  export default {
    components: {
      LangSelect,
      Carousel,
      Slide,
      Timeline,
      Teams,
      Faq,
      Token,
      VFooter: Footer
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
        navs: ['feature', 'tech', 'roadmap', 'token', 'team', 'faq'],
        features: [
          {
            icon: require('~/assets/images/nofee/white@3x.png'),
            key: 'noFee'
          },
          {
            icon: require('~/assets/images/fast/white@3x.png'),
            key: 'fast'
          },
          {
            icon: require('~/assets/images/scalability/white@3x.png'),
            key: 'scalability'
          },
          {
            icon: require('~/assets/images/smartcontract/white@3x.png'),
            key: 'contract'
          },
          {
            icon: require('~/assets/images/multilayer/white@3x.png'),
            key: 'multiLayer'
          },
          {
            icon: require('~/assets/images/crop/white@3x.png'),
            key: 'pruning'
          }
        ],
        techDetails: [
          {
            img: require('~/assets/images/bg.jpg'),
            key: 'dag',
            url: ''
          },
          {
            img: require('~/assets/images/bg.jpg'),
            key: 'snapshotChain',
            url: ''
          },
          {
            img: require('~/assets/images/bg.jpg'),
            key: 'dpos',
            url: ''
          }
        ]
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

  $nav-item-size: 1rem;
  $background-image: linear-gradient(-179deg, #032841 3%, #013462 100%);
  $nav-height: (130rem/16);
  $font-family-bold: HelveticaNeue-Bold,HelveticaNeue;

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

    #home {
      background-image: $background-image;
      color: rgba(255,255,255,0.9);
      .headroom {
        position: fixed;
        right: 0;
        left: 0;
        top: 0;
        z-index: 1;
        transition: transform 0.4s ease;
        &.headroom--top {
          height: $nav-height;
          .navbar {
            height: $nav-height;
          }
        }
        &.headroom--not-top {
          .home-navbar {
            .nav-item {
              font-size: 1rem;
            }
          }
        }

        &.headroom--top {
          .navbar {
            background: transparent;
          }
        }

        &.headroom--not-top{
          &.headroom--pinned, &:not(.headroom--unpinned):not(.headroom--pinned){
            .navbar {
              background-color: rgba(0,0,0,0.5);
            }
          }
          &.headroom--unpinned {
            .navbar {
              background: transparent;
            }
          }
        }
      }

      .hero-head {
        z-index: 100000;
      }
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
      }
      .home-navbar {
        background-color: transparent;
        font-size: $nav-item-size;
        & > .container {
          &.is-open {
            background: rgba(1,52,98,1);
            .navbar-brand {
              border-bottom: 1px solid rgba(255,255,255,0.08);
            }
            .navbar-menu {
              background: rgba(1,52,98,1);
            }
            .nav-item {
              color: rgba(255,255,255,0.7);
            }
          }
        }
        .nav-item {
          font-size: $nav-item-size;
          padding-left: 2rem;
          padding-right: 2rem;
          color: rgba(255,255,255,0.8);
          &:last-child {
            &:hover {
              background: transparent;
            }
          }
          &:hover {
            color: rgba(255,255,255,1);
            background: rgba(255,255,255, 0.05);
          }

          &.is-active {
            color: white;
            background: $light-blue;
          }

          &.lang-btn {
            .dropdown-trigger {
              height: 40px;
              button {
                height: 40px;
              }
            }
          }
        }
      }

      .hero-body {
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
      .feature-item {
        height: 21.31rem;
        .is-info {
          background: rgba(54,130,222,1);
          height: 100%;
          color: white;
          text-align: center;
          & > h3 {
            font-size: 1.5rem;
          }
          & > .feature-des {
            color:rgba(255,255,255,0.9);
            padding: 1rem;
            font-size: 1rem;
          }
        }
        .icon-wrapper {
          text-align: center;
          width: 100%;
          & > img {
            height: 5rem;
            width: 5rem;
            margin-top: 3rem;
            margin-bottom: 2rem;
          }
        }
      }
    }

    #tech {
      background: rgba(247,247,247,1);
      padding-top: 4rem;
      padding-bottom: 4rem;
      @include mobile {
        & > .container {
          width: 100%;
        }
      }

      h2 {
        margin-bottom: 4rem;
      }
      .tech-item-wrapper {
        .tech-img-wrapper {
          max-height: 30rem;
          height: auto;
          img {
            max-height: 30rem;
            height: auto;
            width: 100%;
          }
        }
        .tech-item-detail {
          & > h3 {
            font-size: 1.5rem;
            color: #111111;
            line-height: 1.81rem;
            font-weight: normal;
            margin-bottom: 1.25rem;
          }
          & > p {
            line-height: 1.75rem;
            color: #111111;
            font-size: 1.13rem;
            font-weight: 200;
          }
        }
      }
    }

    #roadmap {
      padding-top: 4rem;
      padding-bottom: 4rem;
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
      padding-top: 4rem;
      padding-bottom: 4rem;
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
      padding-top: 4rem;
      padding-bottom: 4rem;
      background: rgba(214,230,247,1);;
      .section-title {
        margin-bottom: 3.69rem;
      }
    }

    #token {
      padding-top: 4rem;
      padding-bottom: 4rem;
      background-color: rgba(216,216,216, 0.2);
      .section-title {
        margin-bottom: 4rem;
      }
    }
  }

  .headroom.headroom--pinned {
    transform: translateY(0);
    &.headroom--top {
      transform: none;
      background-color: transparent;
    }
  }
  .headroom.headroom--unpinned {
    transform: translateY(-100%);
  }
  .headroom.headroom--unpinned > nav.navbar,
  .headroom.headroom--top > nav.navbar {
    background-color: transparent;
  }
  .headroom.headroom--pinned.headroom--not-top>nav.navbar {
    background-color: rgba(0, 0, 0, 0.5);
  }
</style>
