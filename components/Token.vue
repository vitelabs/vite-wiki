<template>
    <div class="columns  is-multiline">
      <div class="column is-6 is-7-fullhd">
        <div class="chart-wrapper">
          <div class="detail-wrapper">
            <pie-chart :chart-data="chartData" :options="options"></pie-chart>
            <div class="detail" v-for="item in detailList">
                <div class="label-item">
                  <div>{{$t(`token.detail.${item.name}`)}}: </div>
                </div>
                <div class="label-value">{{item.value}}</div>
              </div>
            </div>
          </div>
        </div>
      <div class="column investor-detail is-6 is-5-fullhd">
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
  import PieChart from './PieChart'

  let investorList = [
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
  investorList = investorList.map(item => {
    return {
      ...item,
      percent: item.value / 1000000000 * 100
    }
  })

  export default {
    components: {
      PieChart
    },
    data: function () {
      return {
        investorList,
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
        ],
        chartData: {
          labels: investorList.map(item => this.$t(`token.pie.${item.key}.name`)),
          datasets: [
            {
              backgroundColor: ['#7168D8', '#3381D3', '#4D9FF2', '#9FC2FF', '#CFD3FF'],
              data: investorList.map(item => item.value),
              borderWidth: 0,
              hoverBorderWidth: 0
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          padding: 0,
          legend: {
            display: true,
            labels: {
              lineWidth: 0,
              borderRadius: 4
            }
          },
          tooltips: {
            callbacks: {
              label: function ({index}, {labels, datasets}) {
                return `${labels[index]}: ${investorList[index].value} vite`
              }
            }
          },
          plugins: {
            outlabels: {
              lineWidth: 1,
              borderRadius: 4
            }
          }
        }
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
