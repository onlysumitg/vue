import Vue from "vue";
//import App from './App.vue'    // uncomment this for --> commnuction folder
//import App from './AppDynamic.vue'   // uncomment this for --> dynamic folder
//import App from './AppForms.vue'   // uncomment this for --> forms folder

//import App from "./AppDirective.vue"; // uncomment this for --> directive folder

//import App from './AppMixins.vue'   // uncomment this for --> mixin folder

//import App from "./AppTransition.vue"; // uncomment this for --> transitions folder

import App from "./AppRoutes.vue"; // uncomment this for --> vuewRoutes folder

import Home from "./Home.vue";
import Home2 from "./Home2.vue";

//----------------------------
// Import plugin
//---------------------------

import VueResource from "vue-resource";
import VueRouter from "vue-router";

import {
  routes
} from "./routes";
//-----------------------------------------------

// register component globally
Vue.component("app-server-state", Home);

Vue.component("new-server-state", Home2);
// used in App.vue

// -------------------------- directive 1 -----------------------------
Vue.directive("mydirective", {
  bind(el, binding, vnond) {
    el.style.backgroundColor = "green";
  }
});

// -------------------------- directive 2 --- with parameters--------------------------
Vue.directive("mydirective2", {
  bind(el, binding, vnond) {
    el.style.backgroundColor = binding.value;
  }
});

// -------------------------- directive 3 --- with arguments--------------------------
Vue.directive("mydirective3", {
  bind(el, binding, vnond) {
    if (binding.arg == "textcolor") {
      el.style.color = binding.value;
    } else {
      el.style.backgroundColor = binding.value;
    }
  }
});

// -------------------------- directive 4 --- with modifier--------------------------
Vue.directive("mydirective4", {
  bind(el, binding, vnond) {
    var delay = 0;
    if (binding.modifiers["delayed"]) {
      delay = 3000;
    }

    setTimeout(() => {
      if (binding.arg == "textcolor") {
        el.style.color = binding.value;
      } else {
        el.style.backgroundColor = binding.value;
      }
    }, delay);
  }
});

// -------------------------- Define event bus--------------------------
// event bus :  central object to pass data any where in the application
// -------------------------- Define event bus--------------------------

export const eventBus = new Vue({
  methods: {
    sendAlert() {
      alert("alert from event bus");
    }
  }
}); // we don't need any new method here .. everything is already there
// what ever component want to use this eventBus has to import it
// >> can contain any methods >> these methods will be available every where in the application

// ----------------------------------------------------------------
// - use vue-resources : Global
// ----------------------------------------------------------------

Vue.use(VueResource); // check import

Vue.use(VueRouter); // check import

const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return {
        selector: to.hash
      } // #data in userdetail/userEdit
    }
    //return {x:0,y:700}  // always scroll to this position
  }

});
//.use() >> tell vue to add a plugin to extens the core functionalty

//==> access control in router >> who is allowed to visit this route

// this is called every time
// must call the next() to continue
//  >> else systme will this that continue is not allowed
//   next(false) ==> dont continue and stay on this page
//    next('/xx') >> go to this path
//    next({pathObject}) :: check routes.js
router.beforeEach((to, from, next) => {
  console.log("GLOBAL >> before each");
  next();

})

// ----------------------------------------------------------------
// - Main vue instance
// ----------------------------------------------------------------

new Vue({
  el: "#app",
  router: router,
  render: h => h(App)
});
