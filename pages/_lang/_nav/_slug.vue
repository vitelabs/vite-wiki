<template>
  <div class="content wiki-content">
    <nuxtent-body v-if="message.body" :body="message.body" />
  </div>
</template>

<script>
  export default {
    asyncData: async ({ app, payload, params, route }) => {
      let lang = params.lang || app.i18n.locale
      let data = app.$content(`/${lang}/${params.nav}`)
      return {
        message: await data.get(`/${lang}/${params.nav}/${params.slug}`)
      }
    },
    head () {
      return {
        titleTemplate: '%s - Vite: A fast, feeless, decentralized transaction ledger',
        title: this.message.title,
        meta: [
          { hid: 'description', name: 'description', content: this.message.description }
        ]
      }
    },
    mounted () {
      this.init()
    },
    watch: {
      'message' () {
        this.init()
      }
    },
    methods: {
      init () {
        this.$nextTick(() => {
          if (window.MathJax) {
            window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub])
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "~prismjs/themes/prism.css";

  .wiki-content {
    /* bulma bugfix */
    .number {
      align-items: initial;
      background-color: transparent;
      border-radius: 0;
      display: inherit;
      font-size: inherit;
      height: inherit;
      justify-content: inherit;
      margin-right: initial;
      min-width: initial;
      padding: 0;
      text-align: left;
      vertical-align: initial;
    }
  }
</style>
