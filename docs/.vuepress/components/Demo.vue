<template>
  <div>
    <tabs :options="{ useUrlFragment: false }" @changed="onTabChanged">
      <tab v-for="tab in codeList" :name="tab.name" :key="tab.name">
        <vnodes :vnodes="tab.dom"></vnodes>
      </tab>
      <tab v-for="(tab, index) in testSourceCode" :name="tab.name" :key="tab.name">
        <ClientOnly>
          <codemirror v-if="selectedTab === tab.name" :ref="`cm_${tab.name}`"
                      :options="cmOptions"
                      :value="tab.content"
                      @input="onCmCodeChange(index, $event)"
          >
          </codemirror>
          <span class="code-play-btn" @click="onPlayClick(index)">
            <v-icon icon="play"></v-icon>
          </span>
          <span class="code-play-btn right" @click="onResetClick(index)">
            <v-icon icon="undo"></v-icon>
          </span>
          <div v-if="tab.error">
            {{demoConfig.errorMessage}}
            <pre class="error">
              <code>
                {{tab.error.stack}}
              </code>
            </pre>
          </div>
          <div v-else-if="tab.success">
            {{demoConfig.successMessage}}
            <codemirror :ref="`cmResult_${index}`"
                        :options="cmResultOptions"
                        :value="tab.result">
            </codemirror>
          </div>
          <div v-if="tab.pending" class="loading-wrapper">
            <div>
              <loading></loading>
            </div>
          </div>
        </ClientOnly>
      </tab>
    </tabs>
  </div>
</template>

<script type="text/babel">
  import Vue from 'vue'
  import merge from 'deepmerge'
  import {Tabs, Tab} from 'vue-tabs-component'

  import 'codemirror/lib/codemirror.css'
  import 'codemirror/theme/solarized.css'

  const defaultDemoConfig = {
    errorMessage: 'Json parse failed. Please check it.'
  }


  export default {
    components: {
      Tab,
      Tabs,
      Vnodes: {
        functional: true,
        render: (h, ctx) => ctx.props.vnodes
      }
    },
    computed: {
      demoConfig() {
        let {demo} = this.$themeLocaleConfig
        return demo || defaultDemoConfig
      }
    },
    data: function () {
      let codeList = this.$slots.default
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

      let originData = merge({}, {
        testSourceCode,
        tabSourceCode
      })

      let defaultCmOptions = {
        tabSize: 4,
        mode: 'application/json',
        theme: 'solarized dark',
        lineNumbers: false,
        line: false,
        styleActiveLine: true,
      }

      return {
        codeList,
        testList,
        testSourceCode,
        tabSourceCode,
        originData,
        cmOptions: {
          ...defaultCmOptions
        },
        cmResultOptions: {
          ...defaultCmOptions,
          readOnly: true
        },
        selectedTab: null
      }
    },
    methods: {
      onTabChanged(selectedTab) {
        this.selectedTab = selectedTab.tab.name
        let cm = this.$refs[`cm_${selectedTab.tab.name}`]
        if (Array.isArray(cm) && cm[0]) {
          cm[0].codemirror.refresh()
        }
      },
      run(reqData) {
        return new Promise((resolve, reject)=> {
          setTimeout(() => {
            resolve(reqData)
          }, 1000)
        })
      },
      onPlayClick (index) {
        let testCodeItem = this.testSourceCode[index]
        let code = testCodeItem.content
        testCodeItem.error = null

        Vue.set(this.testSourceCode, index, {
          ...testCodeItem,
          pending: true,
          result: false,
          success: false
        })

        try {
          let json = JSON.parse(code)

          this.run(json).then(data => {
            Vue.set(this.testSourceCode, index, {
              ...testCodeItem,
              success: true,
              result: JSON.stringify(data, null, 4),
              pending: false
            })
            let cm = this.$refs[`cmResult_${index}`]
            if (Array.isArray(cm) && cm[0]) {
              cm[0].codemirror.refresh()
            }
          }).catch((e) => {
            Vue.set(this.testSourceCode, index, {
              ...testCodeItem,
              error: e,
              pending: false
            })
          })
        } catch (e) {
          console.error(e)
          Vue.set(this.testSourceCode, index, {
            ...testCodeItem,
            error: e,
            pending: false
          })
        }
      },
      onCmCodeChange (index, code) {
        this.testSourceCode[index].content = code
      },
      onResetClick (index) {
        Vue.set(this.testSourceCode, index, {
          ...this.testSourceCode[index],
          content: this.originData.testSourceCode[index].content,
          result: null,
          error: null,
          success: null
        })
        Vue.toasted.show(this.demoConfig.resetMessage, {
          duration : 1000,
          theme: "primary",
        })
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
  .tabs-component-panel {
    position: relative;
    .code-play-btn {
      width: 2rem;
      height: 2rem;
      position: absolute;
      top: 0;
      left: 0;
      border:none;
      color: $accentColor;
      cursor: pointer;
      text-align: center;
      background: rgba(255,255,255,0.2);
      border-top-left-radius: 5px;
      line-height: 32px;
      &:hover {
        background: $accentColor;
        color: white;
      }
      &.right {
        right: 0;
        left: auto;
        border-top-left-radius: 0;
        border-top-right-radius: 5px;

      }
    }

    pre.error {
      color: red;
      & > code {
        color: #f56c6c;
      }
    }
    .loading-wrapper {
      text-align: center;
      background-color: rgba(255,255,255,0.1);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      & > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
      }
    }
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
    padding: 1.25rem 1.5rem 1.25rem 2rem;
    margin: 0.85rem 0;
    border-radius: 6px;
  }
  .cm-s-solarized.cm-s-dark {
    background-color: #282c34;
  }
</style>
