<template>
    <div class="columns">
        <div class="column">
          <div class="chart-wrapper">
            <ve-pie :data="chartData" :settings="chartSettings"></ve-pie>
          </div>
        </div>
        <div class="column">
          sdfasdfasdf
        </div>
    </div>
</template>

<script type="text/babel">
  import VePie from 'v-charts/lib/pie'

  let colorList = ['#9FC2FF', '#CFD3FF', '#7168D8', '#3381D3', '#4D9FF2']

  export default {
    components: {
      VePie
    },
    created () {
      let arr = [
        {
          key: 'foundation',
          value: 350000000
        },
        {
          key: 'community',
          value: 50000000
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
        }
      ]

      this.chartData = {
        columns: ['type', 'value'],
        rows: arr.map(item => {
          return {
            'type': this.$t(`token.pie.${item.key}`),
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
            color: ({dataIndex}) => {
              return colorList[dataIndex]
            }
          },
          label: {
            formatter: '{b} {d}%'
          }
        }
      }
    },
    methods: {}
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .chart-wrapper {

  }
</style>
