<template>
    <div>
        <h2> set store value: direct access</h2>
       <button @click="$store.state.counter++" >add counter</button>
              <button @click="$store.state.counter--" >reduce counter</button>

    </div>
</template>
<script>

export default {
   
    
}
</script>
