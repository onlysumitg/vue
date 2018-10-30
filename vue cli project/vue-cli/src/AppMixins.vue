<template>
  <div id="app"> 

    <h1>APP Mixins 1 -</h1> 
    <input v-model ="filterText">
    <ul>
        <li v-for="fruit in filteredFruits" :key="fruit+1">{{fruit}}</li>
    </ul>
<hr>
<list></list>
  </div>
</template>

<script>
import list from "./components/mixins/list.vue"
 
 
export default {
  name: 'app',
  components:{
    list,
 

  },
data(){
       return{
           fruits:['Apple','Banana' , 'Mango' ,'Melon'],
           filterText:""
       }
   },
   computed:{
       filteredFruits(){
           return this.fruits.filter((element)=>{
               return element.match(this.filterText)
           })
       }
   }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
 
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
