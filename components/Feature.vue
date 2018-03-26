<template>
  <div class="columns is-multiline" v-in-viewport>
    <div class="column feature-item is-destop is-6-desktop is-6-tablet is-4-widescreen is-12-mobile animated inview2 delay-0-500"
         :class="{'fadeInLeft': (index + 1) % 3 === 1,'fadeInRight': (index + 1) % 3 === 0, 'fadeInUp': (index + 1) % 3 === 2}"
         v-for="(item, index) in features">
      <div class="is-info">
        <div class="icon-wrapper hvr-grow-rotate">
          <img :src="item.icon"/>
        </div>
        <h3 class="animated inview3 fadeInDown" >{{$t(`features.${item.key}.title`)}}</h3>
        <div class="feature-des animated inview3 fadeInUp">{{$t(`features.${item.key}.description`)}}</div>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
    export default {
      data: function () {
        return {
          features: [
            {
              icon: require('~/assets/images/nofee/white@3x.png'),
              key: 'noFee'
            },
            {
              icon: require('~/assets/images/fast/white@3x.png'),
              key: 'fast'
            },
            {
              icon: require('~/assets/images/scalability/white@3x.png'),
              key: 'scalability'
            },
            {
              icon: require('~/assets/images/smartcontract/white@3x.png'),
              key: 'contract'
            },
            {
              icon: require('~/assets/images/multilayer/white@3x.png'),
              key: 'multiLayer'
            },
            {
              icon: require('~/assets/images/crop/white@3x.png'),
              key: 'pruning'
            }
          ]
        }
      },
      methods: {}
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .feature-item {
    height: 21.31rem;
    .is-info {
      background: rgba(54,130,222,1);
      height: 100%;
      color: white;
      text-align: center;
      & > h3 {
        font-size: 1.5rem;
      }
      & > .feature-des {
        color:rgba(255,255,255,0.9);
        padding: 1rem;
        font-size: 1rem;
      }
    }
    .icon-wrapper {
      text-align: center;
      width: 100%;
      & > img {
        height: 5rem;
        width: 5rem;
        margin-top: 3rem;
        margin-bottom: 2rem;
      }
    }
  }
</style>
