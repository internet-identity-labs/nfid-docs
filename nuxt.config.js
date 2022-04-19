import theme from '@nuxt/content-theme-docs'

export default theme({
  docs: {
    primaryColor: '#0E62FF',
  },
  loading: { color: '#9487ff' },
  i18n: {
    locales: () => [{
      code: 'en',
      iso: 'en-US',
      file: 'en-US.js',
      name: 'English'
    }],
    defaultLocale: 'en'
  },
  buildModules: [
    // ['@nuxtjs/google-analytics', {
    //   id: 'UA-12301-2'
    // }]
  ],
})
