<template>
  <div>
    <tabs>
      <tab v-for="tab in codeList" :name="tab.name" :key="tab.name" @changed="onTabChanged">
        <vnodes :vnodes="tab.dom"></vnodes>
      </tab>
      <tab v-for="(tab, index) in testSourceCode" :name="tab.name" :key="tab.name">
        <ClientOnly>
          <codemirror ref="myCm"
                      :options="cmOptions"
                      :value="tab.content"
          >
          </codemirror>
        </ClientOnly>
      </tab>
    </tabs>
  </div>
</template>

<script type="text/babel">
  import {Tabs, Tab} from 'vue-tabs-component'
  import { codemirror } from 'vue-codemirror'

  import 'codemirror/mode/javascript/javascript.js'
  import 'codemirror/lib/codemirror.css'
  import 'codemirror/theme/solarized.css'


  export default {
    components: {
      Tab,
      Tabs,
      codemirror,
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
      let testList = []
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
      testList = testList.map(item => {
        return {
          ...item,
          name: item.name.replace('test:', '').trim()
        }
      })
      let codeSlot = this.$slots.code || []


      let sourceCode = JSON.parse(codeSlot.length && codeSlot[0] && codeSlot[0].text || '')

      if (!Array.isArray(sourceCode)) {
        sourceCode = []
      }
      let testSourceCode = []
      let tabSourceCode = []
      sourceCode.filter(item => item && item.info).forEach(item => {
        let {info = ''} = item
        let testMatchArr = info.match(/(\s|^)test:\s*(.*)/)
        let tabMatchArr = info.match(/(\s|^)tab:\s*(.*)/)
        if (!testMatchArr && !tabMatchArr) {
          return
        }
        if (testMatchArr) {
          testSourceCode.push({
            ...item,
            name: testMatchArr[2].trim()
          })
        } else if (tabMatchArr) {
          tabSourceCode.push({
            ...item,
            name: tabMatchArr[2].trim()
          })
        }
      })

      console.log(testSourceCode)
      console.log(tabSourceCode)
      return {
        codeList,
        testList,
        testSourceCode,
        tabSourceCode,
        cmOptions: {
          tabSize: 4,
          mode: 'application/json',
          theme: 'solarized dark',
          lineNumbers: false,
          line: false,
        }
      }
    },
    methods: {
      getName(index) {
        if (index === 0) {
          return 'Test'
        } else {
          return `Test ${index + 1}`
        }
      },
      onTabChanged(selectedTab) {

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
    border: solid 1px #ddd;
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
  }

  .tabs-component-tab:not(:last-child) {
    /*border-bottom: dotted 1px #ddd;*/
  }

  .tabs-component-tab:hover {
    color: #666;
  }

  .tabs-component-tab.is-active {
    color: #000;
  }

  .tabs-component-tab.is-disabled * {
    color: #cdcdcd;
    cursor: not-allowed !important;
  }

  @media (min-width: 700px) {
    .tabs-component-tab {
      background-color: #fff;
      /*border: solid 1px #ddd;*/
      border-radius: 3px 3px 0 0;
      margin-right: .5em;
      /*transform: translateY(2px);*/
      transition: transform .3s ease;
    }

    .tabs-component-tab.is-active {
      border-bottom: solid 2px $accentColor;
      z-index: 2;
      /*transform: translateY(0);*/
    }
  }

  .tabs-component-tab-a {
    align-items: center;
    color: inherit;
    display: flex;
    padding: .75em 1em;
    text-decoration: none;
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
  .CodeMirror {
    height: auto;
    box-shadow: 0 6px 36px 0 rgba(0,62,100,0.04);
    padding: 1.25rem 1.5rem;
    margin: 0.85rem 0;
    border-radius: 6px;
  }
  .cm-s-solarized.cm-s-dark {
    background-color: #282c34;
  }
</style>
