<template>
<div>
  <p> User Edit</p>
  <p> user age {{age}}

  </p>
  <button @click="sendAge"> send age to sibling UserDetails</button>

  <hr>
      <button @click="alertFromEventBus">Alert from Event bus</button>

    </div>
</template>
<script> 

// { .. } is needed for this import because this is import by name >> not default export
import {eventBus} from '../../main.js'

// how many components we are exporting from here
// >> in this case only one and that one is default by every import
//  >> check main.js
export default {
    data: function(){
        return {
           age:30
        }
    },
    methods:{
        sendAge(){
            this.age +=1;
            eventBus.$emit('ageChanged',this.age)  // >> check UserDetails.vue << lifecycle methods created()
        },
        alertFromEventBus(){
            eventBus.sendAlert()
        }
    }
   
}
</script>
<style scoped>
div{
    background-color: red;
     display: inline-block;
    width: 40%;
        height:200px;

}

</style>

