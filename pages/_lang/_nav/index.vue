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
      methods: {}
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
