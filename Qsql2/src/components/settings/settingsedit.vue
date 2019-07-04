<template>
  <div>
    <div class="no-gutter h-100 w-100 d-flex overflowscroll">
      <div class="col-4 main-screen">
        <md-drawer class="md-elevation-2" md-persistent="full" :md-active.sync="xtrue">
          <settings></settings>
        </md-drawer>
      </div>

      <div class="col-8 pt-3">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import settings from "./settings";
export default {
  components: {
    settings
  },
  updated() {
    // this.tabIndex = 2;
  },
  mounted() {},
  beforeRouteLeave(to, from, next) {
    const answer = window.confirm("Do you really want to leave?");
    if (answer) {
      next();
    } else {
      next(false);
    }
  },
  data() {
    return {
      xtrue: true
    };
  },
  //---------------------------
  methods: {}
};
</script>

<style>
html {
  overflow: hidden !important;
}

table {
  outline: none;
}

table:focus {
  outline: none;
}
</style>

<style lang="scss" scoped>
.navbar-brand {
  color: #000;
}
.stickyHead {
  position: sticky;
  background-color: #cfe3fa;
  top: 0;
  z-index: 7;
}
.main-screen {
  width: 100vh;
  height: 95vw;
}

.md-tabs {
  margin-bottom: 24px;
}

.md-drawer {
  width: 100%;
}

div.fixed {
  position: fixed;
  left: 0;
  top: 0;
  background-color: #cfe3fa;

  z-index: 9999;
}
</style>
