<template>
    <div>
        <p>Basic counter : {{counter}}</p>
        <p>Double Counter from Store getters: {{counterGetter}}</p>
    </div>
</template>
<script>

export default {
    computed:{
        // user computed properties getter/setter for 2 way binding
        counter: function(val){
                return this.$store.state.counter;
              // return 0;
        },
        counterGetter: function(val){
                return this.$store.getters.doubleCounter;
              // return 0;
        },
    }
    
}
</script>
