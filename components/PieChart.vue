<template>
    <div class="pie-chart">
      <canvas ref="pieChart"></canvas>
    </div>
</template>

<script type="text/babel">
  export default {
    props: ['chartData', 'options'],
    mounted () {
      const Chart = require('chart.js')
      require('chartjs-plugin-piechart-outlabels')
      window.Chart = Chart
      const ctx = this.$refs.pieChart.getContext('2d')
      this._config = {
        type: 'outlabeledPie',
        data: this.chartData,
        options: this.options
      }
      this._pie = new Chart(ctx, this._config)
    },
    methods: {}
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .pie-chart {
    width: 100%;
    height: 400px;
  }
</style>
