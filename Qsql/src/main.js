import './bootstrap';
import Vue from "vue";
import App from "./App.vue";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
 
 
import VueRouter from 'vue-router';

import { routes } from "./routes";

import {AppMixin} from './AppMixin.js' 

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
 
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'

library.add(faSpinner,faTrashAlt)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)
Vue.component('font-awesome-layers-text', FontAwesomeLayersText)

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.mixin(AppMixin);


const router = new VueRouter({ routes } );

  
//Event bus instance
window.eventBus = new Vue();          
 
          
new Vue({
  el: "#app",

  router: router,
  render: h => h(App)
});
