<template>
<div>
    <h1> THIS IS USER</h1>
    <p>{{name}}</p>
    <button @click="changeName">Change my name</button>

    <hr>

    <!--   IMPORTANT  
        
        in userDetails.Vue >> 
        >> we defined a propert "name"
        >> that property will work as attribue
        >>    for we have to use v-bind:name (or short cut :name)  to pass this value -->
   <user-details :name="name" @sendingBack="name = $event" :icallback="myCallBack"></user-details>
        <!--
            @sendingBack="name = $event" >>> event boradcasted from UserDetails.vue
                >> $event will contain the event's value broadcasted by the UserDetails.vue
          ===  OR  ===
                >> @sendingBack="methodCall($event)"
            -->

   <hr>
   <user-edit></user-edit>
    </div>
</template>
<script>
// how many components we are exporting from here
// >> in this case only one and that one is default by every import
//  >> check main.js

import userDetails from "./UserDetails.vue";

import userEdit from "./UserEdit.vue";

export default {
  components: {
    userDetails, // same as user-details
    userEdit // same as user-edit
  },
  data: function() {
    return {
      name: "Critial"
    };
  },
  methods: {
    changeName() {
      this.name = "This is my new name";
    },
    myCallBack() {
      this.name = this.name + " calling back";
    }
  }
};
</script>
<style scoped>
div {
  background-color: pink;

  width: 100%;
  height: 500px;
}
</style>

