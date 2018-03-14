<template>
  <div class="page-home">
    <section id="home" class="is-info is-fullheight " v-in-viewport>
      <!-- Hero header: will stick at the top -->
      <div class="hero-head animated fadeIn delay-1-6 headroom" v-headroom>
        <nav class="navbar home-navbar">
          <div class="container is-widescreen" :class="{ 'is-open': navbarActive }">
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
                <div class="nav-item">
                  <lang-select></lang-select>
                </div>
              </div>
            </scrollactive>

          </div>
        </nav>
      </div>

      <!-- Hero content: will be in the middle -->
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

    <section id="tech" class="hero">
      <div class="container" v-in-viewport.once>
          <h2 class="title section-title">
            Tech Details
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
      <div class="container">
        <h2 class="title section-title animated fadeInUp inview" v-in-viewport>
          Roadmap
        </h2>
        <timeline></timeline>
      </div>
    </section>

    <section id="team" class="section">
      <div class="container">
        <h2 class="title section-title inview animated fadeInDown delay-0-800" v-in-viewport>
          {{$t('team.title')}}
        </h2>
        <div class="sub-title inview animated fadeInUp delay-0-800" v-in-viewport>
          {{$t('team.subTitle')}}
        </div>
        <teams></teams>
      </div>
    </section>

    <section id="faq" class="section">
      <div class="container">
        <h2 class="title section-title inview animated fadeInUp delay-0-800" v-in-viewport>
          {{$t('faq.title')}}
        </h2>
        <faq></faq>
      </div>
    </section>

    <footer class="footer">
      <div class="container">
        <div class="columns">
          <div class="column icon-wrapper">
            <div class="links-wrapper">
              <fa-icon :icon="['fab', 'github']"></fa-icon>
              <fa-icon :icon="['fab', 'discord']"></fa-icon>
              <fa-icon :icon="['fab', 'twitter']"></fa-icon>
            </div>
          </div>
          <div class="column">

          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Carousel, Slide } from 'vue-carousel'
  import LangSelect from '~/components/LangSelect.vue'
  import Timeline from '~/components/Timeline.vue'
  import Teams from '~/components/Teams.vue'
  import Faq from '~/components/FAQ'

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
      Faq
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
        navs: ['feature', 'tech', 'roadmap', 'team', 'faq'],
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
    }
  }
</script>

<style lang="scss">
  @import "assets/vars.scss";

  $nav-item-size: 1.25rem;
  $background-image: linear-gradient(-179deg, #032841 3%, #013462 100%);

  .page-home {
    .particles-js-canvas-el {
      position: absolute;
      top: 0;
    }

    .section-title {
      text-align: center;
      font-size: 3.75rem;
      color: #111111;
      font-family: HelveticaNeue-Light;
      font-weight: normal;
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
          height: 8.125rem;
          .navbar {
            height: 8.125rem;
          }
        }
        &.headroom--not-top {
          .home-navbar {
            .nav-item {
              font-size: 1rem;
            }
          }
        }
        &.headroom--unpinned, &.headroom--not-top {
          .navbar {
            background-color: rgba(0,0,0,0.5);
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
          margin-top: 10rem;
          z-index: 100;
          max-width: 50rem;
        }
        .hero-btn-wrapper {
          margin-top: 4rem;
          padding: 0;
          .button {
            height: 4.44rem;
            padding-right: (43rem/16);
            padding-left: (43rem/16);
            font-size: 1.88rem * 0.8;
            width: (260rem/16);
            color: rgba(45,45,45,1);
            border: none;
            line-height: 2.25rem;
            display: inline-flex;

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
          /*font-size: 4.06rem;*/
          /*line-height: 5.63rem;*/
        },
        h2 {
          color: rgba(255,255,255, 0.8)
        }
      }
    }

    #feature {
      padding-top: 88px;
      padding-bottom: 88px;
      background: white;
      .feature-item {
        height: 336px;
        .is-info {
          background: rgba(54,130,222,1);
          height: 100%;
          color: white;
          text-align: center;
          &>h3 {
            font-size: 1.5rem;
          }
          &>.feature-des {
            color:rgba(255,255,255,0.9);
            padding: 1rem;
          }
        }
        .icon-wrapper {
          text-align: center;
          width: 100%;
          &>img {
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
        padding: 1rem;
        .tech-img-wrapper {
          height: 30rem;
          img {
            height: 30rem;
            width: 100%;
          }
        }
        .tech-item-detail {
          &>h3 {
            font-size: 3.13rem;
            color: #111111;
            line-height: 3.81rem;
            font-weight: normal;
            margin-bottom: 1.66rem;
          }
          &>p {
            line-height: 2.34rem;
            color: #111111;
            font-size: 1.56rem;
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
        font-size: 1.56rem;
        color: #111111;
        text-align: center;
        line-height: 2.34rem;
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

    .footer {
      padding-top: 5.44rem;
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
  .headroom.headroom--unpinned>nav.navbar,
  .headroom.headroom--top>nav.navbar {
    background-color: transparent;
  }
  .headroom.headroom--pinned.headroom--not-top>nav.navbar {
    background-color: rgba(0, 0, 0, 0.5);
  }
</style>
