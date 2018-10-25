import Vue from 'vue'
//import App from './App.vue'    // uncomment this for --> commnuction folder
//import App from './AppDynamic.vue'   // uncomment this for --> dynamic folder
import App from './AppForms.vue'   // uncomment this for --> forms folder



import Home from './Home.vue'
import Home2 from './Home2.vue'


// register component globally
Vue.component('app-server-state',Home);

Vue.component('new-server-state',Home2);
// used in App.vue



// event bus :  central object to pass data any where in the application

export const eventBus = new Vue({
  methods:{
    sendAlert(){
      alert("alert from event bus")

    }
  }
}
) ; // we don't need any new method here .. everything is already there
  // what ever component want to use this eventBus has to import it
// >> can contain any methods >> these methods will be available every where in the application



new Vue({
  el: '#app',
  render: h => h(App)
})


