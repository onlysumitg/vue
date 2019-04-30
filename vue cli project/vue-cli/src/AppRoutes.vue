<template>
  <div id="app">
    <h1>routes</h1>
    <Header></Header>

    <router-view name="headerTop"></router-view>

    <!-- this is the default container -->

    <router-view></router-view>

    <router-view name="headerBottom"></router-view>
  </div>
</template>

<script>
import Header from "./components/vueRoutes/header";
export default {
  name: "app",
  components: {
    Header
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
