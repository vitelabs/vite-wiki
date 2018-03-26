<template>
  <div class="section">
    <div class="container is-fullhd">
      <div class="columns">
        <aside class="column is-3 sidebar-menu-wrapper">
            <no-ssr>
              <my-affix class="sidebar-menu menu affix sidebar-menu"
                     relative-element-selector="#wiki-content-wrapper"
                     style="width: 300px"
                     @scrollaffixscrolling="scrollaffixscrolling"
                     :scroll-affix="false"
                     :offset="{ top: 80, bottom: 40 }"
              >
                <template v-for="item in navs">
                  <template v-if="item && item.navs && item.navs.length">
                    <p class="menu-label">
                      {{item.label}}
                    </p>
                    <ul class="menu-list">
                      <template v-for="subNav in item.navs">
                        <li v-if="subNav && subNav.meta">
                          <nuxt-link class="main-link" :to="$i18n.path(subNav.permalink)">
                            {{subNav.label}}
                          </nuxt-link>
                        </li>
                        <my-scrollactive v-if="subNav && subNav.anchors && subNav.anchors.length && isSamePath(subNav.permalink, $route.path)"
                                         class="menu-list anchor-nav">
                          <a v-for="anchor in subNav.anchors" class="scrollactive-item" :href="slugify(anchor[1])">
                            {{anchor[1].substr(0, 12)}}
                          </a>
                        </my-scrollactive>
                      </template>
                    </ul>
                  </template>
                  <template v-if="item && !item.navs">
                    <p class="menu-label">
                      <nuxt-link class="main-link" :to="$i18n.path(item.permalink)">
                        {{item.label}}
                      </nuxt-link>
                    </p>
                    <my-scrollactive v-if="item.anchors && item.anchors.length && isSamePath(item.permalink, $route.path) "
                                     class="menu-list anchor-nav">
                      <a v-for="anchor in item.anchors" class="scrollactive-item" :href="slugify(anchor[1])">
                        {{anchor[1].substr(0, 12)}}
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
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'

  if (process.browser) {
    const Affix = require('~/components/Affix')
    const Scrollactive = require('~/components/Scrollactive')
    Vue.component('my-affix', Affix.default)
    Vue.component('my-scrollactive', Scrollactive.default)
  }

  export default {
    layout: 'wiki',
    data () {
      return {
        navs: []
      }
    },
    asyncData: async ({ app, payload, params }) => {
      let lang = params.lang || app.i18n.locale
      let docs = app.$content(lang)
      let docsConfig = await docs.get(`${lang}/wiki/config`)
      let list = await docs.query({exclude: ['body']}).getAll()

      let findMd = (section, name) => {
        for (let i = 0; i < list.length; i++) {
          if (list[i] && list[i].meta && list[i].meta.section === section && list[i].meta.fileName === name) {
            return list[i]
          }
        }
        return null
      }

      let parseDocsConfig = (nav, index = 0, section) => {
        section = section || '/'
        if (typeof nav === 'string' && nav) {
          let docItem = findMd(section, nav)
          if (!docItem) return null
          return {
            label: docItem.title,
            ...docItem,
            path: docItem.meta.fileName.replace(/.md$/, '')
          }
        }

        if (nav && nav.label) {
          if (index !== 0 && !nav.path) {
            throw new Error('section nav config should have path')
          }
          let result = []
          if (Array.isArray(nav.navs)) {
            result = nav.navs.map(item => {
              return parseDocsConfig(item, index++, nav.path)
            })
          }
          return {
            ...nav,
            navs: result
          }
        }
      }
      let parserdNavs = parseDocsConfig(docsConfig.body, 0)
      console.log(parserdNavs)

      return {
        list,
        config: docsConfig,
        navs: parserdNavs && parserdNavs.navs
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
      isSamePath (permalink, path) {
        if (path[path.length - 1] === '/') {
          path = path.substring(0, path.length - 1)
        }
        if (permalink[permalink.length - 1] === '/') {
          permalink = permalink.substring(0, permalink.length - 1)
        }
        return path === permalink
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    margin-top: 1.5em;
  }

  .menu.affix {
    position: fixed;
  }

  .sidebar-menu-wrapper {
    @media screen and (max-width: 960px) {
      display: none;
      transition: 1s;
    }
  }

  .sidebar-menu {
    width: 318px;

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

    @media screen and (max-width: 1383px) {
      width: 270px;
    }

    @media screen and (max-width: 1191px) {
      width: 222px;
    }

    @media screen and (max-width: 960px) {
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
</style>
