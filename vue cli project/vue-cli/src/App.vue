<template>
  <div id="app">
    <!-- from Home.vue -->
    <app-server-state></app-server-state>

<!-- from Home2.vue -->
<new-server-state></new-server-state>

<user></user>

<hr>

<hr>
<hr>
<hr>
<hr>
<hr>
<!-- SLOTS                         -->
<slots1>
  <h1> sumit goyal</h1>
</slots1>
<!-- NAMED SLOTS == -->
 <namedslots>
<h2 slot="title">this is title</h2>
<p slot="body">this is body..........</p>
<p>send this data to default slot</p>
 </namedslots>

  </div>
</template> 

<script>
import user from "./components/commnucation/User.vue";

import slots1 from "./components/commnucation/Slots1.vue";
import namedslots from "./components/commnucation/Slots2.vue";

export default {
  name: "app",
  components: {
    user,
    slots1,
    namedslots
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
