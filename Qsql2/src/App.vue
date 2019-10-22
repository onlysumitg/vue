<template>
  <div>
    <router-view name="headerTop"></router-view>
    <div id="app" class="fill">
       <notifications></notifications>
      <div class="containerx fill">
        <router-view></router-view>
        <!-- this is the default container -->
      </div>
    </div>
    <router-view name="speedDialMenu"></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>

<style  >
input:focus {
  outline: none;
}

html {
  height: 100%;
}
html,
body {
  margin: 0px;
  min-height: 100%;
  width: 100%;
  background-color: #fafafa;
}
.containerx {
  height: 100%;
  width: 100%;
}
#app {
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100%;
  color: #2c3e50;
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
html {
  overflow: hidden !important;
}

.overflowscroll {
  overflow: scroll !important;
  max-width: 100vw;
  max-height: 100vh;
}
.overflowscrollyonly {
  overflow-y: scroll !important;
  max-width: 100vw;
  max-height: 100vh;
}
</style>
