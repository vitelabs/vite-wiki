<template>
  <no-ssr>
    <carousel :per-page="1" :autoplay="false">
      <slide :key="item.key" v-for="item in techDetails">
        <div class="columns tech-item-wrapper">
          <div class="column">
            <div class="tech-img-wrapper image">
              <img :src="item.img" alt="">
            </div>
          </div>
          <div class="column tech-item-detail">
            <h3>{{$t(`tech.${item.key}.title`)}}</h3>
            <p>{{$t(`tech.${item.key}.description`)}}</p>
          </div>
        </div>
      </slide>
    </carousel>
  </no-ssr>
</template>

<script type="text/babel">
  import { Carousel, Slide } from 'vue-carousel'

  export default {
    components: {
      Carousel,
      Slide
    },
    data: function () {
      return {
        techDetails: [
          {
            img: require('~/assets/images/bg.jpg'),
            key: 'dag',
            url: ''
          },
          {
            img: require('~/assets/images/bg.jpg'),
            key: 'snapshotChain',
            url: ''
          },
          {
            img: require('~/assets/images/bg.jpg'),
            key: 'dpos',
            url: ''
          }
        ]
      }
    },
    methods: {}
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .tech-item-wrapper {
    .tech-img-wrapper {
      max-height: 30rem;
      height: auto;
      img {
        max-height: 30rem;
        height: auto;
        width: 100%;
      }
    }
    .tech-item-detail {
      & > h3 {
        font-size: 1.5rem;
        color: #111111;
        line-height: 1.81rem;
        font-weight: normal;
        margin-bottom: 1.25rem;
      }
      & > p {
        line-height: 1.75rem;
        color: #111111;
        font-size: 1.13rem;
        font-weight: 200;
      }
    }
  }
</style>
