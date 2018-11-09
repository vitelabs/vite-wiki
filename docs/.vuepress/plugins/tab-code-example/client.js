import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faPlay, faUndo } from '@fortawesome/free-solid-svg-icons'
import 'whatwg-fetch'

import Demo from './components/Demo'

export default ({Vue, isServer, options, router, siteData}) => {
  library.add(faPlay, faUndo)

  // only load on client side
  if (!isServer) {
    const VueCodemirror = require('vue-codemirror')
    require('codemirror/mode/javascript/javascript.js')
    Vue.use(VueCodemirror)
    Vue.component('demo', Demo)
  }

  Vue.component('v-icon', FontAwesomeIcon)
}
