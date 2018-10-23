<template>
<div>
    <p>server status: {{status}}</p>
    <hr>
    <button @click="changeStatus">change status</button> 
    </div>
</template>
<script> 

// how many components we are exporting from here
// >> in this case only one and that one is default by every import
//  >> check main.js
export default {
    data: function(){
        return {
            status:'Critial'
        }
    },
    methods:{
        changeStatus(){
            this.status ="Normal";
        }
    }
}
</script>
