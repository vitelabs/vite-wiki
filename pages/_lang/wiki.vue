<template>
  <div class="container is-fullhd">
    <div class="columns">
      <aside class="column is-3 sidebar-menu-wrapper">
        <div class="menu affix sidebar-menu">
          <template v-for="item in navs">
            <template v-if="item && item.navs && item.navs.length">
              <p class="menu-label">
                {{item.label}}
              </p>
              <ul class="menu-list">
                <template v-for="subNav in item.navs">
                  <li v-if="subNav && subNav.meta">
                    <nuxt-link class="Header__Link" :to="$i18n.path(subNav.permalink)" exact>
                      {{subNav.label}}
                    </nuxt-link>
                  </li>
                </template>
              </ul>
            </template>
            <template v-if="item && !item.navs">
              <p>{{item.label}}</p>
            </template>
          </template>
          <!--<affix class="menu sidebar-menu" relative-element-selector="#example-content" :offset="{ top: 30, bottom: 40 }" :scroll-affix="false">-->
          <!--<div class="menu-label">-->
          <!--<h2>Affix sidebar</h2>-->
          <!--</div>-->
          <!--<a href="" v-for="item in list">{{item.title}}</a>-->
          <!--</affix>-->
        </div>
      </aside>


      <div class="column">
        <div class="wiki-content-wrapper">
          <nuxt-child/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'

  if (process.browser) {
    window.onNuxtReady(() => {
      const Affix = require('vue-affix')
      Vue.use(Affix)
    })
  }

  export default {
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
      return {
        list,
        config: docsConfig,
        navs: parserdNavs && parserdNavs.navs
      }
    }
  }
</script>

<style lang="scss">
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
        color: #4a4a4a
      }
      .nuxt-link-active {
        background: #23d160;
        color: white;
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


  .wiki-content-wrapper {
    padding: 0.5em;
  }



  /* markdown css */
  @media print {
    *,
    *:before,
    *:after {
      background: transparent !important;
      color: #000 !important;
      box-shadow: none !important;
      text-shadow: none !important;
    }

    a,
    a:visited {
      text-decoration: underline;
    }

    a[href]:after {
      content: " (" attr(href) ")";
    }

    abbr[title]:after {
      content: " (" attr(title) ")";
    }

    a[href^="#"]:after,
    a[href^="javascript:"]:after {
      content: "";
    }

    pre,
    blockquote {
      border: 1px solid #999;
      page-break-inside: avoid;
    }

    thead {
      display: table-header-group;
    }

    tr,
    img {
      page-break-inside: avoid;
    }

    img {
      max-width: 100% !important;
    }

    p,
    h2,
    h3 {
      orphans: 3;
      widows: 3;
    }

    h2,
    h3 {
      page-break-after: avoid;
    }
  }

  pre,
  code {
    font-family: Menlo, Monaco, "Courier New", monospace;
  }

  pre {
    padding: .5rem;
    line-height: 1.25;
    overflow-x: scroll;
  }

  a,
  a:visited {
    color: #3498db;
  }

  a:hover,
  a:focus,
  a:active {
    color: #2980b9;
  }

  .modest-no-decoration {
    text-decoration: none;
  }

  html {
    font-size: 12px;
  }

  @media screen and (min-width: 32rem) and (max-width: 48rem) {
    html {
      font-size: 15px;
    }
  }

  @media screen and (min-width: 48rem) {
    html {
      font-size: 16px;
    }
  }

  body {
    line-height: 1.85;
  }

  p,
  .modest-p {
    font-size: 1rem;
    margin-bottom: 1.3rem;
  }

  h1,
  .modest-h1,
  h2,
  .modest-h2,
  h3,
  .modest-h3,
  h4,
  .modest-h4 {
    margin: 1.414rem 0 .5rem;
    font-weight: inherit;
    line-height: 1.42;
  }

  h1,
  .modest-h1 {
    margin-top: 0;
    font-size: 3.998rem;
  }

  h2,
  .modest-h2 {
    font-size: 2.827rem;
  }

  h3,
  .modest-h3 {
    font-size: 1.999rem;
  }

  h4,
  .modest-h4 {
    font-size: 1.414rem;
  }

  h5,
  .modest-h5 {
    font-size: 1.121rem;
  }

  h6,
  .modest-h6 {
    font-size: .88rem;
  }

  small,
  .modest-small {
    font-size: .707em;
  }

  /* https://github.com/mrmrs/fluidity */

  img,
  canvas,
  iframe,
  video,
  svg,
  select,
  textarea {
    max-width: 100%;
  }

  @import url(http://fonts.googleapis.com/css?family=Open+Sans:300italic,300);
  @import url(http://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,300italic,700);

  html {
    font-size: 18px;
    max-width: 100%;
  }

  body {
    color: #444;
    font-family: 'Open Sans', Helvetica, sans-serif;
    font-weight: 300;
    margin: 0 auto;
    line-height: 1.45;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: Arimo, Helvetica, sans-serif;
  }

  h1,
  h2,
  h3 {
    border-bottom: 2px solid #fafafa;
    margin-bottom: 1.15rem;
    padding-bottom: .5rem;
    text-align: left;
  }

  blockquote {
    border-left: 8px solid #fafafa;
    padding: 1rem;
    p:last-child {
      margin-bottom: 0;
    }
  }

  pre,
  code {
    background-color: #fafafa;
  }
</style>
