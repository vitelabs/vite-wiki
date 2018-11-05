import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faPlay, faUndo } from '@fortawesome/free-solid-svg-icons'
import 'whatwg-fetch'

let mathjaxLoaded = false
function loadingMathjax() {
  if (mathjaxLoaded) return
  // mathjax
  const script = document.createElement('script')
  script.setAttribute('type', 'text/javascript')
  script.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.3/MathJax.js?config=TeX-MML-AM_CHTML')
  document.getElementsByTagName('body')[0].appendChild(script)
  mathjaxLoaded = true
}

export default ({Vue, options, router, siteData}) => {
  library.add(faPlay, faUndo)

  // only load on client side
  if (typeof window !== 'undefined') {
    const Toasted = require('vue-toasted')
    const VueCodemirror = require('vue-codemirror')
    require('codemirror/mode/javascript/javascript.js')
    Vue.use(Toasted.default)
    Vue.use(VueCodemirror)
    loadingMathjax()
  }
  Vue.component('v-icon', FontAwesomeIcon)
}
