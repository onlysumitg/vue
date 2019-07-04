import "./bootstrap";

import Vue from 'vue'

import './plugins/vuetify'
import 'vuetify/src/stylus/app.styl'





import App from './App.vue'

import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);

import vueAceEditor from "vue2-ace-editor";
Vue.component("codeeditor", vueAceEditor);


import VueRouter from 'vue-router'
Vue.use(VueRouter)


import router from './router'

import VueSessionStorage from "vue-sessionstorage";
Vue.use(VueSessionStorage);


import VueSelect from 'vue-cool-select'
Vue.use(VueSelect, {
  theme: 'bootstrap' // or 'material-design'
})




Vue.config.productionTip = false





//------------------------
import {
  AppMixin
} from "./AppMixin.js";

Vue.mixin(AppMixin);
window.eventBus = new Vue();

//------------------------------------------------
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
  router,
  render: h => h(App),
}).$mount('#app')







//-------------------------------
//
//-------------------------------
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