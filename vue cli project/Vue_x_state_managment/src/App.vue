<template>
  <div id="app">
    <h2> VUE X: state managment</h2>
 <result></result>
<hr>
 <result2></result2>
<hr>
<h1></h1>
<hr>
 <changecounter></changecounter>
 <hr>
  <changecounter2></changecounter2>
 <hr>

 <changecounter3></changecounter3>
 <hr>

 
 <changecounter4></changecounter4>
 <hr>
  </div>
</template>

<script>
import result from './components/storeusers/result.vue';

import result2 from './components/storeusers/result2.vue';
import changecounter from './components/storeusers/changecounter.vue';
import changecounter2 from './components/storeusers/changecounter2.vue';

import changecounter3 from './components/storeusers/changecounter3.vue';

import changecounter4 from './components/storeusers/changecounter4.vue';

export default {
  name: 'app',
  components:{
    result,
    result2,
    changecounter,
    changecounter2,
    changecounter3,
    changecounter4
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
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
