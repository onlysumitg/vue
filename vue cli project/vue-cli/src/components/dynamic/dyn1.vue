<template>
<div>
<h1> DYNAMIC COMPONENT 1</h1> 
    
    </div>
</template>
<script> 
 
export default {
   destroyed(){
       console.log("Destroyed dyn1")
   },
   deactivated()
   {
              console.log("deactivated dyn1")

   },
     activated()
   {
              console.log("activated dyn1")

   }

}
</script>
 

