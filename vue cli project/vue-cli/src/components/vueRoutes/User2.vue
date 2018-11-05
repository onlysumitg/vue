<template>
<div>
    <h1> THIS IS USER 2 [sub-routes]</h1>
    <button @click="gotoHome">GO TO HOME</button>
    <p> Loaded "id" : {{id}} </p>
   <hr>
  <router-view></router-view>

    </div>
</template>
<script>
export default {
  components: {},
  data: function() {
    return {
      id: this.$route.params.id
      //  $router ==> is the complete $router
      //  $route  ==> is current active route which called this component
    };
  },

  // to watch change in parameters
  // when there is change in the route paramtere and component is already active
  // Vue does not update or recreate that component
  // so >> we have to watch for the changes in route
  watch: {
    $route(to, from) {
      // to and from both the route objects
      this.id = to.params.id;
    }
  },
  methods: {
    gotoHome() {
      //this.$router.push("/");

      this.$router.push({ path: "/" });
    }
  }
};
</script>
<style scoped>
</style>

