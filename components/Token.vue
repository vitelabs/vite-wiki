<template>
    <div class="columns">
        <div class="column">
          <div class="chart-wrapper">
            <ve-pie :data="chartData" :settings="chartSettings"></ve-pie>
            <div class="detail-wrapper">
              <div class="detail" v-for="item in detailList">
                <div class="label-item">
                  <div>{{$t(`token.detail.${item.name}`)}}: </div>
                </div>
                <div class="label-value">{{item.value}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="column investor-detail">
          <div v-for="(item, index) in investorList">
            <span class="investor" :style="{ color: colorList[index] }">
              {{$t(`token.pie.${item.key}.name`)}}
            </span>
            <p class="investor-des">{{$t(`token.pie.${item.key}.des`)}}</p>
          </div>
        </div>
    </div>
</template>

<script type="text/babel">
  import VePie from 'v-charts/lib/pie'

  const investorList = [
    {
      key: 'foundation',
      value: 350000000
    },
    {
      key: 'investor1',
      value: 300000000
    },
    {
      key: 'investor2',
      value: 200000000
    },
    {
      key: 'investor3',
      value: 100000000
    },
    {
      key: 'community',
      value: 50000000
    }
  ]

  export default {
    components: {
      VePie
    },
    created () {
      this.chartData = {
        columns: ['type', 'value'],
        rows: this.investorList.map(item => {
          return {
            'type': this.$t(`token.pie.${item.key}.name`),
            'value': item.value
          }
        })
      }
    },
    data: function () {
      return {
        chartData: null,
        chartSettings: {
          dimension: 'type',
          metrics: 'value',
          itemStyle: {
            color: ({dataIndex, percent}) => {
              return this.colorList[dataIndex]
            }
          },
          label: {
            formatter: '{b} {d}%'
          }
        },
        investorList: investorList.map(item => {
          return {
            ...item,
            percent: item.value / 1000000000 * 100
          }
        }),
        colorList: ['#7168D8', '#3381D3', '#4D9FF2', '#9FC2FF', '#CFD3FF'],
        detailList: [
          {
            name: 'initial',
            value: '1,000,000,000 Vite'
          },
          {
            name: 'consensus',
            value: 'DPOS'
          },
          {
            name: 'blockTime',
            value: '10s'
          },
          {
            name: 'blockReward',
            value: '5 Vite'
          },
          {
            name: 'delegatedLimit',
            value: '21'
          }
        ]
      }
    },
    methods: {}
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .chart-wrapper {
    .detail-wrapper {
      margin: 0 auto;
      .detail {
        display: flex;
        flex-direction: row;
        margin-top: 0.5rem;
        &:first-child {
          margin-top: 0;
        }
        & > div {
          flex: 1;
          &.label-item {
            text-align: right;
            color: #999999;
            padding-right: 0.5rem;
            &>div {
              min-width: 180px;
              text-align: left;
              display: inline-block;
            }
          }
        }
        .label-value {
          color: #111111;
        }
      }
    }
  }

  .investor-detail {
    .investor {
      font-size: 1.13rem;
      line-height: 1.75rem;
    }
    .investor-des {
      line-height: 1.75rem;
      font-size: 1rem;
      padding: 1rem;
      color: #818181;
    }
  }
</style>
