export default function (lang, loadedLangs) {
  return import(/* webpackChunkName: "lang-[request]" */ `~/locales/${lang}.json`).then(msgs => {
    return {
      lang: lang,
      module: msgs.default
    }
  })
}
