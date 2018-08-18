<template>
  <div class="home">
    <div class="hero">
      <div class="left">
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
             viewBox="0 0 1024 1024" style="enable-background:new 0 0 1024 1024;" xml:space="preserve">
          <g fill="currentColor">
            <polygon id="Fill-1" class="st0" points="0,265 285.3,992.6 316.9,193.8 	"/>
            <polygon id="Fill-2" class="st0" points="389.3,180.1 295.3,993.7 1024,30.3 	"/>
          </g>
          </svg>
      </div>

      <div class="right">
      <h1 class="can-hide">Vite</h1>
      <h1>
        {{data.highPerformance}}<br><span>{{data.dapp}}</span>
      </h1>
      <p>
        <a class="button" target="_blank" href="https://vite.org">{{data.website}}</a>
        <a class="button white" :href="data.actionLink">{{data.actionText}}</a>
        <a class="button gray has-icon" href="https://github.com/vitelabs" target="_blank">
          <svg aria-labelledby="simpleicons-github-dark-icon" lang="" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title id="simpleicons-github-icon" lang="en">GitHub Dark icon</title><path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>
          GITHUB</a>
      </p>
    </div>
    </div>
    <div class="projects">
      <div class="inner">
        <div v-for="item in projects" class="item">
          <h2>{{item.title}}</h2>
          <p>
            {{item.details}}
          </p>
          <a v-if="item.github && item.github.length" v-for="githubItem in item.github" class="github-button" :href="'https://github.com/vitelabs/' + githubItem" data-size="large" data-show-count="true" aria-label="Star vitelabs/go-vite on GitHub">
            {{githubItem}}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      githubScriptIsLoad: false
    }
  },
  computed: {
    data () {
      return this.$page.frontmatter
    },
    projects() {
      return this.data.projects
    }
  },
  mounted() {
    if (this.githubScriptIsLoad) {
      return;
    }
    let script = document.createElement('script')
    script.setAttribute('src', 'https://buttons.github.io/buttons.js')
    script.async = true
    script.defer = true
    document.head.appendChild(script)
    this.githubScriptIsLoad = true;
  }
}
</script>

<style lang="stylus" scoped>
@import '../override.styl'

.home
  padding $navbarHeight 2rem 0
  max-width 1260px
  margin 0px auto
  .hero
    text-align center
    background-color: #fff;
    margin: 0 auto;
    overflow hidden
    .can-hide
      display none
    .left, .right
      float left
    .left
      width 39%
      svg
        width 215px
        height 215px
        color #282c34
        float right
        margin-right 60px
    .right
      width 61%
      text-align left
      h1
        font-weight: 300;
        margin: 0;
        font-size: 2.8em;
    .button
      margin: 1em 0;
      font-size: 1.05em;
      font-weight: 600;
      letter-spacing: 0.1em;
      min-width: 8em;
      text-align: center;
    a.button
      padding: 0.75em 2em;
      border-radius: 2em;
      display: inline-block;
      color: #fff;
      background-color: $accentColor;
      transition: all 0.15s ease;
      box-sizing: border-box;
      border: 1px solid $accentColor;
      &:not(:last-child)
        margin-right: 1%
      &.has-icon
        position: relative;
        text-indent: 1.4em;
        & > svg
          color white
          position: absolute;
          left: 0.6em;
          top: 0.6em;
          width: 2em;
      &.gray
        background-color: #f6f6f6;
        color: #7f8c8d;
        border-color: #f6f6f6;
        & > svg
          color #606266
    a.button.white
      background-color: #fff;
      color: $accentColor;



  .projects
    max-width: 900px;
    margin: 0 auto;
    text-align: center;
    padding: 70px 0px;
    .inner
      .item
        width: 33%;
        display: inline-block;
        vertical-align: top;
        box-sizing: border-box;
        padding: 2em 2em;
        h2
          color: $accentColor;
          font-size: 1.5em;
          font-weight: 400;
          margin: 0;
          padding: 0.5em 0;
          border-bottom none
        p
          min-height 60px
@media (max-width: $MQMobileNarrow)
  .home
    padding-left 1.5rem
    padding-right 1.5rem
    .hero
      img
        max-height 210px
        margin 2rem auto 1.2rem
      h1
        font-size 2rem
      h1, .description, .action
        margin 1.2rem auto
      .description
        font-size 1.2rem
      .action-button
        font-size 1rem
        padding 0.6rem 1.2rem
</style>
