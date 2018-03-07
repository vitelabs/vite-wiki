<template>
    <div>
      <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
        <a class="navbar-item">
          <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
        </a>
      </nav>

      <nuxt/>
    </div>
</template>

<script type="text/babel">
    export default {
        data: function () {
            return {}
        },
        methods: {}
    };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: #fff;
    z-index: 233;
    transition: all .3s;
    box-shadow: 0 1px 0 #e5e5e5;
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
