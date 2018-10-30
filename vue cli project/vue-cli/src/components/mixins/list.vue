<template>
<div>
<h1>Mixins 1 -</h1> 
    <input v-model ="filterText">
    <ul>
        <li v-for="fruit in filteredFruits" :key="fruit">{{fruit}}</li>
    </ul>
    </div>
</template>
<script> 
     import { fruitMixin } from './fruitsMixin.js';

export default {

   // >>> all this will be used from fruitMixin.js

    mixins:[fruitMixin]   , // array of all mixins
    created(){
        alert("component Mixin Created")
    },
      data(){
        return{
            fruits:['1Apple','1Banana' , '1Mango' ,'1Melon'],
            filterText:""
        }
    },
       computed:{
        filteredFruits(){
            return this.fruits.filter((element)=>{
                return element.toUpperCase().match(this.filterText.toUpperCase())
            })
        }
    },
       computed:{
        filteredFruits(){
            return this.fruits.filter((element)=>{
                return element.match(this.filterText)
            })
        }
    },
//    data(){
//        return{
//            fruits:['Apple','Banana' , 'Mango' ,'Melon'],
//            filterText:""
//        }
//    },
//    computed:{
//        filteredFruits(){
//            return this.fruits.filter((element)=>{
//                return element.match(this.filterText)
//            })
//        }
//   }

}
</script>
 

