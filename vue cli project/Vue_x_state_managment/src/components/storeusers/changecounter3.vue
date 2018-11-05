<template>
    <div>
                <h2> set store value: Mutation : mapMutations</h2>

       <button @click="incrementCouner" >add counter</button>
              <button @click="decrementCouner" >reduce counter</button>

    </div>
</template>
<script>
import {mapMutations} from  'vuex';

export default {
methods:{
    ...mapMutations(['incrementCouner','decrementCouner'])
}
   
    
}
</script>
