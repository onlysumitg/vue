<template>
<div>
    <p>new server status: {{status}}</p>
    <hr>
    <button @click="changeStatus">change status</button> 
    </div>
</template>
<script> 

// used in Home2.vue
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
