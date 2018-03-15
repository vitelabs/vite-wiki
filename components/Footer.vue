<template>
  <footer class="footer">
    <div class="container">
      <div class="columns">
        <div class="column icon-wrapper is-half">
          <div class="icon-links-wrapper">
            <a href="" class="icon">
              <fa-icon :icon="['fab', 'github']"></fa-icon>
            </a>
            <a href="" class="icon">
              <fa-icon :icon="['fab', 'discord']"></fa-icon>
            </a>
            <a href="" class="icon">
              <fa-icon :icon="['fab', 'twitter']"></fa-icon>
            </a>
          </div>
        </div>
        <div class="column links-wrapper">
          <div>学习</div>
          <ul>
            <li><a href="">白皮书</a></li>
            <li><a href="">白皮书</a></li>
            <li><a href="">白皮书</a></li>
            <li><a href="">白皮书</a></li>
          </ul>
        </div>
        <div class="column links-wrapper">
          <div>关于</div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script type="text/babel">
    export default {
      data: function () {
        return {}
      },
      methods: {}
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .footer {
    padding-top: 5.44rem;
    .icon-links-wrapper {
      font-size: 2rem;
      .icon {
        color: rgba(255,255,255,0.8);
        margin-left: 2rem;
        &:hover {
          color: white;
        }
        &:first-child {
          margin-left: 0;
        }
      }
    }
    .links-wrapper {
      line-height: 1.75rem;
      & > div {
        &:first-child {
          color: white;
          margin-bottom: 2rem;
        }
      }
      ul {
        li {
          a {
            color: rgba(255,255,255,0.7);
            &:hover {
              color: white;
            }
          }
        }
      }
    }
  }
</style>
