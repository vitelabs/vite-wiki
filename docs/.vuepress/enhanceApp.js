import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faPlay, faUndo } from '@fortawesome/free-solid-svg-icons'
import 'whatwg-fetch'

const InstantSearch = require('vue-instantsearch/dist/vue-instantsearch')


export default ({Vue, options, router, siteData}) => {
  library.add(faPlay, faUndo)

  // only load on client side
  if (typeof window !== 'undefined') {
    const Toasted = require('vue-toasted')
    const VueCodemirror = require('vue-codemirror')
    require('codemirror/mode/javascript/javascript.js')
    Vue.use(Toasted.default)
    Vue.use(VueCodemirror)
    console.log(InstantSearch)
    Vue.component('ais-index', InstantSearch.Index)
    Vue.component('ais-search-box', InstantSearch.SearchBox)
    Vue.component('ais-highlight', InstantSearch.Highlight)
    Vue.component('ais-results', InstantSearch.Results)
  }
  Vue.component('v-icon', FontAwesomeIcon)
}
