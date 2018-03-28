<template>
  <div class="section">
    <div class="columns">
        <aside class="column is-3 sidebar-menu-wrapper" :class="{'is-open': isNavbarOpen}">
            <no-ssr>
              <my-affix class="sidebar-menu menu affix sidebar-menu"
                     relative-element-selector="#wiki-content-wrapper"
                     @scrollaffixscrolling="scrollaffixscrolling"
                     :scroll-affix="false"
                     :offset="{ top: 80, bottom: 40 }">
                <template v-for="(item, index) in navs">
                  <template v-if="item && item.navs && item.navs.length">
                    <p class="menu-label">
                      {{item.label}}
                    </p>
                    <ul class="menu-list">
                      <template v-for="subNav in item.navs">
                        <li v-if="subNav && subNav.meta">
                          <nuxt-link class="main-link" :to="$i18n.path(subNav.permalink)" :class="{'is-active': !$route.params.slug && index ===0 }">
                            {{subNav.label}}
                          </nuxt-link>
                        </li>
                        <my-scrollactive v-if="subNav && subNav.anchors && subNav.anchors.length && isSamePath(subNav.permalink, $route.path, index)"
                                         class="menu-list anchor-nav"
                                         :offset="scrollOffset">
                          <a v-for="anchor in subNav.anchors" class="scrollactive-item" :href="slugify(anchor[1])">
                            {{anchor[1]}}
                          </a>
                        </my-scrollactive>
                      </template>
                    </ul>
                  </template>

                  <template v-if="item && !item.navs">
                    <p class="menu-list">
                      <nuxt-link class="main-link" :class="{'is-active': !$route.params.slug && index ===0 }" :to="$i18n.path(item.permalink)">
                        {{item.label}}
                      </nuxt-link>
                    </p>
                    <my-scrollactive v-if="item.anchors && item.anchors.length && isSamePath(item.permalink, $route.path, index) "
                                     class="menu-list anchor-nav"
                                     :offset="scrollOffset">
                      <a v-for="anchor in item.anchors" class="scrollactive-item" :href="slugify(anchor[1])">
                        {{anchor[1]}}
                      </a>
                    </my-scrollactive>
                  </template>
                </template>
              </my-affix>
            </no-ssr>
        </aside>

        <div class="column">
          <div class="wiki-content-wrapper content" id="wiki-content-wrapper">
            <nuxt-child/>
          </div>
        </div>
    </div>
    <button class="mobile-menu-icon button is-hidden-desktop" @click="onMobileMenuClick">
      <fa-icon class="icon" :icon="['fas', 'ellipsis-h']" />
    </button>
    <div class="bg" v-show="isNavbarOpen" @click="isNavbarOpen = false"></div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import config from '~/config'

  if (process.browser) {
    const Affix = require('~/components/Affix')
    const Scrollactive = require('~/components/Scrollactive')
    Vue.component('my-affix', Affix.default)
    Vue.component('my-scrollactive', Scrollactive.default)
  }

  function getTitle (item) {
    return item.title || item.meta.fileName.replace('.md', '')
  }

  export default {
    layout: 'index',
    data () {
      return {
        navs: [],
        scrollOffset: 70,
        isNavbarOpen: false
      }
    },
    head () {
      return {
        htmlAttrs: {
          lang: this.$i18n.locale
        }
      }
    },
    asyncData: async ({ app, payload, params, store }) => {
      let lang = params.lang || app.i18n.locale
      let nav = params.nav || config.defaultActiveNav
      let docs = app.$content(`${lang}/${nav}`)
      let list = await docs.query({exclude: ['body']}).getAll()
      let parserdNavs
      store.commit('setIndexNav', {})

      let findMd = (name) => {
        for (let i = 0; i < list.length; i++) {
          if (list[i] && list[i].meta && list[i].meta.fileName === name) {
            return list[i]
          }
        }
        return null
      }

      let parseDocsConfig = (nav) => {
        if (typeof nav === 'string' && nav) {
          let docItem = findMd(nav)
          if (!docItem) return null
          return {
            label: getTitle(docItem),
            ...docItem
          }
        }

        if (nav && nav.navs) {
          let result = []
          if (Array.isArray(nav.navs)) {
            result = nav.navs.map(item => {
              return parseDocsConfig(item)
            })
          }
          return {
            ...nav,
            navs: result
          }
        }
        return {
          navs: []
        }
      }

      try {
        let docsConfig = await app.$content(`${lang}/${nav}`).get(`${lang}/${nav}/config`)
        parserdNavs = parseDocsConfig(docsConfig.body).navs
      } catch (err) {
        parserdNavs = list.map(item => {
          return {
            ...item,
            label: getTitle(item)
          }
        })
      }

      if (parserdNavs && parserdNavs.length) {
        let firstNav = parserdNavs[0].navs && parserdNavs[0].navs.length ? parserdNavs[0].navs[0] : parserdNavs[0]
        if (firstNav && firstNav.permalink) {
          let indexDoc = await app.$content(`${lang}/${nav}`).get(firstNav.permalink)
          store.commit('setIndexNav', indexDoc)
        }
      }

      return {
        list,
        navs: parserdNavs
      }
    },
    methods: {
      scrollaffixscrolling () {
        console.log(arguments)
      },
      slugify (s) {
        var spaceRegex = new RegExp('[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]', 'g')
        return '#' + encodeURIComponent(s.replace(spaceRegex, ''))
      },
      isSamePath (permalink, path, index) {
        if (index === 0 && !this.$route.params.slug) {
          return true
        }
        if (path[path.length - 1] === '/') {
          path = path.substring(0, path.length - 1)
        }
        if (permalink[permalink.length - 1] === '/') {
          permalink = permalink.substring(0, permalink.length - 1)
        }
        return path === permalink
      },
      onMobileMenuClick () {
        this.isNavbarOpen = !this.isNavbarOpen
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/vars";


  .section {
    padding-top: 3.25rem + 1.5rem;
    .bg {
      background: rgba(0,0,0,0.1);
      height: 100vh;
      width: 100vw;
      position: fixed;
      left: 0;
      top: 0;
    }
  }

  .menu.affix {
    position: fixed;
  }

  .sidebar-menu-wrapper {
    @media screen and (max-width: 960px) {
      display: none;
      transition: 1s;
    }
    &.is-open {
      display: block;
      position: fixed;
      top: 52px !important;
      background: white;
      z-index: 1000;
      .sidebar-menu {
        width: 60vw;
        display: block;
        position: fixed;
        top: 52px !important;
        left: 0;
        overflow: hidden;
        height: 100vh;
        background: white;
      }
    }
  }

  .sidebar-menu {
    width: 22vw;

    overflow: scroll;

    .menu-list {
      a:visited {
        color: initial;
      }
      a.main-link.nuxt-link-active, a.main-link.is-active {
        background: #3498DB;
        color: white;
      }
    }

    .anchor-nav.menu-list a {
      font-size: 0.8em;
      color: rgba(0,0,0,0.89);
      padding-left: 1.5em;
      &:first-child {
        margin-top: 0.5em;
      }
      &.is-active {
        background: rgba(0,0,0,0.05);
      }
    }

    .menu-label {
      text-align: left;
    }

    @include mobile {
      display: none;
    }
  }

  .scrollaffix-sidebar {
    width: 204px;
    font-size: 14px;

    @media screen and (max-width: 1383px) {
      width: 170px;
    }

    @media screen and (max-width: 1191px) {
      width: 140px;
      font-size: 12px;
    }

    .card-content {
      padding: 15px;
    }
  }

  .mobile-menu-icon {
    position: fixed;
    z-index: 2147222222;
    display: block;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    bottom: 20px;
    left: 20px;
    line-height: 50px;
    background-color: rgba(0, 0, 0, 0.2);
    color: #fff;
    font-size: 1rem;
    text-align: center;
    border: none;
  }
</style>
