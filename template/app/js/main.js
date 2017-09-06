import Vue from 'vue'
import App from './App.vue'

{{#if_in_object "material_design" social}}
var VueMaterial = require('vue-material')
Vue.use(VueMaterial)
{{/if_in_object}}

new Vue({
  el: '#app',
  render: h => h(App)
})
