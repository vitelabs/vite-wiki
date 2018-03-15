<template>
  <div class="timeline">
    <ul v-in-viewport>
      <li class="li-spacer in-view"
          :class="{ 'is-finish': finished.indexOf(index) > -1 }"
          :key="item.time"
          v-for="(item, index) in timelines">
        <div class="inview2 animated" :class="{'fadeInLeft': (index + 1) % 2 === 0, 'fadeInRight': (index + 1) % 2 === 1}">
          <span class="time">{{item.time}}</span>
          <p>
            {{item.description}}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/babel">
    export default {
      data: function () {
        return {
          finished: [0]
        }
      },
      computed: {
        timelines: function (index) {
          return this.$t(`roadmap.timelines`)
        }
      },
      methods: {

      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  $timelineColor: #3381D3;
  $dot-size: 2.5rem;
  $dot-gap:  0.95;
  $dot-size-inner: (2.5rem * $dot-gap);

  .timeline {
    padding: 1rem;
    ul {
      li {
        list-style-type: none;
        position: relative;
        width: 2px;
        margin: 0 auto;
        background: $timelineColor;

        &.is-finish {
          .time {
            color: #111111;
          }
          & > div {
             & > p {
              color: #111111;
            }
          }

          &::before {
            content: '';
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            width: $dot-size;
            height: $dot-size;
            border-radius: 50%;
            top: 0px;
            background: white;
            border: 1px solid #018DFF;
          }
          &::after {
            width: $dot-size-inner;
            height: $dot-size-inner;
            top: ($dot-size * ((1 - $dot-gap) / 2));
            background: #018DFF;
            border: 3px solid #F8F8F8;
          }
        }

        &::after {
          content: '';
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 1.59rem;
          height: 1.59rem;
          border-radius: 50%;
          top: 1px;
          background: #D5E6F7;
          border: 3px solid #F8F8F8;
        }

        &:nth-child(odd) div {
          left: 45px;
        }

        &:nth-child(even) div {
          left: -439px;
          text-align: right;
        }

        div {
          position: relative;
          bottom: 0;
          width: 400px;
          padding: 15px;
          border-radius: 4px;
          min-height: 150px;
          font-family: HelveticaNeue-Light;

          .time {
            margin-top: -20px;
            display: block;
            font-size: 1.13rem;
            line-height: 1.38rem;
            text-transform: uppercase;
            color: #666666;
          }
          & > p {
            font-size: 1.13rem;
            line-height: 2.19rem;
            color: #666666;
            word-wrap: break-word;
          }
        }
      }
    }
  }


  /* EFFECTS
      –––––––––––––––––––––––––––––––––––––––––––––––––– */

  .timeline ul li::after {
    transition: background .5s ease-in-out;
  }

  .timeline ul li div {
    visibility: hidden;
    opacity: 0;
    transition: all .5s ease-in-out;
  }

  .timeline ul li.in-view div {
    /*transform: none;*/
    visibility: visible;
    opacity: 1;
  }


  /* GENERAL MEDIA QUERIES
      –––––––––––––––––––––––––––––––––––––––––––––––––– */

  @media screen and (max-width: 900px) {
    .timeline ul li div {
      width: 250px;
    }
    .timeline ul li:nth-child(even) div {
      left: -289px; /*250+45-6*/

    }
  }

  @media screen and (max-width: 600px) {
    .timeline ul li {
      margin-left: 20px;
    }
    .timeline ul li div {
      width: calc(100vw - 91px);
    }
    .timeline ul li:nth-child(even) div {
      left: 45px;
      text-align: left;
    }
  }
</style>
