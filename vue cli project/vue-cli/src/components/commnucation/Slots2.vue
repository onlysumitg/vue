<template>
<div>
    <h2> NAMED SLOTS >> to commnucate between parent and child</h2>
<hr>
<!--  NAMED SLOTS -->
    <!-- <slot> </slot> reserved to Vue -->
    <slot name="title"></slot>
    <hr>
        <slot name="body">ddddd</slot>   
        <hr>

        <slot></slot>  <!-- this is a default slot now -->
<hr>
<slot name="withDefaultVale">this is a slot with default value</slot>
<!-- 
    if no value is passed for this slot from the parent >> the default value will be used
    else this default value will be replaced  with the value received
    -->


    </div>
</template>
<script> 
 
export default {
   
}
</script>
<style scoped>
div{
    background-color:navajowhite;
     
    
     
}

</style>

