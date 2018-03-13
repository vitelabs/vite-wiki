<template>
  <div class="columns is-multiline">
    <div class="column item is-destop is-6-desktop is-6-tablet is-4-widescreen is-12-mobile hvr-float-shadow"
         v-for="item in teams">
      <div class="is-info">
        <figure class="image is-square">
          <img src="https://avatars1.githubusercontent.com/u/28188208?s=400&v=4">
        </figure>

        <div class="description">
          <h3 class="inview animated fadeInDown delay-0-500" v-in-viewport>{{$t(`team.nameMap.${item.key}.position`)}}</h3>
          <h4 class="inview animated fadeInUp delay-0-500" v-in-viewport>{{$t(`team.nameMap.${item.key}.name`)}}</h4>
          <div class="team-des inview animated flipInX delay-0-500" v-in-viewport>{{$t(`team.nameMap.${item.key}.description`)}}</div>
          <div class="item-footer">
            <a :href="url.url" target="_blank" :key="url.type" v-for="url in item.urls">
              <font-awesome-icon class="icon" :icon="getIcon(url.type)" />
            </a>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script type="text/babel">
  import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
  import faTwitter from '@fortawesome/fontawesome-free-brands/faTwitter'
  import faGithub from '@fortawesome/fontawesome-free-brands/faGithub'
  import faLinkin from '@fortawesome/fontawesome-free-brands/faLinkedin'

  export default {
    components: {
      FontAwesomeIcon
    },
    computed: {
      fatwitter () {
        return faTwitter
      },
      fagithub () {
        return faGithub
      },
      falinkin () {
        return faLinkin
      }
    },
    data: function () {
      return {
        teams: [
          {
            img: '',
            key: 'liuchunming',
            urls: [
              {
                type: 'twitter',
                url: 'https://baidu.com'
              },
              {
                type: 'github',
                url: 'https://baidu.com'
              }
            ]
          },
          {
            img: '',
            key: 'liuchunming'
          },
          {
            img: '',
            key: 'liuchunming'
          }
        ]
      }
    },
    methods: {
      getIcon (name) {
        return this[`fa${name}`]
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~assets/vars";

  .hvr-float-shadow {
    &:before {
      background: none;
    }
  }

  .columns {
    margin: 0;

    .is-info {
      border: 1px solid #EAEAEA;
      /*border-radius: 0.2rem;*/
    }

    .image {
      max-height: 25.75rem;
    }
    h3, h4 {
      font-size: 1.56rem;
      color: #111111;
      text-align: center;
      font-weight: normal;
    }
    h4 {
      margin-bottom: 1rem;
    }
    .description {
      padding-top:1.5rem;
      padding-bottom: 1rem;
      width: 100%;
      min-height: 25.75rem;
      border-top: none;
      .team-des {
        padding: 1rem;
        font-size: 1.2rem;
        color: #818181;
        text-align: center;
        font-weight: 300;
        min-height: 9.06rem;
        margin-bottom: 1rem;
      }

      .item-footer {
        height: 2.69rem;
        text-align: center;
        a {
          margin-left: 2.69rem;
          &:first-child {
            margin-left: 0;
          }
        }
        .icon {
          height: 2.5rem;
          width: 2.5rem;
          line-height: 2.5rem;
          color: #999999;
          &:hover {
            color: $light-blue;
          }
        }
      }
    }
  }
</style>
