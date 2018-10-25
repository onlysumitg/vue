<template>
<div>
    <iServerStatus v-for="i in 2" v-bind:key="i"></iServerStatus>
    </div>
</template>
<script> 

import my_ServerStatus from './ServerStatus.vue';
 
export default {
    components:{
       "iServerStatus": my_ServerStatus
    }
   
}
</script>
