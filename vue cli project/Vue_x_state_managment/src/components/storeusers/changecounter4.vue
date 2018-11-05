<template>
    <div>
                <h2> set store value: Mutation : mapActions</h2>

       <button @click="increment(10)" >add counter</button>
              <button @click="decrement" >reduce counter</button>

    </div>
</template>
<script>
import {mapActions} from  'vuex';

export default {
methods:{
    ...mapActions(['increment','decrement'])
}
   
    
}
</script>
