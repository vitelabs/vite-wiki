import feather from 'vue-icon'
import Toasted from 'vue-toasted'
export default ({Vue, options, router, siteData}) => {
  Vue.use(feather, 'v-icon')
  Vue.use(Toasted)
}
