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


document.onkeydown = function () {
  switch (event.keyCode) {
    // case 116: //F5 button
    //   event.returnValue = false;
    //   event.keyCode = 0;
    //   return false;
    case 82: //R button
      if (event.ctrlKey) {
        event.returnValue = false;
        event.keyCode = 0;
        return false;
      }
  }
}


new Vue({
  el: "#app",

  router: router,
  render: h => h(App)
});

let topTitle = new Vue({
  el: "#topTitle",
  data: {
    title: "QSQL"
  },


  methods: {
    initialize() {
      this.title = this.$session.get("currentservername");
    },

    setupListeners() {

      eventBus.$on("updatetitle", data => {
        // alert(data);
        this.title = data;

        if (this.title.trim() === "") {
          this.title = "QSQL"
        }
      });


    },
    //-----------------------------------------------
    turnOffListeners() {

      eventBus.$off("updatetitle");
      this.title = "QSQL"
    },

  }
});
