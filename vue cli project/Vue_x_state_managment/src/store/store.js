import Vue from 'vue'
import VueX from 'vuex'

// modules
//  >> like rpg modules
import values from "./modules/value";

// * >> import all the exported values in the "actions" object
import * as actions from "./actions"
//>> can create as many as needed --> seperet for mutations // getters /// actions etc

Vue.use(VueX)
 export const store = new VueX.Store({
    
     state:{
         counter:0
     },
     getters:{
         doubleCounter: (state)=>{
             return state.counter*2
         },
         clickCounter: (state)=>{
            return 'clicked ' + state.counter
        }
     },

     //setter are called mutations
     // these are not async calls >>> use "actions" for async commits
     // neet to commit() to make the change
     mutations:{
         incrementCouner(state){
                state.counter++
         },
         incrementCounerby(state, payload){ // payload is parameter value from the caller
            state.counter += payload
     },
         decrementCouner(state){
            state.counter--
     },
     },

     actions,  

// --- or ----------
     actions:{
         increment: (context, payload) => { // payload is parameter value/objecr from the caller
             // can add async code
             // context is almost same as the store >> but with few differences
             
             context.commit('incrementCounerby', payload)
         },

         //   ({ commit }) >> only get commit() from context
         // this is v6 syntex
         decrement: ({ commit} )=> {
            commit('decrementCouner')
        },


     },

     // import the module
     // it will merge value.js with this centeral storage
     modules:{
            values
     }
 })