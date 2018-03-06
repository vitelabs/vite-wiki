<template>
  <div class="Content">
    <nuxtent-body :body="message.body" />
  </div>
</template>

<script>
  export default {
    asyncData: async ({ app, payload, params, route }) => {
      let lang = params.lang || app.i18n.locale
      let data = app.$content(lang)
      return {
        message: await data.get(`/${lang}/wiki/${params.slug}`)
      }
    }
  }
</script>
