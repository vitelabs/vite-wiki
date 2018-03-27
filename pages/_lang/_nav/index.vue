<template>
  <nuxtent-body :body="indexNav.body" />
</template>

<script type="text/babel">
    export default {
      computed: {
        indexNav () {
          return this.$store.state.indexNav
        }
      },
      data: function () {
        return {}
      },
      watch: {
        'indexNav' () {
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

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
