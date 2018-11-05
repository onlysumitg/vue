<template>
<div>
    <h1> [Child] User Edit</h1>
   
   <p>local : {{$route.query.local}}</p>
      <p>q : {{$route.query.q}}</p>
 
 <button @click="confirmed=true">try to leave</button>
 <div style="height:700px"></div>

 <p id="data"> this is all the data > scroll up for more  </p>
    </div>
</template>
<script>
export default {
  components: {},
  data: function() {
    return {
        confirmed:false
    };
  },

  beforeRouteLeave(to,from,next){
    if(this.confirmed){
      next();
    }
    else{
      if (confirm('Are u sure')){
        next()
      }
      else{
        next(false)
      }
    }
   

  },

 
  
  methods: {
 
  }
};
</script>
<style scoped>
</style>

