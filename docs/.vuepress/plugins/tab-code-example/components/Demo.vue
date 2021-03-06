<template>
  <div>
    <tabs :options="{ useUrlFragment: false }" @changed="onTabChanged">
      <tab v-for="tab in codeList" :name="tab.name" :key="tab.name">
        <vnodes :vnodes="tab.dom"></vnodes>
      </tab>
      <tab v-if="testSourceCode.length" name="Play" key="play" @changed="onTabChanged">
        <div v-for="(tab, index) in testSourceCode" :key="tab.name">
          <div class="tools-wrapper">
            <div class="demo-test-title">
              {{tab.name}}
            </div>
            <input type="url" v-model="tab.url">
            <span class="code-play-btn" @click="onPlayClick(index)">
            <v-icon icon="play"></v-icon>
          </span>
            <span class="code-play-btn right" @click="onResetClick(index)">
            <v-icon icon="undo"></v-icon>
          </span>
          </div>
          <ClientOnly>
            <codemirror v-if="selectedTab === 'Play'" :ref="`cm_${tab.name}`"
                        :options="cmOptions"
                        :value="tab.content"
                        @input="onCmCodeChange(index, $event)"
            >
            </codemirror>
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
        </div>
      </tab>
    </tabs>
  </div>
</template>

<script type="text/babel">
  import Vue from 'vue'
  import merge from 'deepmerge'
  import {Tabs, Tab} from 'vue-tabs-component'
  import Loading from './Loading'

  const defaultDemoConfig = {
    errorMessage: 'Json parse failed. Please check it.'
  }

  const REQ_URL = 'http://127.0.0.1:48132/'

  function saveReqUrl(url) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('reqUrl', url);
    }
  }

  function getReqUrl() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('reqUrl') || REQ_URL;
    } else {
      return REQ_URL
    }
  }

  function parseInfo(infoArr) {
    let keys = ['tab', 'url', 'method', 'test']
    let ob = {}
    keys.forEach(item => {
      ob[item] = null
    })
    if (['tab', 'test'].indexOf(infoArr[0]) === -1) {
      infoArr.shift()
    }
    for (let i = 0; i < infoArr.length; i++) {
      let index = keys.indexOf(infoArr[i])
      if (index > -1) {
        ob[keys[index]] = (infoArr[i+1] && infoArr[i+1].replace(/'/g, '')) || 'test'
      }
    }
    return ob
  }


  export default {
    components: {
      Tab,
      Tabs,
      Loading,
      Vnodes: {
        functional: true,
        render: (h, ctx) => ctx.props.vnodes
      },
    },
    computed: {
      demoConfig() {
        let {demo} = this.$themeLocaleConfig
        return demo || defaultDemoConfig
      },
      preDefinedUrl() {
        return this.$page.frontmatter.demoUrl || getReqUrl()
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
        info = info.replace(/:\s*/g, ':')
        let infoArr = []
        info.trim().split(':').forEach((item) => {
           item.trim().split(' ').forEach((attr, index)=>{
             infoArr.push(attr.trim())
           })
        })
        let infoOb = parseInfo(infoArr)
        if (!infoOb.tab && !infoOb.test) {
          return
        }
        if (infoOb.test) {
          testSourceCode.push({
            ...item,
            ...infoOb,
            name: infoOb.test,
            url: this.getUrl(infoOb.url)
          })
        } else if (infoOb.tab) {
          tabSourceCode.push({
            ...item,
            ...infoOb,
            name: infoOb.tab
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
    mounted() {
      this.testSourceCode.forEach((item, index) => {
        item.url = this.getUrl(item.url)
      })
    },
    methods: {
      onTabChanged(selectedTab) {
        this.selectedTab = selectedTab.tab.name
      },
      getUrl(url) {
        if (url) {
          if (url.startsWith('http')) {
            return url
          } else {
            return (this.preDefinedUrl || '') + url
          }
        }
        return url
      },
      run(reqData, opts = {}) {
        return fetch(opts.url || this.url || getReqUrl(), {
          method: opts.method || 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: opts.method === 'GET' ? null : JSON.stringify(reqData)
        }).then(response => {
          if (response.status >= 200 && response.status < 300) {
            return response
          } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
          }
        }).then(response => response.json())
      },
      onPlayClick (index) {
        let testCodeItem = this.testSourceCode[index]
        let code = testCodeItem.content
        testCodeItem.error = null

        Vue.set(this.testSourceCode, index, {
          ...testCodeItem,
          pending: true
        })
        saveReqUrl(this.url)

        try {
          let json = JSON.parse(code)

          this.run(json, {url: testCodeItem.url, method: testCodeItem.method}).then(data => {
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
  @import '~codemirror/lib/codemirror.css'
  @import '~codemirror/theme/solarized.css'

  // codemirror bugfix

  .content pre.CodeMirror-line {
    padding 0
    margin auto
  }
  .vue-codemirror {
    max-height: 400px;
    overflow: scroll;
  }


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
    padding-left: 0.5em;
    padding-right: 0.5em;

    .tabs-component-tab-a {
        font-weight: bold;
    }
  }

  .tabs-component-tab:not(:last-child) {
    /*border-bottom: dotted 1px #ddd;*/
  }

  .tabs-component-tab:hover {
    color: #666;
  }

  .tabs-component-tab.is-active {
    color: #000;
    border-left: 1px solid #ddd;
    border-bottom: none;
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
      border-bottom: none;
      z-index: 2;
      border-left: 1px solid #ddd;
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
      z-index: 3;
      & > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
      }
    }
    .tools-wrapper {
      position: relative;
      border-bottom: 1px solid rgba(0,0,0,0.05);
      text-align: right;
      .demo-test-title {
        display: inline-block;
        float: left;
        line-height: 36px;
        padding-left: 1rem;
        font-weight: 500;
        font-size: 14px;
        color: rgba(0,0,0,0.5);
      }

      & > input {
        height: 28px;
        border-radius: 3px;
        border: 1px solid rgba(0,0,0,0.05);
        width: 40%;
        font-family: monospace;
        padding-left: 0.3rem;
      }
      .code-play-btn {
        margin-bottom: 5px;
        display: inline-block;
        width: 2rem;
        height: 2rem;
        border: 1px solid rgba(0,0,0,0.05);
        color: $accentColor;
        cursor: pointer;
        text-align: center;
        background: rgba(255,255,255,0.2);
        line-height: 32px;
        border-radius: 3px;
        &:hover {
          background: $accentColor;
          color: white;
        }
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
