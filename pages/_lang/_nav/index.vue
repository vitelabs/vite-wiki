<template>
  <nuxtent-body v-if="indexNav.body" :body="indexNav.body" />
</template>

<script type="text/babel">
    export default {
      computed: {
        indexNav () {
          return this.$store.state.indexNav
        }
      },
      head () {
        return {
          titleTemplate: '%s - Vite: A fast, feeless, decentralized transaction ledger',
          title: this.$t(`nav.${this.$route.params.nav}`),
          meta: [
            { hid: 'description', name: 'description', content: this.$t('head.title') }
          ]
        }
      },
      data: function () {
        return {}
      },
      mounted () {
        if (this.indexNav.body) {
          this.initMathjax()
        }
      },
      watch: {
        'indexNav' () {
          this.init()
        }
      },
      methods: {
        init () {
          this.$nextTick(() => {
            this.initMathjax()
          })
        },
        initMathjax () {
          if (window.MathJax) {
            window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub])
          }
        }
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
