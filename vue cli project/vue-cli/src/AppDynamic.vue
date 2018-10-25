<template>
  <div id="app"> 
<button @click="selectedComponent='dyn1'"> show dynamic 1</button>
<hr>
<button  @click="selectedComponent='dyn2'"> show dynamic 2</button>
<hr>
<button  @click="selectedComponent='dyn3'"> show dynamic 3</button>
<hr>
{{selectedComponent}}
<hr>

<!--  
  Vue reserved like slot ... <component></component> is use to display the dynamic component

  by default>> every time selectedComponent is changed
      >> Vue destroy the old instance of the component and CREATE new instance of the component

      use <keep-alive></keep-alive> to wrap the <component></component> to change this default behavior


    keep-alive : Life cycle hooks for dynamic componets 
        >> when keep-alive is used destroyed() life cycle hook is not called
        >> so we can use these hooks to check when a dynamic component is activated and deactivated 

   1. deactivated(): when navigate away from the component
   2. activated()   : when we activate the dynamic component

-->

<keep-alive>
<component :is="selectedComponent">
    <!-- can pass slots data here -->

</component>
</keep-alive>
  </div>
</template>

<script>
import dyn1 from "./components/dynamic/dyn1.vue"
import dyn2 from "./components/dynamic/dyn2.vue"
import dyn3 from "./components/dynamic/dyn3.vue"

 
export default {
  name: 'app',
  components:{
    dyn1,
    dyn2,
    dyn3

  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      selectedComponent:"dyn1"   // name of one of the component
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
