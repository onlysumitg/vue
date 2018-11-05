<template>
<div>
  <p> User Details</p>
  <p>name : {{name}}</p>

   <p>Age from UserEdit.Vue : {{age}}</p>

  <button @click="changeName">my local name change</button>

  
  <button @click="sentToParent">Send name back to parent</button>
<hr>
  <button @click="icallback()">Run the parent's call back function</button>


    </div>
</template>
<script>
import { eventBus } from "../../main.js";

// how many components we are exporting from here
// >> in this case only one and that one is default by every import
//  >> check main.js
export default {
  // 1. props:[               // props >> can be array of names or an objects
  //                        //  to receive data from outside >>  an HTML element's attribute
  //          'name'       // the 'name' will behave same like its declared in the data in this component
  //  ],

  // 2. props:{
  //     name: String        // or multiple types [String,Number,Array]
  //  },

  props: {
    name: {
      type: String,
      required: true, // if property is not passed >> this component cannot be used
      default: "SUMIT" // if type is an object ::> default value will be a >> function(){ return { ... } }
    },
    icallback: Function
  },

  data: function() {
    return {
      status: "Critial",
      age: 0
    };
  },
  methods: {
    changeName() {
      this.name = "okkk";
    },
    sentToParent() {
      // broadcast and event
      this.$emit("sendingBack", this.name); // $emit is Vue's methods >> 1st param is name of event

      //  IMPORTANT
      // parent can listen to this event using v-on:EVENTNAME (@EVENTNAME)
      //                                      @sendingBack
      // check User.vue
    }
  },

  created() {
    eventBus.$on("ageChanged", data => {
      // $on() >> this is a listener (never ending)
      this.age = data;
    });
  }
};
</script>
<style scoped>
div {
  background-color: blue;
  display: inline-block;
  width: 40%;
  height: 200px;
}
</style>

