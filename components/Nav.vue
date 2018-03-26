<template>
  <div class="hero-head animated fadeIn delay-1-6 headroom" v-headroom>
    <nav class="navbar">
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
                      :class="{ 'is-active': navbarActive }"
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
</template>

<script type="text/babel">
  import LangSelect from '~/components/LangSelect.vue'

  export default {
    components: {
      LangSelect
    },
    data: function () {
      return {
        navbarActive: false,
        navs: ['feature', 'tech', 'roadmap', 'token', 'team', 'faq']
      }
    },
    methods: {
      onNavClick () {
        this.navbarActive = false
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "assets/vars.scss";

  $nav-item-size: 1rem;
  $nav-height: (130rem/16);
  $font-family-bold: HelveticaNeue-Bold,HelveticaNeue;

  .headroom {
    position: fixed;
    right: 0;
    left: 0;
    top: 0;
    z-index: 2343;
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

    .navbar {
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
