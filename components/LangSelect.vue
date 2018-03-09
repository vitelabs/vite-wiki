<template>
  <div class="dropdown lang-btn is-hoverable nav-item">
    <div class="dropdown-trigger">
      <button class="button" aria-haspopup="true" aria-controls="lang-dropdown-menu">
        <span>{{$t('lang')}}</span>
      </button>
    </div>
    <div class="dropdown-menu" id="lang-dropdown-menu" role="menu">
      <div class="dropdown-content">
        <template v-for="item in supportLangs">
          <nuxt-link class="dropdown-item"
                     v-if="item.key !== $i18n.locale"
                     :to="getNuxtLink(item.key)"
                     active-class="none"
                     exact>
            {{item.name}}
          </nuxt-link>
        </template>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
  import config from '~/config.js'
  const supportLangs = config.langs

  export default {
    data: function () {
      return {
        supportLangs
      }
    },
    methods: {
      getNuxtLink (key) {
        let {fullPath} = this.$route
        let isLangPath = supportLangs.some(item => {
          return fullPath.indexOf(`/${item.key}`) > -1
        })
        if (isLangPath) {
          return fullPath.replace(`/${this.$i18n.locale}`, `/${key}`)
        }
        return `/${key}${fullPath}`
      }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .lang-btn {
    .dropdown-trigger {
      button {
        color: white;
        background: transparent;
      }
    }
    .dropdown-menu {
      .dropdown-content {
        .dropdown-item {
          color: rgba(0,0,0,0.8);
          &:hover {
            color: rgba(0,0,0,0.9)
          }
        }
      }
    }
  }
</style>
