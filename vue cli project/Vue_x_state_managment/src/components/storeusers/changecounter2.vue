<template>
    <div>
                <h2> set store value: Mutation</h2>

       <button @click="$store.commit('incrementCouner')" >add counter</button>
              <button @click="$store.commit('decrementCouner')" >reduce counter</button>

    </div>
</template>
<script>

export default {
   
    
}
</script>
