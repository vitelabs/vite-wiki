const STORAGE_KEY = 'vue-press-i18n-redirect'

function redirect(router, lang, siteData) {
  let localPath = location.pathname
  let {pages} = siteData

  let currentLang = findLang(localPath, Object.keys(siteData.locales)) || '/';

  let pathWithoutLang = localPath.replace(currentLang, '')
  let langPath = lang === 'en' ? '/' : `/${lang}/`
  let targetPath = langPath + pathWithoutLang

  if (indexOf(pages, targetPath) > -1) {
    router.replace({path: targetPath})
  }
}

function findLang(url, rootPathArray) {
  for (let i = 0; i < rootPathArray.length; i++) {
    if (rootPathArray[i] === '/') {
      if (rootPathArray[i] === url) {
        return rootPathArray[i]
      }
    } else if (url.indexOf(rootPathArray[i]) === 0) {
      return rootPathArray[i]
    }
  }
  return null;
}

function indexOf(arr, url) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].path === url) {
      return i;
    }
  }
  return -1;
}

function isLangChangeEvent(to, from, rootPathArray) {
  let toPath = to.path.split('').reverse()
  let fromPath = from.path.split('').reverse()
  let length
  if (toPath.length > fromPath.length) {
    length = toPath.length
  } else {
    length = fromPath.length
  }

  let toLang = []
  let fromLang = []

  for (let i = 0; i < length; i++) {
    if (toPath[i] !== fromPath[i]) {
       toLang = toPath.splice(i).reverse().join('').replace(/\//g, '') || 'en'
       fromLang = fromPath.splice(i).reverse().join('').replace(/\//g, '') || 'en'
       break
    }
  }
  rootPathArray = rootPathArray.map(item => item.replace(/\//g, '') || 'en')
  return rootPathArray.indexOf(toLang)
}

export default ({Vue, isServer, options, router, siteData}) => {
  // only load on client side
  if (!isServer) {
    let rootPathArray = Object.keys(siteData.locales)
    let lang = navigator.language || navigator.userLanguage

    router.beforeEach((to, from, next) => {
      let index = isLangChangeEvent(to, from, rootPathArray)
      if (index !== -1) {
        let toLang = rootPathArray[index].replace(/\//g, '') || 'en'
        localStorage.setItem(STORAGE_KEY, toLang)
      }
      next()
    })

    if (!lang) return
    lang = lang.split('-')[0]
    let langLast = localStorage.getItem(STORAGE_KEY)

    if (!langLast || langLast === lang) {
      return redirect(router, lang, siteData)
    }

    redirect(router, langLast, siteData)
  }
}
