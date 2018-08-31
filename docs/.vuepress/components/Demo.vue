<template>
  <div>
    <tabs :options="{ useUrlFragment: false }">
      <tab v-for="tab in codeList" :name="tab.name" :key="tab.name">
        <vnodes :vnodes="tab.dom"></vnodes>
      </tab>
      <tab v-for="(tab, index) in testList" :name="getName(index)" :key="tab.name">
        <vnodes :vnodes="tab.dom"></vnodes>
      </tab>
    </tabs>
  </div>
</template>

<script type="text/babel">
  import {Tabs, Tab} from 'vue-tabs-component'

  export default {
    components: {
      Tab,
      Tabs,
      Vnodes: {
        functional: true,
        render: (h, ctx) => ctx.props.vnodes
      }
    },
    data: function () {
      let codeList = this.$slots.default
      console.log(codeList)
      if (!Array.isArray(codeList)) {
        codeList = []
      }
      const testList = []
      codeList = codeList.map(item => {
        let staticClass = (item && item.data && item.data.staticClass || '').trim().replace('extra-class', '').replace(/language-\w*/g, '')
        return {
          name: staticClass,
          dom: item
        }
      }).filter(item => {
        if (!item.name) return false

        if (/tab:.*$/.test(item.name)) {
          return true
        }

        if (/test:?.*$/.test(item.name)) {
          testList.push(item)
        }

        return false
      }).map(item => {
        return {
          ...item,
          name: item.name.replace('tab:', '').trim()
        }
      })
      let codeSlot = this.$slots.code || []


      const sourceCode = JSON.parse(codeSlot.length && codeSlot[0] && codeSlot[0].text || '')

      return {
         codeList,
         testList,
         sourceCode
      }
    },
    methods: {
      getName(index) {
        if (index === 0) {
          return 'Test'
        } else {
          return `Test ${index + 1}`
        }
      }
    }
  };
</script>

<style lang="stylus">
  @import '../override.styl'

  .tabs-component {
    margin: 1.5rem 0;
  }

  .tabs-component-tabs {
    border-radius: 6px;
    margin-bottom: 5px;
    padding-left: 0;
  }

  @media (min-width: 700px) {
    .tabs-component-tabs {
      border: 0;
      align-items: stretch;
      display: flex;
      justify-content: flex-start;
      margin-bottom: -1px;
    }
  }

  .tabs-component-tab {
    color: #999;
    font-size: 14px;
    font-weight: 600;
    margin-right: 0;
    list-style: none;
    border-left: 3px solid transparent;
  }

  .tabs-component-tab:not(:last-child) {
    /*border-bottom: dotted 1px #ddd;*/
  }

  .tabs-component-tab:hover {
    color: #666;
  }

  .tabs-component-tab.is-active {
    color: #000;
    border-left: 3px solid $accentColor;
  }

  .tabs-component-tab.is-disabled * {
    color: #cdcdcd;
    cursor: not-allowed !important;
  }

  .tabs-component-tab-a {
    align-items: center;
    color: inherit;
    display: flex;
    padding: .5em 0em .5em 1em;
    text-decoration: none;
  }

  @media (min-width: 700px) {
    .tabs-component-tab {
      background-color: #fff;
      border-radius: 3px 3px 0 0;
      margin-right: .5em;
      /*transform: translateY(2px);*/
      transition: transform .3s ease;
      border-left: none;
    }

    .tabs-component-tab.is-active {
      border-bottom: solid 2px $accentColor;
      z-index: 2;
      border-left: none;
      /*transform: translateY(0);*/
    }

    .tabs-component-tab-a {
      align-items: center;
      color: inherit;
      display: flex;
      padding: .75em 1em;
      text-decoration: none;
    }
  }

  .tabs-component-panels {
    padding: 1rem 0;
  }

  @media (min-width: 700px) {
    .tabs-component-panels {
      border-top-left-radius: 0;
      background-color: #fff;
      border-radius: 0 6px 6px 6px;
      padding: 1rem 0;
    }
  }
</style>
