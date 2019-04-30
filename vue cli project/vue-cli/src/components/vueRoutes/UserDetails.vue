<template>
  <div>
    <h1>[Child] User Details</h1>
    <p>User id: {{$route.params.id}}</p>

    <router-link tag="button" :to="'/user2/'+id+'/edit'">edit link</router-link>
    <hr>
    <router-link tag="button" :to="{path:'/user2/'+id+'/edit'}">edit link way 2</router-link>
    <hr>
    <!--
   hash:'#data'  >>> id of element to move to
   query >> http get style parametes
    -->
    <router-link
      tag="button"
      :to="{name:'userEdit',
            params:{id:$route.params.id},
            query:{local:'en',q:100},
            hash:'#data'
            
            }"
    >edit link way 3 [with query parameters and hash]</router-link>
    <!--
  userEdit : name give to the route in routes.js
    -->
  </div>
</template>
<script>
export default {
  components: {},
  data: function() {
    return {
      id: this.$route.params.id
    };
  },

  beforeRouteEnter(to, from, next) {
    // if user is value>> check some webserver/db here
    //  as component is not created yet >>> can not use this components's properties
    // check call back inside the next(vm=>{vm.propery1})
    next(); // untill this .. this component is not loaded
    // else
    // next(false)
  },

  methods: {}
};
</script>
<style scoped>
</style>

