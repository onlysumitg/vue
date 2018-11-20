import "./bootstrap";
import Vue from "vue";
import App from "./App.vue";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// import Vuesax from 'vuesax'

// import 'vuesax/dist/vuesax.css' //Vuesax styles
// import 'material-icons/iconfont/material-icons.css';

// Vue.use(Vuesax)

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css' // This line here

Vue.use(VueMaterial)

// not in use
// import Vuetify from 'vuetify'
// import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

// import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader

// Vue.use(Vuetify)


import VueRouter from "vue-router";

import {
  routes
} from "./routes";

import {
  AppMixin
} from "./AppMixin.js";

import VueSessionStorage from "vue-sessionstorage";

import {
  library
} from "@fortawesome/fontawesome-svg-core";
import {
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import {
  faSpinner
} from "@fortawesome/free-solid-svg-icons";

// import VueGoodTablePlugin from "vue-good-table";
// import "vue-good-table/dist/vue-good-table.css";
// Vue.use(VueGoodTablePlugin);

import vueAceEditor from "vue2-ace-editor";



import {
  FontAwesomeIcon,
  FontAwesomeLayers,
  FontAwesomeLayersText
} from "@fortawesome/vue-fontawesome";

library.add(faSpinner, faTrashAlt);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("font-awesome-layers", FontAwesomeLayers);
Vue.component("font-awesome-layers-text", FontAwesomeLayersText);
Vue.component("codeeditor", vueAceEditor);

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.mixin(AppMixin);

Vue.use(VueSessionStorage);

const router = new VueRouter({
  routes
});

//Event bus instance
window.eventBus = new Vue();

new Vue({
  el: "#app",

  router: router,
  render: h => h(App)
});
