const webpack = require('webpack');

module.exports = {
  srcDir: './app/',
  mode: 'spa',
  generate: {
	  dir: 'public'
  },
  head: {
    title: 'app',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
	  { rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons'}
    ]
  },
  modules: [
	  'semantic-ui-vue/nuxt',
	  ['semantic-ui-vue/nuxt', {css: false}]
  ],
  plugins: ['~/plugins/semantic-ui.js'],
  loading: { color: '#3B8070' },
  build: {
	vendor: [
	  'jquery', 'semantic-ui-css'
	],
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery'
		})
	],
	extend (config, { isDev, isClient }) {
	  if (isDev && isClient) {
	    config.module.rules.push({
	      enforce: 'pre',
	      test: /\.(js|vue)$/,
	      loader: 'eslint-loader',
	      exclude: /(node_modules)/
	    })
	  }
    }
  }
}
