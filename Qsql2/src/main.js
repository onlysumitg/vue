// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import "./bootstrap";
// /npm install @mdi/font -D
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

import Vue from 'vue'
import App from './App'
import router from './router'
import * as monaco from 'monaco-editor'
import vueAceEditor from "vue2-ace-editor";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";


import "bootstrap-vue/dist/bootstrap-vue.css";
import 'material-icons/iconfont/material-icons.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import VuejsDialog from 'vuejs-dialog';
import VuejsDialogMixin from 'vuejs-dialog/dist/vuejs-dialog-mixin.min.js'; // only needed in custom components

// include the default style
import 'vuejs-dialog/dist/vuejs-dialog.min.css';

Vue.use(VuejsDialog);

import NotificationPlugin from "@/components/NotificationPlugin/index"

import VuePopper from 'vue-popperjs';

import VueSelect from 'vue-cool-select'

import Vuetify from 'vuetify'

Vue.use(Vuetify, {
  iconfont: 'mdi'
})


import 'vue-resize/dist/vue-resize.css'
import VueResize from 'vue-resize'
Vue.use(VueResize)

Vue.use(VueSelect, {
  theme: 'bootstrap' // or 'material-design'
})
import {
  library
} from "@fortawesome/fontawesome-svg-core";
import {
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import {
  faSpinner
} from "@fortawesome/free-solid-svg-icons";
import {
  faAngleLeft
} from "@fortawesome/free-solid-svg-icons";
import {
  faAngleRight
} from "@fortawesome/free-solid-svg-icons";

import {
  FontAwesomeIcon,
  FontAwesomeLayers,
  FontAwesomeLayersText
} from "@fortawesome/vue-fontawesome";

library.add(faSpinner, faTrashAlt, faAngleRight, faAngleLeft);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("font-awesome-layers", FontAwesomeLayers);
Vue.component("font-awesome-layers-text", FontAwesomeLayersText);


Vue.config.productionTip = false

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css' // This line here


Vue.use(VueMaterial)





Vue.use(BootstrapVue);

require('intersection-observer');


import {
  AppMixin
} from "./AppMixin.js";

Vue.mixin(AppMixin);

import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)


import * as uiv from 'uiv'

Vue.use(uiv)

import VueSessionStorage from "vue-sessionstorage";


Vue.use(VueSessionStorage);
Vue.use(NotificationPlugin);

window.eventBus = new Vue();
window.monacoX = monaco;
//console.log(window.monacoX)

Vue.component("codeeditor", vueAceEditor);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },

  template: '<App/>'
})



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


String.prototype.hashCode = function () {
  var hash = 0,
    i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};



window.topTitle = new Vue({
  el: "#topTitle",
  data: {
    title: "QSQL"
  },
  computed: {
    topTitle: function () {
      if (this.title.trim().length == 0) {
        return 'QSQL';
      } else {
        return this.title;
      }
    }
  },
  methods: {

    initialize() {
      this.title = this.$session.get("currentservername");

    },



  }
});
